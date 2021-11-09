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
            > this。$emit()
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