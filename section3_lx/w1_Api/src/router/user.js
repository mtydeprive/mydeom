const {
    Router
} = require('express')

const router = Router();
module.exports = router;

const db = require('../db')
const {
    formatData,
    dataFilter,
    jiamiPassowrd
} = require('../utils')

const colName='user'

router.get('/list', async (req, res) => {
    // const {page=1,size=10,ids}=req.query;
    const params = dataFilter(
        req.query, [{
        key: 'page',
        type: 'number',
        default: 1
    }, 'size', 'ids', {
        key: 'asc',
        type: 'boolean'
    }])
    const {
        page = 1, size = 10, ids
    } = params
    const skip = (page - 1) * size
    const limit = size;
    console.log('quer->params=', req.query, params);
    let query = {}

    if (ids) {
        query._id = {
            $in: ids
        }
    }
    const data=await db.find(colName,query,{skip,limit})
    res.send(formatData.success(data))
})

//添加用户
router.post('/add',async(req,res)=>{
    const {username,password}=dataFilter(req.body,['username','password'])

    const result=await db.create(colName,{
        username,
        password:jiamiPassowrd(password),
        addtime:new Date()
    })

    res.send(formatData.success({
        code:result.code
    }))
})
router.get('/:id',async(req,res)=>{
    const {id}=req.params;
    const data=await db.find(colName,{_id:id})
    res.send(formatData.success(data[0]))
})
router.put('/:id',async(req,res)=>{
    const {id}=req.params;
    const newData=dataFilter(req.body,['username','passsword','age','role'])
    console.log('newData',newData);
    const result=await db.update(colName,{_id:id},{$set:newData})
    res.send(formatData({
        code:result?200:400
    }))
})
router.delete('/:id',async(req,res)=>{
    const {id}=req.params;
    const result =await db.remove(colName,{_id:id})
    res.send(formatData({
        code:result?200:400
    }))
})





// get /api/user/list
// router.get('/list',async (req,res)=>{
//    const  data=await db.find('user')
//    console.log(data);
//    res.send(formatData.success(data))
// })

//增加商品
// router.post('/',async(req,res)=>{
//     const {username,password,role,age}=req.body

//     const result=await db.create('user',{username,password,role,age})
//     res.send(
//         result?
//         formatData.success()
//         :
//         formatData.fail()
//     )
// })
// //删除用户
// router.delete('/:id',async(req,res)=>{
//     const {id}=req.params
//     const result =await db.remove('user',{_id:id})

//     res.send(
//         result?
//         formatData.success()
//         :
//         formatData.fail()
//     )
// })
// //修改用户信息
// router.put('/:id',async(req,res)=>{
//     const {id}=req.params
//     const {username,age,password}=req.body
//     const newData={username,age,password}

//     for(let key in newData){
//         if(newData[key]===undefined){
//             delete newData[key]
//         }
//     }
//     const result=await db.update('user',
//     {_id:id},
//     {
//         $set:newData
//     })
//     res.send(
//         result?
//         formatData.success()
//         :
//         formatData.fail()
//     )
// })

// //查询单个用户
// router.get('/:id',async(req,res)=>{
//     const {id}=req.params

//     const data=await db.find('user',{_id:id})
//     res.send(
//         formatData.success(data[0])
//     )
// })