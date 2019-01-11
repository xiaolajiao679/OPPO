
const gulp = require("gulp");
// 完成html页面的拷贝
gulp.task("copy-html",function(){
	return gulp.src("*.html")
	.pipe(gulp.dest("dist"))
	.pipe(connect.reload());
})
// 图片拷贝
gulp.task("images",function(){
	return gulp.src("*.{jpg,png}")
	.pipe(gulp.dest("dist/images"))
	.pipe(connect.reload());
})
// 数据拷贝
gulp.task("data",function(){
	return gulp.src(["*.json","!package.json"])
	.pipe(gulp.dest("dist/data"))
	.pipe(connect.reload());
})
gulp.task("build",["copy-html","images","data"],function(){
	console.log("编译完成");
})
// 拷贝css文件
gulp.task("css",function(){
	return gulp.src("*.css")
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})
// 处理scss文件
const scss = require("gulp-scss");
const minifyCSS = require("gulp-minify-css");
const rename = require("gulp-rename")
;

gulp.task("scss",function(){
	return gulp.src("stylesheet/index.scss")
	.pipe(scss())
	.pipe(gulp.dest("dist/css"))
	.pipe(minifyCSS())
	.pipe(rename("index.min.css"))
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})

// 拷贝JS文件
gulp.task("scripts",function(){
	return gulp.src(["*.js","!gulpfile.js"])
	.pipe(gulp.dest("dist/js"))
	.pipe(connect.reload());
})

// 添加监听
gulp.task("watch",function(){
	gulp.watch("*.html",["copy-html"]);
	gulp.watch("*.{jpg,png}",["images"]);
	gulp.watch(["*.json","!package.json"],["data"]);
	gulp.watch("stylesheet/index.scss",["scss"]);
	gulp.watch(["*.js","!gulpfile.js"],["scripts"]);
	gulp.watch("*.css",["css"]);
})


// 启动服务，实时刷新
const connect = require("gulp-connect");
gulp.task("server",function(){
	connect.server({
		root: "dist",
		port: 8888,
		livereload: true
	})
})


// 设置默认任务
gulp.task("default",["watch","server"]);