this.diyeditor=this.diyeditor||{};
(function(){
    "use strict";

    function Container(){
        this.DisplayObject_constructor();
        this.divObject.setAttribute("name","container");
        this.children=[];
    }

    var p=diyeditor.extend(Container,diyeditor.DisplayObject);

    p.getNumChildren=function(){
        return this.children.length;
    };

    try{
        Object.defineProperties(p,{
            numChildren:{get: p.getNumChildren}
        });
    }catch (e){}

    p.addChild=function(child){
        if(!child){return null;}
        var l=arguments.length;
        if(l>1){
            var i;
            for(i=0;i<l;i++){
                this.addChild(arguments[i]);
            }
            return arguments[l-1];
        }
        if(child.parent){child.parent.removeChild(child);}
        child.parent=this;
        this.children.push(child);
        this.divObject.appendChild(child.divObject);
        return child;
    };

    p.addChildAt=function(child,index){
        var l=arguments.length;
        var indx=arguments[l-1];
        if(indx<0||indx>this.children.length){return arguments[l-2];}
        if(l>2){
            for(var i=0;i<l-1;i++){this.addChildAt(arguments[i],indx+1);}
            return arguments[l-2];
        }
        if(child.parent){child.parent.removeChild(child);}
        child.parent=this;
        this.children.splice(index,0,child);
        this._deleteEmptyNode();
        if(index===0){
            if(this.divObject.hasChildNodes()){
                this.divObject.insertBefore(child.divObject,this.divObject.childNodes[0]);
            }else{
                this.divObject.appendChild(child.divObject);
            }
        }else{
            this.divObject.insertBefore(child.divObject,this.divObject.childNodes[index]);
        }
        return child;
    };

    p.removeChild=function(child){
      var l=arguments.length;
        if(l>1){
            var good=true;
            for(var i=0;i<l;i++){good=good&&this.removeChild(arguments[i]);}
            return good;
        }
        return this.removeChildAt(diyeditor.indexOf(this.children,child));
    };

    p.removeChildAt=function(index){
        var l=arguments.length;
        if(l>1){
            var a=[];
            var i;
            for(i=0;i<l;i++){a[i]=arguments[i];}
            a.sort(function(a,b){return b-a;});
            var good=true;
            for(i=0;i<l;i++){good=good&&this.removeChildAt(a[i]);}
            return good;
        }
        if(index<0||index>this.children.length-1){return false;}
        var child=this.children[index];
        if(child){child.parent=null;}
        this.children.splice(index,1);
        this._deleteEmptyNode();
        this.divObject.removeChild(this.divObject.childNodes[index]);
        return true;
    };

    p._deleteEmptyNode=function(){
        var elem_child = this.divObject.childNodes;
        for(var i=0; i<elem_child.length;i++){
            if(elem_child[i].nodeName == "#text" && !/\s/.test(elem_child.nodeValue)) {
                this.divObject.removeChild(elem_child)
            }
        }
    };

    p.removeAllChildren=function(){
        var kids=this.children;
        while(kids.length){this.removeChildAt(0);}
    };

    p.getChildAt=function(index){
        return this.children[index];
    };

    p.getChildIndex=function(child){
        return diyeditor.indexOf(this.children,child);
    };

    p.contains=function(child){
        while(child){
            if(child==this){return true;}
            child=child.parent;
        }
        return false;
    };

    diyeditor.Container=diyeditor.promote(Container,"DisplayObject");
}());