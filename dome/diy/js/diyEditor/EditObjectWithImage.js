this.diyeditor=this.diyeditor||{};
(function(){
    function EditObjectWithImage(data){
        this.EditObject_constructor(data);
        this.bitmap=null;
        this.imageWidth=0;
        this.imageHeight=0;

        this.minScale = 0.1;
        this.maxScale = 1;
        this.scaleNum = 1;
        this.rotateNum = 0;
    }

    var p=diyeditor.extend(EditObjectWithImage,diyeditor.EditObject);

    p.setImageUrl=function(url){
        var thisPointer=this;
        var DiyData=new diyeditor.DiyData();
        var contentContainer=this.contentContainer;
        var image=new Image();
        image.src=DiyData.getImagePath()+url;
        image.onload=function(){
            contentContainer.removeAllChildren();
            thisPointer.imageWidth=image.width;
            thisPointer.imageHeight=image.height;
            var bitmap=new diyeditor.Bitmap(image);
            thisPointer.bitmap=bitmap;
            bitmap.x=-thisPointer.imageWidth/2;
            bitmap.y=-thisPointer.imageHeight/2;
            contentContainer.x+=thisPointer.imageWidth/2;
            contentContainer.y+=thisPointer.imageHeight/2;
            contentContainer.width=thisPointer.imageWidth;
            contentContainer.height=thisPointer.imageHeight;
            contentContainer.addChild(bitmap);
        };
    };

    p.setContentScale=function(param){
        this.scaleNum=this.contentContainer.scale=param;
        this.data.parms.scale=this.scaleNum;
    };

    p.setScaleFromData=function(param){
        if(!param){
            param=1;
        }
        this.scaleNum=this.contentContainer.scale=param;
    };

    p.setContentRotation=function(param){
        if(!param){
            param=0;
        }
        param = param % 360;
        this.rotateNum = param;
        this.data.parms.rotation = this.contentContainer.rotation = this.rotateNum;
        alert(this.rotateNum);
    };

    p.select=function(){
        this.EditObject_select();
        //if(this.bitmap){
        //    this.bitmap.addClass("shadow");
        //}
    };

    p.unselect=function(){
        this.EditObject_unselect();
        //if(this.bitmap){
        //    this.bitmap.removeClass("shadow");
        //}
    };

    diyeditor.EditObjectWithImage=diyeditor.promote(EditObjectWithImage,"EditObject");
}());
