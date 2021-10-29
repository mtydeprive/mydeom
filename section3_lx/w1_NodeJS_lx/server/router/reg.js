const {Router} = require('express');
const { format } = require('mysql');

const router = Router();
module.exports = router;

const crypto=require('crypto')
const db=require('../db')
const {formatData}=require('../utils')

// post /api/reg
router.post('/',async(req,res)=>{
    const {username,password}=req.body;

    //加密
    //1.以md5加密算法创建一个hash加密对象
    const hash=crypto.createHash('sha256');//加盐：crypto.createHmac('sha256','abc')
    //2.update()加密数据
    hash.update(password)
    //3.输出密文 (hex,base64,buffer)
    const password2=hash.digest('hex')

    //多次加密更安全：第二次加密
    const  hamc=crypto.createHash('sha256')
    //2.update()加密数据
    hamc.update(password2)
    //3.输出密文 (hex,base64,buffer)
    const password3=hamc.digest('hex')

    console.log('password',password,password2,password3);

    let sql=`insert into user(username,password) value('${username}','${password3}')`

    //try...catch
    try{
        await db(sql)
        res.send(formatData.success())
    }catch(err){
        res.send(formatData.fail())
    }
})

// get /api/reg/check
router.get('/check', async(req,res)=>{
    const {username}=req.query;
    let sql=`select * from user where username='${username}'`

    const data=await db(sql);
    if(data.length>0){
        res.send(formatData.fail())
    }else{
        res.send(formatData.success())
    }
})