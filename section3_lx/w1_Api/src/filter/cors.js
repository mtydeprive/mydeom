//跨域解决方案CORS
const whitList= ['http://localhost:8080','http://127.0.0.1:8080','http://localhost:2000']
module.exports=(req,res,next)=>{
    const currentOrigin=req.get('Origin');
    const has=whitList.includes(item=>item===currentOrigin)
    if(has){
        res.set({
            'Access-Control-Allow-Origin':currentOrigin
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
    }else{
        next()
    }
}