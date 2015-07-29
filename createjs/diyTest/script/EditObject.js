(function(window) {
    function EditObject() {
        this.Container_constructor();

        this.editable = true;
        this.isSelect=false;

        this.container=new createjs.Container();
        this.addChild(this.container);

        this.bg = new createjs.Shape();
        //this.container.addChild(this.bg);
        this.myShadow=new createjs.Shadow("#00ff00",1,1,10);

        this.imageContainer=new createjs.Container();
        this.container.addChild(this.imageContainer);

        this.oldX;
        this.oldY;
        this.addListener();
    }

    var p = createjs.extend(EditObject, createjs.Container);

    p.oldX;
    p.oldY;
    p.container;
    p.bg;
    p.img;

    p.addListener=function()
    {
        this.on("mousedown",function(e)
        {
            this.oldX= e.stageX;
            this.oldY= e.stageY;
            this.select();
        });

        this.on("pressmove",function(e)
        {
            this.x += e.stageX- this.oldX;
            this.y += e.stageY- this.oldY;
            this.oldX= e.stageX;
            this.oldY= e.stageY;
        });
    };

    p.bigger=function()
    {
        this.imageContainer.scaleX+=0.05;
        this.imageContainer.scaleY+=0.05;
        this.drawBG();
    };

    p.smaller=function()
    {
        this.imageContainer.scaleX-=0.05;
        this.imageContainer.scaleY-=0.05;
        this.drawBG();
    };

    p.turnLeft=function()
    {
      this.imageContainer.rotation-=5;
    };

    p.turnRight=function()
    {
        this.imageContainer.rotation+=5;
    };

    p.select= function ()
    {
        this.isSelect=true;
        this.shadow=this.myShadow;
        this.drawBG();

        var event=new createjs.Event("select");
        this.dispatchEvent(event);
    };

    p.unselect=function()
    {
        this.isSelect=false;
        this.shadow=null;
        this.bg.graphics.clear();
    };

    p.drawBG=function()
    {
        this.bg.graphics.clear();
        var bound=this.imageContainer.getTransformedBounds();
        this.bg.graphics.clear();
        this.bg.graphics.beginFill("#ffffcc",0.3);
        this.bg.graphics.drawRect(-2,-2,bound.width+4,bound.height+4);
        this.bg.graphics.endFill();
    };

    window.EditObject = createjs.promote(EditObject, "Container");
}(window));
