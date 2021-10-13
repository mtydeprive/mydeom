const express=require('express')

//express.Router()创建一个路由
const router=express.Router()
module.exports=router

router.use(express.urlencoded({extended:true}),express.json())

const userRouter=require('./user')
const goodsRouter=require('./goods');
const regRouter=require('./reg')
const denglvRouter=require('./denglv')


// /api/goods
router.use('/goods',goodsRouter)
// /api/user
router.use('/user',userRouter)

// /api/reg
router.use('/reg',regRouter)
// /api/reg
router.use('/denglv',denglvRouter)


