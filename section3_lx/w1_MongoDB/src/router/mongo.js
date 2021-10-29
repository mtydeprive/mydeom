const {Router}=require('express');
const connect=require('../db')
const router=Router();
module.exports=router;
const {formatData}=require('../utils')


router.get('/list',async function(req,res){
    const data = await connect.find('user',{role:'svip'})
   console.log("data=",data);
    res.send(formatData.success(data))
})
router.delete('/zengjia',async function(req,res){
const data = await connect.delete('user',{username:'nmnm'})
   console.log("data=",data);
    res.send(formatData.success(data))
})
// router.delete('/zengjia',async function(req,res){
//     const data = await connect.delete('user',[{username:'laozzz',password:'123456',role:'svip'}])
//    console.log("data=",data);
//     res.send(formatData.success(data))
// })















// const {MongoClient}=require('mongodb')
// const url='mongodb://127.0.0.1:27017'
// const dbname='h52108'
//连接mongoDB
//回调写法
// MongoClient.connect(url,async function(err,client){
//     //client:mongodb客户端对象
//     if(err)throw err;

//     //利用客户端对象连接数据库，返回数据库对象
//     const db=client.db('h52108')

//     //利用数据库对象选择集合
//     const col=db.collection('user')

//     //对集合进行CRUD
//     // 增：col.insertOne()/col.insertMany()
//     //删：col.deleteOne()/col.deleteMany()
//     //改：col.updateOne()/col.updateMany()
//     //查：col.find()/col.findOne()

//     const result=col.find()
//     // const data=col.insertOne({username:'nmnm',password:'12346'})

//     //获取查询数据：toArray()
//     const data=await result.toArray();
//     console.log('data=',data);
// })



//Promise写法
// async function connect(){
//     try{
//     const client=await MongoClient.connect(url)
//     const db=client.db(dbname);

//     const col=db.collection('user')
//     const result=col.find({role:'vip'})

//     const data=await result.toArray()

//     console.log("data=",data); 
//     }catch(err){

//     }
// }

async function connect(){
    try{
    const client=await MongoClient.connect(url)
    const db=client.db(dbname);

    const col=db.collection('user')
    const data=col.updateMany({role:'svip'},{$set:{age:'23'}})

    console.log("data=",data); 
    }catch(err){

    }

}
connect()