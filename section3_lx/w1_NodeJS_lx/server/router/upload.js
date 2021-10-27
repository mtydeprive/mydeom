const {Router} = require('express')
const path = require('path')
const router = Router();
module.exports = router;

const multer = require('multer')
console.log('multer', multer);

//创建中间件
//1.简单上传
// const upload = multer({ 
//     //目标文件保存位置，目录不存在则自动创建
//     //dest:'upload/',
//     // dest:path.join(__dirname,'../../client/uploads/' ) 
// })

// 2控制上传细节
// 配置上传参数
const storage = multer.diskStorage({
    //设置上传文件保存路径
    destination: path.join(__dirname, '../../client/uploads/'),
    filename: function (req, file, cb) {
        //获取文件后缀名
        let ext = path.extname(file.originalname);

        // 文件格式：avatar-16213222.jpg
        cb(null, file.fieldname + '-' + Date.now() + ext)
    }
})
const upload = multer({
    storage,
    //限制上传文件类型
    fileFilter(req,file,cb){
        let ext = path.extname(file.originalname);
        cb(null,/jpe?g|png|gif/.test(ext))
    },
    //限制文件大小
    limits:{
        fileSize:1024*1024*2
    }
});

// 上传头像
router.post('/avatar', upload.single('avatar'), (req, res) => {
    // upload.single()把文件信息格式化到req.file,把普通文本信息格式化到req.body
    console.log('file', req.file);
    console.log('body', req.body);
    res.send('上传成功')
})

// 上传商品
router.post('/goods', upload.array('goods', 5), (req, res) => {
    // upload.array()把文件信息格式化到req.files,把普通文本信息格式化到req.body
    console.log('file', req.files);
      console.log('body', req.body);
    res.send('上传商品成功')
})