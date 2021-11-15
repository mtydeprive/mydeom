/**
 * Token操作
    * 创建token方法：create
    * 验证token方法：verify 
 */

const jwt =require('jsonwebtoken');

// 密钥：用于加密key
const key = 'asdfghjkl'

/**
 * 
 * @param {Object} data     需要写入token的加密数据
 * @param {Number|String} expriesIn     有效期 
 * @returns {String}        返回token（一段加密后拥有效期的字符）
 */
exports.create=(data,expriesIn=60*60*2)=>{
    //username:用于加密的用户名
    //expires：token有效期（单位：s），默认2小时（2h）

    // 生成Token：根据传入用户名和key进行加密，并设置有效期
    let token=jwt.sign(data,key,{
        expiresIn
    });
    return token;
}


exports.verify=(token)=>{
    let res=false;
    try{
        //jwt.verify()
        //校验成功，得到加密前的数据（解密）
        //校验失败，抛出错误
        res =jwt.verify(token,key);//得出解密后的结果Object：{username：xx}
        res=true;
    }   catch(err){
        res=false
    }
    return res;
}