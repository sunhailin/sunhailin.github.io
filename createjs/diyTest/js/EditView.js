(function(window){
    function EditView()
    {
        this.Container_constructor();

        this.selectGroup;

        this.init();
        this.addEditObjects();
    }

    var p=createjs.extend(EditView,createjs.Container);

    p.init=function()
    {
        this.selectGroup=new SelectGroup(this);
        this.on("mousedown",this.test,this);
    };

    p.test=function(e)
    {
        var obj=this.getObjectUnderPoint(e.localX, e.localY,2);
        console.log(obj);
    };

    p.addEditObjects=function()
    {
        var globalData=new GlobalData();
        var datas=globalData.pageData.displaylist;
        var i;
        for(i=0;i<datas.length;i++)
        {
            var layer=datas[i];
            if(layer.type=="background")
            {
                var bg=EditObjectFactory.createBG(layer.parms);
                this.addChildAt(bg,0);
            }
            if(layer.type=="image")
            {
                var image=EditObjectFactory.createImage(layer.parms);
                this.addChild(image);
            }
            if(layer.type=="decroation")
            {
                var de=EditObjectFactory.createDecroation(layer.parms);
                this.addChild(de);
            }
            if(layer.type=="text")
            {
                var text=EditObjectFactory.createText(layer.parms);
                this.addChild(text);
            }
            this.selectGroup.update();
        }
    };

    p.clear=function()
    {
        while(this.numChildren)
        {
            this.removeAllChildren();
        }
    };

    p.getSelectObject=function()
    {
        return this.selectGroup.getSelect();
    }

    p.setSelectText=function(text)
    {
        var selectedObject=this.selectGroup.getSelect();
        if(selectedObject instanceof TextObject)
        {
            selectedObject.setText(text);
        }
    };

    window.EditView=createjs.promote(EditView,"Container");
}(window));