(function(window){
    function GameScene()
    {
        this.Container_constructor();
        this.squareNumArray;
        this.squaresInPosition=[];
        this.tickCount=0;
        this.tickListener;
        this.isGameOver=false;
        this.score=0;
        this.gd=new GlobalData();
        this.bg=new createjs.Container();
        this.bg.x=25;
        this.bg.y=60;
        this.addChild(this.bg);
        this.bgSquares=new createjs.Shape();
        this.bg.addChild(this.bgSquares);
        this.bgDownShape=new createjs.Shape();
        this.bg.addChild(this.bgDownShape);
        this.bg.on("mousedown",this.onBgMouseDown,this);
        this.bg.on("pressup",this.onBgMouseUp,this);
        this.ballContainer=new createjs.Container();
        this.ballContainer.x=25;
        this.ballContainer.y=60;
        this.addChild(this.ballContainer);

        this.timeBarContainer=new createjs.Container();
        this.timeBarContainer.x=30;
        this.timeBarContainer.y=25;
        this.addChild(this.timeBarContainer);
        this.timeBar=new createjs.Shape();

        this.scroeText=new createjs.Text("0", "16px Microsoft Yahei", "#000000");
        var scoreTitle=new createjs.Text("得分:", "16px Microsoft Yahei", "#000000");
        scoreTitle.x=400;
        scoreTitle.y=20;
        this.addChild(scoreTitle);
        this.scroeText.x=450;
        this.scroeText.y=20;
        this.addChild(this.scroeText);

        this.backButton=new SHLTextButton("返回",60,30,"#ffffff",14,"#00cfef","#0093d9");
        this.backButton.x=700;
        this.backButton.y=20;
        this.backButton.on("click",this.onBack,this);
        this.addChild(this.backButton);

        this.init();
        this.initTimeBar();
        this.tickListener=this.on("tick",this.onTick);
    }

    var p=createjs.extend(GameScene,createjs.Container);

    p.init=function()
    {
        this.squareNumArray=new Array(GameScene.HENG*GameScene.SHU);
        var i,j;
        for(i=0;i<GameScene.HENG;i++)
        {
            this.squaresInPosition[i]=new Array();
            for(j=0;j<GameScene.SHU;j++)
            {
                this.squareNumArray[i*GameScene.SHU+j]=i*GameScene.SHU+j;
                var n=i+j;
                var color;
                if(n%2==0)
                {
                    color="#ffffff";
                }
                else
                {
                    if(i%2)
                    {
                        color="#daf5d7";
                    }
                    else
                    {
                        color="#fde4eb";
                    }
                }
                this.bgSquares.graphics.beginFill(color).drawRect(i*25,j*25,25,25).endFill();
                this.squaresInPosition[i][j]=undefined;
            }
        }
        this.bgSquares.cache(0,0,750,375);

        this.bgDownShape.graphics.beginFill("#666").drawRect(0,0,25,25).endFill();
        this.bgDownShape.cache(0,0,25,25);
        //先放在屏幕外，要显示时放到显示的位置
        this.bgDownShape.x=-100;
        this.bgDownShape.y=-100;

        randomSort(this.squareNumArray);
        function randomSort(arr)
        {
            var k;
            for(k=0;k<arr.length;k++)
            {
                var temp;
                var randomIndex=Math.floor(Math.random()*arr.length);
                temp=arr[k];
                arr[k]=arr[randomIndex];
                arr[randomIndex]=temp;
            }
        }

        for(i=0;i<10;i++)
        {
            var color=i+1;
            for(j=0;j<20;j++)
            {
                var ball=new Ball(color);
                var p=this.squareNumArray[20*i+j];
                var posX=parseInt(p/GameScene.SHU);
                var posY=p%GameScene.SHU;
                ball.x=posX*25;
                ball.y=posY*25;
                this.squaresInPosition[posX][posY]=ball;
                this.ballContainer.addChild(ball);
            }
        }
    };

    p.initTimeBar= function ()
    {
        var timeText=new createjs.Text("剩余时间", "14px Microsoft Yahei", "#000000");
        timeText.y=-5;
        this.timeBarContainer.addChild(timeText);
        var b=new createjs.Shape();
        b.x=60;
        b.graphics.setStrokeStyle(1).beginStroke("#ff9999").beginFill("#ffffff");
        b.graphics.drawRect(0,0,240,10);
        b.graphics.endFill();
        this.timeBarContainer.addChild(b);
        this.setTimerBar(1);
        this.timeBar.x=60;
        this.timeBarContainer.addChild(this.timeBar);
    };

    p.setTimerBar=function(p)
    {
        this.timeBar.graphics.clear();
        this.timeBar.graphics.beginFill("#ff3333");
        this.timeBar.graphics.drawRect(1,1,238*p,8);
        this.timeBar.graphics.endFill();
    };

    p.onBgMouseDown=function(e)
    {
        var posX=parseInt(e.localX/25);
        var posY=parseInt(e.localY/25);
        if(this.squaresInPosition[posX][posY])
        {
            return;
        }
        if(this.isGameOver)
        {
            return;
        }
        this.bgDownShape.x=posX*25;
        this.bgDownShape.y=posY*25;
        var isWrong=true;
        var squareWithBall=this.getTargetBalls(posX,posY);
        var tempScore=0;
        for(var i=0;i<squareWithBall.length;i++)
        {
            var b=squareWithBall[i];
            for(var j=0;j<squareWithBall.length;j++)
            {
                var b1=squareWithBall[j];
                if(b.color==b1.color&&j!=i)
                {
                    this.ballContainer.addChild(b);
                    b.beginFall();
                    this.squaresInPosition[b.x/25][b.y/25]=undefined;
                    isWrong=false;
                    tempScore++;
                    break;
                }
            }
        }

        if(isWrong)
        {
            this.tickCount+=30;
            this.updateTickCount();
            if(this.gd.isSoundOn)
            {
                createjs.Sound.play("wrongSound");
            }
        }

        if(tempScore)
        {
            this.score+=tempScore;
            this.updateScore();
            if(this.gd.isSoundOn)
            {
                createjs.Sound.play("rightSound");
            }
        }
    };

    p.onBgMouseUp=function(e)
    {
        this.bgDownShape.x=-100;
        this.bgDownShape.y=-100;
    };

    p.getTargetBalls=function(i,j)
    {
        var squareWithBall=[];
        var n;
        var s;
        for(n=j-1;n>=0;n--)
        {
            s=this.squaresInPosition[i][n];
            if(s)
            {
                squareWithBall.push(s);
                break;
            }
        }
        for(n=j+1;n<GameScene.SHU;n++)
        {
            s=this.squaresInPosition[i][n];
            if(s)
            {
                squareWithBall.push(s);
                break;
            }
        }
        for(n=i-1;n>=0;n--)
        {
            s=this.squaresInPosition[n][j];
            if(s)
            {
                squareWithBall.push(s);
                break;
            }
        }
        for(n=i+1;n<GameScene.HENG;n++)
        {
            s=this.squaresInPosition[n][j];
            if(s)
            {
                squareWithBall.push(s);
                break;
            }
        }

        return squareWithBall;
    };

    p.onTick=function(e)
    {
        this.tickCount++;
        if(this.tickCount%30==0)
        {
            this.updateTickCount();
        }
    };

    p.updateTickCount=function()
    {
        this.setTimerBar(1-this.tickCount/3600);

        if(this.tickCount>=3600)
        {
            this.off("tick",this.tickListener);
            this.gameOver();
        }
    };

    p.updateScore=function()
    {
        var gd=new GlobalData();
        gd.scroe=this.score;
        this.scroeText.text=this.score;
    };

    p.gameOver=function()
    {
        this.isGameOver=true;
        this.dispatchEvent(new createjs.Event("gameover"));
    };

    p.onBack=function(e)
    {
        this.dispatchEvent(new createjs.Event("backbutton"));
    };

    GameScene.HENG=30;
    GameScene.SHU=15;
    window.GameScene=createjs.promote(GameScene,"Container");
}(window));