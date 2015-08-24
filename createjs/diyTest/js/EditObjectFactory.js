(function(window){
    function EditObjectFactory()
    {

    }

    EditObjectFactory.createImage=function(data)
    {
        var globalData=new GlobalData();
        var image=new ImageObject(data);
        image.setImageURL(data.imageurl);
        if(data.maskurl)
        {
            image.setMask(data.maskurl,data.maskx,data.masky,data.maskwidth,data.maskheight);
        }
        image.setSelectable(data.selectable=="1");
        image.setMoveable(data.moveable=="1");
        image.setEditable(data.editable=="1");
        if(data.alpha)
        {
            image.alpha=data.alpha;
        }
        image.setContentPos(data.x,data.y);
        //image.scaleX=(data.width/data.primitivewidth);
        //image.scaleY=image.scaleX;
        return image;
    };

    EditObjectFactory.createDecroation=function(data)
    {
        var globalData=new GlobalData();
        var de=new DecroationObject(data);
        de.setImageURL(data.imageurl);
        //de.setSelectable(data.selectable=="1");
        //de.setMoveable(data.moveable=="1");
        //de.setEditable(data.editable=="1");
        if(data.alpha)
        {
            de.alpha=data.alpha;
        }
        de.setContentPos(data.x,data.y);
        //de.scaleX=(data.width/data.primitiveWidth);
        //de.scaleY=de.scaleX;
        return de;
    };

    EditObjectFactory.createBG=function(data)
    {
        var globalData=new GlobalData();
        var bg=new BgObject(data);
        bg.setSelectable(false);
        if(data.imageURL!="")
        {
            //bg.scaleX=globalData.pageWidth/data.primitiveWidth;
            //bg.scaleY=bg.scaleX;
            bg.setBGImage(data.imageurl);
            bg.setContentPos(data.x,data.y);
        }
        else
        {
            bg.setBGColor(data.color);
        }
        return bg;
    };

    EditObjectFactory.createText=function(data)
    {
        var globalData=new GlobalData();
        var text=new TextObject(data);
        text.setSelectable(data.selectable=="1");
        text.setMoveable(data.moveable=="1");
        text.setEditable(data.editable=="1");
        if(data.fontSize)
        {
            text.setFontSize(parseInt(data.fontSize));
        }

        text.setColor(data.fontColor);
        text.setText(data.content);
        text.setContentPos(data.x,data.y);
        if(data.alpha)
        {
            text.alpha=data.alpha;
        }
        return text;
    };

    window.EditObjectFactory=EditObjectFactory;
}(window));
