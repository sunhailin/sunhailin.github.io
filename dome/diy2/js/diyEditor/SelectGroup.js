this.diyeditor = this.diyeditor || {};
(function () {
    function SelectGroup(container) {
        this.EventDispatcher_constructor();

        this.container = container;
        this.init();
    }

    var p = diyeditor.extend(SelectGroup, diyeditor.EventDispatcher);

    p.init = function () {
        var i;
        for (i = 0; i < this.container.numChildren; i++) {
            var s = this.container.getChildAt(i);
            s.on("select", this.onSelect, this);
        }
    };

    p.update = function () {
        var i;
        for (i = 0; i < this.container.numChildren; i++) {
            var s = this.container.getChildAt(i);
            if (!s.hasEventListener("select"))
                s.on("select", this.onSelect, this);
        }
    };

    p.onSelect = function (e) {
        var j;
        for (j = 0; j < this.container.numChildren; j++) {
            var n = this.container.getChildAt(j);
            if (n instanceof diyeditor.EditObject) {
                if (e.target == n) {

                }
                else {
                    n.unselect();
                }
            }
        }
        var event = new diyeditor.Event("select");
        this.dispatchEvent(event);
    };

    p.getSelect = function () {
        var i;
        for (i = 0; i < this.container.numChildren; i++) {
            var n = this.container.getChildAt(i);
            if (n instanceof diyeditor.EditObject) {
                if (n.isSelect) {
                    return n;
                }
            }
        }
        return null;
    };

    diyeditor.SelectGroup = diyeditor.promote(SelectGroup, "EventDispatcher");
}());