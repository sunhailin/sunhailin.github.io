$(document).ready(function(){
    console.log("window loaded");

    //init stage
    var container=document.getElementById("canvasContainer");
    var canvas=document.getElementById("editorCanvas");
    var stage=new createjs.Stage(canvas);
    var editView;

    createjs.Ticker.framerate=30;
    createjs.Ticker.addEventListener("tick",stage);

    //set globaldata
    var globalData=new GlobalData();
    globalData.stage=stage;


    //load page data
    $.get("data/page.json",{},function(data,textStatus){
        if(textStatus=="success")
        {
            globalData.pageData=data.pages[0];
            console.log(globalData.pageData);
            //set canvas size
            canvas.height=globalData.pageData.height;
            canvas.width=globalData.pageData.width;
            globalData.pageWidth=globalData.pageData.width;
            globalData.pageHeight=globalData.pageData.height;
            globalData.ratio=globalData.pageData.width/globalData.pageData.height;
            manageScreenSize();

            editView=new EditView();
            stage.addChild(editView);

        }
    },"json");
    //根据窗口大小进行缩放
    function manageScreenSize()
    {
        if(createjs.Touch.isSupported())
        {
            createjs.Touch.enable(stage);
        }
        if(typeof window.orientation!="undefined")
        {
            window.onroientationchange=onOritationChange;
            onOritationChange();
        }
        else
        {
            window.onresize=onResize;
            onResize();
        }
    }

    function onOritationChange()
    {
        setTimeout(onResize,100);
    }

    function onResize()
    {
        console.log("resize");
        var Wwidth=window.innerWidth;
        var Wheight=window.innerHeight;
        console.log(Wwidth,Wheight);
        alert(Wwidth+"-----"+Wheight);
        if(Wwidth/Wheight>globalData.ratio)
        {
            globalData.scale=Wheight/globalData.pageData.height;
            container.style.left=(Wwidth-globalData.pageWidth*globalData.scale)/2+"px";
            container.style.top="0px";
        }
        else
        {
            globalData.scale=Wwidth/globalData.pageData.width;
            container.style.top=(Wheight-globalData.pageHeight*globalData.scale)/2+"px";
            container.style.left="0px";
        }
        canvas.setAttribute("style","-webkit-transform:scale("+globalData.scale+")");
        canvas.setAttribute("style","-moz-transform:scale("+globalData.scale+")");
        canvas.setAttribute("style","transform:scale("+globalData.scale+")");
        window.scrollTo(0,0);
    }


    //canvas元素与html元素交互

    $("#editButton").click(function()
    {
        if(editView)
        {
            var selectObject=editView.getSelectObject();
            if(selectObject instanceof TextObject)
            {
                var remodal = $('[data-remodal-id=modal]').remodal();
                $("#fontSize").text(selectObject.getFontSize());
                $("#textInput").val(selectObject.getText()).css("font-size",selectObject.getFontSize());
                remodal.open();
            }
        }
    });
    $(document).on("confirmation",".remodal",function()
    {
        var selectObject=editView.getSelectObject();
        if(selectObject instanceof TextObject)
        {
            selectObject.setText($("#textInput").val());
        }
    });
    $("#smaller").click(function()
    {
        changeFontSize(-1);
    });
    $("#bigger").click(function()
    {
        changeFontSize(1);
    });
    function changeFontSize(p)
    {
        var selectObject=editView.getSelectObject();
        if(selectObject instanceof TextObject)
        {
            var currentSize=parseInt(selectObject.getFontSize());
            currentSize=currentSize+p;
            if(currentSize<=0)
                currentSize=1;

            $("#fontSize").text(currentSize);
            $("#textInput").css("font-size",currentSize);
            selectObject.setFontSize(currentSize);
        }
    }

    //$("#textOkButton").click(function()
    //{
    //    if(editView)
    //    {
    //        editView.setSelectText($("#textEditor").val());
    //    }
    //});

    //添加清除、加载侦听
    $("#clearButton").click(function()
    {
        if(editView)
        {
            editView.clear();
        }
    });
    $("#loadPageButton").click(function()
    {
        if(editView)
        {
            editView.addEditObjects();
        }
    });
    $("#outputButton").click(function()
    {
        console.log(JSON.stringify(globalData.pageData));
    });


});

