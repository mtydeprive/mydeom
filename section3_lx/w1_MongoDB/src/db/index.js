const {MongoClient}=require('mongodb')

const url="mongodb://127.0.0.1:27017";
const dbname='h52108'

async function connect(){
    //创建客户端对象
    const client=new MongoClient(url);

    await client.connect()

    //切换数据库
    const db=client.db(dbname)

    return{
        db,
        client
    }
}

//增 create()
async function create(colname,query){
    const {db,client}=await connect()
    const col=db.collection(colname)
    const data=col.insertMany(query)

    //关闭连接，释放资源占用
    client.close()
    return data
}
//删除 remove()
async function remove(colname,query){
    const {db,client}=await connect()
    const col=db.collection(colname)
    const data=col.deleteMany(query)

    //关闭连接，释放资源占用
    client.close()
    return data
}
//修改 update()
async function update(colname,query){
    const {db,client}=await connect()
    const col=db.collection(colname)
    const data=col.updateMany(query)

        //关闭连接，释放资源占用
        client.close()
        return data
}

//查询 find()
async function find(colname,query){
    const {db,client}=await connect()
    const col=db.collection(colname)
    const result=col.find(query)
    
    const data=await result.toArray()

    //关闭连接，释放资源占用
    client.close();
    return data;
}

module.exports={
    create,
    remove,
    update,
    find,
}
