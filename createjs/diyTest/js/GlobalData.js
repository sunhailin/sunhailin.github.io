(function(window){
    function GlobalData()
    {
        this.stage;            //主舞台
        this.ratio;            //宽高比
        this.scale;            //缩放比例
        this.pageData;        //一页的所有数据
        this.pageWidth;        //页面原始宽度
        this.pageHeight;       //页面原始高度

        if(!GlobalData.single_instance)
        {
            GlobalData.single_instance=this;
        }

        return GlobalData.single_instance;
    }

    window.GlobalData=GlobalData;
}(window));