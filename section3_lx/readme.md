# 三阶段

## day1-1：NodeJS

### 复习
* 静态资源服务器
    * 静态资源：html,css,js,img,...
    * 内置模块
        * http
        * url
        * path
        * fs

* http请求
    >一个http请求，就是从一台设备访问另一台设备的过程
    * 客户端：client
    * 服务端：server
    * 一个完整的http请求
        >只能从客户端发起请求，服务器被动响应，响应完成客户端与服务端断开连接（短连接）
        * 请求request：客户端->服务端
        * 响应response：服务端->客户端

* 模块化
    * 规范
        * commonJS      nodejs（2009）
        * ES Module     ES6（2015）
        * AMD           require.js  
        * CMD           sea.js
    * 分类
        * 内置模块
        * 自定义模块
        * 第三方模块
            >安装到node_modules,引入方式与内置模块一致
    * 导入
        * require()
            >require一个目录，package.json{main}->index.js
    * 导出
        * modules.exports
        exports

* express
    * 中间件middleware
    * 中间件分类
        * 内置中间件
            * express.static()
            * express.urlencoded()
            * express.json()
            * express.Router()
        * 自定义：`Function(request,response,next)`
        * 第三方中间件
    * 编写接口：RESTful规范
        * 请求类型：post,delete,put/patch,get
        * 传参
            * url
                * search参数：?name=value&name=value
                    >接收：req.query
                * 动态路由
                    >接收：req.params
            * request body请求体:
                >接收:req.body
                * x-www-form-urlencoded:name=value&name=value
                * json
            * request header请求头
                >接收：req.get()
                * cookie:cookie-parser
* 数据库：mysql
    * 命令行
    * 可视化工具
    * 在nodeJS中操作mysql
        * 驱动：mysql

### 知识点
* express
    * 模块化路由
        * express.Router()
    * 缓存
        * 强制缓存：200 from memory cache
            >文件还在缓存有效期内,浏览器会强制使用缓存
        * 协商缓存：304
            >文件缓存有效期已过，浏览器发请求给服务器询问文件是否有修改
    * 跨域
        * 为什么会存在跨域限制（同源策略）：处于安全原因考虑，默认不允许跨域访问
        * 跨域解决方案
            * CORS
                * 简单跨域：`Access-Contorl-Allow-Origin`
                * 复杂跨域：
                    * `Access-Contorl-Allow-ORigin`
                    * `Access-Contorl-ALlow-Methods`
                    * `Access-Control-Allow-Headers`