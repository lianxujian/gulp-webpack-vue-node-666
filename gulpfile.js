var gulp = require("gulp");
var gutil = require('gulp-util');
var concat = require('gulp-concat')
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");
var webpackConfigDev = require("./webpack.config.dev.js");
var WebpackDevServer = require("webpack-dev-server");
var path = require("path");
var fs = require("fs");
var opn = require('opn')


/**
 * 使用测试配置打包，启动hot dev server
 */
gulp.task('webpack-dev', function () {
    var config = Object.create(webpackConfigDev);
    //这两项配置原本是在webpack.config.dev.js里边配置，可是通过gulp启动devserver，那种配置无效，只能在此处写入
    //官网的解释是webpack-dev-server没有权限读取webpack的配置
    config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/only-dev-server");
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    var compiler = webpack(config);
    new WebpackDevServer(compiler, {
        contentBase:  "./",
        publicPath: "/dist/",
        quiet: true,// 控制台中不输出打包的信息
        stats: {colors: true},
        historyApiFallback: true,
        noInfo: false,
        //都不生效
        /*inline: true,
        port: 8080,
        hot: true,
        open: true, */
       /* compress: false // 开启gzip压缩,设置了sources-map用不到*/
    }).listen(8080, "localhost", function (err) {
        if (err) {
            throw new gutil.PluginError('webpack-dev-server', err);
        }
        opn('http://localhost:8080/')
        gutil.log('[webpack-dev-server]', 'http://localhost:8080/index.html');
    });
});

/**
 * 使用正式配置打包
 */
gulp.task('webpack-build', function () {
    var config = Object.create(webpackConfig);
    config.plugins.push(new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }));
    webpack(config, function (err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack", err);
        }
        gutil.log("[webpack]", stats.toString({}));
    });
    //移动入口页
    gulp.src('./index.html')
        .pipe(gulp.dest('./server/client/'))

});


gulp.task("dev", ["webpack-dev"]);
gulp.task("build", ["webpack-build"]);