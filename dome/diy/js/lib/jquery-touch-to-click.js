(function () {
    var isTouch = (document.hasOwnProperty("ontouchstart")) ? 'touchstart' : 'click', _on = $.fn.on;
    //判断设备是否是ios
    var isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if(isiOS){
        isTouch="touchstart";
    }
    $.fn.on = function () {
        arguments[0] = (arguments[0] === 'click') ? isTouch : arguments[0];
        arguments[0] = (arguments[0] === 'realclick') ? "click" : arguments[0];
        return _on.apply(this, arguments);
    };
})();