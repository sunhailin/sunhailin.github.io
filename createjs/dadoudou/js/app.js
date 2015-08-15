window.onload=function()
{
    var canvas=document.getElementById("myCanvas");
    var stage=new createjs.Stage("myCanvas");
    if(createjs.Touch.isSupported())
    {
        createjs.Touch.enable(stage);
    }
    createjs.Ticker.setFPS(30);
    //createjs.Ticker.addEventListener("tick",stage);
    createjs.Ticker.addEventListener("tick",function(e)
    {
        stage.update();
    });

    var gd=new GlobalData();
    gd.stage=stage;
    gd.canvas=canvas;

    //init bg
    var bg=new createjs.Container();
    stage.addChild(bg);
    var i;
    for(i=0;i<40;i++)
    {
        var rx=canvas.width*Math.random();
        var ry=canvas.height*Math.random();
        var rd=30+30*Math.random();
        var circle=new createjs.Shape();
        circle.graphics.beginFill("rgba("+Math.round(255*Math.random())+","+Math.round(255*Math.random())+","+Math.round(255*Math.random())+","+0.5*Math.random()+")");
        circle.graphics.drawCircle(rx,ry,rd);
        circle.graphics.endFill();
        circle.cache(-rd+rx,-rd+ry,2*rd,2*rd);
        bg.addChild(circle);
    }

    //preload
    var resource=new createjs.LoadQueue();
    resource.installPlugin(createjs.Sound);
    var manifestLoader=new createjs.LoadQueue();
    manifestLoader.on("fileload",function(e){
        resource.on("complete",onResourceComplete);
        resource.loadManifest(e.result,true,"assets/")
    },this,true);
    manifestLoader.loadManifest("assets/manifest.json");

    function onResourceComplete(e)
    {
        console.log("resource load complete");
        gd.resource=resource;
        initMenu();
    }


    var menuScene;
    function initMenu()
    {
        if(menuScene==null)
        {
            menuScene=new MenuScene();
            menuScene.on("restart",onRestart);
            menuScene.on("setting",onSetting);
            menuScene.on("introduction",onIntroduction);
        }
        stage.addChild(menuScene);
    }

    function onRestart(e)
    {
        console.log("restart");
        if(menuScene.parent!=null)
        {
            menuScene.parent.removeChild(menuScene);
        }
        if(resultScene!=null&&resultScene.parent!=null)
        {
            resultScene.parent.removeChild(resultScene);
        }
        initGame();
    }

    function onSetting(e)
    {
        console.log("setting");
        if(menuScene.parent!=null)
        {
            menuScene.parent.removeChild(menuScene);
        }
        initSetting();
    }

    function onIntroduction(e)
    {
        console.log("introduction");
        if(menuScene.parent!=null)
        {
            menuScene.parent.removeChild(menuScene);
        }
        initInroduction();
    }

    var gameScene;
    function initGame()
    {
        if(gameScene!=null)
        {
            gameScene=null;
        }
        gameScene=new GameScene();
        gameScene.on("gameover",onGameOver);
        gameScene.on("backbutton",onBack);
        gd.scroe=0;
        stage.addChild(gameScene);
    }

    function onGameOver(e)
    {
        console.log("gameOver");
        if(gameScene!=null&&gameScene.parent!=null)
        {
            gameScene.parent.removeChild(gameScene);
            gameScene=null;
        }
        initResult();
    }

    function onBack(e)
    {
        console.log("gameBack");
        if(gameScene!=null&&gameScene.parent!=null)
        {
            gameScene.parent.removeChild(gameScene);
            gameScene=null;
        }
        if(resultScene!=null&&resultScene.parent!=null)
        {
            resultScene.parent.removeChild(resultScene);
        }

        if(introductionScene!=null&&introductionScene.parent!=null)
        {
            introductionScene.parent.removeChild(introductionScene);
        }
        if(settingScene!=null&&settingScene.parent!=null)
        {
            settingScene.parent.removeChild(settingScene);
        }
        initMenu();
    }

    var resultScene;
    function initResult()
    {
        if(resultScene!=null)
        {
            resultScene.setScroe(gd.scroe);
        }
        else
        {
            resultScene=new ResultScene(gd.scroe);
            resultScene.on("backbutton",onBack);
            resultScene.on("restart",onRestart);
        }
        stage.addChild(resultScene);
    }

    var introductionScene;
    function initInroduction()
    {
        if(introductionScene!=null)
        {

        }
        else
        {
            introductionScene=new IntroductionScene();
            introductionScene.on("backbutton",onBack);
        }
        stage.addChild(introductionScene);
    }

    var settingScene;
    function initSetting()
    {
        if(settingScene!=null)
        {

        }
        else
        {
            settingScene=new SettingScene();
            settingScene.on("backbutton",onBack);
        }
        stage.addChild(settingScene);
    }
};
