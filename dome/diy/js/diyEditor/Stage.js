this.diyeditor=this.diyeditor||{};
(function(){
    function Stage(div,viewwidth,viewheight){
        this.Container_constructor();
        this.setDivObject(div);
        this.divObject.setAttribute("name","stage");
        this.divObject.style.overflow="hidden";
        this.width=viewwidth;
        this.height=viewheight;
    }

    var p=diyeditor.extend(Stage,diyeditor.Container);

    diyeditor.Stage=diyeditor.promote(Stage,"Container");
}());