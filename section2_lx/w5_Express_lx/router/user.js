const express=require('express')

const router=express.Router()

module.exports=router


//用户CURD
//post添加用户
router.post('/',function(req,res){
    res.send('添加用户')
})
//delete删除用户
router.delete('/',function(req,res){
    res.send('删除用户')
})
//put修改用户
router.put('/',function(req,res){
    res.send('修改用户')
})
//get查询用户
router.get('/',function(req,res){
    res.send('查询用户')
})