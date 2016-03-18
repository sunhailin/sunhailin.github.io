var gulp=require("gulp");
var less=require("gulp-less");
var autoPreFixer=require("gulp-autoprefixer");
var gls=require("gulp-live-server");

var lessAll="dome/zhihu/css/less/*.less";
var lessPath="dome/zhihu/css/less/zhihu.less";
var outCssPath="dome/zhihu/css";
var htmlPath="dome/zhihu/";

gulp.task("server", function () {
    var server=gls.static("/");
    server.start();
    gulp.watch([outCssPath+"/*.css",htmlPath+"/*.html"],function(file){
        server.notify.apply(server,[file]);
    });
});

gulp.task("less",function(){
    gulp.src(lessPath)
        .pipe(less())
        .pipe(autoPreFixer({
            browsers:["last 2 versions"],
            remove:true
        }))
        .pipe(gulp.dest(outCssPath));
});

gulp.task("watchLess",function(){
    gulp.watch(lessAll,["less"]);
});

gulp.task("default",["server","watchLess"]);