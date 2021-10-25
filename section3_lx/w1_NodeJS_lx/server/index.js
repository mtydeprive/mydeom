const express = require('express')
const router=require('./router')

const app=express();

//静态资源服务器
//资源存在：返回静态资源到浏览器
//资源不存在：next()
app.use(express.static('../client',{
    // index:'login.html',

    //设置静态资源缓存时间
    maxAge:1000*60*60,
    //maxAge:'1d'
}))

//数据接口
app.use('/api',router)

const PORT=2108;
app.listen(PORT,()=>{
    console.log('服务器已启动...');
})