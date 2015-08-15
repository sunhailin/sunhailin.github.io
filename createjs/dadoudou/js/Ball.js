(function(window){
    function Ball(color)
    {
        this.Container_constructor();
        //this.heng=heng;
        //this.shu=shu;
        this.color=color;
        this.tickListener;
        this.speedX;
        this.speedY;
        this.speedA=4;
        this.gd=new GlobalData();

        var ball=new createjs.Bitmap(this.gd.resource.getResult("image"+color));
        ball.scaleX=0.5;
        ball.scaleY=0.5;
        this.addChild(ball);
    }

    var p=createjs.extend(Ball,createjs.Container);

    p.beginFall=function()
    {
        this.tickListener=this.on("tick",this.fall,this);
        this.speedX=-5+10*Math.random();
        this.speedY=-20;
    };

    p.fall=function(e)
    {
        this.x+=this.speedX;
        this.y+=this.speedY;
        this.speedY+=this.speedA;
        if(this.y>this.gd.canvas.height+50)
        {
            if(this.parent!=null)
            {
                this.parent.removeChild(this);
                this.off("tick",this.tickListener);
            }
        }
    };

    window.Ball=createjs.promote(Ball,"Container");
}(window));
