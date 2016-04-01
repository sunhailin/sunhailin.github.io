domready(function(){
    //_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
    //var heroTmp= _.template(document.getElementById("heroTmp").innerHTML);
    var strHero=["axe","aymw","cj","ck","cx","cz","dn","ds","dy","es","fk","fmj","ga","gb","hm","hsk","jl","jm","jt","klw","lq","lr","mm","mr","pg","rm","sb","siqi","sk","sq","sven","sw","tiny","tm","ud","xd","xg","xm"];
    var agiHero=["am","bh","bs","dg","dh","fj","hjzl","hq","hs","hz","jb","jd","ln","mds","mln","mp","my","pa","sa","sf","slk","sr","ta","ug","vp","vs","xh","xkl","xnj","xq","xz","ym","zz"];
    var intHero=["aa","anmu","bl","bn","br","chen","cl","cm","furion","gf","grz","hl","hn","hx","lbk","lion","ll","lm","lp","lt","mt","od","pk","qop","sd","slf","ss","stl","swxz","sy","tk","tn","wd","wr","wsj","wy","xl","xy","zdr","zs"];
    var allHeroList= _.concat(strHero,agiHero,intHero);
    var allHero={
        strHero:strHero,
        agiHero:agiHero,
        intHero:intHero
    };
    var heroBox=document.getElementById("heroBox");
    start();
    function start(){
        getRandomHero();
        addToDom();
    }
    var heroList=[];
    function getRandomHero(){
        heroList= _.sampleSize(allHeroList,15);
    }
    function addToDom(){

        while(heroBox.firstChild){
            var tempNode=heroBox.removeChild(heroBox.firstChild);
            tempNode=null;
        }
        _.forEach(heroList,function(heroName){
            var li=document.createElement("li");
            li.setAttribute("draggable","true");
            li.id=heroName;
            li.style.backgroundImage="url('img/hero/"+heroName+".png')";
            li.addEventListener("dragstart",onDragStart);
            heroBox.appendChild(li);
        });
        _.times(5,function(){
            var li=document.createElement("li");
            li.className="justifyfix";
            heroBox.appendChild(li);
        });
    }

    function onDragStart(e){
        e.dataTransfer.setData("heroName", e.target.getAttribute("id"));
    }

    addListeners();
    function addListeners(){
        var targetPs=document.getElementById("heroType").getElementsByTagName("p");
        _.forEach(targetPs,function(targetP){
            targetP.addEventListener("dragover",onDragOver);
            targetP.addEventListener("dragenter",onDragEnter);
            targetP.addEventListener("dragleave",onDragLeave);
            targetP.addEventListener("drop",onDrop);
        });
    }

    function onDragOver(e){
        e.preventDefault();
    }

    function onDragEnter(e){
        e.preventDefault();
        e.target.className="target-active";
    }

    function onDragLeave(e){
        e.preventDefault();
        e.target.className="";
    }

    function onDrop(e){
        var targetList=allHero[e.target.getAttribute("data-type")];
        var heroId=e.dataTransfer.getData("heroName");
        var heroNode=document.getElementById(heroId);
        if(targetList.indexOf(heroId)===-1){
            e.target.className="target-error";
            alert("错误，点击确定重新开始");
            start();
        }else{
            e.target.className="target-right";
            heroNode.parentNode.removeChild(heroNode);
            if(heroBox.childNodes.length<=5){
                alert("全部正确，点击确定重新开始");
                start();
            }
        }
        setTimeout(function(){
            e.target.className="";
        },300);
    }
});