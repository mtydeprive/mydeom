const {Router} = require('express')

const router = Router()
module.exports = router
const db=require('../db')
const {formatData}=require('../utils')

// get /api/goods/list
router.get('/list',async(req,res)=>{
    let sql=`select * from goods`
    const data=await db(sql);

    res.send(formatData.success(data))
})


















// router.get('/list', async (req, res) => {
//     const {
//         page = 1, size = 10, order, category
//     } = req.query;
//     // 计算索引值
//     const idx = (page - 1) * size
//     const qty = Number(size)

//     // 查询数据库商品，并把查询结果响应到前端
//     let sql = `select * from goods`

//     if (category) {
//         sql += ` where category='${category}'`
//     }

//     if (order) {
//         // 0: asc   升序
//         // 1: desc  降序
//         // 'price','price,0','price,1'
//         let [key, type = 0] = order.split(',')

//         sql += ` order by ${key}`
//         if (type == 1) {
//             sql += ` desc`
//         }
//     }

//     sql += ` limit ${idx},${qty}`


//     const data = await db(sql)

//     //统一前后端格式
//     res.send(formatData.success(data))

// })