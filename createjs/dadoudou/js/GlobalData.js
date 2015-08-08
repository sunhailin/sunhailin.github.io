(function(window){
    function GlobalData()
    {
        this.stage;
        this.canvas;
        this.scroe;
        this.resource;
        this.isSoundOn=true;
        if(GlobalData._instance==null)
        {
            GlobalData._instance=this;
        }
        return GlobalData._instance;
    }


    window.GlobalData=GlobalData;
}(window));
