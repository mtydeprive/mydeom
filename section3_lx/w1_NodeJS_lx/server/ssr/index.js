const {Router}=require('express');

const db=require('../db')

const router=Router();
module.exports=router;

const ejs=require('ejs')

//商品列表
router.get('/goodslist',async(req,res)=>{
    let sql=`select * from goods limit 0,10`
    const data=await db(sql)
    // res.send(`<html>
    // <head>
    // <title>SSR</title>
    // </head>
    // <body>
    //     <div class="list">
    //         服务器渲染内容
    //         ${
    //             data.map(item=>{
    //                 return `<div>
    //                 <h4>${item.goods_name}</h4>
    //                 <p class="price">${item.price}</p>
    //                 </div>`
    //             }).join('')
    //         }
    //     </div>
    // </body>
    // </html>`)
    res.render('goodslist',{data})
})


//商品详情信息
router.get('/goods/:id', async (req, res) =>{
    const { id } = req.params;

    let sql = `select * from goods where goods_id=${id}`
    const data = await db(sql)
    console.log(data[0])

    // res.send()
    res.render('goods',{data:data[0]})
})