(function(window) {
    function ImageObject() {
        this.EditObject_constructor();
    }
    var p=createjs.extend(ImageObject,EditObject);

    p.setImageURL=function(url)
    {
        var bitmap = new createjs.Bitmap(url);
        this.imageContainer.addChild(bitmap);
    };

    window.ImageObject = createjs.promote(ImageObject,"EditObject");
}(window));