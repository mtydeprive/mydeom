const {Router} = require('express')

const router = Router();
module.exports = router;

const crypto = require('crypto')
const db = require('../db')
const {formatData}  = require('../utils')

// get /api/login
router.get('/',async (req,res)=>{
    const {username,password} = req.query;

    // 1.以md5加密算法创建一个hash对象
    const hash = crypto.createHash('sha256'); // 加盐：crypto.createHmac('sha256','abc')

    // 2.加密数据
    hash.update(password)
    // 3.输出密文（hex,base64,Buffer）
    const password2 = hash.digest('hex')

    
})
