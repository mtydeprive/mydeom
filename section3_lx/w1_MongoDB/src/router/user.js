const {Router} = require('express')

const router = Router();
module.exports = router;

const db = require('../db')
const {formatData} = require('../utils')

// get /api/user/list
router.get('/list',async (req,res)=>{
   const  data=await db.find('user')
   console.log(data);
   res.send(formatData.success(data))
})

//增加商品
router.post('/',async(req,res)=>{
    const {username,password,role,age}=req.body

    const result=await db.create('user',{username,password,role,age})
    res.send(
        result?
        formatData.success()
        :
        formatData.fail()
    )
})
//删除用户
router.delete('/:id',async(req,res)=>{
    const {id}=req.params
    const result =await db.remove('user',{_id:id})

    res.send(
        result?
        formatData.success()
        :
        formatData.fail()
    )
})
//修改用户信息
router.put('/:id',async(req,res)=>{
    const {id}=req.params
    const {username,age,password}=req.body
    const newData={username,age,password}

    for(let key in newData){
        if(newData[key]===undefined){
            delete newData[key]
        }
    }
    const result=await db.update('user',
    {_id:id},
    {
        $set:newData
    })
    res.send(
        result?
        formatData.success()
        :
        formatData.fail()
    )
})

//查询单个用户
router.get('/:id',async(req,res)=>{
    const {id}=req.params

    const data=await db.find('user',{_id:id})
    res.send(
        formatData.success(data[0])
    )
})