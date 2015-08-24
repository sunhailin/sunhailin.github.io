(function(window) {
    function ImageObject(data) {
        this.EditObject_constructor(data);
    }
    var p=createjs.extend(ImageObject,EditObject);

    p.setImageURL=function(url)
    {
        //var bitmap = new createjs.Bitmap(url);
        //this.contentContainer.addChild(bitmap);

        var contentContainer=this.contentContainer;
        var container=this.container;
        var data=this.data;
        var image=new Image();
        image.onload=function()
        {
            var bitmap = new createjs.Bitmap(image);
            contentContainer.addChild(bitmap);
            if(container.filters!=null)
            {
                container.cache(data.maskx,data.masky,data.maskwidth,data.maskheight);
            }
        };
        image.src=url;
    };

    p.setMask=function(maskUrl,maskX,maskY,maskWidth,maskHeight)
    {
        var container=this.container;
        var data=this.data;
        var image=new Image();
        image.onload=function()
        {
            container.filters=null;
            container.filters=[new createjs.SHLAlphaMaskFilter(image,image.width,image.height,maskX,maskY,maskWidth,maskHeight)];
            container.cache(data.maskx,data.masky,data.maskwidth,data.maskheight);
            this.hasMask=true;
        };
        image.src=maskUrl;
    };

    window.ImageObject = createjs.promote(ImageObject,"EditObject");
}(window));