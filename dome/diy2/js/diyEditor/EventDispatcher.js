
this.diyeditor = this.diyeditor||{};

(function() {
    "use strict";

    function EventDispatcher() {

        this._listeners = null;

        this._captureListeners = null;
    }
    var p = EventDispatcher.prototype;

    EventDispatcher.initialize = function(target) {
        target.addEventListener = p.addEventListener;
        target.on = p.on;
        target.removeEventListener = target.off =  p.removeEventListener;
        target.removeAllEventListeners = p.removeAllEventListeners;
        target.hasEventListener = p.hasEventListener;
        target.dispatchEvent = p.dispatchEvent;
        target._dispatchEvent = p._dispatchEvent;
        target.willTrigger = p.willTrigger;
    };

    p.addEventListener = function(type, listener, useCapture) {
        var listeners;
        if (useCapture) {
            listeners = this._captureListeners = this._captureListeners||{};
        } else {
            listeners = this._listeners = this._listeners||{};
        }
        var arr = listeners[type];
        if (arr) { this.removeEventListener(type, listener, useCapture); }
        arr = listeners[type]; // remove may have deleted the array
        if (!arr) { listeners[type] = [listener];  }
        else { arr.push(listener); }
        return listener;
    };

    p.on = function(type, listener, scope, once, data, useCapture) {
        if (listener.handleEvent) {
            scope = scope||listener;
            listener = listener.handleEvent;
        }
        scope = scope||this;
        return this.addEventListener(type, function(evt) {
            listener.call(scope, evt, data);
            if(once){
                evt.remove();
            }
        }, useCapture);
    };

    p.removeEventListener = function(type, listener, useCapture) {
        var listeners = useCapture ? this._captureListeners : this._listeners;
        if (!listeners) { return; }
        var arr = listeners[type];
        if (!arr) { return; }
        for (var i=0,l=arr.length; i<l; i++) {
            if (arr[i] == listener) {
                if (l==1) { delete(listeners[type]); } // allows for faster checks.
                else { arr.splice(i,1); }
                break;
            }
        }
    };

    p.off = p.removeEventListener;

    p.removeAllEventListeners = function(type) {
        if (!type) { this._listeners = this._captureListeners = null; }
        else {
            if (this._listeners) { delete(this._listeners[type]); }
            if (this._captureListeners) { delete(this._captureListeners[type]); }
        }
    };

    p.dispatchEvent = function(eventObj, bubbles, cancelable) {
        if (typeof eventObj == "string") {
            // skip everything if there's no listeners and it doesn't bubble:
            var listeners = this._listeners;
            if (!bubbles && (!listeners || !listeners[eventObj])) { return true; }
            eventObj = new createjs.Event(eventObj, bubbles, cancelable);
        } else if (eventObj.target && eventObj.clone) {
            // redispatching an active event object, so clone it:
            eventObj = eventObj.clone();
        }

        // TODO: it would be nice to eliminate this. Maybe in favour of evtObj instanceof Event? Or !!evtObj.createEvent
        try { eventObj.target = this; } catch (e) {} // try/catch allows redispatching of native events

        if (!eventObj.bubbles || !this.parent) {
            this._dispatchEvent(eventObj, 2);
        } else {
            var top=this, list=[top];
            while (top.parent) { list.push(top = top.parent); }
            var i, l=list.length;

            // capture & atTarget
            for (i=l-1; i>=0 && !eventObj.propagationStopped; i--) {
                list[i]._dispatchEvent(eventObj, 1+(i===0));
            }
            // bubbling
            for (i=1; i<l && !eventObj.propagationStopped; i++) {
                list[i]._dispatchEvent(eventObj, 3);
            }
        }
        return !eventObj.defaultPrevented;
    };

    p.hasEventListener = function(type) {
        var listeners = this._listeners, captureListeners = this._captureListeners;
        return !!((listeners && listeners[type]) || (captureListeners && captureListeners[type]));
    };

    p.willTrigger = function(type) {
        var o = this;
        while (o) {
            if (o.hasEventListener(type)) { return true; }
            o = o.parent;
        }
        return false;
    };

    p.toString = function() {
        return "[EventDispatcher]";
    };

    p._dispatchEvent = function(eventObj, eventPhase) {
        var l, listeners = (eventPhase==1) ? this._captureListeners : this._listeners;
        if (eventObj && listeners) {
            var arr = listeners[eventObj.type];
            if (!arr||!(l=arr.length)) { return; }
            try { eventObj.currentTarget = this; } catch (e) {}
            try { eventObj.eventPhase = eventPhase; } catch (e) {}
            eventObj.removed = false;

            arr = arr.slice(); // to avoid issues with items being removed or added during the dispatch
            for (var i=0; i<l && !eventObj.immediatePropagationStopped; i++) {
                var o = arr[i];
                if (o.handleEvent) { o.handleEvent(eventObj); }
                else { o(eventObj); }
                if (eventObj.removed) {
                    this.off(eventObj.type, o, eventPhase==1);
                    eventObj.removed = false;
                }
            }
        }
    };


    diyeditor.EventDispatcher = EventDispatcher;
}());
