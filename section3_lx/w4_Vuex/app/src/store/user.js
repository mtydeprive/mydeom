import {updataStorage} from '../utils/storage'
import request from '../utils/request'

let userInfo = localStorage.getItem('userInfo'); // null
try{
    userInfo = JSON.parse(userInfo) || {};
}catch(err){
    userInfo = {}
}

export default {
    // 设置命名空间
    namespaced:true,

    state:{
        userInfo,
    },
    getters:{
        isLogin(state,getters,rootState,rootGetters){
            console.log('user.getters=',state,getters,rootState,rootGetters)
            // state: 当前模块的state：{userInfo}
            // getters:当前模块的getters
            // rootState: 全局state: {user:{userInfo},cart:{cartlist}}
            // rootGetters:全局getter
            // * 默认getters不分模块，所有getter都是全局的（getters===rootGetters）
            // * 设置命名空间后，getters为当前模块的getters, rootGetters为全局getters
            return !!state.userInfo.authorization;
        }
    },
    mutations:{
         // 用户相关
        // store.commit('login',userInfo)
        login(state,payload){
            console.log('mutations',arguments)
            state.userInfo = payload;

            updataStorage('userInfo',payload)
        },
        logout(state){
            state.userInfo = {}
            updataStorage('userInfo',{})
        }
    },
    actions:{
        async login(context,payload){
            console.log('context',context);
            // context: 一个类似于store的对象，拥有与store几乎一致的属性、方法  
            // context = {state,rootState,getters,rootGetters,dispatch,commit}
            // payload: 调用action时传入的参数
            // store._vm.$request.post()
            const {data} = await request.post('/login',payload)
            
        
            // 触发mutation，进而修改userInfo
            context.commit('login',data.data)

            // 触发其他模块mutation/action
            // context.commit('cart/add')
            // context.dispatch('cart/add')
            
            // 不因该在actions中编写页面业务逻辑代码，而是把后端返回的数据返回到调用action的位置再进行页面业务逻辑的操作

            return data;
        }
    },
}