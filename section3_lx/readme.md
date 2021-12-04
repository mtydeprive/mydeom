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


## day2-1

### 知识点
* 编写服务器代码
    * 静态资源服务器
    * 数据接口
    * 代理服务器
* 封装工具函数
* 网络协议
    * TCP/UDP
    * http/https
        * 单向
            > 只能客户端发起请求,服务器被动响应
        * 短连接
            > keep-alive
    
    * 网页版微信（实时通信）：hhtps
        * 微信消息发送流程：用户->服务器->用户
            * 轮询
                > 在客户端不断发起请求，询问服务器是否有新的消息
                * 缺点：通常会发送很多无用请求，既浪费带宽。又消耗服务器CPU资源
                ```js
                    setInterval(()=>{
                        // 用户->服务器
                    },1000)

                    //用户-》服务器-》没有新消息
                    //用户-》服务器-》没有新消息
                    //用户-》服务器-》没有新消息
                    //用户-》服务器-》有新消息
                ```
            * 长轮询
                > 对轮询的一种优化
                ```js

                    setTimeout(function getMessage(){
                        ajax()
                        // 用户-》服务器
                        // 如果有新消息，直接返回
                        // 如果无新消息，则挂起请求（不响应），直到有新消息才返回

                        if(有消息返回|超时){
                            setTimeout(getMessage,500)
                        }
                    },1000)

                    //getMessage() //报错

                    //用户-》服务器-》没有新消息（挂起）
                    //用户-》服务器-》有新消息
                    //用户-》服务器-》没有新消息（挂起）
                    // 用户-》服务器
                ```
            * websocket

## day-2

### 知识点
* 实时通讯
    * 轮询
    * 长轮询
    * websocket
* websocket 
    * 服务端
        > ws模块/socket.io
        * 使用步骤
            1. 安装引用
                ```
                    npm install ws
                ```
            2. 创建websocket服务器
                 ```js
                     let socketServer=require('ws').Server;
                     let wsSever=new socketServer(  {port:1001});
                 ```
            3. 监听客户端
                ```js
                    //监听连接
                    wsServer.on('connection',(client)=>{
                        //监听消息发送
                        client.on('message',(msg)=>{

                        })
                        client.on('close',()=>{

                        })
                    })
                ```
            4. 给客户端发送消息
                > wsServer.clients
                ```js
                    client.send()
                ```
    * 客户端
        > websocket
        * 特点:
            * 双向
            * 长连接
            * 没有跨域限制
        * 事件
            * message
            * open
            * close
            * error
        * 方法
            * send()
            * close()
        * 使用步骤
            1. 连接websocket服务器（实例化websocket对象）
                ```js
                    const socket=new WebSocket(`ws://localhost:1001`);
                ```
            2. 监听服务器消息
                ```js
                    socket.onmessage=function(e){
                        //e.data
                    }
                ```
            3. 给服务器发送消息
                > 只能发送字符串与二进制数据类型
                    ```js
                        socket.send()
                    ```
* node.scollIntoView()  把node节点滚动到可视区域

## day2-3

### 面试题
* v-show与v-if的区别
    > 有频繁显示、隐藏的操作建议使用v-show

### 知识点
* Vue使用
    * 安装 
        * 官网下载
        * npm
        * script标签引用在线代码
    * 版本
        * 按环境分
            * 开发版本：developement
                > 为压缩，包含调试信息代码
            * 生产版本：production
                > 压缩、合并，删除调试、提示代码

* 架构分层
    > 复杂的软件必须有清晰合理的架构，更容易开发，维护和测试，所以需要进行分层
    * 视图层
    * 数据层
    * 控制层

    * MVC
        * M：Model      数据模型
        * V：View       视图
        * C：Controller 控制器
    * MVP
        * M：Model
        * V：View
        * P：Presenter  优化后的控制器
    * MVVM
        * M：Model
        * V：View
        * VM：ViewModel 控制器

* Vue指令
    > 指令：一种特殊的标签属性
    * v-bind    绑定数据到属性
    * v-on      绑定事件
    * v-model   双向数据绑定
    * v-for     遍历啥时间
    * v-show    是否显示

* 数据绑定
    * 单向绑定
        > Model -> View
        * {{}}  绑定数据到标签内容
        * v-bind 绑定数据到标签属性
* 列表渲染：v-for
    > 可遍历数组，对象，字符串，数字，和一些可迭代的数据
    * `v-for="item in data"`    等效于原生js中的for...in循环
    * `v-for="item of data"`    等效于原生js中的for...of
    ```js
        // 循环语句
        for(let i=0;i<10;i++){}
        for(let key in obj){ //obj={a:10,b:20}
            // key:索引、键
        }
        while(num>5){

        }
        for(let item of data){
            //map,set,modelist,htmlcollection,String,array...
        }
    ```
* 条件渲染
    * v-show
    * v-if/v-else/v-else-if

* 响应式属性
    * 特点：能监听到数据变化，当数据被修改时，会自动更新页面视图
    * 原理：
        * 对象：存储器属性(getter & setter)
            > Vue实例化时，Vue会递归遍历data中的所有属性，如果是普通属性，则通过`Object.defineProperty()`把它们设置为存储器属性（getter & setter），并写入Vue实例
        * 数组：重写数组原型
            > Vue实例化时，Vue会递归遍历data中所有属性，如果是数组，则重写数值原型，在重写的数组原型中声明了`push,pop,shift,unshift,spplice,sort,reverse`
            ```js
                hobby.__proto__={
                    push(){
                        //渲染视图
                        render()
                    }
                    __proto__:Array.prototype
                }

                vm.hobby.push()
                vm.hobby.forEach()
            ```
    * 在vue中如何设置响应式属性
        * 初始化设置data数据
        * Vue.set(target,pro,value)
            > target不能是vm实例，也不能是data根属性
            ```js
                //以下为错误操作
                Vue.set(vm,'gender','男')
                Vue.set(vm.$data,'gender','男')
            ```
* 编程思维的改变
    * 节点操作思维 ->数据操作思维（数据驱动）

## day2-4

### 面试题
* computed与methods、watch、data的区别
    > computed计算属性是基于它们的依赖进行缓存的。计算属性computed只有在它的相关依赖发生改变时才会重新求值。这就意味着只要计算依赖的值还没有发生改变，多次访问计算属性会立即返回之前的计算结果，而不必再次执行函数。而对于method ，只要发生重新渲染，method 调用总会执行该函数。
    * computed vs methods   优先使用computed
    * computed vs watch     优先使用computed

### 复习
* 指令
    * v-bind
    * v-on
    * v-mobel
    * v-show
    * v-for
    * v-if/v-else/v-else-if
* 数据绑定
    * 单向
        * {{}}
        * v-bind:attr
            > style,class
    * 双向
        * v-model
            * 语法糖：v-bind:value + v-on:input
        * 原理：单向+事件
    
* 事件绑定：v-on
    > 格式：v-on:click="事件处理函数或事件处理函数中的代码"
    ```js
        <button v-on:click="handle"></button>
        <button v-on:click="handle(10)"></button>
        <button v-on:click="index=id"></button>
    ```
* 列表渲染：v-for
    > data 可以是数组，对象，字符串，数字，可迭代的数据
    * v-for="item in data"
    * v-for="item of data"
* 条件渲染
    * v-show
    * v-if
    * 三元运算
* 响应式属性
    * 原理
        * 对象
        * 数组

    * 属性特性
        * 值属性
        * 存储器属性
            * get
            * set
    * 如何添加响应式属性
        * 初始化时在data中设置
        * Vue.set(target,prop,value)

### 知识点
* ref 引用
    > 通过`this.$refs.xxx`获取引用
* 实例化选项
    * el
    * data
    * methods
    * computed  计算属性
        * 原理：getter+setter，特点：缓存
        ```js
            const data={
                a:10
            }
            const vm=new Vue({
                computed:{
                    checkAll(){
                        return true
                    },
                    checkAll:{
                        get(){
                            return data.a
                        },
                        set(val){
                            data.a=val;
                        }
                    }
                }
            })
            vm.checkAll
            vm.checkAll=false;
        ```
    * watch     监听属性修改
        > 能监听实例下的属性（包括子属性）
* 修饰符
    > 指令完整格式：v-name：参数。修饰符="值"
    * 事件修饰符：`v-on:事件类型.修饰符`
        * 按键修饰符
            * let,up,right,down
            * enter
            * tab
            * esc
            * space
        * 鼠标事件修饰符
            * stop
            * prevent
            * capture
            * self 只当在event.target 是当前元素自身时触发处理函数(**e.target**===**e.currentTarget**)
                * e.target:触发事件的元素
                * e.currentTarget：绑定事件的元素
            * once 事件将只会触发一次
        * v-model 修饰符
            * lazy      input触发改成change触发
            * number    输出值为number类型
            * trim      自动清楚前后空格
* 简写指令
    * v-on:     ->  @
    * v-bind:   ->  :
* 事件：v-on:click="handle"
    * event: 事件处理函数的第一个参数
        * $event
    * 参数
        > v-on:click="事件处理函数(参数)"

## day2-5

### 知识点
* 梳理与总结
    ```js
        const vm=new Vue(options)
    ```
    * 类(构造函数)：Vue
        * 属性
        * 方法（全局方法、静态方法）
            * Vue.set()
            * Vue.delete()
    * 实例/原型：vm/Vue.prototype
        * 属性
            * 内置属性
                > `$`开头
                * $refs
            * 私有属性
                > `_`开头
            * 自定义属性
                > 来源于data，computed，methdos等
        * 方法
            * $set()
            * $delete()
            * $watch()
        * 实例化选项
            * el
            * data
            * methods
            * computed
            * watch
        * 指令
            * v-bind    -> :
            * v-model
            * v-on      -> @
            * v-for 
            * v-show
            * v-if/v-else-if/v-else
            * v-text
            * v-html
                >  实际开发中要慎用v-html，避免XSS（跨域脚本攻击），只有确认html内容安全的情况下才使用v-html（不要用v-html直接显示用户输入的内容）
* 组件化开发
    * 模块化
        * 复用
        * 分工
        * 维护
    * 什么是组件化
        > 在模块化的基础上把一些相关操作组合到一起使用的开发模式，组件化开发就是把一个大的模块拆分成若干个独立的小模块，然后再组装起来实现一个完整功能的开发模式
    * 为什么要组件化
        * 为了更好的复用代码
        * 为了更容易一分工
        * 为了后期更方便维护
    * 如何做组件化
        * 学会划分组件
        * 学会定义组件
        * 学会使用组件
* 定义组件
    > 一个组件就是一个Vue的实例，所有组件拥有与Vue实例几乎一致的配置选项
    * 全局组件：Vue.component(name,options)
    * 局部组件：components:{name:options}
    * options选项
        * 没有el
        * data必须为函数类型：为了复用，每个组件实例必须为独立存在的
* 组件的使用
    > 定义一个组件就相当于创建一个标签
* 组件要求
    * data必须为function类型
    * 每个组件必须只有一个根元素
    * 注册时组件名可以是kebab-case或PascalCase，但在html页面上使用时，必须写成遵循W3C规范中的自定义组件名(字母全小写或包含一个连字符)

* 组件渲染
    > 组件渲染过程
    1. 先查找是否符合提供render，有则渲染，否则进入第2步
    2. 查找是否有template，有则把template中的内容编译到render，无则报错
    * render：组件渲染函数
        * createElement(name,props,children)创建虚拟节点（对象）
            * name：节点名称
            * props：节点属性
            * children：子节点
        ```js
            {
                render(createElement){
                    return createElement()
                }
            }
        ```
    * template:组件模板
        > Vue中自带一个编译器，编译器会把template中的代码编译到render函数中生成虚拟节点
* 根实例渲染
    > 根实例渲染过程 
    1. 先查找是否有**render**，有则渲染，无则进入第2步
    2. 查找是否有**template**，有则把template编译到render，没有进入第3步
    3. 把**el**的outerHTML(标签本身+innerHTML)作为template

* 组件通讯
    > 每一个组件都是相互独立的，要使用其他组件的数据，必须采用通讯方式传递数据
    * 父->子：把数据从父组件传入组件
        1. 父组件操作：给子组件定义属性，并传递父组件数据
        2. 子组件操作：通过props选项接收父组件数据，props中的数据会自动写入组件实例
        ```js
        // todolist -> todofooter
        // todolist -> todocontent -> todoitem          
        ```
    * 子->父：
        * 方式一：父组件方法传递到子组件执行，并回传数据
            1. 父组件操作：定义一个函数，并通过props传递到子组件
            2. 子组件操作：接收传入函数，并在合适的位置执行，并回传数据
        * 方式二：自定义事件（推荐）
            1. 父组件操作：给子组件自定义事件（如:v-on:show），并使用父组件的方法做为事件处理函数（handle）
            2. 子组件操作：通过$emit()触发自定义事件并传递数据
        * 兄弟->兄弟（了解）
            * 方式一
                1. 组件A -> 父组件
                2. 父组件 -> 组件B
            * 方式二：状态提升
                > 把共享数据放到他们共同的父级
        * 深层级组件通讯
            * 方式一：逐层传递（不推荐）
                > 繁琐、痛苦
            * 方式二：Bus事件总线
                > 利用自定义事件+触发实现深层及组件通讯
                1. 创建Bus实例
                2. 绑定事件
                    > 在需要数据组件绑定事件
                3. 触发事件，并传递数据
                    > 在有数据的组件触发事件

* 实例方法
    * $on()     绑定事件
    * $off()    移除事件
    * $emit()   触发事件

* ref
    > this.$refs
    * 用在普通标签：得到该标签对应的**节点**引用
    * 用在组件中：得到该组件对应的**实例**引用

* 单向数据流
    > 谁的数据谁来修改
    * 在todolist组件中修改datalist会影响todolist组件
    * 反之不行，不能在todofooter中修改父组件传入的数据
    ```js
        <todolist> --{datalist}-> <todofooter>
    ```
* 双向数据流
    >可以在任意位置修改数据

### 练习
* 完成选择数据功能
* 完成批量操作功能

## day3-1

### 复习
* 组件化开发
    * 定义
        > 一个组件就是一个Vue实例，拥有与Vue实例化时几乎一致的配置选项
        * 全局：Vue.component(name,options)
        * 局部：components:{name:options}


        > 定义一个组件相当于创建一个标签，并创建了一个**组件实例**，每一个组件都是一个**独立模块**
    * options 配置选项
        * data必须为函数形式
        * 没有el
        * render
        * template

        ```js
            //Vue实例
            const vm=new Vue(options)

            Vue.prototype.a=100;

            Vue.component('parent',{
                data(){
                    return{name:'component'}
                },
                template:`<div>{{name}}-{{a}}<child></child></div>`,
                components:{
                    child:{}
                }
            });
            // jQuery(); //new jQuery.fn.init()
        ```
    * 使用
        >
        ```js
            <parent>
            </parent>
        ```
    * 通讯  
        * 父->子：props
        * 子->父：
            * 把父组件的方法传到子组件中执行
            * 自定义事件
        * 兄弟->兄弟
            * 状态提升
        * 深层级组件通讯
            * 父逐层传递到子（不推荐）
            * Bus事件总线

### 知识点
* 依赖注入 provide/ inject
    > provide共享的数据不是响应式的（但如果提供的数据是引用数据类型，且引用数据是响应式的，则也能实现响应式通讯）
    1. 父组件操作：父组件定义provide，并共享数据
    2. 子组件操作：通过inject注入provide共享的数据

* 利用组件层级操作
    * 在子组件中修改父组件数据
        * 方式一：把父组件方法传入子组件中执行
        * 方式二：自定义事件（把父组件方法作为事件处理函数）
            > this.$emit()
            语法糖：v-bind：qty=sect
        * 方式三：在子组件中直接通过父组件实例修改
            > 
        ```js
            <pranet></parnet>
            {
                data(){
                    return{
                        qty:10
                    }
                },
                  // 方式一: this.changeQty()
                template:`<child :qty="qty" :changeQty="changeQty"></child>`

                // 方式二：this.$emit('change')
                template:`<child :qty="qty" v-on:change="changeQty"></child>`

                // 方式二语法糖：等效于<child v-bind:qty="qty" v-on:update:qty="qty=$event">
                // 子组件操作：this.$emit('update:qty',10)
                template:`<child v-bind:qty.sync="qty"></child>`
                methods:{
                    changeQty(){
                        this.qty++
                    }
                }
            }

            <child></child>
            {
                props:['qty'],
                data(){
                    //不能修改父组件传入的props
                    //this.qty++

                    //通过父组件实例修改它的数据，执行它的方法
                    // 父组件实例
                    return{

                    }
                }
            }
        ```
    * 在父组件中修改子组件数据
        * 方式一：$children(不推荐)
            > 必须拿到对应索引值
        * 方式二：ref
            > ref用在组件上得到该组件实例的引用

* 组件封装
    * 非props属性(attrs,组件实例中通过$attrs获取)
        > 父组件传递数据，但子组件不接收，此类属性会自动成为组件根节点的html属性(可通过{inheriAttrs:false}关闭)
    * v-bind无参数绑定
        ```js
            <button v-bind="{a:10,b:60}"></button>
            //等效于
            <button v-bind:a="10" v-bind:b="60"></button>
        ```
    * props数据类型校验
        * type
        * required
        * default
        * validator

### 练习
* 完成按钮封装
    * 可定制化
        * 颜色
        * 块级按钮
        * 大小
        * 线框按钮
    * 事件绑定

## day3-2

### 复习
* 依赖注入
    * provide
    * inject
* 利用组件层级实现父子组件操作
    * 在父组件操作子组件
    * 子组件操作父组件
* 组件封装
    * 组件通讯
    * props数据类型校验
    * 非props（attr）
        * setAttrbute()/attr()
        * 点语法：node.idx=10/prop()
            ```js
                node.id='box'
                img.src=
            ```
* v-bind无参数绑定
    > 指令完整格式：v-name:参数.修饰符="值"
    > v-model="username" -> v-bind:value + v-on:input

###  知识点
* 插槽：`<slot></slot>`
    * 插槽默认值：当不使用插槽时显示的内容
    * 默认插槽
        > 默认插槽也有一个名字：default
    * 具名插槽：有名字的插槽`<slot name="xxx"/>`
        * name
        * v-slot -> 简写：#
    * 作用域插槽
        > 利用v-slot的值实现子组件数据往父组件传递，实现特殊定制

* 插槽与props的区别
    * props：把数据传入组件，然后在组件中生成html结构
    * 插槽：在父组件生成html结构再传入子组件

* VueCLI(vue command line interface)
    > webpack + babel
    * 安装
        ```js
            npm install -g @vue/cli
        ```
    * 创建项目
        ```bash
            # 命令行创建项目
            vue create <projectName>

            # 可视化界面创建项目
            vue ui
        ```
    * vue单文件组件
        * template
        * script
            * render
        * style

* 版本
    * 按环境分
        * 开发版本development:vue.js,vue.development.js
            > 未压缩，包含调试信息代码
        * 生产版本production:vue.min.js,vue.production.js
            > 压缩、合并，删除调试，提示代码
    * 按模块化规范分
        * commonJS: vue.common.js
        * ESmodule:vue.esm.js
        * AMD
        * CMD
        * UMD   通用模块化规范(支持以上模块和全局引用方式)
    * 按编译方式分
        * 完整版（运行时版+编译器）：vue.js
            > template选项 -> render
        * 运行时版(rentime): vue.runtime.js
            > 使用`vue-template-compiler`把`<tempalte>->render`

* ESModule
    > ES6推出的模块化开发规范，把一个文件当做一个模块，一个模块的作用域是独立作用域，如何想要读取某个模块中的数据，必须导入导出（**只能在服务器环境中使用，只能引入js文件**）
    * 导入：`import <module> from <url>`
        * url:模块地址，必须为相对路径或绝对路径
        ```js
            import username from './user.js'
        ```
    * 导出：`export`
        > export后只能跟`function`、`class`、`var`、`let`、`const`、`default`、`{}`
        ```

        ```
### 练习
* 利用插槽重写todolist
* 移植todolist到vueCLI项目

## day3-3

### 复习
* ESModule
    > 只能在服务器环境下使用
    * 导入：import
        * url 相对路径或绝对路径，只能引入js，只支持静态导入
        ```js
            // commonJS
            require('./js/a.js')
            const path='./js/a.js'
            require(path)

            //ESModole
            import a from './js/a.js'
            import a from path;// 不支持

            //在webpack下进行了处理，所以支持以下写法
            import Vue from 'vue'
            import App from './App.vue'
            import a from './js/a'

            //引入目录
            //1.查看目录中是否存在package.json中的module/main
            //2.若无package.json，则引用目录下的index.js
            import b from './js'
        ```
    * 导出：export
* VueCLI
    * webpack
    * 单文件组件
        * template
        * script
        * style
* 插槽
    > 可定制化

### 知识点
* 生命周期
    * 搞懂以下问题
        * 搞懂执行过程
        * 搞懂有几个阶段
        * 搞懂开发者在Vue的生命周期过程中能做什么
    * 阶段
        > 每个阶段都有相应的钩子函数（生命周期函数），这些函数在执行到相应的阶段时自动执行，用户可以在钩子函数中实现一些效果
        * 创建阶段
            > 初始化操作，注入属性，设置响应式属性
            * beforeCreate
            * created
        * 挂载阶段
            > 把渲染函数生成的虚拟节点挂在页面形成真实节点
            * beforeMount
            * mounted
        * 更新阶段
            > 虚拟DOM的重渲染与打补丁
            * beforeUpdate
            * updated
        * 销毁阶段
            > 当执行$destroy()/v-if时，切断所有的监听器和父子组件关系
            * beforeDestroy -> Vue3:beforeUnmount
            * destroyed -> Vue3:Unmounted

* 虚拟节点
    > 虚拟节点（Vistual Node）：一个结构类似于真实节点的js对象
    * 页面渲染过程：
        * 原生：节点操作 -> 页面渲染
        * Vue：数据修改 -> diff算法对比虚拟节点前后状态 -> (得到差异的虚拟节点) -> 真实节点操作 -> 页面渲染
            * 有效减少节点操作数量
            * 异步更新：在一个时间周期内，所有的修改都进行合并
            * diff算法
        * 虚拟节点对比
            > Vue会对比虚拟节点前后状态得到差异项
            * 如何对比
                * 只对比同级虚拟节点
                * 根据类型进行对比
                * 根据key值进行对比
                    > 如没有提供key值，则按顺序对比
    ```js
        // 原生
        <div id="box">
            <span>1</span>
            <strong>1</strong>
        </div>
        for(let i=1;i<=100;i++){
            box.innerText=i;
        }

        //Vue
        <div>
            <span>{{qty}}</span>
            <strong>1</strong>
        </div>
        data:{
            qty:1
        }
        for(let i=1;i<=100;i++){
            vm.qty=i;
        }
        {
            type:'div',
            attrs:{},
            props:{},
            chilren:[
                {type:'span',chilren:'100'}
                {type:'strong',chilren:'1'}
                 {
                    type:'ul',
                    chilren:[
                        {type:'li',children:'A',key:1}
                        {type:'li',children:'B',key:2}
                        {type:'li',children:'C',key:3}
                    ]
                },
                {type:'p',children:'A'},
                {type:'p',children:'B'},
                {type:'p',children:'C'},
            ]
        }
        //虚拟节点最终状态
        {
            type:'div',
            attrs:{},
            props:{},
            chilren:[
                {type:'span',chilren:'100'}
                {type:'strong',chilren:'1'}
                 {
                    type:'ul',
                    chilren:[
                        {type:'li',children:'A',key:1}
                        {type:'li',children:'B',key:2}
                        {type:'li',children:'C',key:3}
                    ]
                },
                {type:'p',children:'C'},
                {type:'p',children:'B'},
                {type:'p',children:'A'},
            ]
        }
    ```

## day3-4

### 知识点
* 单页面应用SPA(Single Page Application)
    > 整个应用只有一个页面
    * 多视图的单页Web应用
* 多页面应用MPA(Multiple Page Application)
    > 传统效果，页面需要用链接进行跳转，跳转后页面会刷新

* VueRoutr 路由
    1. 安装vue-router
        ```js
            npm install vue-router
        ```
    2. 引入vue-router
        ```js
            import VueRouter from 'vue-router' 
        ```
    3. 安装路由插件
        ```js
            Vue.use(VueRouter)
        ```
    4. 实例化路由，并配置参数
        ```js
            const router = new VueRouter()
        ```
    5. 把路由实例注入Vue
        > 注入后，会给所有的组件添加`$router`与`$route `属性
        * $router:路由实例
        * $route:当前路由对象（保存着路由所有信息）
        ```js
            new Vue({
                ...
                router:router
            })
        ```
    6. 在组件中使用
        * 使用`<router-view/>`显示路由组件
        * 使用`<router-link/>`跳转路由
    * hash（哈希路由）
        > 根据hash值的变化显示不同的内容，实现单页面多视图的效果
        * 原理：window下的hashchange事件
    * 路由跳转(导航)
        * 声明式导航：使用`<router-link/>`跳转路由
        * 编程式导航：使用js代码实现导航
            * $router
                * push()        跳转并产生浏览记录(等效于：`<router-link to/>`)
                * replace()     跳转但不产生浏览记录(等效于：`<router-link to replace/>`)
                * back()        
                * forward()
                * go()
            * $route
        * 路由传参
            > 从一个路由跳到另一个路由时携带参数
            * query参数
                > ?后的参数
                * 传递:
                    ```js
                        $router.push('/search?keyword=xxx')
                        $router.push({
                            path:'/search',
                            query:{
                                keyword:'xx'
                            }
                        })
                    ```
                * 接收:`$route.query.keyword`
            * params
                > params参数在页面刷新后会丢失，动态路由例外
                * 传递
                    ```js
                        //动态路由
                        router.push('/goods/'+id)

                        //必须使用对象形式
                          $router.push({
                            //params传参只支持name跳转
                            name:'Goods'
                            params:{
                                id:'xxx'
                            }
                        })
                    ```
                * 接收：`$route.params.id`

        * 命名路由：给路由起个名字
            ```js
                new VueRouter({
                    routes:[
                        {
                            path:'/home',
                            component:Home,
                            name:'Home'
                        }
                    ]
                })
                $router.push({
                    name:'Home'
                })
            ```

* Vue的UI组件库
    * elementUI     饿了么出品
    * ant-design    蚂蚁金服
    * iView         腾讯出品
    * bootstrap-vue 
    * vantUI        有赞
        1. 安装
            ```js
                npm i vant
            ```
        2. 引入
            * 全部引入
            ```js
                // 引入所有组件
                import Vant from 'vant'

                //引入样式
                import 'vant/lib/index.css'
            ```
            * 按需引入
        3. 安装插件
            > 注册65+的全局组件
            ```js
                Vue.use(Vant)
            ```

* axios


### 练习
* 完成/goods页面
* 完成注册、登录

## day3-5

### 面试题
* Vue组件局部样式的原理
    > 自定义属性(data-v-[hash]) +css属性选择器

### 复习
* 路由传参
    * 跳转传参
        * query
            > 数据持久化
        * params 
            > 刷新后数据丢失（动态路由参数例外）
* axios
    > 基于promise的ajax请求封装
    * 常用方法
        * axios(config)
        * get(url,config)
        * post(url,data,config)
        * put(url,data,config)/patch(url,data,config)
        * delete(url,config)

    * config
        * url 
        * method
        * params    通过url传参(?号后的参数)
        * data      通过请求体传参
            * x-www-from-urlencoded     name=value&nanme=value
            * json                      {"name":"value"}
            * formData
        * headers   通过请求体传参

    * axios二次封装
        * 所有的组件都是Vue的实例
* 组件局部样式
    > `<style scoped>`
    * 原理：自定义属性(data-v-[hash])+css属性选择器
        > Vue组件局部样式：给style添加scoped属性后，Vue组件在编译时会自动给当前组件所有元素添加`data-v-[hash]`属性，并把添加了scoped属性的style标签下的样式添加属性选择器进行精确匹配

* 动态路由跳转
    > /goods/6037755f08f65d3a6c243514（Goods） -> /goods/6037755f08f65d3a6c243516（Goods）
    * 监听动态路由变化
        * watch
            * $route
        * beforeRouteUpdate
            > 在路由**变化前**自动执行

* 路由守卫
    > 类似于组件生命周期函数的钩子函数，与路由相关，只有在路由变化时才执行的函数
    * 与生命周期函数的区别
        * 生命周期函数：在组件创建、销毁、更新时执行
        * 路由守卫：在路由跳转时执行
    * 分类
        * 组件内守卫
            > 写在组件配置中
            * beforRouteUpdate(to,form,next)    一般在路由发生变化且组件复用时触发（动态路由）
            * beforRouteEnter(to,form,next)     进入当前路由时触发
            * beforROuteLeave(to,form,next)     离开当前路由时触发
        * 路由独享守卫
            > 写在路由配置中
            * beforEnter(to,from,next)
        * 全局守卫
            > 是路由实例的方法，一般写在路由配置文件中
            * router.beforeEach(fn)
                * to
                * from
                * next()
            * router.afterEach(fn)
                * to
                * from
            * router.beforeResolve(fn)
                * to
                * from
                * next

    * 参数
        * to        目标路由对象（$route）
        * from      来源路由对象（$route）
        * next      是否放行
    * 路由守卫应用
        * 限制页面访问来源
            * 商品页面只允许从首页、发现购物车、搜索等页面进入
                > 在组件内守卫实现效果
        * 页面需要登录后才能访问
            > 在全局守卫中实现效果
            * 校验用户身份：token（令牌）


* 路由变化时组件渲染过程
    > 路由切换(路由守卫) -> 组件渲染(生命周期函数)
    * 正常切换：`/home (Home失活组件) -> /goods/1 (Goods激活组件)`
        1. 导航被触发。
        2. 在失活的组件里调用beforeRouteLeave离开守卫。
        3. 调用全局的 beforeEach 守卫。
        4. 在路由配置里调用 beforeEnter。
        5. 解析异步路由组件。
        6. 在被激活的组件里调用 beforeRouteEnter。
        7. 调用全局的 beforeResolve 守卫 (2.5+)。
        8. 导航被确认。
        9. 调用全局的 afterEach 钩子。
        10. 触发 DOM 更新。
            > 执行组件生命周期函数
    * 组件复用切换：`/goods (Goods) -> /goods/1 (Goods)`
        1. 导航被触发。
        2. 调用全局的 beforeEach 守卫。
        3. 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)
        4. 解析异步路由组件。
        5. 调用全局的 beforeResolve 守卫 (2.5+)。
        6. 导航被确认。
        7. 调用全局的 afterEach 钩子。
        8. 触发 DOM 更新。
            > 不会执行组件生命周期函数，需要手动处理页面刷新问题

### 练习
* 完成搜索、发现、购物车、注册页面


## day4-1

### 知识点
* 路由重定向:redirect
    * 404页面

* 路由拦截
    * 利用路由守卫实现页面访问权限款酷
    *  用户身份证
        > 在服务器中校验
        * 用户名+密码
            * 繁琐
            * 增加服务器
        * token令牌
            > token:一串加密后的字符串，具有有效期
            * 创建令牌：加密
                > 在服务器创建，并发送给客户端保存
            * 校验令牌：解密
                > 在服务器校验，并返回校验结果给客户端
            * 实现步骤
                1. 用户第一次使用用户和密码登录，登录成功后，创建token，并返回给客户端
                2. 客户端存储token到cookie或localStorage
                3. 每次请求携带token发送给服务器校验（一般通过请求头发送token）
                4. 服务器校验token，并返回校验结果
* 多组件数据共享
    * 共享购物车数据
        * App
        * Goods
        * Cart
    * 方案
        * locaStorage
        * vuex
    * 多组件共享需要解决以下问题
        1. 数据唯一性：一个应用中应该有一份共享的数据
        2. 数据维护问题：方便实现数据的CRUD
        3. 数据更新问题：在某个组件中更新数据，其他组件中的数据跟着改变
        4. 组件刷新问题：数据有修改时，组件自动刷新
* Vuex
    > Vue的核心插件，用于实现数据共享（实现全局共享：所有的组件可以直接获取、修改、监听等操作）
    * 使用步骤
        1. 安装vuex
            ```bash
                npm install vuex
            ```
        2. 引入与安装插件
            ```js
                import Vuex from 'vuex'

                Vue.use(Vuex);
            ```
        3. 实例化一个数据仓库store
            > 设置核心配置
            ```js
                const store = new Vuex.Store({
                    state:{
                        cartlist:[]
                    },
                    mutations:{
                        add(state,payload){
                            // state:状态
                            // payload：触发当前mutation是传入的参数
                            state.cartlist.unshift(payload)
                        }
                    }
                })
            ```
        4. 把store注入Vue根实例
            > 注入store后，给每一组件实例添加`$store`属性
            ```js
                new Vue({
                    ...,
                    store:store
                })
            ```
        5. 在组件中使用
            * 读取数据:`this.$store.state.xxx`
            * 修改数据:`this.$store.commit(mutation,payload)`
            * 监听数据  
                > vuex自定监听state状态修改，当state被修改时，组件会自动刷新

    * 核心配置
        * state 状态，类似与组件中的data，用于存放需要共享的数据
            > 组件中获取：`this.$store.state`
        * muations  修改state的唯一方法，类似于组件中的methods，用于修改state
            > 调用方式：`shis.$store.commit(mutation)`
            * 参数
                * state     状态
                * payload   调用时传入的参数
            ```js
                this.$store.commit('add')
                this.$store.commit('add',{_id,goods_name,price})
            ```
* 数据持久化
    > 利用本地存储技术实现数据长期存储方案

## day4-2

### 面试题
* 重定向中301与302状态码有什么不同
    * 301   代表永久重定向
    * 302   代表临时重定向

### 知识点
* 核心配置
    * state 状态，类似于组件中的data，用于存放需要共享的数据
        * 获取方式：`store.state.xxx`
    * muations  修改state的唯一方法，类似于组件中的methods，用于修改state
        * 调用方式：`store.commit(mutation)`
    * getters   类似于组件中的computed，一般用于根据state的值计算出其他值
        * 参数  
            1. state
            2. getters
        * 获取方式：`store.getters.xxx`

    * actions 类似于mutation，一般用户异步操作
        * 参数
            * context   一个类似于store的对象，拥有与store几乎一致的属性、方法
            * payload
        * 调用方式：`store.dispatch(action)`

* vuex的模块化
    > 每个模块拥有自己的 state、mutations、actions、getters等，模块化默认只影响state的获取，mutations,actions,getters公用命名空间（getters有重名属性时报错，mutations,actions会变成一个数组）
    * modules
        * namespaced 命名空间
            > 设置命名空间后，影响mutations,actions,getters的获取


### 练习
* 把用户信息写入vuex


## day4-3

### 复习
* vuex
    * 是什么
    * 有什么用
    * 怎么用
* Vue核心配置
    * state
    * getters
    * mutations
    * actions
    * modules       模块化
        > 模块化默认只影响state的操作
        ```js
            store.state.xxx
            store.state.[module].xxx
        ```
        * 命名空间
            > 设置命名空间后，影响getters、mutations、actions的操作
            ```js
                store.getters.xxx -> store.getters['module/xxx']
                store.commit('xxx') -> store.commit['module/xxx']
                store.dispatch('xxx') -> store.dispatch['module/xxx']
            ```

### 知识点
* Vuex映射
    * 映射方法
        * mapState(namespace?,data)      映射state到组件的computed
        * mapGetters(namespace?,data)    映射getter到组件的computed
        * mapMutations(namespace?,data)  映射mutation到组件的methods
        * mapActions(namespace?,data)    映射action到组件的methods
    * 解决了什么问题
        * 方便获取vuex数据与方法的问题
        * 代码可维护性的问题

* Vue项目
    * 项目要求
    * 分工
    * 项目前期准备工作
    * git
        * 远程仓库
        * 代码冲突

* 后台管理系统
    * 必须登录后才能访问
    * 页面访问权
        * 先配置所有路由，然后通过路由守卫控制页面是否可访问
        * 先配置基础路由，然后根据用户登录状态**动态添加路由**
            * router.addRoute()
            ```js
                // 用户登录成功后，执行以下代码
                router.addRoute({
                    path:'/home',
                    component:Home
                })
                router.addRoute('manage',{
                    path:'/home',
                    component:Home
                })
            ```

* VueCLI创建的项目支持sass
    * 依赖
        * sass-loader@10.2.0
        * sass(dart sass/node-sass(不推荐))

* 嵌套路由（子路由）
    * 配置children
    * 嵌套<router-view/>

* keep-alive
    * 缓存组件（包括状态，滚动条位置等），不让组件销毁
    * include:设置需要缓存的组件
    * exclude：设置不需要缓存的组件

* scrollBehavior
    > 保持滚动条位置

## day5-1

### 知识点
* 页面转场动画
    > 过渡动画
    * 进场动画：隐藏->显示
    * 出场动画: 显示->隐藏
* Vue的过渡动画
    * `<transition/>`
    * `<transition-group/>`
    > transition与transition-group并没有实现具体的动画效果，需要用户自行实现
    ```js
        <transition>
            <div></div>
        </transition>
        <transition-group>
            <div></div>
            <p></p>
        </transition-group>
    ```
    * transition生效的条件（触发动画场景）
        * 条件渲染（使用v-if）
        * 条件展示（使用v-show）
        * 动态组件
            > 组件的内容不固定，根据不同的条件渲染不同的内容
        * 组件根节点
* Vue扩展
    * 自定义组件
        * 全局：Vue.component()
        * 局部：components
    * 自定义指令
        > vue内置14个指令，如果还不够用，可以自定义
        * 指令完整格式：v-name:arg.modiffer="value"
            * name:指令名称
            * arg：指令参数
            * modiffer：指令修饰符
            * value：指令值
        * 全局指令：Vue.directive(name,options)
        * 局部指令：directives(name,options)
    * 过滤器filter
        * 全局过滤器：Vue.filter(name,fn)
        * 局部过滤器：filters(name,fn)
        ```js
            <div>{{msg|upper}}</div>
            <div>{{upper(msg)}}</div>

            {
                filters:{
                    upper:function(val){
                        return val.toUpperCase()
                    }
                },
                methods:{
                    upper(val){
                        return val.toUpperCase()
                    }
                }
            }
        ```
    * mixin混合（提取组件的公共代码）
        * 全局：Vue.mixin(options)
        * 局部：mixins:[]
        > 属性合并规则：mixin中的属性覆盖，方法与生命周期函数同时生效
    * 插件plugin
        * 使用插件：Vue.use()

* 设置用户权限
    * 页面访问权限
        * 路由守卫
        * 动态添加路由
    * 按钮权限（功能权限）
    * 数据权限

* 项目上线要求
    * 路由模式：mode
        * history   更像一个网络（美）
        * hash      路径带#号（丑）

        ```js
            // 运行 npm run serve: process.env.NODE_ENV的值为development
            // 运行 npm run build: process.env.NODE_ENV的值为production
            mode:process.env.NODE_ENV==='production'?'history':'hash'
        ```


## day5-3

### 知识点
* 版本  
    * 按环境分
        * development   开发环境（未压缩，有警告等提示）
        * production    生产环境（压缩）
    * 按模块分
        * commonJS      cjs
        * ESModule      es/esm
        * AMD
        * CMD
        * UMD   通用模块化规范（支持commonJS，AMD，CMD，全局引用）
    * 按构建方式分
        * 完整版（编译器+运行时）
        * 运行时版（runtime）
    * react的使用
        * 引入模块
            * react
            * react-dom/react-native
        * 渲染
            * ReactDOM.render(vNode,target)
        * 创建节点
            * React.createElement(type,props,children)
    * JSX
        > 浏览器不能识别JSX语法，必须使用babel去编译（把JSX编译成React.createElement()）
        * JSX语法规范
            * 属性中不能使用js关键字
            * 属性必须采用驼峰写法
            * 必须结束标签
            * JSX中使用js：{}
            * 注释
                * 单行
                * 多行
            * 内联样式必须使用对象写法

* react组件的数据绑定方式
    * {}
    * 列表循环
        * map
        * filter
    * 事件绑定
        > 格式：onClick={handle}
        * 改变this指向
            * render中使用箭头函数
            * contructor中使用bind
                > 通过bindg改变this指向只在第一次生效
        * event事件对象：事件处理函数的最后一个参数
        * 传参
            * bind(taarget,arg...)
    * 条件渲染：三元运算

* 组件化
    * 组件分类
        > 在实际开发中优先使用函数组件
        * 函数组件（无状态组件，UI组件）
        * 类组件（状态组件，容器组件）
    * 组件要求
        * 组件首字母必须为大写
        * 只能有一个根元素
        * 类组件必须有一个render渲染函数
    * 函数组件与类组件的区别
        * 是否有状态：类组件有状态，函数组件无状态
        * 是否有shis指向：类组件指向组件实例，函数组件指向undefined
            > 默认在constructor，render、生命周期函数中可以直接使用this（自定义函数中没有this指向）

* state：类组件中的状态
    > state的改变（必须通过setState()修改）会自动刷新组件（刷新组件：类组件就是执行render函数，函数组件就是从头到尾执行一遍代码）
    * 定义
        ```js
            constructor(){
                super()
                this.state={
                    count:1,
                    qty:10
                }
            }
        ```
    * 使用
        ```js
            this.state.count;
        ```
    * 修改：`this.setState({count:this.state.count+1})`
        >在React中setState()是异步的，所以不能直接修改state，而是创建一个新的数据去覆盖它
        ```js
            //state={count:1,qty:10}
            console.log(this.state.count);//1
            //this.state.count++    不能让组件刷新
            this.setState({
                count:10
            })
            console.log(this.state.count);//1
        ```
    
* 组件刷新
    * 类组件：组件刷新就是重新执行render渲染函数
    * 函数组件：代码从头到尾执行一遍

* 组件通讯：
    * 父->子：props
        1. 给子组件定义属性
        2. 在子组件中使用
            * 函数组件:函数的第一个参数就是props
            * 类组件：
                * constructor的第一个参数
                * this.props
        * 子->父：
            * 把父组件的方法通过props传到子组件中执行，并回传参数

* ref
    * 回调函数
        > 函数的第一个参数为节点/组件实例的引用
        ```js
            <input ref={el=>this.input=el}/>
        ```
    * React.createRef()
        > 通过ref对象的current属性获取到节点/组件实例
        ```js
            const refObj=React.cueateRef()
            <input ref={refObj}/>

            // 获取节点
            refObj.current
        ```

* 受控组件与非受控组件
    * 受控组件：通过组件的状态控制表单的内容
        * 给表单的value属性绑定State，必须同时提供修改state的方法，否则会报错
    * 非受控组件：通过节点操作方式控制表单内容的方式

## day5-4

### 知识点
* 多层级组件通讯
    * 逐层传递（不推荐）
    * context
        1. 创建context
            ```js
                const context=React.createContext(defaultValue)
            ```
        2. 父组件共享数据
            > 使用context的Provider组件共享数据
            ```js
                // data为共享的数据
                <context.Provider value={data}></context.Provider>
            ```
        3. 子组件接收
            * 函数组件
                * context的Consumer组件接收数据
                ```js
                    <context.Consumer>
                    {
                        (value)=>{
                            //value为共享的数据
                            return(

                            )
                        }
                    }
                    </context.Consumer>
                ```
                 * Hook
                ```js
                    const value=useContext(context)
                ```
            * 类组件
                * Consumer
                * contextType
                    > 给类添加contextType静态属性，只适用于类组件
                    ```js
                        TodoForm.contextType=context;

                        // 获取
                        constructor //的第二个参数
                        this.context
                    ```

* 构建工具
    * grunt -> gulp -> webpack -> vite

    * 传统js写法
        > 全局引入
        ```html
            <script src="jquery.js"></script>
            <script src="bootstrap.js"></script>
            <script src="common.js"></script>
            <script src="home.js"></script>
        ```
        * 污染全局命名空间与变量冲突
        ```js
            ;(()=>{
                var a = 10
            })()
        ```
    * 模块化
        ```js
            var a = 10;
        ```
        * import 
        * export
* webpack与gulp这两个构建工具的区别
    * gulp基于任务且需要用户手动实现某个流程的构建工具
    ```js
        // gulp
        gulp.task('compileSass',(done)=>{
            // 匹配文件
            gulp.src('./src/sass/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('./dist'))
            .pipe(cssmin())
            .pipe(rename({sufix:'.min'}))
            .pipe(gulp.dest('./dist'))
        })
    ```
    * webpack基于配置的自动化构建工具
        > webpack.config.js配置文件

* 从0配置基于webpack的react项目环境
    * 创建目录与文件
        * src
        * piblic
        * dist
        * doc
        * webpack.config.js
            > 一个遵循commonJS规范的模块
        * package.json
    * 安装依赖
        * react + react-dom
        * webpack + webpack-cli + webpack-dev-server + html-webpack-plugin
        * @babel/preset-react + @babel/core + babel-loader 
    * 配置webpack
        > webpack.config.js
        * mode      环境配置
        * entry     入口配置
        * outpu     出口配置
        * loader    加载器
            > module.rules,在webpack中每一种类型文件都需要一个加载器去处理
        * plugins   插件配置
    * 编译打包
        * npm script

### 练习
* 从0配置基于webpack的Vue项目环境
* 移植todolist到项目环境

## day5-5

### 知识点
* 缓存对页面访问的影响，导致用户获取不到最新的代码
    * 解决方案
        * 给文件路由添加时间戳
        * webpack
            * output.filename
            * urlLoad.name
            * htmlwebpackPlugin
* React组件生命周期
    * 初始化阶段
        > 初始化state,props等
        * constructor(props,context)
    * 挂载阶段
        > 把虚拟节点渲染到真实节点
        * componentWillMount() ->> UNSAFE_componentWillMount() (不推荐)
        * componentDidMount()
    * 更新阶段
        * componentWillUpdate(nextProps, nextState) -> UNSAFE_componentWillUpdate() (不推荐)
        * componentDidUpdate(prevProps, prevState)
    * 销毁阶段
        * componentWillUnmount()
    * 特殊钩子函数
        * shouldComponentUpdate(nextProps, nextState) 
        * componentWillReceiveProps(nextProps) ->UNSAFE_componentWillReceiveProps() (不推荐)
* 组件刷新
    > 类组件更新就是执行render渲染函数，函数组件更新就是从头到尾执行所有代码
    * 组件刷新条件
        * state发生改变
        * props发生改变
        * 父组件刷新
        * 强制刷新  this.forceUpdate()
        ```js
            <Parent/>
                <Child index={idx}/>
        ```
* 组件性能优化
    * shouldComponentUpdate
    * PureComponent
        > 一个做了shouldComponentUpdate优化后的组件

## day6-1

### 知识点
* 组件封装
    * button
    * List
* classnames模块的使用
* props
    * children  写在组件标签内部的内容
        * String    文本
        * Object    虚拟节点
        * Array     多个虚拟节点组成的数组
        * Function  类似于Vue中的作用域插槽
            ```js
                <Button>
                    {
                        function(){

                        }
                    }
                </Button>
            ```

* Render Props
    使用一个值为函数的props共享代码的简单技术,实现组件定义华效果
    ```js
        <Button renderHeader={(data)=>{
            return <span></span>
        }}>{(data)=>{
                return '添加'
            }
        }<Button>
    ```

* props 类型校验
    > 给组件添加静态属性`propTypes`，并使用`prop-types`进行类型设置
    ```js
        //Vue
        {
            props:{
                datasource:{
                    type:Array,
                    required:true,
                    default:10
                }
            }
        }

        // React:prop-types
    ```

* props默认值
    > 给组件添加静态属性`defaultProps`

* react-router
    * vueRouter
    ```js
        // vue-router
        new VueRouter({
            routes:[
                {path:'/home',component:Home}
                {path:'/home',component:Home}
                {path:'/home',component:Home}
            ]
        })
        <router-view>
    ```
    * reactRouter:一切皆组件
        ```js
            <HashRouter>
            <Route path="/home" component={Home}/ >
            <Route path="/login" component={Login}/ >
            <Route path="/reg">
                <Reg/>
            </Router>
            </HashRouter>
        ```
    * 常用组件
        * 路由类型
            * HashRouter        hash
            * BrowserRouter     history
        * 路由渲染
            * Route
                * path
                * component
                * render
                * exact
            * Redirect
                * from
                * to
                * exact
            * Switch
        * 路由导航
            * 声明式导航
                * Link
                * NavLink
            * 编程式导航
                * history.push()        等效于`<link to>`
                * history.replace()     等效于`<link to replace>`
                * history.go()
                * history.goBack()
                * history.goForward()
            * 如何获取history对象，location，match对象
                * 使用Route的component属性渲染组件
                    > history自动传入组件props
                * withRouter高阶组件
                    ```js
                        App=withRouter(App)
                    ```
                * Hook：只适用于函数组件
                    * useHistory()
                    * useLocation()
                    * useRouteMath()
                    ```js
                        const history=useHistory()
                    ```

## day6-2

### 知识点
* 高阶组件HOC(High Order Component)
    > 高阶组件并不是一个React组件，而是一个函数（高阶函数，包装函数),接收一个参数，并返回一个新的组件
    * 纯函数
        * 不修改传入的参数
        * 固定输入有固定输出

    ```js
        function square(num){
            return num*num;
        }

        square(2);//4
        square(2);//4
        square(2);//4

        function withRouter(InnerComponent){
            return function(){
                //想办法获取history,location,match
                return <InnerComponent history={history} location={location} match={match}/>
            }
        }
        withrouter(App);//包装后props中就有了history，location，match
    ```
    * 编写高阶组件方式
        * 属性代理
            > 使用高阶组件通过props获取需要的数据
            * 封装一个获取本地存储用户数据的高阶组件：withUser
            * 编写一个能获取本地存储所有数据的高阶组件：withStorage/withStorages
        * 提取公共代码
            * 页面访问权限控制
        * 反向继承（了解）

* 函数柯里化：利用多次函数执行收集不同类型参数然后统一处理的方式
    ```js
        function a(){
            return function b(){

            }
        }
    ```

### 练习
* 让withStorage支持多个数据获取
    ```js
        withStorage('userInfo','token')(Home)
    ```
* 实现Manage页面效果

## day6-3

### 知识点
* css 模块化
    * 通过文件名实现css模块化

* 嵌套路由（子路由）
    ```js
        /manage/interview
        <App>
            <Manage>    -> <Route path component={Interview}>
                <Interview>
        /manage/interview/list
        <App>
            <Manage>     -> <Route path component={Interview}>
                <Interview>     -> -> <Route path component={LIst}>
                    <List>
    ```

* 后台管理系统
    * Tabel
    * Form
        * 如何把数据写入表单

* 路由传参
    * search：问好后的参数
        > 接收：location.search，需要手动处理
        ```js
            const query=new URLSearchParams(location.search)
            query.get('id')
        ```
    * params动态路由
        > 接收：match.params,自动格式化成对象
    * state
        > 接收：location.state,页面刷新数据丢失
    * 自定义数据
        > 接收：location.xxx ，页面刷新数据丢失

## day6-4

### 知识点

* 全局状态管理工具
    * mobx
    * redux
        > 无框架状态管理工具
* react与redux
    > 两个独立的产品，本身没有任何联系
* redux使用步骤
    1. 安装 `npm install redux`
    2. 引入
        ```js
            import {createStore} from 'redux'
        ``` 
    3. 创建数据仓库（共享数据）
        ```js
            const state={}
            const reducer=function(state,action){}
            const store = createStore(reducer,state)
        ```
    4. 使用
        * 获取state:store.getState()
        * 修改state:store.dispatch(action)
        * 监听state修改：store.subscribe(fn)
            > 当state有修改时，自动执行fn函数
* redux核心
    * store   数据仓库
    * state   全局共享状态（数据）
    * reducer 修改状态的方法
        > Reducer   必须是一个纯函数，用于修改state，接收state与action作为参数，用户不需要直接执行reducer，而是通过`store.dispatch(action)`间接触发reducer
    * action
        > 格式为：`{type,payload?}`的对象，通过store.dispatch(action)调用

* 复习Vuex
    ```js
        const store = new Vuex.Store({
            state:{

            },
            mutation:{
                login(){},
                logout(){},
            },
        })
        //store.commit('login');store.commit({type:'login'})
    ```
* 在React中使用redux
    * 需要
        * 在多个组件中共享数据
            * 在组件中获取redux数据
            * 在组件中修改redux数据
        * 如何刷新组件
            * 当redux数据发生变化时需要刷新组件
    * 直接在react中编写redux代码，会导致代码可维护性变差
        > 如何解决：高阶组件
* 组件刷新场景
    * state改变
    * props改变
    * 父组件刷新
    * 强制刷新

### 练习
* 编写升级版withRedux实现按需传递redux数据

## day6-5

### 复习
* React与Redux的关系
* redux使用步骤
    1. 安装
    2. 引用
        ```js
            import {createStore} from 'redux'
        ```
    3. 创建store
        ```js
            const store = createStore(reducer,state)
        ```
    4. 使用    
        * 获取：store.getState()
        * 修改: store.dispatch(action)
        * 监听: store.subscribe(fn)
* redxu核心ApI
    * store
    * state
    * reducer
        > 是一个纯函数，接收state与action作为参数，并返回一个新的state
    * action    命令/动作
* 关联React组件与Redux
    * 考虑代码可维护性问题
    * 考虑组件刷新问题
        * 组件刷新场景
    > 解决方案：高阶组件

### 知识点
* 编写withStore高阶组件
    * 实现按需写入redux数据

* react-redux 桥接工具
    > 原理：利用context+高阶组件实现redux数据共享
    * connect()     高阶组件
    * Provider      context
    * 使用步骤
        1. 使用Provider组件共享store
            ```js
                <Provider store={store}>
                    ...
                </Provider>
            ```
        2. 使用connect高阶组件给目标组件传递redux数据
            ```js
                connect(mapStateToProps,mapDispatchToProps)(Manage)
            ```
            * hook
                * useStore()
                * useDispatch()
                * useSelector(state=>{})

* redux模块化（reducer模块）
    >把复杂的reducer拆分成一个个小模块，然后使用combineReducers把多个reducer合并成一个reducer

* action creator
    > action构造器，一个用于创建action的函数

    * bindActionCreators 一般用户简化代码