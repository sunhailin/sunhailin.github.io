this.diyeditor=this.diyeditor||{};

(function(){
   "use strict";

    function DisplayObject(){
        this.EventDispatcher_constructor();

        this.divObject=document.createElement("div");
        this.divObject.style.position="absolute";
        this.divObject.style.webkitTransformOrigin="left top";
        this.divObject.style.maskRepeat="no-repeat";

        this._x=0;
        this._y=0;
        this._width=0;
        this._height=0;
        this._scaleX=1;
        this._scaleY=1;
        this._rotation=0;

        this.parent=null;
    }

    var p=diyeditor.extend(DisplayObject,diyeditor.EventDispatcher);

    p._getX=function() {
        return this._x;
    };

    p._setX=function(px){
        this._x=px;
        this.divObject.style.left=this._x+"px";
    };

    p._getY=function() {
        return this._y;
    };

    p._setY=function(py){
        this._y=py;
        this.divObject.style.top=this._y+"px";
    };

    try{
        Object.defineProperties(p,{
            x:{get: p._getX,set: p._setX},
            y:{get: p._getY,set: p._setY}
        });
    }catch (e){

    }

    p._getWidth=function(){
        return this._width;
    };

    p._setWidth=function(pw){
        this._width=pw;
        this.divObject.style.width=pw+"px";
    };

    p._getHeight=function(){
        return this._height;
    };

    p._setHeight=function(ph){
        this._height=ph;
        this.divObject.style.height=ph+"px";
    };

    try{
        Object.defineProperties(p,{
            width:{get: p._getWidth,set: p._setWidth},
            height:{get: p._getHeight,set: p._setHeight}
        });
    }catch(e){

    }

    p._getScaleX=function(){
        return this._scaleX;
    };

    p._setScaleX=function(ps){
        this._scaleX=ps;
        this._updateTramsform();
    };

    p._getScaleY=function(){
        return this._scaleY;
    };

    p._setScaleY=function(ps){
        this._scaleY=ps;
        this._updateTramsform();
    };

    p._setScale=function(ps){
        this._scaleX=this._scaleY=ps;
        this._updateTramsform();
    };

    try{
        Object.defineProperties(p,{
            scaleX:{get: p._getScaleX,set: p._setScaleX},
            scaleY:{get:p._getScaleY,set: p._setScaleY},
            scale:{set: p._setScale}
        });
    }catch (e){

    }

    p._getRotation=function(){
        return this._rotation;
    };

    p._setRotation=function(pr){
        this._rotation=pr;
        this._updateTramsform();
    };

    try{
        Object.defineProperties(p,{
            rotation:{get: p._getRotation,set: p._setRotation}
        });
    }catch (e){}

    p._updateTramsform=function(){
        this.divObject.style.webkitTransform="rotate("+this._rotation+"deg) scaleX("+this._scaleX+") scaleY("+this._scaleY+")";
    };

    p.setDivObject=function(pdo){
        this.divObject=pdo;
        this.divObject.style.position="absolute";
        this.divObject.style.webkitTransformOrigin="left top";
    };

    p.setMask=function(px,py,pw,ph,purl){
        this.divObject.style.webkitMaskSize=pw+"px"+" "+ph+"px";
        this.divObject.style.webkitMaskPosition=px+"px"+" "+py+"px";
        if(purl===undefined){
            this.divObject.style.webkitMaskImage="url(images/mask.png)";
        }else{
            this.divObject.style.webkitMaskImage="url("+purl+")";
        }
    };
    diyeditor.DisplayObject=diyeditor.promote(DisplayObject,"EventDispatcher");
}());