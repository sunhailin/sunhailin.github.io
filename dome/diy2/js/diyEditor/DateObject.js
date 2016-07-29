this.diyeditor=this.diyeditor||{};
(function(){
    function DateObject(data){
        this.EditObjectWithImage_constructor(data);
        this.divObject.setAttribute("name","dateObject");

        this.extraData=data.extrainfo;
        this.tagContainer = new diyeditor.Container();
        this.tagContainer.x=0;
        this.tagContainer.y=0;
        this.tagContainer.width=this.data.parms.width;
        this.tagContainer.height=this.data.parms.height;
        this.addChildAt(this.tagContainer, 0);
        if (this.extraData && this.extraData.tags) {
            this.addTags(this.extraData.tags);
        }
    }

    var p=diyeditor.extend(DateObject,diyeditor.EditObjectWithImage);

    p.addTag = function (type, posx, posy, tw, th) {
        var tagsrc = "images/" + type + ".png";
        var tagbmp = new diyeditor.Bitmap(tagsrc);
        tagbmp.x = posx-this.data.parms.x;
        tagbmp.y = posy-this.data.parms.y;
        tagbmp.width=tw;
        tagbmp.height=th;
        this.tagContainer.addChild(tagbmp);
    };

    p.addTags = function (tagData) {
        this.clearTag();
        this.extraData.tags = tagData;
        var i;
        for (i = 0; i < tagData.length; i++) {
            var day = tagData[i];
            var dayData = this.extraData.data[day.date.split("/")[1] - 1];
            if(!dayData){
                console.error("日期标记有错误");
                break;
            }
            var location;
            var tagW;
            var tagH;
            if(dayData.taglocation){
                location = dayData.taglocation.split(",");
                tagW=dayData.tagwidth;
                tagH=dayData.tagheight;
            }else{
                location = dayData.location.split(",");
                tagW=dayData.width;
                tagH=dayData.height;
            }
            this.addTag(day.tag, location[0], location[1], tagW, tagH);
        }
    };

    p.clearTag = function () {
        this.extraData.tags=[];
        while (this.tagContainer.numChildren) {
            this.tagContainer.removeAllChildren();
        }
    };

    diyeditor.DateObject=diyeditor.promote(DateObject,"EditObjectWithImage");
}());