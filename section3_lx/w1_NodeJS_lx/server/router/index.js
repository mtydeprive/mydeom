const {Router,json,urlencoded}=require('express');

const router=Router();
module.exports=router;

const userRouter=require('./user')
const goodsRouter=require('./goods')
const regRouter=require('./reg')
const loginRouter=require('./login')
const uploadRouter=require('./upload')

//跨域解决方案：CORS
//设置响应头：Access-Control-Allow-Origin
router.use((req,res,next)=>{
    res.set({
        'Access-Control-Allow-Origin':'http://localhost:8080'
    })

    //处理复杂跨域中的预检请求
    if(req.method=='OPTIONS'){
        //设置响应头
        res.set({
            "Access-Control-Allow-Headers":"Content-Type,Content-Length,Authorization,Accept,X-Requested-With","Access-Control-Allow-Methods":"PUT,POST,GET,PATCH,DELETE,OPTIONS"
        });
        res.sendStatus(200);//让options请求快速返回

    }else{
        next();
    }
})

//处理请求体数据
router.use(
    urlencoded({extended:false}),//name=value&name=value,qs,querystring
    json()
)


router.use('/user',userRouter);
router.use('/goods',goodsRouter);
router.use('/reg',regRouter);
router.use('/login',loginRouter)
router.use('/upload',uploadRouter)

//跨域解决方案之jsonp
//jsonp请求必须响应js代码
//get  /api/jsonp
router.get('/jsonp',function(req,res){
    const {callback}=req.query;
    const user={
        name:'wsnd',
        role:'svip'
    }
    // res.send(`getData({"name":"wsnd","role":"svip"})`)
    res.send(`${callback}(${JSON.stringify(user)})`)
})