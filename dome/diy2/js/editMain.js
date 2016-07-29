this.ce = this.ce || {};
$(function () {
    var diyData = new diyeditor.DiyData();
    var pageData = new ce.PageData();
    pageData.name = "diy";
    pageData.uid = 123;
    pageData.uwid = 123;
    pageData.pcid = 123;
    pageData.path = "diy2/data/data.json";
    pageData.framePath = "diy2/frame/data.json";
    pageData.tpid = 123;
    pageData.t = 1;
    pageData.subscribe = 1;
    pageData.originuwid = 123;
    //upload init--------------------------------------------------
    WebUploader.Uploader.register({
        'before-send-file': 'preupload'
    }, {
        preupload: function (file) {
            var me = this,
                owner = this.owner,
                server = me.options.server,
                deferred = WebUploader.Deferred();
            var end;
            if (file.size > 500 * 1024) {
                end = 500 * 1024;
            } else {
                end = file.size;
            }
            owner.md5File(file, 0, end)
                .then(function (md5) {
                    me.options.formData.fileMd5 = md5;
                    me.options.formData.uId = pageData.uid;
                    deferred.resolve();
                    $.ajax(server, {
                        dataType: 'jsonp',
                        data: {
                            m: 'check',
                            md5: md5,
                            uid: pageData.uid
                        },
                        success: function (response) {
                            if (response) {
                                owner.skipFile(file);
                                owner.hasMd5(response);
                            }
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            owner.md5Error();
                        }
                    });
                });
            return deferred.promise();
        }
    });

    if (pageData.framePath) {
        $.ajax({
            type: "GET",
            url: "../" + pageData.framePath,
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data.pages.length === 0) {
                    return;
                }
                diyData.frameData = data;
                diyData.frameWidth = data.pages[0].width;
                diyData.frameHeight = data.pages[0].height;
                diyData.frameImgPath = "frame/";
                //上线时需要注释-----------------------------------------
                //diyData.frameImgPath="";
                loadPageData();
            },
            error: function () {
                loadPageData();
            }
        });
    } else {
        loadPageData();
    }

    function loadPageData() {

        $.ajax({
            type: "GET",
            url: "../" + pageData.path,
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data.pages.length === 0) {
                    return;
                }
                diyData.allData = data;
                diyData.allPageData = data.pages;
                diyData.currentPageIndex = 0;
                diyData.currentPageData = data.pages[diyData.currentPageIndex];
                diyData.pageWidth = diyData.currentPageData.width;
                diyData.pageHeight = diyData.currentPageData.height;

                pageDataLoaded();
            },
            error: function () {
                alert("获取数据失败，请重新加载页面！");
            }
        });

    }

    function pageDataLoaded() {
        ce.initStage();
        ce.initImgList();
        ce.initPageChange();
        ce.initPhotoButtons();
        ce.initSingleEdit();
        ce.initSaveAndBuy();
        ce.initPreviewInPage();
        //$("#uploading").modal();
    }

    //----------------
    $("body").keydown(function (e) {
        if (e.keyCode === 13) {
            console.log(diyData.allData);
            console.log(JSON.stringify(diyData.allData));
        }
    });
});