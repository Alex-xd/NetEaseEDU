var gulp=require("gulp"),sass=require("gulp-sass"),cleanCss=require("gulp-clean-css"),autoprefixer=require("gulp-autoprefixer"),uglify=require("gulp-uglify"),concat=require("gulp-concat"),rename=require("gulp-rename"),clean=require("gulp-clean"),sourcemaps=require("gulp-sourcemaps"),plumber=require("gulp-plumber"),imagemin=require("gulp-imagemin"),pngquant=require("imagemin-pngquant"),spritesmith=require("gulp.spritesmith"),cache=require("gulp-cache"),browserSync=require("browser-sync"),reload=browserSync.reload,livereload=require("gulp-livereload");gulp.task("sass",function(s){return gulp.src("static/sass/**/*.scss").pipe(plumber()).pipe(sass()).pipe(gulp.dest("static/css"))}),gulp.task("css",["sass"],function(s){}),gulp.task("live",function(){livereload.listen(),gulp.watch("static/**/*.*").on("change",function(s){livereload.changed(s.path)})}),gulp.task("css-watch",["sass"],function(){console.log("正在监视 scss 及 css 文件变动");var s=gulp.watch("static/sass/**/*.scss",["sass"]);s.on("change",function(s){console.log("事件路径： "+s.path+" 事件类型： "+s.type+", 正在执行的任务：css tasks")})}),gulp.task("js-optimize",function(s){return gulp.src("src/static/js/**/*.js").pipe(concat("all.js")).pipe(gulp.dest("dist/js/tmp")).pipe(rename("all.min.js")).pipe(uglify()).pipe(gulp.dest("dist/js"))}),gulp.task("js",["js-optimize"],function(s){gulp.src("src/js/others/*.js").pipe(gulp.dest("dist/js/others")),console.log("js 文件移动处理完毕！")}),gulp.task("js-watch",["js"],function(){console.log("正在监视 js 文件变动");var s=gulp.watch("src/js/**/*.js",["js"]);s.on("change",function(s){console.log("事件路径： "+s.path+" 事件类型： "+s.type+", 正在执行的任务：style")})}),gulp.task("jc",function(){console.log("正在监视 js 及 样式 文件变动");var s=gulp.watch("src/@(js|css)/**/*.@(js|scss)",["js","css"]);s.on("change",function(s){console.log("事件路径： "+s.path+" 事件类型： "+s.type+", 正在执行的任务：js 及 样式")})}),gulp.task("img",function(){return gulp.src(["src/static/img/**/*.{png,jpg,gif}"]).pipe(plumber()).pipe(cache(imagemin({progressive:!0,use:[pngquant()]}))).pipe(gulp.dest("dist/img"))}),gulp.task("sprite",function(){return gulp.src("src/img/tmp/!(sprite.png|*.css)").pipe(spritesmith({imgName:"ico.png",cssName:"sprite.css"})).pipe(gulp.dest("src/img"))}),gulp.task("serve",function(){browserSync.init({proxy:"deva.dev",port:3001,open:"ui",ui:{port:3005}})});