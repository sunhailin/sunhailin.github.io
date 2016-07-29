//删除左右两端的空格
window.trim = function (str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
};

window.isDoubleByte = function (letter) {
    return letter && letter.charCodeAt(0) > 255;
};

window.toUnicode = function (str) {
    var i,
        length,
        chr,
        unicode = '';
    for (i = 0, length = str.length; i < length; i++) {
        chr = str[i];
        unicode = isDoubleByte(chr) ? unicode + '\\u' + chr.charCodeAt(0).toString(16) : unicode + chr;
    }
    return unicode;
};

window.unUnicode = function (str) {
    return unescape(str.replace(/\\u/g, "%u"));
};

window.getUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r) {
        return decodeURIComponent(r[2]);
    }
    return null;
};
