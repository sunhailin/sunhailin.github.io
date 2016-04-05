this.diyeditor=this.diyeditor||{};
(function(){
    function EditObjectFactory(){

    }

    EditObjectFactory.createEditObject=function(data){
        var editObject;
        switch(data.type){
            case "background":
                editObject = new diyeditor.BgObject(data);
                break;
            case "image":
                editObject = new diyeditor.ImageObject(data);
                break;
            case "decroation":
                editObject = new diyeditor.DecorationObject(data);
                break;
            case "date":
                editObject = new diyeditor.DateObject(data);
                break;
            default :
                editObject = new diyeditor.DecorationObject(data);
                break;
        }

        if(editObject===undefined){
            return;
        }
        if(editObject instanceof diyeditor.ImageObject){
            editObject.setMaskPos(data.parms.maskx,data.parms.masky);
            editObject.setContentPos(data.parms.x,data.parms.y);
            editObject.imageSetMask();
        }else{
            editObject.setContentPos(data.parms.x,data.parms.y);
        }
        if(editObject instanceof diyeditor.EditObjectWithImage){
            if(data.parms.scale){
                editObject.setScaleFromData(data.parms.scale);
            }
            if(data.parms.rotation&&parseInt(data.parms.rotation)){
                editObject.setContentRotation(parseInt(data.parms.rotation));
            }
            editObject.setImageUrl(data.parms.imageurl);
        }
        return editObject;
    };

    diyeditor.EditObjectFactory=EditObjectFactory;
}());
