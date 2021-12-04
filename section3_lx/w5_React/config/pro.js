const base = require('./base')
const path = require('path')
module.exports = {
    ...base,
    mode:'production',
    output:{
        path:path.resolve('./dist'), // path.join(__dirname,'dist')
        filename:'boundle.[name].[hash:5].js'
    },
}