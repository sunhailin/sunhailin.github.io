(function(window){
    function BgObject(data)
    {
        this.EditObject_constructor(data);
        this.color;
    }

    var p=createjs.extend(BgObject,EditObject);

    p.setBGImage=function(url)
    {
        var bitmap = new createjs.Bitmap(url);
        this.contentContainer.addChild(bitmap);
    };

    p.setBGColor=function(col)
    {
        this.color=col;
        var globalData=new GlobalData();
        var shape=new createjs.Shape();
        shape.graphics.beginFill(col);
        shape.graphics.drawRect(0,0,globalData.canvasWidth,globalData.canvasHeight);
        shape.graphics.endFill();
        this.contentContainer.addChild(shape);
    };

    p.getBGColor=function()
    {
        return this.color;
    };

    window.BgObject=createjs.promote(BgObject,"EditObject");
}(window));