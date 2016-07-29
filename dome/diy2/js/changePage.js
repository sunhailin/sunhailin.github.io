this.ce = this.ce || {};
$(function () {
    var diyData=new diyeditor.DiyData();
    ce.initPageChange = function () {
        var target = document.getElementsByClassName("mainContainer");
        touch.on(target, 'touchstart', function (ev) {
            ev.preventDefault();
        });

        touch.on(target, 'swiperight', function (ev) {
            if (!diyData.isMovingObject) {
                if (diyData.currentPageIndex <= 0) {
                    return;
                }
                else {
                    ce.frame.prePage();
                }
            }
        });

        touch.on(target, 'swipeleft', function (ev) {
            if (!diyData.isMovingObject) {
                if (diyData.currentPageIndex >= diyData.allPageData.length - 1) {
                    return;
                }
                else {
                    var oldPage = diyData.currentPageIndex;
                    ce.frame.nextPage();
                }
            }
        });

        ce.frame.on("pageChanged", function () {
            pageChange();
        });
        ce.setPageIndex = function (p) {
            if (p >= 0 && p < diyData.allPageData.length && p != diyData.currentPageIndex) {
                ce.frame.setPageIndex(p);
            }
        };
    };

    function pageChange() {
        //每次翻页保存数据
        if (diyData.isPreview) {
            return;
        }
        ce.setImgListSelected(diyData.currentPageIndex);
        ce.updateDom();
        if(diyData.isDataChanged){
            ce.autoSave();
        }
        diyData.isDataChanged=false;
    }

    //每次翻页更新dom中相关的内容
    ce.updateDom = function () {
        //每次翻页隐藏功能按钮
        $("#photoBtnContainer").hide();
    };
});