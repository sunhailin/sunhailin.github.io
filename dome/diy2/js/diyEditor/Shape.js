this.diyeditor=this.diyeditor||{};
(function(){
    "use strict";

    function Shape(){
        this.DisplayObject_constructor();
        this._backgroundColor="";
        this._opacity=1;
    }

    var p=diyeditor.extend(Shape,diyeditor.DisplayObject);

    p._getBackgrondColor=function(){
        return this._backgroundColor;
    };

    p._setBackgroundColor=function(param){
        this._backgroundColor=param;
        this.divObject.style.backgroundColor=param;
    };
    try{
        Object.defineProperties(p,{
            backgroundColor:{get: p._getBackgrondColor,set: p._setBackgroundColor}
        });
    }catch (e){

    }

    p._getOpacity=function(){
        return this._opacity;
    };

    p._setOpacity=function(param){
        this._opacity=param;
        this.divObject.style.opacity=param;
    };

    try{
        Object.defineProperties(p,{
            opacity:{get: p._getOpacity,set: p._setOpacity}
        });
    }catch(e){

    }

    diyeditor.Shape=diyeditor.promote(Shape,"DisplayObject");
})();