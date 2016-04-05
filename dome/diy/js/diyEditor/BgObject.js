this.diyeditor=this.diyeditor||{};
(function(){
   function BgObject(data){
       this.EditObjectWithImage_constructor(data);
       this.divObject.setAttribute("name","bgObject");
       this.setSelectable(false);
   }

    var p=diyeditor.extend(BgObject,diyeditor.EditObjectWithImage);

    diyeditor.BgObject=diyeditor.promote(BgObject,"EditObjectWithImage");
}());