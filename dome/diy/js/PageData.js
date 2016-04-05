this.ce=this.ce||{};
(function(){
    function PageData(){
        this.singlePhotoData=undefined;  //单个照片编辑数据
        //页面参数
        this.name=undefined;           //默认作品名
        this.uid=undefined;            //用户id
        this.uwid=undefined;           //作品id
        this.originuwid=undefined;
        this.pcid=undefined;            //产品id
        this.path=undefined;          //模板json路径
        this.framePath=undefined;      //框架json
        this.tpid=undefined;          //模板id
        this.t=undefined;
        this.imgPath=undefined;       //加载图片的路径
        this.ordid=undefined;        //订单号
        this.subscribe=undefined;     //是否关注公众号
        this.mgrid=undefined;

        if(!PageData.single_instance){
            PageData.single_instance=this;
        }
        return PageData.single_instance;
    }
    ce.PageData=PageData;
}());