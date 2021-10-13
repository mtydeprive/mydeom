const express=require('express')

const router=express.Router()

module.exports=router


//post注册用户
router.post('/',function(req,res){
    res.send('注册')
})