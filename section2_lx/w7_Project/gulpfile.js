const gulp = require('gulp')
const babel = require('gulp-babel');
const concat = require('gulp-concat')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
// 引入gulp-sass并指定sass编译器（sass或node-sass）
const sass = require('gulp-sass')(require('sass'))
const browserSync=require('browser-sync')

const filePath = {
    sass:'./src/sass/*.scss',
    js:'./src/js/*.js',
    html:'./src/**/*.html',
    css:'./src/**/*.css'
}

//创建任务：编译sass
const compileSass = function(done){
    // 匹配文件
    gulp.src(filePath.sass)

    // 编译
    .pipe(sass({
        // outputStyle:'compressed'//expanded(默认),compressed
    }).on('error', sass.logError))

    // 输出
    .pipe(gulp.dest('./dist/css'))

    done();
}

const compileJS = function(){
    // gulp.src(['./src/**/*.js','!./src/plugins/jquery.min.js'])
    gulp.src('./src/**/*.js')

    // ES6+ -> ES5：gulp-babel+@babel/core+@babel/preset-env
    .pipe(babel({
        presets: ["@babel/preset-env"],
    }))

    // 合并: gulp-concat
    .pipe(concat('all.js'))

    // 输出：未压缩
    .pipe(gulp.dest('./dist/js'))

    // 压缩：
    .pipe(uglify())
    // 重命名
    .pipe(rename({
        // dirname: "main/text/ciao",
        // basename: "aloha",
        // prefix: "page-", // page-all.js
        suffix: ".min", // all.min.js
        // extname: ".md"
      }))
    .pipe(gulp.dest('./dist/js'))

    done();
}

exports.compileSass = compileSass;
exports.compileJS = compileJS;

// 默认任务
// 调用方式：gulp
exports.default = function(){
    console.log('default')

    // 监听sass
    gulp.watch(filePath.sass,compileSass);

    // gulp.watch(filePath.js,compileJS)


    //开启一个本地服务器
    // 监听所有文件修改，实现浏览器自动刷新
    browserSync({
        // 监听src目录
        server:'./src',

        //端口

        //监听文件类型
        files:[filePath.css,filePath.html]
    })
}