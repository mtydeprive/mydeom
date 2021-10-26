const express = require('express')
const router = require('./router')

const app = express()

app.use(express.static('../public'))

// 数据接口
app.use('/api',router)

app.listen(4000,()=>{
    console.log('server is running at port 4000')
})