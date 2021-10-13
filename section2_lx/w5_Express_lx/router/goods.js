const express=require('express')

//express.Router()创建一个路由
const router=express.Router()
module.exports=router

//模拟商品数据
let goodslist=[]
const prices=[98,198,298,398,998,1999,2599,3699,4999,5699]
    for (let i = 0; i < 20; i++) {
        const id=i+1
        const goods={
            id,
            name:`goods${id}`,
            price:prices[parseInt(Math.random()*prices.length)],
            imgurl:`img/goods${id}.jpg`
        }
        goodslist.push(goods)
    }
//商品列表:/api/goods/list
router.get('/list',function(req,res){
    res.send(goodslist)
})


//商品CURD
//get 单个商品信息
router.get('/',function(req,res){
    //url参数接收：req.query
    const {id}=req.query

    //goodsList=[{id},{id},{id}]
    // const goods=goodslist.filter(function(item){
    //     return item.id==id
    // })[0]
    const goods=goodslist.find(function(item){
        return item.id==id
    })
    res.send(goods)
})
//post添加商品
router.post('/', function(req,res){
    console.log('req.body',req.body);
    res.send('添加商品')
})
//delete  api/goods/1,api/goods/2删除商品
router.delete('/:id',function(req,res){
    //动态路由：路由地址为变量，只要匹配格式就能进入该路由。?表示该变量可选
    //动态路由接收：req.params
    const {id}=req.params;
    goodslist=goodslist.filter(item=>{
        return item.id !=id
    })
    res.send(`商品${id}已删除`)
    // res.send('删除商品')
})
//put修改商品
router.put('/',function(req,res){
    res.send('修改商品')
})
