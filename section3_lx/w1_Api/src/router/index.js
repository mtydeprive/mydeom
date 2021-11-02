const {Router,json,urlencoded} = require('express');

const router = Router();
module.exports = router;


const userRouter=require('./user')
const goodsRouter=require('./goods')
const regRouter=require('./reg')
const loginRouter=require('./login')

const cors=require('../filter/cors')

//跨域解决方案：CORS
//设置响应头：Access-Control-Allow-Origin
router.use(cors)

//处理请求体数据
router.use(
    urlencoded({extended:false}),//name=value&name=value,qs,querystring
    json()
)


router.use('/user',userRouter);
router.use('/goods',goodsRouter);
router.use('/reg',regRouter);
router.use('/login',loginRouter)

//跨域解决方案之jsonp
//jsonp请求必须响应js代码
//get  /api/jsonp
// router.get('/jsonp',function(req,res){
//     const {callback}=req.query;
//     const user={
//         name:'wsnd',
//         role:'svip'
//     }
//     // res.send(`getData({"name":"wsnd","role":"svip"})`)
//     res.send(`${callback}(${JSON.stringify(user)})`)
// })