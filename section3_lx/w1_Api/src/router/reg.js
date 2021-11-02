const {Router} = require('express')

const router = Router();
module.exports = router;

const db = require('../db')
const {formatData,jiamiPassowrd}  = require('../utils')

// post /api/reg
router.post('/',async (req,res)=>{
    const {username,password} = req.body;

    const result=await db.create('user',{
        username,
        password:jiamiPassowrd(password),
        addtime:new Date()
    })
    res.send(formatData.success({
        code:result.code
    }))
})

// get /api/reg/check
router.get('/check',async (req,res)=>{
    const {username}=req.query;
    const data= await db.find('user',{username})
    if(data.length>0){
        res.send(formatData.fail())
    }else{
        res.send(formatData.success())
    }
})