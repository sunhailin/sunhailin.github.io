this.diyeditor=this.diyeditor||{};
(function(){
    function EditView(){
        this.Container_constructor();
        var DiyData=new diyeditor.DiyData();
        this.divObject.setAttribute("name","editView");
        this.width=DiyData.pageWidth;
        this.height=DiyData.pageHeight;

        this.selectGroup=null;
        this.mouseDownObject=null;

        this.initSelectGroup();
        if(DiyData.isPreview||DiyData.isSharePreview){

        }else{
            this.addListener();
        }
    }

    var p=diyeditor.extend(EditView,diyeditor.Container);

    p.initSelectGroup=function(){
        var DiyData=new diyeditor.DiyData();
        if(!DiyData.isPreview){
            this.selectGroup = new diyeditor.SelectGroup(this);
            this.selectGroup.on("select", function (e) {
                var event = new diyeditor.Event("select");
                this.dispatchEvent(event);
            }, this);
        }
    };

    p.addListener=function(){
        var thisPointer=this;
        var DiyData=new diyeditor.DiyData();
        var isTouch=false;
        if(document.hasOwnProperty("ontouchstart")){
            isTouch=true;
        }
        //判断设备是否是ios
        var isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        var isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1; //android终端
        if(isiOS||isAndroid){
            isTouch=true;
        }
        if(isTouch) {
            touch.on(this.divObject,"touchstart",function(e){
                e.preventDefault();
                var obj=thisPointer._getObjectUnderPoint((e.changedTouches[0].pageX-$(thisPointer.divObject).offset().left)/DiyData.viewScale/DiyData.scale, (e.changedTouches[0].pageY-$(thisPointer.divObject).offset().top)/DiyData.viewScale/DiyData.scale);
                if(!obj){
                    return;
                }
                if(obj.selectable){
                    thisPointer.mouseDownObject=obj;
                    obj.handleMouseDown((e.changedTouches[0].pageX-$(thisPointer.divObject).offset().left)/DiyData.viewScale/DiyData.scale, (e.changedTouches[0].pageY-$(thisPointer.divObject).offset().top)/DiyData.viewScale/DiyData.scale);
                }
            });

            touch.on(this.divObject,"touchend",function(e){
                if(thisPointer.mouseDownObject!==null){
                    thisPointer.mouseDownObject.handleMouseUp((e.changedTouches[0].pageX-$(thisPointer.divObject).offset().left)/DiyData.viewScale/DiyData.scale, (e.changedTouches[0].pageY-$(thisPointer.divObject).offset().top)/DiyData.viewScale/DiyData.scale);
                }
                thisPointer.mouseDownObject=null;
            });

        }else{
            var isMouseDown=false;
            this.divObject.onmousedown=function(e){
                e.preventDefault();
                isMouseDown=true;
                var obj=thisPointer._getObjectUnderPoint((e.pageX-$(thisPointer.divObject).offset().left)/DiyData.viewScale/DiyData.scale, (e.pageY-$(thisPointer.divObject).offset().top)/DiyData.viewScale/DiyData.scale);
                if(!obj){
                    return;
                }
                thisPointer.mouseDownObject=obj;
                if(obj.selectable){
                    thisPointer.mouseDownObject.handleMouseDown((e.pageX-$(thisPointer.divObject).offset().left)/DiyData.viewScale/DiyData.scale, (e.pageY-$(thisPointer.divObject).offset().top)/DiyData.viewScale/DiyData.scale);
                    thisPointer.mouseDownObject.handleDragStart((e.pageX-$(thisPointer.divObject).offset().left)/DiyData.viewScale/DiyData.scale, (e.pageY-$(thisPointer.divObject).offset().top)/DiyData.viewScale/DiyData.scale);
                }
            };
            this.divObject.onmouseup=function(e){
                isMouseDown=false;
                if(thisPointer.mouseDownObject!==null){
                    thisPointer.mouseDownObject.handleMouseUp((e.pageX-$(thisPointer.divObject).offset().left)/DiyData.viewScale/DiyData.scale, (e.pageY-$(thisPointer.divObject).offset().top)/DiyData.viewScale/DiyData.scale);
                }
                thisPointer.mouseDownObject=null;
            };

            this.divObject.onmouseout=function(e){
                isMouseDown=false;
                if(thisPointer.mouseDownObject!==null){
                    thisPointer.mouseDownObject.handleMouseUp((e.pageX-$(thisPointer.divObject).offset().left)/DiyData.viewScale/DiyData.scale, (e.pageY-$(thisPointer.divObject).offset().top)/DiyData.viewScale/DiyData.scale);
                }
                thisPointer.mouseDownObject=null;
            };
        }
    };

    p._dispatchChangeEvent=function(){
        var ent=new diyeditor.Event("viewChanged");
        this.dispatchEvent(ent);
    };

    p._getObjectsUnderPoint=function(px,py){
        var arr=[];
        var i=this.numChildren-1;
        for(i;i>=0;i--){
            var child=this.getChildAt(i);
            var cx=child.x;
            var cy=child.y;
            var cw=child.width;
            var ch=child.height;
            if(px>cx&&px<cx+cw&&py>cy&&py<cy+ch){
                arr.push(child);
            }
        }
        return arr;
    };

    p._getObjectUnderPoint=function(px,py){
        var c;
        var i=this.numChildren-1;
        for(i;i>=0;i--){
            var child=this.getChildAt(i);
            var cx=child.x;
            var cy=child.y;
            var cw=child.width;
            var ch=child.height;
            if(px>cx&&px<cx+cw&&py>cy&&py<cy+ch){
                if(child.selectable){
                    c=child;
                    break;
                }
                else{
                    continue;
                }
            }
        }
        return c;
    };

    p.addEditObjects=function(pdata){
        var DiyData=new diyeditor.DiyData();
        var datas=DiyData.currentPageData.displaylist;
        if(pdata){
            datas=pdata;
        }else{
            datas=DiyData.currentPageData.displaylist;
        }

        var i;
        var l=datas.length;
        for(i=0;i<l;i++){
            var data=datas[i];
            var editObject=diyeditor.EditObjectFactory.createEditObject(data);
            if(editObject){
                this.addChild(editObject);
            }
            if(editObject instanceof diyeditor.ImageObject){
                editObject.on("uploadComplete",dispatchUploadComplete,this);
            }
        }
        function dispatchUploadComplete(){
            var event = new diyeditor.Event("uploadComplete");
            this.dispatchEvent(event);
        }
        if(this.selectGroup){
            this.selectGroup.update();
        }
    };

    p.clear=function(){
        var i;
        var l=this.numChildren;
        for(i=0;i<l;i++){
            var child=this.getChildAt(i);
            child.removeAllEventListeners();
        }
        while(this.numChildren){
            this.removeAllChildren();
        }
    };

    p.refresh=function(){
        this.clear();
        this.addEditObjects();
    };

    p.getSelectObject=function()
    {
        if(this.selectGroup){
            return this.selectGroup.getSelect();
        }else{
            return null;
        }

    };

    p.deleteSelect = function () {
        var selectObject = this.getSelectObject();
        if (selectObject instanceof diyeditor.DecorationObject) {
            var DiyData = new diyeditor.DiyData();
            var data = selectObject.data;
            var index = DiyData.currentPageData.displaylist.indexOf(data);
            DiyData.currentPageData.displaylist.splice(index, 1);
            this.removeChild(selectObject);
        }
        if(selectObject instanceof  diyeditor.ImageObject){
            selectObject.deleteImage();
        }
    };

    p.insertDate = function (date) {
        var dateObject;
        var i;
        for (i = 0; i < this.numChildren; i++) {
            var tempChild = this.getChildAt(i);
            if (tempChild instanceof diyeditor.DateObject) {
                dateObject = tempChild;
                break;
            }
        }
        if (dateObject) {
            dateObject.addTags(date);
        }
    };

    p.deleteDate = function () {
        var dateObject;
        var i;
        for (i = 0; i < this.numChildren; i++) {
            var tempChild = this.getChildAt(i);
            if (tempChild instanceof diyeditor.DateObject) {
                dateObject = tempChild;
                break;
            }
        }
        if (dateObject) {
            dateObject.clearTag();
        }
    };

    diyeditor.EditView=diyeditor.promote(EditView,"Container");
}());