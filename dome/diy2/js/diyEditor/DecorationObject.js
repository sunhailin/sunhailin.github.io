this.diyeditor=this.diyeditor||{};
(function(){
    function DecorationObject(data){
        this.EditObjectWithImage_constructor(data);
        this.divObject.setAttribute("name","decorationObject");
    }

    var p=diyeditor.extend(DecorationObject,diyeditor.EditObjectWithImage);

    diyeditor.DecorationObject=diyeditor.promote(DecorationObject,"EditObjectWithImage");
}());