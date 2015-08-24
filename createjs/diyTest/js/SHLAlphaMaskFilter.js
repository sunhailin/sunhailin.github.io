this.createjs = this.createjs || {};

(function () {
    "use strict";

    function SHLAlphaMaskFilter(mask,maskWidth,maskHeight,maskX,maskY,dWidth,dHeight)
    {

        this.mask = mask;
        this.maskWidth=maskWidth;
        this.maskHeight=maskHeight;
        this.maskX=maskX;
        this.maskY=maskY;
        this.dWidht=dWidth;
        this.dHeight=dHeight;
    }

    var p = createjs.extend(SHLAlphaMaskFilter, createjs.Filter);

    p.applyFilter = function (ctx, x, y, width, height, targetCtx, targetX, targetY)
    {
        if (!this.mask) { return true; }
        targetCtx = targetCtx || ctx;
        if (targetX == null) { targetX = x; }
        if (targetY == null) { targetY = y; }

        targetCtx.save();
        if (ctx != targetCtx) {
            return false;
        }

        targetCtx.globalCompositeOperation = "destination-in";
        targetCtx.drawImage(this.mask, targetX, targetY,this.maskWidth,this.maskHeight,this.maskX,this.maskY,this.dWidht,this.dHeight);
        targetCtx.restore();
        return true;
    };

    p.clone = function () {
        return new SHLAlphaMaskFilter(this.mask);
    };

    p.toString = function () {
        return "[SHLAlphaMaskFilter]";
    };


    createjs.SHLAlphaMaskFilter = createjs.promote(SHLAlphaMaskFilter, "Filter");
}());