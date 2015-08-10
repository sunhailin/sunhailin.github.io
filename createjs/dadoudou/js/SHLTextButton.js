(function(window){
    function SHLTextButton(text,bwidth,bheight,textColor,fontsize,upColor,downColor)
    {
        this.Container_constructor();
        this.buttonText=text;
        this.bwidth=bwidth;
        this.bheight=bheight;
        this.textColor=textColor;
        this.fontsize=fontsize;
        this.upColor=upColor;
        this.downColor=downColor;
        this.labelText;
        this.bg;
        this.drawButtton();
        this.setListener();
    }
    var p=createjs.extend(SHLTextButton,createjs.Container);

    p.drawButtton=function()
    {
        this.removeAllChildren();
        this.labelText=new createjs.Text(this.buttonText,this.fontsize+"px Microsoft YaHei",this.textColor);
        this.labelText.textAlign="center";
        this.labelText.textBaseline="middle";
        this.labelText.x=this.bwidth/2;
        this.labelText.y=this.bheight/2;

        this.bg=new createjs.Shape();
        this.drawBG(this.upColor);
        this.addChild(this.bg);
        this.addChild(this.labelText);
    };

    p.setListener=function()
    {
        this.on("mousedown",function(e) {
            this.drawBG(this.downColor);
        },this);
        this.on("pressup",function(e){
            this.drawBG(this.upColor);
        },this);
    };

    p.drawBG=function(bgColor)
    {
        this.bg.graphics.clear();
        this.bg.graphics.beginFill(bgColor);
        this.bg.graphics.drawRoundRect(0,0,this.bwidth,this.bheight,4,4);
        this.bg.graphics.endFill();
        this.bg.cache(0,0,this.bwidth,this.bheight);
    };

    window.SHLTextButton=createjs.promote(SHLTextButton,"Container");
}(window));