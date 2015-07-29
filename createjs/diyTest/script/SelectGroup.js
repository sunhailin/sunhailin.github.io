(function(window){
    function SelectGroup(container)
    {
        this.Object_constructor();

        this.container = container;
        this.init();
    }

    var p=createjs.extend(SelectGroup,Object);

    p.init=function()
    {
        var i;
        for(i=0;i<this.container.numChildren;i++)
        {
            var s=this.container.getChildAt(i);
            s.on("select",this.onSelect,this);
        }
    };

    p.update=function()
    {
        var i;
        for(i=0;i<this.container.numChildren;i++)
        {
            var s=this.container.getChildAt(i);
            if(!s.hasEventListener("select"))
                s.on("select",this.onSelect,this);
        }
    };

    p.onSelect=function(e)
    {
        var j;
        for(j=0;j<this.container.numChildren;j++)
        {
            var n=this.container.getChildAt(j);
            if(n instanceof EditObject)
            {
                if(e.target==n)
                {

                }
                else
                {
                    n.unselect();
                }
            }
        }
    };

    p.getSelect=function()
    {
        var i;
        for(i=0;i<this.container.numChildren;i++)
        {
            var n=this.container.getChildAt(i);
            if(n instanceof EditObject)
            {
                if(n.isSelect)
                {
                    return n;
                }
            }
        }
        return null;
    };

    window.SelectGroup=createjs.promote(SelectGroup,"Object");
}(window));