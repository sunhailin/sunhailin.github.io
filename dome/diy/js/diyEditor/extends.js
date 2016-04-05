this.diyeditor = this.diyeditor || {};

diyeditor.extend = function (subclass, superclass) {
    "use strict";

    function O() {
        this.constructor = subclass;
    }

    O.prototype = superclass.prototype;
    return (subclass.prototype = new O());
};
