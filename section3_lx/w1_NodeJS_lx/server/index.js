const express = require('express')
const router = require('./router')
const ssrRouter = require('./ssr')
const http=require('http')

const path = require('path');


//1.创建http服务器
const app = express();

//静态资源服务器
//资源存在：返回静态资源到浏览器
//资源不存在：next()
app.use(express.static('../client', {
    // index:'login.html',

    //设置静态资源缓存时间
    maxAge: 1000 * 60 * 60,
    //maxAge:'1d'
}))

//数据接口
app.use('/api', router)

//设置模板引擎
app.set('views', path.join(__dirname, './ejs'));
app.set('view engine', 'ejs')

//服务端渲染：SSR
app.use('/render', ssrRouter)

const PORT = 2108;
// app.listen(PORT, () => {
//     console.log('服务器已启动...2108');
// })

//2.创建websocket服务器
const socketServer = require('ws').Server;

//3. 利用http连接express服务器
let server = http.Server(app);

const wsServer = new socketServer({
    // port: 1001
    //4.利用http连接websocket
    server
});
//5. 使用server监听端口
server.listen(PORT,()=>{
    console.log('http server and websocket server are 合并成功');
})

//http服务器与websocket服务器结合

// 监听客户端连接:当客户端连接websocket服务器时自动执行connection事件
wsServer.on('connection', (client) => {
    // client：客户端对象，每个客户端对象会自动保存到wsServer.clients属性中
    
    //监听客户端对象操作：发送消息，关闭连接
    client.on('message', (msg) => {
        // 当客户端给服务器发送消息时执行这里的代码
        console.log('message', msg.toString());

        //广播：收到某一个客户端的消息后转发给其他的客户端
        wsServer.clients.forEach(item=>{
            const message=msg.toString()
            // if(item!==client){
                item.send(message)
            // }
        })
    })

    client.on('close', () => {
        //如果客户端关闭连接自动执行这里的代码
        console.log('close');
    })

    //服务器给客户端发送消息：提示用户进入聊天室
    // client.send()
})
