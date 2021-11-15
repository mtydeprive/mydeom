import axios from 'axios'

const baseUrl='http://120.76.247.5:2003'
// 创建axios实例，实例拥有与axios几乎一致的方法
// 我们可以在创建实例时配置自定义参数
const instance = axios.create({
    //基础路径,任何请求都基于该地址发出
    baseURL: baseUrl+'/api/',
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
  });

  instance.baseUrl=baseUrl

  export default instance;
