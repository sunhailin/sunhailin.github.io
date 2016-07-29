this.ce=this.ce||{};
$(function(){
    var diyData=new diyeditor.DiyData();
    ce.initStage=function(){

        var stageWidth;
        var stageHeight;
        if(diyData.frameData){
            stageHeight = diyData.frameHeight;
            stageWidth = diyData.frameWidth;
        }else{
            stageHeight = diyData.pageHeight;
            stageWidth = diyData.pageWidth;
        }

        ce.stage=new diyeditor.Stage(document.getElementById("editStage"),stageWidth,stageHeight);
        ce.frame=new diyeditor.FrameContainer(diyData.frameData);
        ce.stage.addChild(ce.frame);
        ce.editView=new diyeditor.EditView();
        ce.editView.addEditObjects();
        ce.editView1 = new diyeditor.EditView();

        if(!diyData.isPreview){
            ce.editView.on("select", ce.onSelectChanged);
            ce.editView1.on("select", ce.onSelectChanged);
            //用于更新缩略图
            ce.editView.on("uploadComplete",onUploadComplete);
            ce.editView1.on("uploadComplete",onUploadComplete);
            ce.editView.on("viewChanged",onViewChanged);
            ce.editView1.on("viewChanged",onViewChanged);
        }

        ce.frame.addEditView(ce.editView,ce.editView1);
        manageScreenSize();
    };

    function onUploadComplete(){
        ce.updateImgList();
    }

    function onViewChanged(){
        ce.updateImgList();
    }

    function manageScreenSize(){
        $(window).resize(onResize);
        onResize();
    }

    function onResize(){
        var Wwidth = $("#editDiyContainer").width();
        //按照宽度来缩放
        if(diyData.frameData){
            diyData.scale = Wwidth / diyData.frameWidth;
        }else{
            diyData.scale = Wwidth / diyData.pageWidth;
        }
        $("#editStage").css("transform", "scale(" + diyData.scale + ")");
        $("#editDiyContainer").height($("#editStage").height() * diyData.scale);
    }
});