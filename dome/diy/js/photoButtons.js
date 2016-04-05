this.ce=this.ce||{};
$(function(){
    var photoBtnContainer=$("#photoBtnContainer");
    var diyData=new diyeditor.DiyData();
    var pageData=new ce.PageData();
    ce.initPhotoButtons=function(){
        $("#editPhotoBtn").on("click",function(){
            var selectObject = ce.frame.currentView.getSelectObject();
            if (selectObject instanceof diyeditor.ImageObject) {
                pageData.singlePhotoData=selectObject.data;
                ce.showSingleEdit();
                photoBtnContainer.hide();
            }
        });
        $("#uploadBtn").on("click",function(){
            var selectObject = ce.frame.currentView.getSelectObject();
            if (selectObject instanceof diyeditor.ImageObject) {
                selectObject.startUploadPhoto();
                diyData.isDataChanged=true;
            }
        });
        $("#deleteBtn").on("click",function(){
            if (ce.frame.currentView) {
                ce.frame.currentView.deleteSelect();
                photoBtnContainer.hide();
                ce.updateImgList();
                diyData.isDataChanged=true;
            }
        });
        $(window).resize(function(){
            photoBtnContainer.hide();
        });
    };

    ce.onSelectChanged=function(){
        var selectObject = ce.frame.currentView.getSelectObject();
        if (selectObject instanceof diyeditor.ImageObject&&!selectObject.isEmpty) {
            var ow=selectObject.width*diyData.scale*diyData.viewScale;
            var oh=selectObject.height*diyData.scale*diyData.viewScale;
            var pw=photoBtnContainer.width();
            var ph=photoBtnContainer.height();
            var topNum=$(selectObject.divObject).offset().top+oh-ph;
            var leftNum=$(selectObject.divObject).offset().left+(ow-pw)/2;
            photoBtnContainer.css("top",topNum+"px");
            photoBtnContainer.css("left",leftNum+"px");
            photoBtnContainer.show();
        }else{
            photoBtnContainer.hide();
        }
    };
});