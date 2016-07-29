this.ce = this.ce || {};
(function () {
    var diyData = new diyeditor.DiyData();
    var previewBox = $(".preview-box");
    var editPageIndex;
    var stage;
    var frame;
    ce.initPreviewInPage = function () {
        $("#previewBtn").on("click",function () {
            previewBox.show();
            diyData.isPreview = true;
            $("body").scrollTop(0);
            $("body").css("overflow", "hidden");
            editPageIndex = diyData.currentPageIndex;
            //diyData.currentPageIndex=0;
            initPreviewStage();
        });

        $("#previewBackToMain").on("click",function () {
            previewBox.hide();
            diyData.isPreview = false;
            $("body").css("overflow", "");
            diyData.currentPageIndex = editPageIndex;
            destroyPreviewStage();
            return false;
        });
        $("#previewBuy").on("click",function(){
            previewBox.hide();
            diyData.isPreview = false;
            $("body").css("overflow", "");
            diyData.currentPageIndex = editPageIndex;
            destroyPreviewStage();
            return false;
        });
    };

    function initPreviewStage() {
        var stageWidth;
        var stageHeight;
        if (diyData.frameData) {
            stageHeight = diyData.frameHeight;
            stageWidth = diyData.frameWidth;
        } else {
            stageHeight = diyData.pageHeight;
            stageWidth = diyData.pageWidth;
        }
        diyData.currentPageData=diyData.allPageData[diyData.currentPageIndex];
        stage = new diyeditor.Stage(document.getElementById("previewStage"), stageWidth, stageHeight);
        frame = new diyeditor.FrameContainer(diyData.frameData);
        stage.addChild(frame);
        var editView = new diyeditor.EditView();
        editView.addEditObjects();
        var editView1 = new diyeditor.EditView();
        frame.addEditView(editView, editView1);
        manageScreenSize();


    }

    var target = document.getElementsByClassName("previewMain");
    touch.on(target, 'touchstart', function (ev) {
        ev.preventDefault();
    });

    touch.on(target, 'swiperight', function (ev) {
        if (!diyData.isMovingObject) {
            if (diyData.currentPageIndex <= 0) {
                return;
            }
            else {
                if(frame){
                    frame.prePage();
                }
            }
        }
    });

    touch.on(target, 'swipeleft', function (ev) {
        if (!diyData.isMovingObject) {
            if (diyData.currentPageIndex >= diyData.allPageData.length - 1) {
                return;
            }
            else {
                if(frame){
                    frame.nextPage();
                }
            }
        }
    });
    function destroyPreviewStage() {
        $("#previewStage").empty();
    }

    function manageScreenSize() {
        $(window).resize(onResize);
        onResize();
    }

    function onResize() {
        if (!diyData.isPreview) {
            return;
        }
        var Wwidth = $("#previewDiyContainer").width();
        //按照宽度来缩放
        if (diyData.frameData) {
            diyData.scale = Wwidth / diyData.frameWidth;
        } else {
            diyData.scale = Wwidth / diyData.pageWidth;
        }
        $("#previewStage").css("transform", "scale(" + diyData.scale + ") translate3d(0, 0, 0)");
        $("#previewDiyContainer").height($("#previewStage").height() * diyData.scale);
        //$("#containerWithArrow").height($("#diyEditor").height() * diyData.scale);
    }
})();