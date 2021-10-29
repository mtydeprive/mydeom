const {Router} = require('express')

const router = Router()
module.exports = router

const db = require('../db')
const {formatData} = require('../utils')

// get /api/goods/list
//商品查询
router.get('/list',async(req,res)=>{
    const {page=1,size=10,sort}=req.query;
    // // page     skip
    // // 1        0   
    // // 2        10
    // // 3        20
    const skip=(page-1)*size
    const limit=size*1;

    const data=await db.find('goods',{},{skip,limit,sort,projection:{categor,goods_name}})
    res.send(
        formatData.success(data)
    )
})

router.post('/',async(req,res)=>{
    const {goods_name,price,sales_price,img_url,category}=req.body

    const result=await db.create('goods',{goods_name,price,sales_price,img_url,category})
    res.send(
        result?
        formatData.success()
        :
        formatData.fail()
    )
})

router.delete('/:id',async(req,res)=>{
    const {id}=req.params

    const result=await db.remove('goods',{_id:id})
    res.send(
        result?
        formatData.success()
        :
        formatData.fail()
    )
})
router.put('/:id',async(req,res)=>{
    const {id}=req.params
    const {goods_name,price,sales_price,img_url,category}=req.body
    const newData={goods_name,price,sales_price,img_url,category}

    for(let key in newData){
        if(newData[key]===undefined){
            delete newData[key]
        }
    }

    const result=await db.update('goods',
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


router.get('/:id',async(req,res)=>{
    const {id}=req.params

    const data=await db.find('goods',{_id:id})
    res.send(
        formatData.success(data[0])
    )
})