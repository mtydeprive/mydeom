import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router';
import request from '../utils/request'

import user from './user'
import cart from './cart'

// 2. 安装vuex插件
Vue.use(Vuex)

// 实现数据持久化





// 3. 实例化一个数据仓库store
const store  = new Vuex.Store({
    // 核心配置
    // 全局状态
    state:{
        index:10,
        a:20
        
    },
    getters:{
        globalA(){
            return 100
        }
    },
    // mutations: 修改state的唯一方法，只能用与同步操作
    // store.commit(mutation,payload)
    mutations:{
        

       
    },

    // 一般用户异步操作
    // store.dispatch(action,payload)
    actions:{
        globalLogin(){
            console.log('globalLogin')
        }
    },

    // vuex模块化
    modules:{
        user,
        cart
    }
})
console.log('store',store);
store.dispatch({type:'globalLogin'})

export default store;