(function(window){
    function DecroationObject(data)
    {
        this.EditObject_constructor(data);
    }

    var p=createjs.extend(DecroationObject,EditObject);

    p.setImageURL=function(url)
    {
        var bitmap = new createjs.Bitmap(url);
        this.contentContainer.addChild(bitmap);
    };

    window.DecroationObject=createjs.promote(DecroationObject,"EditObject");
}(window));