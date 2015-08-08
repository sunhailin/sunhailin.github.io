(function(window)
{
    function SettingScene()
    {
        this.Container_constructor();

        this.gd=new GlobalData();
        this.button=new SHLTextButton("音效",160,50,"#ffffff",34,"#00cfef","#0093d9");
        this.button.x=(this.gd.canvas.width-160)/2-100;
        this.button.y=this.gd.canvas.height/2-100;
        this.button.on("click",this.onClick,this);
        this.addChild(this.button);

        this.switchLabel=new createjs.Text("开", "34px Microsoft Yahei", "#000000");
        this.switchLabel.x=(this.gd.canvas.width)/2+50;
        this.switchLabel.y=(this.gd.canvas.height)/2-100;
        this.addChild(this.switchLabel);

        this.backButton=new SHLTextButton("返回",60,30,"#ffffff",14,"#00cfef","#0093d9");
        this.backButton.x=(this.gd.canvas.width-60)/2;
        this.backButton.y=(this.gd.canvas.height-30)/2+40;
        this.backButton.on("click",this.onBack,this);
        this.addChild(this.backButton);
    }

    var p=createjs.extend(SettingScene,createjs.Container);

    p.onClick=function(e)
    {
        if(this.gd.isSoundOn)
        {
            this.gd.isSoundOn=false;
            this.switchLabel.text="关";
        }
        else
        {
            this.gd.isSoundOn=true;
            this.switchLabel.text="开";
        }
    };

    p.onBack=function(e)
    {
        this.dispatchEvent(new createjs.Event("backbutton"));
    };

    window.SettingScene=createjs.promote(SettingScene,"Container");
}(window));