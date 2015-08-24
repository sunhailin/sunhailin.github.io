(function(window) {
    function EditObject(data) {
        this.Container_constructor();

        this.data=data;
        this.selectable=false;
        this.editable = false;
        this.moveable=false;
        this.isSelect=false;
        this.hasMask=false;
        this.isMaskMoveable=false;
        this.container=new createjs.Container();
        this.addChild(this.container);
        this.myShadow=new createjs.Shadow("#00ff00",1,1,10);
        this.contentContainer=new createjs.Container();
        this.container.addChild(this.contentContainer);

        this.oldX=0;
        this.oldY=0;
    }

    var p = createjs.extend(EditObject, createjs.Container);

    p.setEditable=function(param)
    {
        this.editable=param;
        if(param)
        {

        }
        else
        {

        }
    };

    p.getEditable=function()
    {
        return this.editable;
    };

    p.setMoveable=function(param)
    {
        this.moveable=param;
        if(param)
        {

        }
        else
        {

        }
    };

    p.getMoveable=function()
    {
        return this.moveable;
    };

    p.setSelectable=function(param)
    {
        this.selectable=param;
        if(param)
        {
            this.addListener();
        }
        else
        {

        }
    };

    p.getSelectable=function()
    {
        return this.selectable;
    };

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
            if(this.moveable)
            {
                var offestx=e.stageX-this.oldX;
                var offesty=e.stageY-this.oldY;
                this.data.x+=offestx;
                this.data.y+=offesty;
                if(this.isMaskMoveable)
                {
                    if(this.data.maskx!=null)
                    {
                        this.data.maskx+=offestx;
                        this.data.masky+=offesty;
                    }
                    this.container.x =offestx+parseFloat(this.container.x);
                    this.container.y =offesty+parseFloat(this.container.y);
                }
                else
                {
                    this.contentContainer.x = offestx+parseFloat(this.contentContainer.x);
                    this.contentContainer.y = offesty+parseFloat(this.contentContainer.y);
                    if(this.container.filters!=null)
                    {
                        this.container.cache(this.data.maskx,this.data.masky,this.data.maskwidth,this.data.maskheight);
                    }
                }
                this.oldX= e.stageX;
                this.oldY= e.stageY;

            }
        });
    };

    p.select= function ()
    {
        this.isSelect=true;
        this.shadow=this.myShadow;


        var event=new createjs.Event("select");
        this.dispatchEvent(event);
    };

    p.unselect=function()
    {
        this.isSelect=false;
        this.shadow=null;
    };


    p.setContentPos=function(px,py)
    {
        this.contentContainer.x=px;
        this.contentContainer.y=py;
    };

    window.EditObject = createjs.promote(EditObject, "Container");
}(window));
