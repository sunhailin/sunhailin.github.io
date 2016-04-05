this.diyeditor = this.diyeditor || {};
(function () {
    function ImageObject(data) {
        this.EditObjectWithImage_constructor(data);
        this.divObject.setAttribute("name","imageObject");
        if (data.parms.maskurl) {
            this.width=data.parms.maskwidth;
            this.height=data.parms.maskheight;
        }
        var DiyData = new diyeditor.DiyData();
        if(DiyData.isImageWhiteBG){
            this.addWhiteBG();
        }
        this.originRotation=0;
        if(data.parms.rotation)
        {
            this.originRotation=data.parms.rotation;
        }
        this.uploader=null;
        this._initUploader();
        this.maxScale = 3;

        this.isEmpty = true;
        this.emptyMouseX=0;
        this.emptyMouseY=0;

        this.blurImage = new diyeditor.Bitmap("images/blur.png");

        this.blackCover=false;
    }

    var p = diyeditor.extend(ImageObject, diyeditor.EditObjectWithImage);

    p.addWhiteBG=function(){
        var whitebg=new diyeditor.Shape();
        whitebg.width=this.width;
        whitebg.height=this.height;
        whitebg.divObject.backgroundColor="#fff";
        this.addChildAt(whitebg,0);
    };

    p.handleMouseDown = function (px, py) {
        if (this.isEmpty) {
            this.emptyMouseX = px;
            this.emptyMouseY = py;
        } else {
            var DiyData = new diyeditor.DiyData();
            this.oldX = px;
            this.oldY = py;
            DiyData.isMovingObject = true;
            this.select();
        }
    };

    p.handleDragStart = function (px, py) {
        this.oldX = px;
        this.oldY = py;
    };

    p.handlePressMove = function (px, py) {
        if (this.isEmpty) {
            return;
        }
        if (this.moveable && this.isSelect) {
            var offsetx = px - this.oldX;
            var offsety = py - this.oldY;
            this.data.parms.x += offsetx;
            this.data.parms.y += offsety;
            this.contentContainer.x += offsetx;
            this.contentContainer.y += offsety;
            this._limitPosition();
            this.oldX = px;
            this.oldY = py;
        }
    };

    p.handleMouseUp = function (px, py) {
        if (this.isEmpty) {
            if (Math.abs(px - this.emptyMouseX) + Math.abs(py - this.emptyMouseY) < 10) {
                if(!this.blackCover){
                    this.startUploadPhoto();
                }
            }
        } else {
            var DiyData = new diyeditor.DiyData();
            DiyData.isMovingObject = false;
        }
    };

    p.startUploadPhoto=function(){
        var thisPointer = this;
        var filePicker = $("<input>");
        filePicker.attr("type", "file");
        filePicker.attr("accept", "image/*");
        //filePicker.attr("capture", "camera");
        filePicker.on("change", function (e) {
            //在上传之前，先清空之前的上传队列，这样每次只能上传一张照片
            thisPointer._clearUploader();
            thisPointer.uploader.addFiles(e.target.files);
            thisPointer.uploader.upload();
        });
        filePicker.click();
    };

    p.imageSetMask = function () {
        var DiyData = new diyeditor.DiyData();
        if(this.data.parms.maskurl==="EMPTYMASK"){
            this.setMask(0, 0, this.data.parms.maskwidth, this.data.parms.maskheight);
        }else{
            this.setMask(0, 0, this.data.parms.maskwidth, this.data.parms.maskheight, DiyData.getImagePath() + this.data.parms.maskurl);
        }
    };

    p.setImageUrl = function (url, isJustUplaod) {
        var DiyData=new diyeditor.DiyData();
        this.contentContainer.removeAllChildren();
        this.isEmpty = false;
        var thisPointer = this;
        var image = new Image();
        this.data.parms.imageurl = url;
        image.src = DiyData.getImagePath()+url;
        image.onload = function () {
            thisPointer.contentContainer.removeAllChildren();
            thisPointer.imageWidth = image.width;
            thisPointer.imageHeight = image.height;
            thisPointer.data.parms.width=thisPointer.imageWidth;
            thisPointer.data.parms.height=thisPointer.imageHeight;
            var bitmap = new diyeditor.Bitmap(image);
            thisPointer.bitmap = bitmap;
            bitmap.x = -thisPointer.imageWidth / 2;
            bitmap.y = -thisPointer.imageHeight / 2;
            thisPointer.contentContainer.x += thisPointer.imageWidth / 2;
            thisPointer.contentContainer.y += thisPointer.imageHeight / 2;
            thisPointer.contentContainer.width=thisPointer.imageWidth;
            thisPointer.contentContainer.height=thisPointer.imageHeight;
            thisPointer.contentContainer.addChild(bitmap);
            if(thisPointer.blackCover){
                var bg=new diyeditor.Shape();
                bg.width=thisPointer.imageWidth;
                bg.height=thisPointer.imageHeight;
                bg.x=-thisPointer.imageWidth/2;
                bg.y=-thisPointer.imageHeight/2;
                bg.backgroundColor="#000";
                bg.opacity=0.8;
                thisPointer.contentContainer.addChild(bg);
            }
            //对于刚上传好的图片，调整图片大小和位置
            if (isJustUplaod) {
                DiyData.isDataChanged=true;
                var sc;
                if (thisPointer.imageWidth / thisPointer.imageHeight > thisPointer.data.parms.maskwidth / thisPointer.data.parms.maskheight) {
                    sc = thisPointer.data.parms.maskheight*1.05 / thisPointer.imageHeight;
                }
                else {
                    sc = thisPointer.data.parms.maskwidth*1.05 / thisPointer.imageWidth;
                }
                thisPointer.data.parms.x = thisPointer.data.parms.maskx + (thisPointer.data.parms.maskwidth*1.05 - thisPointer.imageWidth) / 2;
                thisPointer.data.parms.y = thisPointer.data.parms.masky-(1-sc)*thisPointer.imageHeight/2;
                thisPointer.contentContainer.x = (thisPointer.data.parms.maskwidth*1.05) / 2;
                thisPointer.contentContainer.y = sc*thisPointer.imageHeight/2;
                thisPointer.data.parms.scale = thisPointer.scaleNum = thisPointer.contentContainer.scale = sc;
                if(thisPointer.originRotation){
                    thisPointer.setContentRotation(thisPointer.originRotation);
                }
                thisPointer.select();
            }
            thisPointer._checkScale();
        };
        image.onerror = function () {
            if (thisPointer.data.parms.maskurl) {
                thisPointer._showEmptyImage();
                thisPointer._showBlur(false);
            }
            alert("图片加载失败!");
        };
    };

    p.setContentPos = function (px, py) {
        this.contentContainer.x = px - this.data.parms.maskx;
        this.contentContainer.y = py - this.data.parms.masky;
    };

    p.setMaskPos = function (px, py) {
        this.x = px;
        this.y = py;
    };

    p.deleteImage = function () {
        if (!this.isEmpty) {
            this._showEmptyImage();
            this._showBlur(false);
        }
    };

    p.setContentScale = function (param) {
        this.EditObjectWithImage_setContentScale(param);
        this._limitPosition();
        this._checkScale();
    };

    p.setScaleFromData = function (param) {
        this.EditObjectWithImage_setScaleFromData(param);
        this._checkScale();
    };

    p.setContentRotation = function (param) {
        this.EditObjectWithImage_setContentRotation(param);
    };

    p.rotateLeft90=function(){
        this.EditObjectWithImage_setContentRotation(this.rotateNum-90);
    };

    p.rotateRight90=function(){
        this.EditObjectWithImage_setContentRotation(this.rotateNum+90);
    };

    p.noBleeding=function(){
        if(this.isEmpty){
            return;
        }
        var sc;
        if (this.imageWidth / this.imageHeight > this.data.parms.maskwidth / this.data.parms.maskheight) {
            sc = this.data.parms.maskwidth / this.imageWidth;
        }
        else {
            sc = this.data.parms.maskheight / this.imageHeight;
        }
        this.data.parms.x = this.data.parms.maskx + (this.data.parms.maskwidth - this.imageWidth) / 2;
        this.data.parms.y = this.data.parms.masky+ (this.data.parms.maskheight - this.imageHeight) / 2;
        this.contentContainer.x = (this.data.parms.maskwidth) / 2;
        this.contentContainer.y = (this.data.parms.maskheight) / 2;
        this.data.parms.scale = this.scaleNum = this.contentContainer.scale = sc;
        this._checkScale();
    };

    p._showEmptyImage = function () {
        this.isEmpty = true;
        var DiyData = new diyeditor.DiyData();
        if (DiyData.isPreview) {
            return;
        }
        var thisPointer = this;
        this.data.parms.imageurl = "";
        this.data.parms.photomd5 = "";
        this.contentContainer.removeAllChildren();
        this.contentContainer.scale = this.data.parms.scale = this.scaleNum = 1;
        this.data.parms.primitivewidth = this.data.parms.primitiveheight = 0;
        this.contentContainer.rotation = this.data.parms.rotation = this.rotateNum = 0;
        this.setContentPos(this.data.parms.maskx, this.data.parms.masky);

        var image = new Image();
        image.src = "images/empty.png";
        image.onload = function () {
            var bitmap = new diyeditor.Bitmap(image);
            thisPointer.imageWidth=image.width;
            thisPointer.imageHeight=image.height;
            bitmap.x = -thisPointer.imageWidth / 2;
            bitmap.y = -thisPointer.imageHeight / 2;
            thisPointer.contentContainer.addChild(bitmap);
            thisPointer.contentContainer.width=thisPointer.imageWidth;
            thisPointer.contentContainer.height=thisPointer.imageHeight;
            thisPointer.contentContainer.x = thisPointer.data.parms.maskwidth / 2;
            thisPointer.contentContainer.y = thisPointer.data.parms.maskheight / 2;
            var sc;
            if (thisPointer.imageWidth / thisPointer.imageHeight > thisPointer.data.parms.maskwidth / thisPointer.data.parms.maskheight) {
                sc = thisPointer.data.parms.maskheight / thisPointer.imageHeight;
            }
            else {
                sc = thisPointer.data.parms.maskwidth / thisPointer.imageWidth;
            }
            thisPointer.contentContainer.scale = sc;

        };
    };

    p._initUploader = function () {
        if (!this.uploader) {
            var thisPointer = this;
            this.uploader = new WebUploader.Uploader({
                auto: true,
                server: '../uploadsvr/upload',
                chunkSize: 1024 * 1024 * 5,
                compress: false,
                chunked: false,
                accept: {
                    title: "Images",
                    extensions: "jpg,jpeg,png",
                    mimeTypes: "image/*"
                }
            });
            var progress=$("#progress p");
            this.uploader.on("fileQueued", function (file) {
                $("#uploading").modal();
                progress.text("0%");
            });
            this.uploader.on("uploadProgress", function (file, percentage) {
                progress.text("" + Math.round(percentage * 100) + "%");
            });
            this.uploader.on("uploadSuccess", function (file, response) {
                $("#uploading").modal("hide");
                progress.text("0%");
                thisPointer.data.parms.photomd5 = response.md5;
                thisPointer.data.parms.primitivewidth = response.width;
                thisPointer.data.parms.primitiveheight = response.height;
                thisPointer.setImageUrl(response.murl, true);
                thisPointer._clearUploader();
                thisPointer.dispatchEvent(new diyeditor.Event("uploadComplete"));
            });
            this.uploader.hasMd5 = function (response) {
                $("#uploading").modal("hide");
                progress.text("0%");
                thisPointer.data.parms.photomd5 = response.md5;
                thisPointer.data.parms.primitivewidth = response.width;
                thisPointer.data.parms.primitiveheight = response.height;
                thisPointer.setImageUrl(response.murl, true);
                thisPointer._clearUploader();
                thisPointer.dispatchEvent(new diyeditor.Event("uploadComplete"));
            };
            this.uploader.on("uploadError", function (file) {
                $("#uploading").modal("hide");
                progress.text("0%");
                thisPointer._clearUploader();
                alert("上传图片失败!");
            });
            this.uploader.on("error", function (file) {
                $("#uploading").modal("hide");
                progress.text("0%");
                thisPointer._clearUploader();
                alert("上传图片失败!");
            });
            this.uploader.md5Error = function () {
                $("#uploading").modal("hide");
                progress.text("0%");
                thisPointer._clearUploader();
                alert("md5验证失败!");
            };
        }
    };

    p._clearUploader=function(){
        if(this.uploader){
            var arr=this.uploader.getFiles();
            if (arr.length !==0) {
                var i;
                var l=arr.length;
                for(i=0;i<l;i++){
                    this.uploader.removeFile(arr[i], true);
                }
            }
        }
    };

    p._checkScale = function () {
        if (this.isEmpty) {
            this.data.parms.isblur = "0";
            return;
        }
        if (!this.data.parms.primitivewidth || parseInt(this.data.parms.primitivewidth) === 0) {
            this.data.parms.isblur = "0";
            return;
        }
        var DiyData = new diyeditor.DiyData();
        var pageScale = DiyData.currentPageData.primitivewidth / DiyData.currentPageData.width;
        var imageScale = this.data.parms.primitivewidth / this.data.parms.width;
        if (pageScale * this.scaleNum > imageScale) {
            this.data.parms.isblur = "1";
            this._showBlur(true);
        }
        else {
            this._showBlur(false);
            this.data.parms.isblur = "0";
        }
    };

    p._showBlur = function (b) {
        var DiyData = new diyeditor.DiyData();
        if (b) {
            this.addChild(this.blurImage);
            if (this.data.parms.maskwidth - 50 < DiyData.BLUR_WIDTH) {
                this.blurImage.scale = (this.data.parms.maskwidth - 50) / DiyData.BLUR_WIDTH;
            }
            this.blurImage.x = (this.data.parms.maskwidth - this.blurImage.scaleX * DiyData.BLUR_WIDTH) / 2;
            this.blurImage.y = (this.data.parms.maskheight - this.blurImage.scaleY * DiyData.BLUR_HEIGHT) / 2;
        }
        else {
            if (this.getChildIndex(this.blurImage) != -1) {
                this.removeChild(this.blurImage);
            }
        }
    };

    p._limitPosition = function () {
        //后台位置没有限制
        var DiyData = new diyeditor.DiyData();
        if(parseInt(DiyData.t)==3){
            return;
        }
        if (this.data.parms.maskurl) {
            var ww = this.data.parms.width * this.scaleNum;
            var hh = this.data.parms.height * this.scaleNum;
            if (ww > this.data.parms.maskwidth) {
                if (this.contentContainer.x > ww / 2) {
                    this.contentContainer.x = ww / 2;
                    this.data.parms.x = this.contentContainer.x + this.data.parms.maskx - this.data.parms.width / 2;
                }
                if (this.contentContainer.x < this.data.parms.maskwidth - ww / 2) {
                    this.contentContainer.x = this.data.parms.maskwidth - ww / 2;
                    this.data.parms.x = this.contentContainer.x + this.data.parms.maskx - this.data.parms.width / 2;
                }
            }
            else {
                if (this.contentContainer.x < ww / 2) {
                    this.contentContainer.x = ww / 2;
                    this.data.parms.x = this.contentContainer.x + this.data.parms.maskx - this.data.parms.width / 2;
                }
                if (this.contentContainer.x > this.data.parms.maskwidth - ww / 2) {
                    this.contentContainer.x = this.data.parms.maskwidth - ww / 2;
                    this.data.parms.x = this.contentContainer.x + this.data.parms.maskx - this.data.parms.width / 2;
                }
            }
            if (hh > this.data.parms.maskheight) {
                if (this.contentContainer.y > hh / 2) {
                    this.contentContainer.y = hh / 2;
                    this.data.parms.y = this.contentContainer.y + this.data.parms.masky - this.data.parms.height / 2;
                }
                if (this.contentContainer.y < this.data.parms.maskheight - hh / 2) {
                    this.contentContainer.y = this.data.parms.maskheight - hh / 2;
                    this.data.parms.y = this.contentContainer.y + this.data.parms.masky - this.data.parms.height / 2;
                }
            }
            else {
                if (this.contentContainer.y < hh / 2) {
                    this.contentContainer.y = hh / 2;
                    this.data.parms.y = this.contentContainer.y + this.data.parms.masky - this.data.parms.height / 2;
                }
                if (this.contentContainer.y > this.data.parms.maskheight - hh / 2) {
                    this.contentContainer.y = this.data.parms.maskheight - hh / 2;
                    this.data.parms.y = this.contentContainer.y + this.data.parms.masky - this.data.parms.height / 2;
                }
            }
        }
    };

    diyeditor.ImageObject = diyeditor.promote(ImageObject, "EditObjectWithImage");
}());