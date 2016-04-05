this.diyeditor=this.diyeditor||{};
(function(){
    function DiyData()
    {

        //const
        this.BLUR_WIDTH = 213;
        this.BLUR_HEIGHT = 53;

        this.stage=null;            //主舞台
        this.scale=1;            //缩放比例
        this.viewScale=1;        //view的缩放比例
        this.frameData=null;         //外框架的数据
        this.frameImgPath="";      //获取外框架图片的地址
        this.addData=null;           //所有的json数据
        this.allPageData=null;       //所有页的数据
        this.currentPageData=null; //当前页的所有数据
        this.currentPageIndex=0;
        this.pageWidth=0;        //页面原始宽度
        this.pageHeight=0;       //页面原始高度
        this.frameWidth=0;        //外框架的宽高
        this.frameHeight=0;
        this.isPreview=false;         //是否是预览
        this.isSharePreview=false;     //是否是分享后预览
        this.isDataChanged=false;
        this.isImageWhiteBG=false;


        this.isMovingObject=false;
        this.undoList=[];

        if(!DiyData.single_instance)
        {
            DiyData.single_instance=this;
        }

        return DiyData.single_instance;
    }

    DiyData.prototype.getImagePath=function(){
        var imagePath="data/";
        //上线时需要注释-----------------------------------------
        //imagePath="";
        return imagePath;
    };


    DiyData.prototype.cloneObject=function(target)
    {
        var buf;
        if (target instanceof Array) {
            buf = [];  //创建一个空的数组
            var i = target.length;
            while (i--) {
                buf[i] = DiyData.prototype.cloneObject(target[i]);
            }
            return buf;
        }else if (target instanceof Object){
            buf = {};  //创建一个空对象
            for (var k in target) {  //为这个对象添加新的属性
                buf[k] = DiyData.prototype.cloneObject(target[k]);
            }
            return buf;
        }else{
            return target;
        }
    };

    DiyData.prototype.getUndoData=function(){
        if(this.undoList.length===0){
            return null;
        }
        var data=DiyData.prototype.cloneObject(this.undoList[this.undoList.length-1]);
        this.undoList.length=this.undoList.length-1;
        return data;
    };

    DiyData.prototype.pushUndoData=function(data){
        this.undoList.push(data);
        if(this.undoList.length>20){
            this.undoList.shift();
        }
    };

    DiyData.prototype.clearUndo=function(){
        this.undoList.length=0;
    };

    diyeditor.DiyData=DiyData;
}());