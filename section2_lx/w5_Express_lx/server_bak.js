const express=require('express')

//创建一个服务器
const app=express();

//把当前目录下的public目录下创建静态资源服务器
const static = express.static('./public');console.log('static=',static)
app.use(static);

//中间件的使用：app.use([path],m1,m2,...)
//不带路径的中间件，任意请求都可以进入，注意是否需要next()
app.use(
    //中间件1
    function(req,res,next){
        console.log('m1');
        next()
    },
    //中间件2
    function(req,res,next){
        console.log('m2');
        next()
    }
)
app.use(function(req,res,next){
    console.log('m3');
    // res.send('hello m3')
    next();
})

//带路径的中间件
//只有路径匹配才会进入中间件，一般不需要next()
app.use('/api',function(req,res,next){
    console.log('api');
    res.send('api')
    next()
})
app.use('/login',function(req,res,next){
    console.log('login');
    res.send('login')
    // next()
})
app.use('/res',function(req,res,next){
    console.log('reg');
    res.send('reg')
    // next()
})

//利用RESTful规范编写接口

//get商品列表
app.get('/goodslist',function(req,res){
    res.send([
        {name:'goods1',price:998},
        {name:'goods2',price:1998},
        {name:'goods3',price:2998},
    ])
})

//商品CURD
//get 单个商品信息
app.get('/goods',function(req,res){
    res.send({name:'goods',price:998})
})
//post添加商品
app.post('/goods',function(req,res){
    res.send('添加商品')
})
//delete删除商品
app.delete('/goods',function(req,res){
    res.send('删除商品')
})
//put修改商品
app.put('/goods',function(req,res){
    res.send('修改商品')
})

//用户CURD
//post添加用户
app.post('/user',function(req,res){
    res.send('添加用户')
})
//delete删除用户
app.delete('/user',function(req,res){
    res.send('删除用户')
})
//put修改用户
app.put('/user',function(req,res){
    res.send('修改用户')
})
//get查询用户
app.get('/user',function(req,res){
    res.send('查询用户')
})


//监听端口
app.listen(2108,function(){
    console.log('server is runing');
})