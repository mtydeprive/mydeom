const base = require('./base')
const path = require('path')
module.exports = {
    ...base,
    mode:'development',
    devServer:{
        static: {
            directory: path.join(__dirname, 'public'),
        },
        port:8080
    },
}