const {Router} = require('express')

const router = Router();
module.exports = router;

const db = require('../db')
const {formatData,jiamiPassowrd}  = require('../utils')

// get /api/login
router.get('/',async (req,res)=>{
    const {username,password} = req.query;

    const result=await db.create('user',{
        username,
        password:jiamiPassowrd(password),
        addtime:new Date()
    })
    res.send(formatData.success({
        code:result.code
    }))
})
