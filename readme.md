## 1.server目录
带有node后端服务以及打包出的前端代码client

## 2.src前端开发代码
存放vue和vue-router等整个前端的项目代码

## 3.仅使用gulp进行构建的demo。。。
学习gulp的资料，与本项目代码无关，供参考，可忽略。

## 4.gulpfile.js
gulp的配置文件

## 5.package.json
记录打包依赖的模块，以及调试、打包的命令

## 6.webpack.config.dev.js
开发环境的webpack配置文件

## 7.webpack.config.build.js
生产环境的webpack配置文件，可进行调试

## 8.webpack.config.release.js
生产环境的webpack配置文件，不可调式

## 9.使用方法
### 9.1前端开发
在根目录运行 npm run dev
浏览器自动打开，http://localhost:8080/index.html，可自己修改，插件实现了热更新功能
开发过程无需重新执行命令重启服务。
demo是一个简单的vue项目，

### 9.2打包代码
根目录运行 npm run build
生成代码在server/client/dist中
index入口页，gulp任务复制到了server/client中，也可以通过webpack插件实现该任务
index.html基本无需修改

### 9.3打包发布版本代码
根目录运行 npm run release
生成代码在server/client/dist中
通过webpack插件生成相应的index入口页

### 9.4启动服务
build任务完成后，npm run start启动服务
浏览器中打开http://localhost:3100/可以查看效果

### 9.5快捷命令
npm run build-start打测试包并启动服务
npm run release-start打线上包并启动服务

浏览器中打开http://localhost:3100/可以查看效果
安装mongodb
创建data／db
sudo chown -R $USER /data/db
mac启动 mongod 连接mongo
