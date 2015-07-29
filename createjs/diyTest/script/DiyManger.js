(function(window){
    function DiyManager()
    {
        this.container;
        this.selectGroup;
        this.init();

        if(!DiyManager.single_instance)
        {
            DiyManager.single_instance=this;
        }
        return DiyManager.single_instance;
    }

    DiyManager.prototype.init=function()
    {
        this.container =new createjs.Container();
        this.selectGroup=new SelectGroup(this.container);
    };

    DiyManager.prototype.addImage=function(url)
    {
        var image=new ImageObject();
        image.setImageURL(url);
        this.container.addChild(image);
        this.selectGroup.update();
    };

    DiyManager.prototype.bigger= function ()
    {
        var item=this.selectGroup.getSelect();
        if(item!=null)
        {
            if(item instanceof ImageObject)
                item.bigger();
        }
    };

    DiyManager.prototype.smaller=function()
    {
        var item=this.selectGroup.getSelect();
        if(item!=null)
        {
            if(item instanceof ImageObject)
                item.smaller();
        }
    };

    DiyManager.prototype.turnLeft= function ()
    {
        var item=this.selectGroup.getSelect();
        if(item!=null)
        {
            if(item instanceof ImageObject)
                item.turnLeft();
        }
    };

    DiyManager.prototype.turnRight=function()
    {
        var item=this.selectGroup.getSelect();
        if(item!=null)
        {
            if(item instanceof ImageObject)
                item.turnRight();
        }
    };

    DiyManager.prototype.changeIndexZ=function(p)
    {
        if(this.container.numChildren<=1)
        {
            return;
        }
        var item=this.selectGroup.getSelect();
        if(item==null)
        {
            return;
        }
        var index=this.container.getChildIndex(item);
        if(p>0)//向上移
        {
            if(index>=this.container.numChildren-1)
            {
                return;
            }
            else
            {
                this.container.setChildIndex(item,index+1);
            }
        }
        else //向下移
        {
            if(index==0)
            {
                return;
            }
            else
            {
                this.container.setChildIndex(item,index-1);
            }
        }
    };
    window.DiyManager=DiyManager;
}(window));
