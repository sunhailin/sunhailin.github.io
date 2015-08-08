(function(window)
{
    function IntroductionScene()
    {
        this.Container_constructor();

        this.gd=new GlobalData();

        this.introductionText=new createjs.Text("", "30px Microsoft Yahei", "#000000");
        this.introductionText.text="点击空白方格\n在方格所在的十字上\n相同颜色的豆豆即可消除\n并得到分数";
        this.introductionText.x=260;
        this.introductionText.y=130;
        this.addChild(this.introductionText);

        this.backButton=new SHLTextButton("返回",60,30,"#ffffff",14,"#00cfef","#0093d9");
        this.backButton.x=(this.gd.canvas.width-60)/2;
        this.backButton.y=(this.gd.canvas.height-30)/2+80;
        this.backButton.on("click",this.onBack,this);
        this.addChild(this.backButton);
    }

    var p=createjs.extend(IntroductionScene,createjs.Container);

    p.onBack=function(e)
    {
        this.dispatchEvent(new createjs.Event("backbutton"));
    };

    window.IntroductionScene=createjs.promote(IntroductionScene,"Container");
}(window));