const express = require('express')
const router=require('./router')
// const path=require('path');


const app=express();


//静态资源服务器
app.use(express.static('../public',{
    // index:'login.html',

    //设置静态资源缓存时间
    maxAge:1000*60*60,
    //maxAge:'1d'
}))

//数据接口
app.use('/api',router)


const PORT=2108;
app.listen(PORT,()=>{
    console.log('服务器已启动...2108');
})