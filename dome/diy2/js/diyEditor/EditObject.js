this.diyeditor=this.diyeditor||{};
(function(){
    function EditObject(data){
        this.Container_constructor();

        this.data=data;
        this.width=data.parms.width;
        this.height=data.parms.height;

        this.selectable=false;
        this.editable=false;
        this.moveable=false;

        this.isSelected=false;
        this.oldX = 0;
        this.oldY = 0;

        this.contentContainer=new diyeditor.Container();
        this.addChild(this.contentContainer);

        this.setSelectable(data.parms.selectable=="1");
        this.setMoveable(data.parms.moveable=="1");
        this.setEditable(data.parms.editable=="1");
    }

    var p=diyeditor.extend(EditObject,diyeditor.Container);

    p.handleMouseDown=function(px,py){
        var DiyData=new diyeditor.DiyData();
        DiyData.isMovingObject=true;
        this.select();
    };

    p.handleDragStart=function(px,py){
        this.oldX = px;
        this.oldY = py;
    };

    p.handlePressMove=function(px,py){
        if (this.moveable&&this.isSelect) {
            var offsetx = (px - this.oldX);
            var offsety = (py - this.oldY);
            this.data.parms.x += offsetx;
            this.data.parms.y += offsety;
            this.setContentPos(this.data.parms.x,this.data.parms.y);
            this.oldX = px;
            this.oldY = py;

        }
    };

    p.handleMouseUp=function(px,py){
        var DiyData=new diyeditor.DiyData();
        DiyData.isMovingObject=false;
    };

    p.select=function(){
        this.isSelect = true;
        var event = new diyeditor.Event("select");
        this.dispatchEvent(event);
    };

    p.unselect=function(){
        this.isSelect = false;
    };

    p.setSelectable=function(param){
        this.selectable=param;
    };

    p.getSelectable=function(){
        return this.selectable;
    };

    p.setMoveable=function(param){
        this.moveable=param;
    };

    p.getMoveable=function(){
        return this.moveable;
    };

    p.setEditable=function(param){
        this.editable=param;
    };

    p.getEidtable=function(){
        return this.editable;
    };

    p.setContentPos=function(px,py){
        this.x=px;
        this.y=py;
    };

    diyeditor.EditObject=diyeditor.promote(EditObject,"Container");
}());