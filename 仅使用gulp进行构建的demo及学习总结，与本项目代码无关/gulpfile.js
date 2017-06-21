/**
 * Created by juntingliu2 on 2017/6/1.
 */
var gulp = require('gulp');
var runSequence = require('run-sequence');
var  rev = require('gulp-rev');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var cleanCss = require('gulp-clean-css');// 有url问题。路径会变
var uglify = require('gulp-uglify');
var imageMin = require('gulp-imagemin');
var compileLess = require('gulp-less')
var htmlMin = require('gulp-htmlmin');
var del = require('del');
var clean = require('gulp-clean');
var gutil = require('gulp-util')
var gbabel = require('gulp-babel');
var cssMin = require('gulp-minify-css')


//移动字体文件
gulp.task('moveFont', function() {
    gulp.src('./origin/fonts/*')
        .pipe(gulp.dest('./www/fonts/'))
});

//移动res文件
gulp.task('moveRes', function() {
    gulp.src('./origin/res/**/**/*')
        .pipe(gulp.dest('./www/res/'))
});

//移动spec文件
gulp.task('moveSpecFile', function() {
    gulp.src('./origin/spec/**/**/*')
        .pipe(gulp.dest('./www/spec/'))
});

//移动icon.png文件
gulp.task('moveIcon', function() {
    gulp.src('./origin/icon.png')
        .pipe(gulp.dest('./www/'))
});

//移动spec.html文件
gulp.task('moveSpec', function() {
    gulp.src('./origin/spec.html')
        .pipe(gulp.dest('./www/'))
});

//压缩图片
gulp.task('imageMin', function() {
    gulp.src('./origin/images/**/*')
        .pipe(imageMin())
        .pipe(gulp.dest('./www/images/'))
});

//编译less
gulp.task('compileLess', function() {
    gulp.src('./origin/css/component/**/*.less')
        .pipe(compileLess())
        .pipe(concat({ path: 'component.css'}))
        .pipe(gulp.dest('./origin/css/component/'))
});

//压缩css
gulp.task('uglifyCss', function() {
    gulp.src('./origin/css/**/**/*.css')
        .pipe(cssMin())
        .pipe(gulp.dest('./www/css/'))
});

//压缩js
gulp.task('uglifyJs',function(){
    gulp.src(['./origin/js/**/**/**/*.js', '!./origin/js/external/**/*'])
        /*.pipe(gbabel().on('error', function(err){
            gutil.log(err);
            this.emit('end');
        }))*/
        .pipe(uglify().on('error', function(err){
            gutil.log(err);
            this.emit('end');
        }))
        .pipe(gulp.dest('./www/js/'))
});

//移动js中的external文件
gulp.task('moveJsExternal', function() {
    gulp.src('./origin/js/external/*')
        .pipe(gulp.dest('./www/js/external/'))
});

//移动js中的json文件
gulp.task('moveJson', function() {
    gulp.src('./origin/js/json/*.json')
        .pipe(gulp.dest('./www/js/json/'))
});

//压缩html
gulp.task('uglifyHtml',function(){
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('./origin/html/**/**/**/*.html')
        .pipe(htmlMin(options))
        .pipe(gulp.dest('./www/html'))
});


//开发构建
gulp.task('dev', function (done) {
    condition = false;
    runSequence(
        ['moveFont'],
        ['moveRes'],
        ['moveSpecFile'],
        ['moveIcon'],
        ['moveSpec'],
        ['imageMin'],
        ['compileLess'],
        ['uglifyCss'],
        ['uglifyJs'],
        ['moveJsExternal'],
        ['moveJson'],
        ['uglifyHtml'],
        done);
});

gulp.task('default', ['dev'])


