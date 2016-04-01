(function(){
    var funcList=[];
    var hasListener=false;
    var inited=false;
    window.domready=function(func){
        if(inited){
            func();
            return;
        }
        if(funcList.indexOf(func)===-1){
            funcList.push(func);
        }
        if(hasListener){

        }else{
            window.addEventListener("load",complete,false);
            document.addEventListener("DOMContentLoaded",complete,false);
            hasListener=true;
        }
    };

    function complete(){
        window.removeEventListener("load",complete,false);
        document.removeEventListener("DOMContentLoaded",complete,false);
        funcList.forEach(function(func){
            func();
        });
        inited=true;
    }
})();