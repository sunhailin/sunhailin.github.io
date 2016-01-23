$(function(){
    var minSpeed=0.5;
    var maxSpeed=1;
    var totalCircleNumber=30;
    var circleMinSize=5;
    var circleMaxSize=20;
    var circleColor="#ccc";
    var circleOpacity=0.5;
    var lineColor="#ccc";
    var lineOpacity=0.8;
    var outSize=100;
    var fadeDistance=300;
    var breakDistance=500;

    var isP=isPhone();
    if(isP){
        totalCircleNumber=15;
        outSize=50;
        fadeDistance=400;
        breakDistance=600;
    }

    function Circle(){
        this.speed=0;
        this.speedX=0;
        this.speedY=0;
        this.x=0;
        this.y=0;
        this.radius=0;
        this.shape=undefined;
        this.connectCircles=[];
        this.lines=[];
    }

    //
    //var $canvas=$("#circles").find("canvas");
    //var canvas=$canvas[0];
    if(isP){
        $canvas.addClass("canvasTransform");
        canvas.width=$(window).width()*2;
        canvas.height=$(window).height()*2;
    }else{
        canvas.width=$(window).width();
        canvas.height=$(window).height();
    }

    $(window).resize(function(){
        if(isP){
            canvas.width=$(window).width()*2;
            canvas.height=$(window).height()*2;
        }else{
            canvas.width=$(window).width();
            canvas.height=$(window).height();
        }
    });

    var stage=new createjs.Stage(canvas);
    var circleContainer=new createjs.Container();
    stage.addChild(circleContainer);
    var circles=[];
    var lineContainer=new createjs.Container();
    stage.addChild(lineContainer);
    initCircles();
    initLines();
    createjs.Ticker.framerate=60;
    createjs.Ticker.on("tick",stageUpdate);

    function initCircles(){
        var i;
        for(i=0;i<totalCircleNumber;i++){
            var circle=new Circle();
            circle.x=$canvas.width()*Math.random();
            circle.y=$canvas.height()*Math.random();
            circle.speed=minSpeed+(maxSpeed-minSpeed)*Math.random();
            circle.speedX=circle.speed*Math.random();
            circle.speedY=Math.sqrt(circle.speed*circle.speed-circle.speedX*circle.speedX);
            if(Math.random()>0.5){
                circle.speedX=-1*circle.speedX;
            }
            if(Math.random()>0.5){
                circle.speedY=-1*circle.speedY;
            }
            circle.radius=circleMinSize+(circleMaxSize-circleMinSize)*Math.random();
            circle.shape=new createjs.Shape();
            circle.shape.graphics.beginFill(circleColor).drawCircle(0,0,circle.radius);
            circle.shape.alpha=circleOpacity;
            circle.shape.x=circle.x;
            circle.shape.y=circle.y;
            circleContainer.addChild(circle.shape);
            circles.push(circle);
        }
    }

    function initLines(){
        var i;
        var j;
        var l=circles.length;
        for(i=0;i<l;i++){
            var circle1=circles[i];
            circle1.connectCircles=[];
            for(j=i+1;j<l;j++){
                if(i!==j){
                    var circle2=circles[j];
                    var line=new createjs.Shape();
                    lineContainer.addChild(line);
                    circle1.connectCircles.push(circle2);
                    circle1.lines.push(line);
                }
            }
        }
    }

    function stageUpdate(){
        updateCirclePosition();
        updateLine();
        stage.update();
    }

    function updateCirclePosition(){
        var i;
        var l=circles.length;
        for(i=0;i<l;i++){
            var circle=circles[i];
            circle.x+=circle.speedX;
            circle.y+=circle.speedY;
            if(circle.x<-1*outSize||circle.x>canvas.width+outSize){
                circle.speedX=-1*circle.speedX;
            }
            if(circle.y<-1*outSize||circle.y> canvas.height+outSize){
                circle.speedY=-1*circle.speedY;
            }
            circle.shape.x=circle.x;
            circle.shape.y=circle.y;
        }
    }

    function updateLine(){
        var i;
        var j;
        var l=circles.length;
        for(i=0;i<l;i++){
            var circle1=circles[i];
            var ll=circle1.connectCircles.length;
            for(j=0;j<ll;j++){
                var circle2=circle1.connectCircles[j];
                var line=circle1.lines[j];
                line.graphics.clear();
                var dis=distance(circle1,circle2);
                var alphaParam=1;
                if(dis>breakDistance){
                    continue;
                }else if(dis>fadeDistance){
                    alphaParam=1-(dis-fadeDistance)/(breakDistance-fadeDistance);
                }
                line.alpha=lineOpacity*alphaParam;
                line.graphics.beginStroke(lineColor).moveTo(circle1.x,circle1.y).lineTo(circle2.x,circle2.y);
            }
        }
    }

    function distance(circle1,circle2){
        return Math.sqrt(Math.pow(circle1.x-circle2.x,2)+Math.pow(circle1.y-circle2.y,2));
    }

    function isPhone(){
        var isPhone=false;
        if(document.hasOwnProperty("ontouchstart")){
            isPhone=true;
        }
        var u = navigator.userAgent;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        if(isiOS||isAndroid){
            isPhone=true;
        }
        return isPhone;
    }
});