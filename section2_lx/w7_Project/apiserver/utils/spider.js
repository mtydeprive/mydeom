/**
 * 后端（服务端）
 *发送请求
 *request() 
 *superagent()
 */
//https://shop.vivo.com.cn/api/v1/channel/getDetail?t=1634259797291


const superagent = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')

const mysql = require('mysql')
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    // port: 3306,
    database: 'project',

    //     // 允许每个mysql语句有多条查询（默认false）.使用它时要非常注意，因为它很容易引起sql注入攻击
    //     // multipleStatements: true
});

// superagent.get('https://shop.vivo.com.cn/wap/fbApi/v1/channel/getDetail').then(res=>{
//     // console.log('res',res.text);
//     const {data}=JSON.parse(res.text)
//     // console.log('data',data);

//     let sql='insert into flashsale(skuImg,skuName,actPrice,marketPrice,cornerImg,redirectUrl,promotion) value'
//     sql+=data.actSkuInfoVos.map(item=>{
//         const {skuImg,skuName,actPrice,marketPrice,cornerImg,redirectUrl,promotion}=item;
//         return `('${skuImg}','${skuName}','${actPrice}','${marketPrice}','${cornerImg}','${redirectUrl}','${promotion}')`
//     }).join(',')
//     // console.log('sql',sql);
//     pool.query(sql,(err,result)=>{
//         if(err){
//             console.log('err',err);
//             return
//         }
//         console.log('数据插入成功',result);
//     })
// })

superagent.get('https://www.linefriends.cn')
    // .query({
    //     pageindex:10
    // })
    // // 设置请求头
    // .set({

    //     authority: 'www.linefriends.cn',
    //     method: 'GET',
    //     path: '/SubCategory',
    //     scheme: 'https',
    //     accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    //     'accept-encoding': 'gzip, deflate, br',
    //     'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
    //     cookie: 'ASP.NET_SessionId=vjriz5miqfo1e1jeh5vs0uiq; UM_distinctid=17c870a8e6051c-0a43575530a839-b7a1438-144000-17c870a8e61a40; t_sessionId=87999e9db89141c2ab40a6357b672b7e; MEIQIA_TRACK_ID=1zZQagbHuuXr028JmQKgOdv2jy7; MEIQIA_VISIT_ID=1zZQacgUjMAefbLGBEidDOymhTJ; BrowedProductList-Admin=%3c%3fxml+version%3d%221.0%22+encoding%3d%22utf-16%22%3f%3e%0d%0a%3cArrayOfInt+xmlns%3axsd%3d%22http%3a%2f%2fwww.w3.org%2f2001%2fXMLSchema%22+xmlns%3axsi%3d%22http%3a%2f%2fwww.w3.org%2f2001%2fXMLSchema-instance%22%3e%0d%0a++%3cint%3e3882%3c%2fint%3e%0d%0a%3c%2fArrayOfInt%3e; CNZZDATA1275122262=1081636826-1634346189-https%253A%252F%252Fwww.baidu.com%252F%7C1634351664',
    //     'referer': 'https://www.linefriends.cn/SubCategory',
    //     'sec-ch-ua': '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"',
    //     'sec-ch-ua-mobile': '?0',
    //     'sec-ch-ua-platform': "Windows",
    //     'sec-fetch-dest': 'document',
    //     'sec-fetch-mode': 'navigate',
    //     'sec-fetch-site': 'same-origin',
    //     'sec-fetch-user': '?1',
    //     'upgrade-insecure-requests': '1',
    //     'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36',
    
    // })
    .then(res => {
        // console.log(res.body);
        // 使用cheerio.load()加载html结构
        const $ = cheerio.load(res.text)

        let sql = `insert into sweets(name,img_url,price) values`
        const goodslist = []

        // // // 查找需要的html结构
        $('.lf_banner li ').each((idx, el) => {
            //     // idx: 索引值
            //     // el: 每个li

            //     // 提取li中的信息
            const $li = $(el);

            let img_url = $li.find('img').attr('data-url')

            // 判断img_url中是否以https开头：startsWith()/endsWith()/includes()
            img_url = 'https://www.linefriends.cn' + img_url

            const {
                pathname
            } = new URL(img_url)
            const filename = path.basename(pathname)

            const goods = {
                img_url,
                name: $li.find('.pro-name').text(),
                price: $li.find('span').text().replace(/[,￥¥]/g, '') * 1,
                // price:$li.find('span').text()
                // old_price:$li.find('.old').text().replace(/[,￥¥]/g,'')*1
            }
            goodslist.push(goods)

            //发起图片请求
            superagent.get(img_url).then(result => {
                //获取图片信息，利用fs模块并保持到本地
                // console.log('result',result.body);

                //获取图片路径

                // fs.writeFile('../src/assets/img/' + filename, result.body, function (err, res) {
                //     if (!err)
                //         console.log('图片写入成功')
                //     else
                //         console.log('err', err)
                // })
            })
        })

        sql += goodslist.map(item => {
            const {
                name,
                price,
                img_url
            } = item;
            return `('${name}','${img_url}','${price}')`
        }).join(',')

        console.log('goodslist',goodslist)

        // // 写入数据库
        // pool.query(sql,(err,result)=>{
        //     if(err){
        //         console.log('err',err)
        //         return
        //     }

        //     console.log('数据插入成功',result)
        // })
    })
