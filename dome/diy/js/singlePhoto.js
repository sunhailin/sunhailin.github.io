this.ce=this.ce||{};
$(function(){
    var diyData=new diyeditor.DiyData();
    var pageData=new ce.PageData();
    var photoData;
    var singleEditBox=$(".photo-edit-box");
    var singleEditMain=$(".photo-edit-main");
    var singleEditStage=$("#photoEditStage");
    var bottomBox=$(".bottom-btn-box");
    var editStage;
    var containerScale=1;
    var container;
    var photo;
    var bgphoto;

    ce.initSingleEdit= function () {
        //如果是照片打印，显示留白按钮
        if(parseInt(pageData.tpid)===-1){
            $("#changeBottom").parent().hide();
            $("#noBleedingBottom").parent().show();
        }
    };

    ce.showSingleEdit=function(){
        if(!pageData.singlePhotoData){
            return;
        }
        singleEditBox.show();
        $("body").scrollTop(0);
        $("body").css("overflow","hidden");
        photoData=pageData.singlePhotoData;

        updatePhotoNum();
        updateEditStage();
        resizeSingleEdit();
        addListener();
    };

    $("#rotateBottom").on("click",function(){
        pushUndo();
        if(photo){
            photo.rotateRight90();
        }
        if(bgphoto){
            bgphoto.rotateRight90();
        }
        ce.updateImgList();
        diyData.isDataChanged=true;
    });
    $("#changeBottom").on("click",function(){
        if(photo){
            photo.startUploadPhoto();
            pushUndo();
        }
    });
    $("#noBleedingBottom").on("click",function(){
        pushUndo();
        if(photo){
            photo.setContentRotation(0);
            photo.noBleeding();
        }
        if(bgphoto){
            bgphoto.setContentRotation(0);
            bgphoto.noBleeding();
        }
        ce.updateImgList();
        diyData.isDataChanged=true;
    });
    $("#undoBottom").on("click",function(){
        var data=diyData.getUndoData();
        if(data){
            undoCopyValue(photoData,data);
            updateEditStage();
            resizeSingleEdit();
            ce.updateImgList();
            diyData.isDataChanged=true;
        }
    });
    $("#leftBottom").on("click",function(){
        diyData.clearUndo();
        var data=findPre();
        if(data){
            photoData=data;
            photoChanged();
            updateEditStage();
            resizeSingleEdit();
            updatePhotoNum();
        }else{
            alert("已是第一张");
        }
    });
    $("#rightBottom").on("click",function(){
        diyData.clearUndo();
        var data=findNext();
        if(data){
            photoData=data;
            photoChanged();
            updateEditStage();
            resizeSingleEdit();
            updatePhotoNum();
        }else{
            alert("已是最后一张");
        }
    });

    $("#backToMain").on("click",function(){
        singleEditBox.hide();
        $("body").css("overflow","");
        ce.frame.setPageIndex(diyData.currentPageIndex);
        return false;
    });
    $("#singleSave").on("click",function(){
        singleEditBox.hide();
        $("body").css("overflow","");
        ce.frame.setPageIndex(diyData.currentPageIndex);
        return false;
    });

    //照片翻页，用于自动保存
    function photoChanged(){
        if(diyData.isDataChanged){
            ce.autoSave();
        }
        diyData.isDataChanged=false;
    }

    //侦听只添加一次
    var hasListener=false;
    function addListener(){
        if(!editStage){
            return;
        }
        if(hasListener){
            return;
        }
        hasListener=true;
        var isTouch=false;
        if(document.hasOwnProperty("ontouchstart")){
            isTouch=true;
        }
        //判断设备是否是ios
        var isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(isiOS){
            isTouch=true;
        }
        if(isTouch){
            var startRotation;
            var startScale;
            touch.on(editStage.divObject,"touchstart",function(e){
                startRotation=photo.rotateNum;
                startScale=photo.scaleNum;
                e.preventDefault();
                photo.handleMouseDown((e.changedTouches[0].pageX-$(photo.divObject).offset().left)/containerScale, (e.changedTouches[0].pageY-$(photo.divObject).offset().top)/containerScale);
                bgphoto.handleMouseDown((e.changedTouches[0].pageX-$(bgphoto.divObject).offset().left)/containerScale, (e.changedTouches[0].pageY-$(bgphoto.divObject).offset().top)/containerScale);
                pushUndo();
            });
            touch.on(editStage.divObject,"touchend",function(e){
                photo.handleMouseUp((e.changedTouches[0].pageX-$(photo.divObject).offset().left)/containerScale, (e.changedTouches[0].pageY-$(photo.divObject).offset().top)/containerScale);
                bgphoto.handleMouseUp((e.changedTouches[0].pageX-$(bgphoto.divObject).offset().left)/containerScale, (e.changedTouches[0].pageY-$(bgphoto.divObject).offset().top)/containerScale);
                ce.updateImgList();
            });
            touch.on(editStage.divObject,"dragstart",function(e){
                photo.handleDragStart(e.x/containerScale, e.y/containerScale);
                bgphoto.handleDragStart(e.x/containerScale, e.y/containerScale);
            });
            touch.on(editStage.divObject,"drag",function(e){
                photo.handlePressMove(e.x/containerScale, e.y/containerScale);
                bgphoto.handlePressMove(e.x/containerScale, e.y/containerScale);
                diyData.isDataChanged=true;
            });
            touch.on(editStage.divObject,"rotate",function(e){
                photo.setContentRotation(startRotation+e.rotation);
                bgphoto.setContentRotation(startRotation+e.rotation);
                diyData.isDataChanged=true;
            });
            touch.on(editStage.divObject,"pinch",function(e){
                 photo.setContentScale(startScale* e.scale);
                 bgphoto.setContentScale(startScale* e.scale);
                diyData.isDataChanged=true;
                alert("pinch");
            });
        }else{
            var isMouseDown=false;
            editStage.divObject.onmousedown=function(e){
                e.preventDefault();
                isMouseDown=true;
                photo.handleMouseDown((e.pageX-$(photo.divObject).offset().left)/containerScale, (e.pageY-$(photo.divObject).offset().top)/containerScale);
                photo.handleDragStart((e.pageX-$(photo.divObject).offset().left)/containerScale, (e.pageY-$(photo.divObject).offset().top)/containerScale);
                bgphoto.handleMouseDown((e.pageX-$(bgphoto.divObject).offset().left)/containerScale, (e.pageY-$(bgphoto.divObject).offset().top)/containerScale);
                bgphoto.handleDragStart((e.pageX-$(bgphoto.divObject).offset().left)/containerScale, (e.pageY-$(bgphoto.divObject).offset().top)/containerScale);
                pushUndo();
            };
            editStage.divObject.onmouseup=function (e) {
                isMouseDown=false;
                photo.handleMouseUp((e.pageX-$(photo.divObject).offset().left)/containerScale, (e.pageY-$(photo.divObject).offset().top)/containerScale);
                bgphoto.handleMouseUp((e.pageX-$(bgphoto.divObject).offset().left)/containerScale, (e.pageY-$(bgphoto.divObject).offset().top)/containerScale);
                ce.updateImgList();
            };
            editStage.divObject.onmouseout=function(e){
                isMouseDown=false;
                photo.handleMouseUp((e.pageX-$(photo.divObject).offset().left)/containerScale, (e.pageY-$(photo.divObject).offset().top)/containerScale);
                bgphoto.handleMouseUp((e.pageX-$(bgphoto.divObject).offset().left)/containerScale, (e.pageY-$(bgphoto.divObject).offset().top)/containerScale);
            };
            editStage.divObject.onmousemove=function(e){
                if(isMouseDown){
                    photo.handlePressMove((e.pageX-$(photo.divObject).offset().left)/containerScale, (e.pageY-$(photo.divObject).offset().top)/containerScale);
                    bgphoto.handlePressMove((e.pageX-$(bgphoto.divObject).offset().left)/containerScale, (e.pageY-$(bgphoto.divObject).offset().top)/containerScale);
                    diyData.isDataChanged=true;
                }
            };
        }
    }

    var uploadListener;
    function updateEditStage(){
        if(photo){
            photo.off("uploadComplete",uploadListener);
            photo.removeAllChildren();
        }
        if(bgphoto){
            bgphoto.removeAllChildren();
        }
        if(container){
            container.removeAllChildren();
        }
        if(editStage){
            editStage.removeAllChildren();
        }
        var stageWidth=singleEditMain.width();
        var stageHeight=singleEditMain.height();
        editStage=new diyeditor.Stage(singleEditStage[0],stageWidth,stageHeight);
        container=new diyeditor.Container();
        container.width=photoData.parms.maskwidth;
        container.height=photoData.parms.maskheight;
        editStage.addChild(container);
        var whitebg=new diyeditor.Shape();
        whitebg.width=photoData.parms.maskwidth;
        whitebg.height=photoData.parms.maskheight;
        whitebg.divObject.style.backgroundColor="#fff";
        container.addChild(whitebg);
        var bgdata=diyData.cloneObject(photoData);
        bgphoto=new diyeditor.ImageObject(bgdata);
        bgphoto.blackCover=true;
        bgphoto.setScaleFromData(bgdata.parms.scale);
        bgphoto.setContentRotation(bgdata.parms.rotation);
        bgphoto.setContentPos(bgdata.parms.x,bgdata.parms.y);
        bgphoto.setImageUrl(bgdata.parms.imageurl);
        container.addChild(bgphoto);
        photo=new diyeditor.ImageObject(photoData);
        uploadListener=photo.on("uploadComplete",function(){
            //设置hpotomd5来占位，不然不能显示图片
            bgphoto.data.parms.photomd5="not null";
            bgphoto.setImageUrl(photoData.parms.imageurl,true);
            diyData.isDataChanged=true;
            //更行缩略图
            ce.updateImgList(diyData.currentPageIndex);
        });
        photo.imageSetMask();
        photo.setScaleFromData(photoData.parms.scale);
        photo.setContentRotation(photoData.parms.rotation);
        photo.setContentPos(photoData.parms.x,photoData.parms.y);
        photo.setImageUrl(photoData.parms.imageurl);
        container.addChild(photo);
        var redborder=new diyeditor.Shape();
        redborder.width=photoData.parms.maskwidth;
        redborder.height=photoData.parms.maskheight;
        redborder.divObject.style.border="solid 1px red";
        container.addChild(redborder);
    }

    $(window).resize(resizeSingleEdit);

    function resizeSingleEdit(){
        if(!photoData){
            return;
        }
        if(singleEditBox.is(":hidden")){
            return;
        }
        var stageWidth=singleEditMain.width();
        var stageHeight=singleEditMain.height();
        editStage.width=stageWidth;
        editStage.height=stageHeight;
        var pwidth=photo.width;
        var pheight=photo.height;
        var cx;
        var cy;
        if(pwidth/pheight>stageWidth/stageHeight){
            containerScale=stageWidth/pwidth;
            cx=0;
            cy=(stageHeight-pheight*containerScale)/2;
        }else{
            containerScale=stageHeight/pheight;
            cy=0;
            cx=(stageWidth-pwidth*containerScale)/2;
        }
        container.x=cx;
        container.y=cy;
        container.scale=containerScale;
    }

    function pushUndo(){
        var data=diyData.cloneObject(photoData);
        diyData.pushUndoData(data);
    }

    function findNext(){
        var foundCurrent=false;
        var i;
        var j;
        var pl=diyData.allPageData.length;
        var dl;
        for(i=0;i<pl;i++){
            var pageData=diyData.allPageData[i];
            dl=pageData.displaylist.length;
            for(j=0;j<dl;j++){
                var objectData=pageData.displaylist[j];
                if(objectData==photoData){
                    foundCurrent=true;
                    continue;
                }
                if(foundCurrent){
                    if(objectData.type=="image"){
                        diyData.currentPageIndex=i;
                        return objectData;
                    }
                }
            }
        }
        return null;
    }

    function findPre(){
        var foundCurrent=false;
        var i;
        var j;
        var pl=diyData.allPageData.length;
        var dl;
        for(i=pl-1;i>=0;i--){
            var pageData=diyData.allPageData[i];
            dl=pageData.displaylist.length;
            for(j=dl-1;j>=0;j--){
                var objectData=pageData.displaylist[j];
                if(objectData==photoData){
                    foundCurrent=true;
                    continue;
                }
                if(foundCurrent){
                    if(objectData.type=="image"){
                        diyData.currentPageIndex=i;
                        return objectData;
                    }
                }
            }
        }
        return null;
    }

    function updatePhotoNum(){
        var totalCount=0;
        var indexCount=0;
        var i;
        var j;
        var pl=diyData.allPageData.length;
        var dl;
        for(i=0;i<pl;i++){
            var pageData=diyData.allPageData[i];
            dl=pageData.displaylist.length;
            for(j=0;j<dl;j++){
                var objectData=pageData.displaylist[j];
                if(objectData.type=="image"){
                    totalCount++;
                    if(photoData==objectData){
                        indexCount=totalCount;
                    }
                }
            }
        }
        $("#backToMain p").text("编辑("+indexCount+"/"+totalCount+")");
    }

    function undoCopyValue(obj1,obj2){
        for(var k in obj2){
            obj1[k]=obj2[k];
        }
    }
});