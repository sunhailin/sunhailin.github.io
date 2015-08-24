(function(window){
    function TextObject(data)
    {
        this.EditObject_constructor(data);
        this.textBG=new createjs.Shape();
        this.contentContainer.addChild(this.textBG);
        this.textString;
        this.textColor;
        this.textFontSize=10;
        this.text=new createjs.Text();
        this.text.font=this.textFontSize+"px Microsoft YaHei";
        this.text.lineHeight=this.textFontSize+5;
        this.contentContainer.addChild(this.text);
    }

    var p=createjs.extend(TextObject,EditObject);

    p.setText=function(str)
    {
        this.data.content=str;
        this.textString=str;
        this.text.text=str;
        this.drawBG();
    };

    p.getText=function()
    {
        return this.textString;
    };

    p.setFontSize=function(str)
    {
        this.textFontSize=str;
        this.text.lineHeight=this.textFontSize+5;
        this.text.font=str+"px Microsoft YaHei";
        this.drawBG();
    };

    p.getFontSize=function()
    {
        return this.textFontSize;
    };

    p.setColor=function(str)
    {
        this.textColor=str;
        this.text.color=str;
    };

    p.drawBG=function()
    {
        var bounds=this.text.getBounds().clone();
        this.textBG.graphics.clear();
        this.textBG.graphics.beginFill("#fff").drawRect(bounds.x,bounds.y,bounds.width,bounds.height).endFill();
        this.textBG.alpha=0.01;
        this.textBG.cache(bounds.x,bounds.y,bounds.width,bounds.height);
        bounds=null;
    };

    window.TextObject=createjs.promote(TextObject,"EditObject");
}(window));
