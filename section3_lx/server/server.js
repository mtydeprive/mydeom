const express=require('express')
const app=express()
app.use(express.static('./dist',{
    maxAge:'1d',//ms
}))
app.listen(2108)