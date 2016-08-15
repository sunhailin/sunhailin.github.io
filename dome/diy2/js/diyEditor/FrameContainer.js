this.diyeditor = this.diyeditor || {};
(function () {
    function FrameContainer(data) {
        this.Container_constructor();
        this.divObject.setAttribute("name", "frameContainer");
        this.data = data;
        this.tweenTime = 500;
        this.isSliding = false;

        var DiyData = new diyeditor.DiyData();
        if (this.data) {
            this.maskWidth = this.data.pages[0].displaylist[1].parms.maskwidth;
            this.maskHeight = this.data.pages[0].displaylist[1].parms.maskwidth;
            this.maskX = this.data.pages[0].displaylist[1].parms.x;
            this.maskY = this.data.pages[0].displaylist[1].parms.y;
        } else {
            this.maskWidth = DiyData.pageWidth;
            this.maskHeight = DiyData.pageHeight;
            this.maskX = 0;
            this.maskY = 0;
        }
        this.width = DiyData.frameWidth;
        this.height = DiyData.frameHeight;

        this.view = null;
        this.view1 = null;
        this.currentView = null;


        this.mainContainer = new diyeditor.Container();
        this.mainContainer.divObject.setAttribute("name", "mainContainer");
        this.mainContainer.width = this.maskWidth;
        this.mainContainer.height = this.maskHeight;
        this.mainContainer.divObject.style.overflow = "hidden";
        this.mainContainer.x = this.maskX;
        this.mainContainer.y = this.maskY;
        this.addChild(this.mainContainer);

        if (data) {
            var bgimg = new Image();
            var thisPointer = this;
            bgimg.onload = function () {
                var bit = new diyeditor.Bitmap(bgimg);
                bit.scaleX = data.pages[0].displaylist[0].parms.width / bgimg.width;
                bit.scaleY = data.pages[0].displaylist[0].parms.height / bgimg.height;
                bit.x = data.pages[0].displaylist[0].parms.x;
                bit.y = data.pages[0].displaylist[0].parms.y;
                thisPointer.addChildAt(bit, 0);
            };
            bgimg.onerror = function () {
                console.log("frame bg error");
            };
            bgimg.src = DiyData.frameImgPath + data.pages[0].displaylist[0].parms.imageurl;
        }
    }

    var p = diyeditor.extend(FrameContainer, diyeditor.Container);

    p.addEditView = function (view, view1) {
        this.view = view;
        this.view1 = view1;
        var DiyData = new diyeditor.DiyData();
        DiyData.viewScale = this.maskWidth / DiyData.pageWidth;
        view.scale = DiyData.viewScale;
        view1.scale = DiyData.viewScale;
        view1.divObject.style.left = this.maskWidth + "px";
        this.mainContainer.addChild(view);
        this.mainContainer.addChild(view1);
        this.currentView = view;
    };

    p.addOneEditView = function (view) {
        this.view = view;
        var DiyData = new diyeditor.DiyData();
        DiyData.viewScale = this.maskWidth / DiyData.pageWidth;
        view.scale = DiyData.viewScale;
        this.mainContainer.addChild(view);
        this.currentView = view;
    };

    p.prePage = function () {
        this.slidePage(-1);
    };

    p.nextPage = function () {
        this.slidePage(1);
    };

    p.slidePage = function (drc) {
        if (this.isSliding) {
            return;
        }
        var DiyData = new diyeditor.DiyData();
        var page = DiyData.currentPageIndex + drc;
        if (page < 0 || page >= DiyData.allPageData.length) {
            return;
        } else {
            DiyData.currentPageIndex = page;
            DiyData.currentPageData = DiyData.allPageData[DiyData.currentPageIndex];
            var oldView;
            var newView;
            if (this.currentView == this.view) {
                oldView = this.view;
                newView = this.view1;
            } else {
                oldView = this.view1;
                newView = this.view;
            }
            newView.addEditObjects();
            this.currentView = newView;
            this.isSliding = true;
            //this.mainContainer.addChild(newView);
            //左滑
            if (drc == 1) {
                newView.divObject.style.left = this.maskWidth + "px";
                $(oldView.divObject).animate({"left": -this.maskWidth}, this.tweenTime);
            }
            //右滑
            if (drc == -1) {
                newView.divObject.style.left = this.maskX - this.maskWidth + "px";
                $(oldView.divObject).animate({"left": this.maskWidth}, this.tweenTime);
            }
            var thisPointer = this;
            $(newView.divObject).animate({"left": 0}, this.tweenTime, function () {
                thisPointer.isSliding = false;
                oldView.clear();
            });
            this._dispatchPageChanged();
        }
    };

    p.setPageIndex = function (p) {
        var DiyData = new diyeditor.DiyData();
        if (p >= 0 && p < DiyData.allPageData.length) {
            DiyData.currentPageIndex = p;
            DiyData.currentPageData = DiyData.allPageData[DiyData.currentPageIndex];

            this.currentView.clear();
            this.currentView.addEditObjects();
            this._dispatchPageChanged();
        }
    };

    p._dispatchPageChanged = function () {
        this.dispatchEvent(new diyeditor.Event("pageChanged"));
    };

    diyeditor.FrameContainer = diyeditor.promote(FrameContainer, "Container");
}());