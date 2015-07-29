
var canvas=document.getElementById("test");
var stage=new createjs.Stage(canvas);

var canvasWidth=canvas.width;
var canvasHeight=canvas.height;

window.addEventListener("resize",resize,false);

function resize(e)
{
    canvasWidth=canvas.width=window.innerWidth-3;
    canvasHeight=canvas.height=window.innerHeight-3;
}

resize();

createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener("tick",stage);

var mainView=new createjs.Container();
stage.addChild(mainView);

var diyManager=new DiyManager();
mainView.addChild(diyManager.container);

diyManager.addImage("images/test.jpg");
diyManager.addImage("images/test1.png");
diyManager.addImage("images/test2.jpg");
diyManager.addImage("images/test3.jpg");


//var button=new SHLButton("images/addPhotoUp.png","images/addPhotoDown.png");
//button.x=0;
//button.y=0;
//button.addEventListener("click",onButtonClick);
//mainView.addChild(button);

var bigger=new SHLTextButton("放大",50,20,"#ffffff",14,"#999999","#66666");
bigger.on("click",onButtonClick);
mainView.addChild(bigger);

var smaller=new SHLTextButton("缩小",50,20,"#ffffff",14,"#999999","#66666");
smaller.on("click",onButtonClick);
smaller.x=50;
mainView.addChild(smaller);

var left=new SHLTextButton("左转",50,20,"#ffffff",14,"#999999","#66666");
left.on("click",onButtonClick);
left.x=100;
mainView.addChild(left);

var right=new SHLTextButton("右转",50,20,"#ffffff",14,"#999999","#66666");
right.on("click",onButtonClick);
right.x=150;
mainView.addChild(right);

var up=new SHLTextButton("上移",50,20,"#ffffff",14,"#999999","#66666");
up.on("click",onButtonClick);
up.x=200;
mainView.addChild(up);

var down=new SHLTextButton("下移",50,20,"#ffffff",14,"#999999","#66666");
down.on("click",onButtonClick);
down.x=250;
mainView.addChild(down);

function onButtonClick(e)
{
    console.log(e.currentTarget.buttonText);
    switch (e.currentTarget.buttonText)
    {
        case "放大":
            diyManager.bigger();
            break;
        case "缩小":
            diyManager.smaller();
            break;
        case "左转":
            diyManager.turnLeft();
            break;
        case "右转":
            diyManager.turnRight();
            break;
        case "上移":
            diyManager.changeIndexZ(1);
            break;
        case "下移":
            diyManager.changeIndexZ(-1);
            break;
    }
}


