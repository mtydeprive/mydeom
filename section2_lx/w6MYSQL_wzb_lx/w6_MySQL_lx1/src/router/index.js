const express=require('express')

const goodsRouter=require('./goods')
const userRouter=require('./user')

const router=express.Router();
module.exports=router;

router.use('/goods',goodsRouter)
router.use('/user',userRouter)