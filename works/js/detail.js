$(function(){
    document.title=getUrlParam("name");
    var path=getUrlParam("path");
    var imgnum=parseInt(getUrlParam("imgnum"),10);

    var completeArr=[];
    var completeStr;
    var i;
    for(i=0;i<imgnum;i++){
        var imgPath="img/"+path+"/"+(i+1)+".png";
        var divStr='<div class="swiper-slide"><div style="background-image: url('+imgPath+')"></div></div>';
        completeArr.push(divStr);
    }
    completeStr=completeArr.join("");
    $(".swiper-gallery-top").find("div").html(completeStr);
    $(".swiper-gallery-thumbs").find("div").html(completeStr);

    var swiperTop = new Swiper('.swiper-gallery-top',{
        slidesPerView: 1,
        spaceBetween: 10,
        nested: true,
        resistanceRatio: 0,
        preloadImages: false,
        lazyLoading: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev'
    });
    var swiperThumbs = new Swiper('.swiper-gallery-thumbs',{
        slidesPerView: 20,
        spaceBetween: 10,
        centeredSlides: true,
        touchRatio: 0.2,
        slideToClickedSlide: true,
        nested: true,
        resistanceRatio: 0
    });

    swiperThumbs.params.control=swiperTop;
    swiperTop.params.control=swiperThumbs;

    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r) {
            return decodeURIComponent(r[2]);
        }
        return null;
    }
});