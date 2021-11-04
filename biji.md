## 行内式JS
* js代码可以插入标签内
    ```js
        <div onclick="alert('hello world! wo shi ni baba')">别点我，没惊喜</div>
        <a href="javascript:alert('JavaScript 真好玩 有趣')">发现js的世界</a>
    ```

## 内嵌式JS
* 在文件头部插入一段js脚本,在body之前运行,运行完成后body才开始执行。
* 在body尾部插入一段js脚本,body运行结束后才运行这段js代码。

## 外链式
* 在html中引入一段外部js`<script src="./xxx.js"></script>`

### 数据类型
* 基本数据类型
    * String 字符串
    * Number 数值型
    * boolean 布尔型
    * null 
    * undefined
* 引用数据类型
    * 有基本数据类型组合而成
        >定义一个对象，对象内部有很多属性、键值对
        ```js
            let mrSkr = {name: "Mr Skr",money: 123.45,age: 38,inJail: true}
        ```
    * 数字转字符串String()->`let num=123; let obj=String(num)`

### if
    ```js
        // 单分支
        if（条件成立）{
            执行代码
        }

        //if双分支
        if（条件a成立）{
            走a路
        }else{
            走b路
        }

        //if多分支
        if（条件a成立）{
            走a路
        }else if（条件b成立）{
            走b路
        }else if（条件c成立）{
            走c路
        }else{
            走d路
        }
    ```
## switch
    ```js
        switch （某个值）{
            case 取值A:
            走A路
            break;
            case 取值B:
            走B路
            break;
            case 取值C:
            走C路
            break;
            default:
            走默认路
            break;
        }
    ```
### 循环
* while循环
    ```js
        while(条件成立){
            执行循环体
        }
    ```
* for循环
    ```js
        let num=0;
        for(let i=0;i<=n;i++){
            num+=i
        }
    ```

### 函数 function
* 声明式函数
    * 声明前后都能调用
    ```js
        function add1(a,b){
            var sum=a+b
            //返回结果给调用者
            return sum
       }
       //调用
       add1()
    ```
* 赋值式函数
    * 只能在赋值后使用
    ```js
        var add2=function (a,b){
           var sum=a+b
            //返回结果给调用者
           return sum
       }
    ```

## 作用域
* 作用域，就是当访问一个变量时，编译器在执行这段代码时，会首先从当前的作用域中查找是否有这个标识符，如果没有找到，就会去父作用域查找，如果父作用域还没有找到则继续向上查找，直到全局作用域为止。可理解为该上下文中声明的变量和声明的作用范围，可分为全局域和局部作用域。
    * 全局作用域
        > 全局都能访问
    * 局部作用域
        > 只有局部地方能够使用（例如函数内的变量只有函数内能够使用）


## 传递
* 值传递
    > 传参为基本数据类型（传递的是值拷贝）并不会改变原数据类型的值。
* 引用传递
    > 传参为引用数据类型（传递的是对象的地址）不同变量引用相同的地址时，修改任意一方会影响另一方的值

## 数组
* 操作
    * push()：将一个或多个元素添加到数组末尾，并返回该数组的新长度。
    * pop()：从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。
    * unshift()：方法将一个或多个元素添加到数组的开头，并返回该数组的新长度(该方法修改原有数组)。
    * shift()：从数组中删除第一个元素，并返回该元素的值
    * splice()：通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。start【指定修改的开始位置（从0计数）】deleteCount【整数，表示要移除的数组元素的个数。】item【要添加进数组的元素】
    * reverse()：颠倒并返回数组
    * indexOf()：返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1
    * concat()：合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。
    * join()：将一个数组的所有元素连接成一个字符串并返回这个字符串。如果数组只有一个项目，那么将返回该项目而不使用分隔符。
    * sort()：对数组的元素进行排序，并返回数组。默认排序顺序是在将元素转换为字符串
    * ForEach()：对数组进行遍历
    * map()：对数组进行遍历并返回一个新数组，其结果组中的每个元素是调用一次提供的函数后值
    * filter() （过滤）方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。
    * some()：测试数组中是不是至少有1个元素通过了被提供的函数测试
    * every()：测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。

## String常用方法
* charAt() 方法从一个字符串中返回指定的字符。
* charCodeAt() 方法返回 0 到 65535 之间的整数，表示给定索引处的 UTF-16 代码单元
* indexOf() 方法返回调用它的 String 对象中第一次出现的指定值的索引，从 fromIndex 处进行搜索。如果未找到该值，则返回 -1。
* substring() 方法返回一个字符串在开始索引到结束索引之间的一个子集, 或从开始索引直到字符串的末尾的一个子集。
*  slice() 方法提取某个字符串的一部分，并返回一个新的字符串，且不会改动原字符串。序号如果是负数 则被视为倒数第n个字符
* toLowerCase() 会将调用该方法的字符串值转为小写形式，并返回。
* replace() 用于替换掉第一个参数在原字符串中的匹配部分的字符串。
* replaceAll() 替换所有
* split() 方法使用指定的分隔符字符串将一个String对象分割成子字符串数组，以一个指定的分割字串来决定每个拆分的位置。 
* trim() 方法会从一个字符串的两端删除空白字符返回：一个代表调用字符串两端去掉空白的新字符串

## Math
* Math.PI 为π=3.1415926
* Math.random() [0,1)的小数
* Math.ceil()   暴力进位
* Math.floor()  舍掉小数
* Math.round()  四舍五入
* Math.abs()    绝对值
* Math.max()    最大值
* Math.min()    最小值
* Math.pow(x,y)     求x的y次方
* Math.sqrt(x)      求x的平方根
* Math.cbrt(x)      求x的立方根
* num.toFixed(n)    3.545641.toFixed(n)  num四舍五入后保留n位小数

## Date 时间
* new Date()
    * getFullYear() 年
    * getMonth()    月
    * getDate()     日
    * getDay()      星期
    * getHours()    小时
    * getMinutes()  分
    * getSeconds()  秒    













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