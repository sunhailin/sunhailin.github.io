var gulp=require("gulp");
var less=require("gulp-less");
var autoPreFixer=require("gulp-autoprefixer");
var gls=require("gulp-live-server");
var cssnano=require("gulp-cssnano");
var rename=require("gulp-rename");

//var zhihuLessAll="dome/zhihu/css/less/*.less";
//var zhihuLessPath="dome/zhihu/css/less/zhihu.less";
//var zhihuOutCssPath="dome/zhihu/css";
//var zhihuHtmlPath="dome/zhihu/";
//
//gulp.task("zhihuServer", function () {
//    var server=gls.static("/");
//    server.start();
//    gulp.watch([zhihuOutCssPath+"/*.css",zhihuHtmlPath+"/*.html"],function(file){
//        server.notify.apply(server,[file]);
//    });
//});
//
//gulp.task("zhihuLess",function(){
//    gulp.src(zhihuLessPath)
//        .pipe(less())
//        .pipe(autoPreFixer({
//            browsers:["last 2 versions"],
//            remove:true
//        }))
//        .pipe(gulp.dest(zhihuOutCssPath));
//});
//
//gulp.task("zhihuWatchLess",function(){
//    gulp.watch(zhihuLessAll,["zhihuLess"]);
//});

//gulp.task("default",["zhihuServer","zhihuWatchLess"]);

//var domeLessAll="dome/css/less/*.less";
//var domeLessPath="dome/css/less/dome.less";
//var domeOutCssPath="dome/css";
//var domeHtmlPath="dome/index.html";
//
//gulp.task("domeServer", function () {
//    var server=gls.static("/");
//    server.start();
//    gulp.watch([domeOutCssPath+"/*.css",domeHtmlPath],function(file){
//        server.notify.apply(server,[file]);
//    });
//});
//
//gulp.task("domeLess",function(){
//    gulp.src(domeLessPath)
//        .pipe(less())
//        .pipe(autoPreFixer({
//            browsers:["last 2 versions"],
//            remove:true
//        }))
//        .pipe(gulp.dest(domeOutCssPath));
//});
//
//gulp.task("domeWatchLess",function(){
//    gulp.watch(domeLessAll,["domeLess"]);
//});
//
//gulp.task("default",["domeServer","domeWatchLess"]);

//gulp.task("verticalMiddleServer", function () {
//    var server=gls.static("/");
//    server.start();
//    gulp.watch(["dome/verticalMiddle/index.html"],function(file){
//        server.notify.apply(server,[file]);
//    });
//});

//gulp.task("absoluteLayoutServer", function () {
//    var server=gls.static("/");
//    server.start();
//    gulp.watch(["dome/absoluteLayout/*","dome/absoluteLayout/css/*"],function(file){
//        server.notify.apply(server,[file]);
//    });
//});

//gulp.task("dotaServer", function () {
//    var server=gls.static("/");
//    server.start();
//    gulp.watch(["dome/dota/*","dome/dota/css/*"],function(file){
//        server.notify.apply(server,[file]);
//    });
//});

gulp.task("imoocServer", function () {
   var server=gls.static("/");
   server.start();
   gulp.watch(["dome/imooc/*","dome/imooc/css/*"],function(file){
       server.notify.apply(server,[file]);
   });
});

gulp.task("minifyCss",function(){
   gulp.src("dome/imooc/css/course.css")
       .pipe(autoPreFixer({
           browsers:["last 2 versions"],
           remove:true
       }))
       .pipe(rename({suffix:".min"}))
       .pipe(cssnano())
       .pipe(gulp.dest("dome/imooc/css"));
});

gulp.task("watchCss",function(){
   gulp.watch("dome/imooc/css/course.css",["minifyCss"]);
});

gulp.task("default",["imoocServer","watchCss"]);


// gulp.task("weixinServer", function () {
//     var server=gls.static("/");
//     server.start();
//     gulp.watch(["dome/weixin/*","dome/weixin/css/*"],function(file){
//         server.notify.apply(server,[file]);
//     });
// });