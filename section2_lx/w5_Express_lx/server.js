const express=require('express')

//创建一个服务器
const app=express();

const router=require('./router')

//把当前目录下的public目录下创建静态资源服务器
const static = express.static('./public');
app.use(static);


//数据接口
//api
app.use('/api',router)

//根据用户使用的设备响应不同的内容
app.get('/home',(req,res)=>{
    const userAgent=req.get('user-agent')
    if (/windows/i.test(userAgent)) {
        res.send('pc端')
    }
    else if(/iPhone|Android/i.test(userAgent)) {
        res.send('移动端')
        
    }
})

//监听端口
app.listen(2108,function(){
    console.log('server is runing');
})