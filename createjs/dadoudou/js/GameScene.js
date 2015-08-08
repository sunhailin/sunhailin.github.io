(function(window){
    function GameScene()
    {
        this.Container_constructor();
        this.squares=[];
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
        var i,j;
        for(i=0;i<GameScene.HENG;i++)
        {
            this.squaresInPosition[i]=[];
            for(j=0;j<GameScene.SHU;j++)
            {
                var square=new Square(i,j);
                square.x=i*25;
                square.y=j*25;
                square.on("click",this.onSquareClick,this);
                this.bg.addChild(square);
                this.squares.push(square);
                this.squaresInPosition[i][j]=square;
            }
        }
        this.squares.sort(function(a,b){
            return Math.random()>0.5?1:-1;
        });

        for(i=0;i<10;i++)
        {
            var color=i+1;
            for(j=0;j<20;j++)
            {
                var ball=new Ball(color);
                var s=this.squares[20*i+j];
                s.setball(ball);
                ball.x= s.x;
                ball.y= s.y;
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

    p.onSquareClick=function(e)
    {
        if(e.currentTarget.getHasBall())
        {
            return;
        }
        if(this.isGameOver)
        {
            return;
        }
        var isWrong=true;
        var squareWithBall=this.getTargetBalls(e.currentTarget.heng, e.currentTarget.shu);
        var tempScore=0;
        for(var i=0;i<squareWithBall.length;i++)
        {
            var s=squareWithBall[i];
            for(var j=0;j<squareWithBall.length;j++)
            {
                var s1=squareWithBall[j];
                if(s.ball.color==s1.ball.color&&j!=i)
                {
                    this.ballContainer.addChild(s.ball);
                    s.ball.beginFall();
                    s.setHasBall(false);
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

    p.getTargetBalls=function(i,j)
    {
        var squareWithBall=[];
        var n;
        var s;
        for(n=j-1;n>=0;n--)
        {
            s=this.squaresInPosition[i][n];
            if(s.getHasBall())
            {
                squareWithBall.push(s);
                break;
            }
        }
        for(n=j+1;n<GameScene.SHU;n++)
        {
            s=this.squaresInPosition[i][n];
            if(s.getHasBall())
            {
                squareWithBall.push(s);0
                break;
            }
        }
        for(n=i-1;n>=0;n--)
        {
            s=this.squaresInPosition[n][j];
            if(s.getHasBall())
            {
                squareWithBall.push(s);
                break;
            }
        }
        for(n=i+1;n<GameScene.HENG;n++)
        {
            s=this.squaresInPosition[n][j];
            if(s.getHasBall())
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
        this.updateTickCount();
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