const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {

    // 1.入口：用于告诉webpack从哪开始

    // 单入口文件：文件最终被编译成main.js
    entry:'./src/index.js',  

    // 3. 加载器loader：告诉webpack如何处理文件（模块）
    module:{
        rules:[
            // js加载器：babel-loader
            {
                // 匹配规则：匹配js文件
                test:/\.jsx?$/,

                // 不需要对加载器进行配置时，可以直接使用加载器名称
                // use:'babel-loader', 
                
                use:{
                    loader:'babel-loader',
                    options:{
                        // 插件
                        // plugins:['@babel/plugin-proposal-class-properties'],

                        // 预设：插件集合
                        presets:['@babel/preset-react'],
                    }
                }
            },

            // css加载器：css-loader + style-loader
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },

            // sass加载器：sass-loader
            {
                test:/\.scss$/,
                use:['style-loader','css-loader','sass-loader']
            },

            // 文件加载器：图片
            {
                test:/\.(jpe?g|png|gif|svg)$/,
                use:{
                    loader:'url-loader',
                    options:{
                        // 设置文件大小如果超过limit的值则采用url地址方式
                        // 如小于limit值，则采用base64的方式
                        limit: 10000,
                        // 以下路径基于outpu目录
                        name:'assets/img/[name].[hash:5].[ext]'
                    }
                }
            }
        ]
    },

    // 4. plugins
    plugins:[
        new CleanWebpackPlugin(),
        // 创建index.html文件
        new HtmlWebpackPlugin({
            // 指定文件作为模板生成html文件
            template:'./public/index.html',
            // filename:'login.html', // 默认为index.html,
            hash:true,
            title:'首页'
        }),

        // 复制静态资源到编译目录，一般用于复制没有经过webpack处理的文件
        // new CopyPlugin({
        //     patterns:[{
        //         from:'./public/assets',
        //         // 以下目录基于output目录
        //         to:'./assets'
        //     }]
        // })
    ],


    // 6. 默认扩展名与路径别名
    resolve:{
        extensions:['.js','.jsx'],
        alias:{
            "@":path.join(__dirname,'src')
        }
    }
}