this.diyeditor=this.diyeditor||{};
(function(){
    "use strict";

    function Bitmap(purl) {
        this.DisplayObject_constructor();
        this.setDivObject(document.createElement("img"));
        this.divObject.style.position="absolute";
        this.divObject.style.transformOrigin=0;
        this.divObject.style.maskRepeat="no-repeat";
        this.divObject.style.width="auto";
        this.divObject.style.height="auto";
        this.divObject.setAttribute("name","bitmap");

        this.setImage(purl);
    }

    var p=diyeditor.extend(Bitmap,diyeditor.DisplayObject);

    p.setImage=function(pi){
        if(typeof pi=="string"){
            this.divObject.src=pi;
        }else{
            this.setDivObject(pi);
            this.divObject.style.position="absolute";
            this.divObject.style.transformOrigin=0;
            this.divObject.style.maskRepeat="no-repeat";
            this.divObject.style.width="auto";
            this.divObject.style.height="auto";
            this.divObject.name="bitmap";
        }
    };

    diyeditor.Bitmap=diyeditor.promote(Bitmap,"DisplayObject");
}());