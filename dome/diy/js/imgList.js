this.ce=this.ce||{};
$(function(){
    //如果是触屏设备，改变缩略图高度，以适应没有滚动条
    if(document.hasOwnProperty("ontouchstart")) {
        $(".imgContainer").height(81);
    }
    var isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    var isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1; //android终端
    if(isiOS||isAndroid){
        $(".imgContainer").height(81);
    }
    var diyData=new diyeditor.DiyData();
    var pageDataData=new ce.PageData();
    ce.initImgList=function(){
        var container=$(".imgList ul");
        container.empty();
        for(var pi in diyData.allPageData){
            var pageData=diyData.allPageData[pi];
            var li=$(document.createElement("li")).data("index",pi);
            var div=$(document.createElement("div")).addClass("imgListItem");
            var img=$(document.createElement("img"));
            var span=$(document.createElement("span"));
            img.attr("src",diyData.getImagePath()+"preview/"+pageData.preview);
            span.text(pageData.name);
            div.append(img).append(span);
            li.append(div);
            container.append(li);
        }
        container.on("click","li",function(){
            var index=parseInt($(this).data("index"));
            ce.setPageIndex(index);
        });
        ce.setImgListSelected(0);
    };

    ce.updateImgList=function(index){
        if(index===undefined){
            index=diyData.currentPageIndex;
        }
        var data=diyData.allPageData[index];
        $.ajax({
            type:"POST",
            dataType:"json",
            url:"../svr/uw?m=getPagePrv&uid="+pageDataData.uid+"&uwid="+pageDataData.uwid+"&pageindex="+index+"&pcid="+pageDataData.pcid,
            data:JSON.stringify(data)
        }).then(function(data){
            if(parseInt(data.r)===1){
                var backIndex=parseInt(data.data.pageindex);
                var items=$(".imgList li");
                if(backIndex>=0&&backIndex<items.length){
                    $(items[backIndex]).find("img").attr("src","../"+data.data.sprv);
                }
            }
        },function(){

        });
    };

    ce.setImgListSelected=function(index){
        var container=$(".imgList ul");
        if(index<0){
            index=0;
        }
        if(index>diyData.allPageData.length-1){
            index=diyData.allPageData.length-1;
        }
        var items=$(".imgList li");
        var totalWidth=0;
        for(var i=0;i<index;i++){
            totalWidth+=($(items[i]).width()+10);
        }
        var item=$(items[index]);
        item.addClass("itemActive").siblings().removeClass("itemActive");
        var scrollNum=totalWidth-container.width()/2+(item.width()+10)/2;
        container.animate({scrollLeft:scrollNum},500);
        //container.scrollLeft(scrollNum);
    };
});