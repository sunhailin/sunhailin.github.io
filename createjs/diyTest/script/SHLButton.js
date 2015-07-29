(function(window) {
    function SHLButton(upimage, downimage) {
        this.Container_constructor();

        var data = {
            images: [upimage, downimage],
            frames: [
                [0, 0, 135, 43, 0],
                [0, 0, 135, 43, 1]
            ],
            animations: {
                out: 0,
                down: 1
            }
        }
        var sheet = new createjs.SpriteSheet(data);
        var sprite = new createjs.Sprite(sheet);
        var helper = new createjs.ButtonHelper(sprite, "out", "out", "down");
        this.addChild(sprite);
    }
    var p=createjs.extend(SHLButton,createjs.Container);
    window.SHLButton=createjs.promote(SHLButton,"Container");
}(window));