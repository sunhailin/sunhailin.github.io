(function(window){
    function Square(heng,shu)
    {
        this.Container_constructor();
        this.heng=heng;
        this.shu=shu;
        this.hasBall=false;
        this.color;
        this.ball;
        this.bgDownListener;
        this.bgUPListener;

        this.bg=new createjs.Shape();
        this.addChild(this.bg);

        this.init();
        this.initListener();
    }

    var p=createjs.extend(Square,createjs.Container);
    p.init=function()
    {
        var n=this.heng+this.shu;
        if(n%2!=0)
        {
            this.color="#ffffff";
        }
        else
        {
            if(this.shu%2)
            {
                this.color="#daf5d7";
            }
            else
            {
                this.color="#fde4eb";
            }

        }
        this.drawBG(this.color);
    };

    p.initListener=function()
    {
        this.bgDownListener=this.bg.on("mousedown",this.onMouseDown,this);
        this.bgUpListener=this.bg.on("pressup",this.onPressUp,this);
    };

    p.removeListener= function ()
    {
        this.bg.off("mousedown",this.bgDownListener);
        this.bg.off("pressup",this.bgUpListener);
    };

    p.onMouseDown=function(e)
    {
        this.drawBG("#666666");
    };

    p.onPressUp=function(e)
    {
        this.drawBG(this.color);
    };

    p.drawBG=function(color)
    {
        this.bg.graphics.clear();
        this.bg.graphics.beginFill(color);
        this.bg.graphics.drawRect(0,0,25,25);
        this.bg.graphics.endFill();
        this.bg.cache(0,0,25,25);
    };

    p.setHasBall=function(p)
    {
        this.hasBall=p;
        if(!p)
            this.initListener();
    };

    p.getHasBall=function()
    {
        return this.hasBall;
    };

    p.setball=function(b)
    {
        this.ball=b;
        this.setHasBall(true);
        this.removeListener();
    };

    p.getBall=function()
    {
        return this.ball;
    };

    window.Square=createjs.promote(Square,"Container");
}(window));