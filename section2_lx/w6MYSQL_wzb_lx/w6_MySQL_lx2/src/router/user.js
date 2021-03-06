const express = require('express')
const db = require('../db')
// const {formatData}=require('./utils')

const router = express.Router();
module.exports = router;

// get /api/user/list
router.get('/list',async (req,res)=>{
    const sql = `select * from user`

    // db(sql,function(data){
    //     res.send(data)
    // })

    // db(sql).then(data=>{
    //     res.send(data);
    // })

    const data = await db(sql)
    // 统一前后端数据格式
    res.send({
        code:200,
        data:data,
        msg:'success'
    })
})

router.get('/:id',async (req,res)=>{
    const {id} = req.params;
    const sql = `select * from user where id=${id}`

    const data = await db(sql)
    // res.send(data[0])
    res.send({
        code:200,
        data:data[0],
        msg:'success'
    })

    // res.send(formatData()); // {code:200,data:[],msg:'success'}
    // res.send(formatData({data:data[0]})); // {code:200,data:{username,id},msg:'success'}
})