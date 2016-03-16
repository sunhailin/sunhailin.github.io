var gulp=require("gulp");
var less=require("gulp-less");
var autoPreFixer=require("gulp-autoprefixer");

var lessAll="dome/zhihu/css/less/*.less";
var lessPath="dome/zhihu/css/less/zhihu.less";
var outCssPath="dome/zhihu/css";

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