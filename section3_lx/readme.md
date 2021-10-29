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

## day1-2

### 复习
* 缓存
    * 强制缓存：200
    * 协商缓存：304

### 知识点
* 跨域
    * CORS
        * 复杂跨域
    * JSONP：json with pending
        1. 定义全局函数
         
        2. 利用script标签发起请求
            * script标签没有跨域限制
            * script标签请求必须得到js代码
        3. 服务器响应js代码
            * js代码为：执行**全局函数**,并传递数据
        ```html
            <script src="http://localhost:2108/js/home.js"></script>

            <script scr="http://localhost:2108/api/jsonp"></script>
        ```
        * 缺点
            * 只能get请求
            * jsonp并不是ajax请求
    > JSONP与CORS都需要服务器的支持

    * 服务器代理
        > http-proxy-middleware
    * 爬

* 页面渲染方式
    * 客户端渲染Browser Side Rendering(BSR)
        >利用ajax请求数据，然后在客户端生成html结构的渲染方式
        * 前后端分离
        * 优点
            * 用户体验
            * 局部刷新
        * 缺点
            * SEO不友好
        * 请求步骤
            1. 请求空的html
            2. 请求js代码
            3. 发起ajax请求
            4. 渲染页面
    * 服务器渲染Server Side Rendering(SSR)
        > 在服务器生成html结构，然后返回给前端渲染
        * 优点
            * 有利于SEO
            * 速度快
        * 请求步骤
            1. 请求服务器，得到一个完整的html结构
            2. 渲染页面
    > 实际开发中的方案：首页采用SSR，其他页面采用BSR

    * 在NodeJS中如何实现
        * 客户端渲染
        * 服务端渲染
            * 模板引擎
                * ejs
                * jade/pug

### 练习
* 配合bootstrap完成goodslist与goods页面（SSR）
* 完成登录、注册（SSR）

## day1-3

### 复习
* 跨域解决方案
    * JSONP
    * CORS
    * 服务器代理
        * 正向代理
            >代理服务器为客户端服务
        * 反向代理
            >代理服务器为服务器服务，反向代理用户一般无法感知代理服务器的存在
            * 负载均衡
* BSR与SSR
* 模板引擎
    * ejs
    * jade/pug

### 知识点
* 文件上传
    * 前端：发送
        > multipart/form-data
        * `<form enctype="multipart/form-data">`
        * FormData
            * set(name,value)
            * append(name,value)
            * delete(name)
            * get(name)
            * getAll(name)
    * 后端：接收
        > 使用multer模块格式化`multipart/form-data`类型数据，把文件数据格式化到`req.file`或`req.files`

* try...catch
    > 使用try...catch可以避免当代码出现错误时影响后续代码继续执行
    ```js
        try{
            //尝试执行这里的代码
        }catch{
            //如果以上代码有错误或promise对象的状态为Rejected则执行这里的代码
        }
    ```

* 加密
    * 单向加密
        > 加密后不可解密
        * 加密算法
            * md5
            * sha1
            * sha256
            * sha512
            * ...
        * 缺点
            * 不能反向解密但可以暴力破解
                > 解决方案：
                * 加盐
                * 多次加密
    * 双向加密
        > 密钥
        * 对称加密
            > 加密和解密共用一个密钥
        * 非对称加密
            > 公钥+私钥
    * crypto
    * 应用
        * https: ssl

        ```
            //明文传输
            http://localhost:2108/index.html

            //密文传输
            https://qq.com
        ```

## day1-4

### 复习
* 文件上传
    * 前端代码
        * `multipart/form-data`
        * FormData
            * set()
            * append()
        * base64
            > 把图片转成base64编码后再传到服务器
        ```html
            <!-- 表单 -->
            <form action method enctype>
                <input type="file" id="upload" multiple />
            </form>

            <!-- ajax -->
            const fdata=new FormData()
            xhr.send(fdata)
        ```
    * 后端代码
        > 安装：npm i multer
        ```js
            const multer=require('multer')
            const upload=multer({dest or storage,fileFilter,limits})
        ```

* 加密解密
    * base64编码(65个合法字符：[a-zA-Z0-9/+=])
    * 单向加密
    * 双向加密
        * 对称加密
        * 非对称加密（公钥+私钥）
    * NodeJS
        * crypto
        ```js
            //password->password2
            123456->xxxxx

            // 加盐
            123456->密钥->密文
            123456->adc->密文
        ```

### 知识点
* 数据库：Database
    * 关系型数据库
        * 概念
            * 表：table
            * 记录：row
        * 常用关系型数据库
            * Oracle
            * MySQL/MariaDB
            * SQL Server
            * PostgrcSQL
            * DB2
    * 非关系型数据库
        * MongoDB
            * 集合：collection
            * 文档：document
        
* MongoDB
    ```js
        //user集合
        [
            {username:'sada',age:21,hobby:'足疗'}
            {username:'vnk',age:21,password:12345,tag:['手打师','xxx']}
            {username:'yui'}
        ]
    ```
    * 命令行操作
        * 操作数据库
        * 操作集合
        * 操作文档：CRUD
            * 增：
                * insertOne(document)
                * insertMany([document...])
            * 删:
                * deleteOne(query)
                * deleteMany(query)
            * 改：
                * updateOne(query,newData)
                * updateMany(query,newData)
                * save(document)
                ```js
                    db.user.updataOne(
                        //条件
                        {id:ObjectId('fghjk5612121')},
                        {
                            // 把username改成jingjing
                            $set:{username:'jingjing'},
                            // 把qty在原来的基础上+1
                            $inc:{qty:1},
                            //给hobby数组添加'唱歌'
                            $push:{hobby:'唱歌'},
                            //给hobby数组添加"唱歌"并自动去重
                            $addToSet:{hobby:'唱歌'}
                        }
                    )
                ```
            * 查：
                * find(query,project)
                * findOne(query,project)
            * 可视化工具
                * compass
                * 导入与导出
                * 查询条件
                    >删、改/查出需要使用条件
                    ```js
                        //mysql 写法
                        // select * from user where id=1
                        //mongoDB 写法
                        db.user.find({id:1})
                        //select * from user where id=1 or name=laoxie
                        db.user.find({$or:[{id:1},{name:'laoxie'}]})
                        // select * from user where age>18
                        db.user.find({age:{$gt:18}})

                        //批量
                        //delete from user where id in(2,4,6,8)
                        //delete from user where id in(select userid from cart where qty>0)
                        db.user.deleteMany({id:{$in:[2,4,6,8]}})

                        //正则表达式
                        db.user.deleteMany({username:/laoxie/i})

                        //过滤与条件限制
                        //select * from goods limit 0,10
                        db.goods.find({}).skip(0).limit(10)
                        //select * from goods order by price desc limit 0,10
                        db.goods.find().sort({price:-1}).skip(0).limit(10)
                    ```
    * 在NodeJS中使用MongoDB
        * 驱动
            * mongodb（官方）
            * mogoose
                > 基于mongodb驱动的封装
        * mongodb驱动
            ```js
                //连接数据库
                const url='mongodb://127.0.0.1:27017'
                mongodb.MongoClient.connect(url,callback)
            ```
        * 封装mongodb操作
            * create()
            * remove()
            * update()
            * find()  


* Set集合
    ```js
        const myset = new Set(); // 与数组类似，能自动去重
        myset.add(10); // [10]
        myset.add(20)   // [10,20]
        myset.add(30) ; // [10,20,30]
        myset.add(10) ; // [10,20,30]
        myset.add('10') ; // [10,20,30,'10']
        myset.add({a:1,b:2}) ; // [10,20,30,'10',{a:1,b:2}]
        myset.add({a:1,b:2}) ; // [10,20,30,'10',{a:1,b:2},{a:1,b:2}]
    ```

### 练习 
* 完成create,remove,update的封装


## day1-5
* 通过getElementsByTagName()获取到的元素如何使用forEach循环
    * HTMLCollection  
    * NodeList
### 面试题
* 通过getElementByTagName()获取到的元素如何使用forEach循环
    * HTMLCollection  动态列表
    * NodeList        静态列表
```js
    <button>btn1</button>
    <button>btn2</button>
    <button>btn3</button>
    <button>...</button>
    <button>btn10</button>
    const btns=document.getElementsByTagName('button')//10个button

    // for循环遍历节点
    for(let i=0;i<btns.length;i++>){
        btns[i].onclick=function(){}
    }

    // 报错：forEach is not a function
    btns.forEach(function(btn,idx){
        btn.onclick=function(){}
    })

    //call 或 apply实现任意方法的调用
    Array.prototype.forEach.call(btns,function(btn,idx,arr){
        btn.onclick=function(){}
    })
    Array.prototype.map.call(btns,function(item,idx){
        return item.innerText;
    });//['btn1','btn2','btn3',...,'btn10']


    // 模拟封装forEach封装
    // 调用：[10,20,30].forEach(function(item,idx,arr){})
    Array.prototype.forEach=function(callback){
        for(let i=0;i<this.length;i++){
            callback(this[i],i,this)
        }
    }

    //模拟map封装
    Array.prototype.map=function(callback){
        let arr=[];

        for(let i=0;i<this.length;i++){
            arr.push(callback(this[i],i,this))
        }
        return arr;
    }

    [10,20,30].forEach((item,idx,arr)=>{

    })

    //判断数据类型
    typeof [];//object
    Object.prototype.toString.call(arr);//[Object Array]

    [1,2,3].toString();//1,2,3

    let arr=[1,23,456,45,89,0,15]
    Math.max(...arr)
    Math.max.apply(null,arr)
```
## 打印执行代码需要的时间
    ```js
        console.time('date')
        for(let i=0;i<1000;i++){

        }
        console.timeEnd('date')
    ```

### 复习
* mongodb
    * 概念
        ```
                        数据库      表/集合
            MySQL       database    table
            mongodb     database    row
        ```
    * 操作
        * 命令行操作
            * 操作database
            * 操作collection
            * 操作document
            ```js
                use h52108
                db.user.find()
            ```
        * 可视化工具操作
            * MongoDB   Compass
            * Robo 3T
        * NodeJS中操作
            * 官方驱动：mongodb
            ```js
                const db=client.db('h52108')
                const col = db.collection('user')
                col.find()
            ```
    * 导入导出
        * 可视化工具
        * 命令行
            * mongimport
            * mongoexport
    * 备份恢复
        * mongodump
        * mongorestore

* 判断是否为数组：Array.isArray()
* 把伪数组转成数组
    > 假设btns是一个伪数组
    * `[...btns]`
    * `Array.form(btns)`

* npm script
    > package.json下的script
    * 运行命令:npm run xxx
    * script:npm start
    * test:npm test

### 练习
* 完成商品CRUD接口
* 完成用户CRUD接口
* 完成注册登录接口
* 了解后台管理系统