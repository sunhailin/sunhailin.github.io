this.ce=this.ce||{};
(function(){
    var diyData=new diyeditor.DiyData();
    var pageData=new ce.PageData();

    ce.initSaveAndBuy=function(){
        $("#saveBtn").on("click",saveBtnClicked);
        //$("#singleSave").on("click",saveBtnClicked);
        //$("#previewBuy").on("click",saveBtnClicked);
        $("#goToCart").on("click",function(){
            buy();
        });
    };

    function saveBtnClicked(){
        var ul=checkIsFinish();
        if(ul.length===0){
            if(parseInt(pageData.tpid)===-1){
                buy();
            }else{
                $("#saveModal").modal();
            }
        }else{
            alert("还有未上传的照片，请填满照片后保存");
        }
    }

    ce.autoSave=function(){
        ce.saveWork(function (data) {
            if (parseInt(data.r) === 0) {
            }
            else {
                pageData.uwid = data.r;
            }
        });
    };

    //购买-----------------------------
    function buy() {
        ce.saveWork(function (data) {
            if (parseInt(data.r) === 0) {
                alert("放入购物车失败，请重试！");
            }else{
                pageData.uwid = data.r;
                if(parseInt(pageData.tpid)===-1){
                    localStorage.photoJson=JSON.stringify(diyData.allData);
                    window.location.href="../picturePrint/setNumber.html?uid="+pageData.uid+"&pcid="+pageData.pcid+"&uwid="+pageData.uwid;
                }else{
                    localStorage.bookJson="";
                    window.location.href = "../user/cart?uid=" + pageData.uid + "&id=" + pageData.uwid;
                }
                //if(parseInt(pageData.originuwid)==0&&parseInt(pageData.t)!=4){
                //    window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb65ddc0f5b9f9038&redirect_uri=http%3a%2f%2fwx.corgii.com%2fwx%2fpagev&response_type=code&scope=snsapi_base&state=3#wechat_redirect";
                //}else{
                //    if(diyData.allData.isphotofull!=2){
                //        alert("照片还没有填完！");
                //    }else{
                //        window.location.href="PreviewCalendar.aspx?uwid="+pageData.uwid+"&uid="+pageData.uid+"&t="+pageData.t;
                //    }
                //}
            }
        }, function () {
            alert("放入购物车失败，请重试！");
        });
    }

    //保存作品--------------------------------------------------------------------------------------------------
    var isSaving = false;
    ce.saveWork = function (successCallBack, errorCallBack) {
        //保存前先检查是不是填好照片，为了设置isphotofull参数
        checkIsFinish();
        if (!isSaving&&diyData.allData.isphotofull) {
            isSaving = true;
            var pdata={};
            pdata.m="suw";
            pdata.uid=pageData.uid;
            pdata.uwid=pageData.uwid;
            pdata.tpid=pageData.tpid;
            pdata.pcid=pageData.pcid;
            if(pageData.mgrid){
                diyData.allData.mgrid=pageData.mgrid;
            }
            if(pageData.ordid){
                diyData.allData.ordid=pageData.ordid;
            }
            pdata.bookdata=JSON.stringify(diyData.allData);
            $.ajax({
                type: "POST",
                url: "../uploadsvr/uw",
                data: pdata,
                dataType: "json",
                success: function (data) {
                    isSaving = false;
                    if (successCallBack) {
                        successCallBack(data);
                    }
                },
                error: function () {
                    isSaving = false;
                    if (errorCallBack) {
                        errorCallBack();
                    }
                }
            });
        }
    };

    function checkIsFinish() {
        var unfinishList = [];
        var hasPhoto=false;
        var i, j;
        for (i = 0; i < diyData.allPageData.length; i++) {
            var page = diyData.allPageData[i];
            for (j = 0; j < page.displaylist.length; j++) {
                var displayObj = page.displaylist[j];
                if (displayObj.type == "image" && displayObj.parms.maskurl) {
                    if(!displayObj.parms.photomd5){
                        var obj={};
                        obj.name=page.name;
                        obj.index=i+1;
                        unfinishList.push(obj);
                        break;
                    }else{
                        hasPhoto=true;
                    }
                }
            }
        }
        if (unfinishList.length === 0) {
            diyData.allData.isphotofull = 2;
        }
        else {
            if(hasPhoto){
                diyData.allData.isphotofull = 1;
            }else{
                diyData.allData.isphotofull = 0;
            }
        }
        return unfinishList;
    }
})();