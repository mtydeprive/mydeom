import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import request from '../utils/request'
// 2.安装vuex插件
Vue.use(Vuex)

function updataStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}
//实现数据持久化
let cartlist = localStorage.getItem('cartlist')
try {
    cartlist = JSON.parse(cartlist) || [];
} catch (err) {
    cartlist = []
}

let userInfo = localStorage.getItem('userInfo')
try {
    userInfo = JSON.parse(userInfo) || {};
} catch (err) {
    userInfo = {}
}

//3. 实例化一个数据仓库store
const store = new Vuex.Store({
    //核心配置
    //全局状态
    state: {
        cartlist,
        userInfo: {}
    },
    getters: {
        totalPrice(state, getters) {
            return state.cartlist.reduce((val, item) => val + item.sales_price * item.qty, 0)

        },
        isLogin(state) {
            return !!state.userInfo.authorization;
        }

    },
    // mutation: 修改state的唯一方法 只能用于同步操作
    // store.commit(mutation,payload)
    mutations: {
        add(state, payload) {
            state.cartlist.unshift(payload)

            //写入本地存储
            updataStorage('cartlist', state.cartlist)
        },
        // store.commit('changeqty',{_id,qty})
        changeqty(state, {
            _id,
            qty
        }) {
            state.cartlist.forEach(item => {
                if (item._id === _id) {
                    item.qty = qty
                }
            })
            //写入本地存储
            updataStorage('cartlist', state.cartlist)
        },
        //删除购物车商品
        //store.commit('rmove',{_id:123})
        remove(state, {
            _id
        }) {
            if (!Array.isArray(_id)) {
                _id = [_id]
            }
            state.cartlist = state.cartlist.filter(item => !_id.includes(item._id))

            updataStorage('cartlist', state.cartlist)
        },

        //用户相关
        //store.commit('login',userInfo)
        login(state, payload) {
            state.userInfo = payload;
            updataStorage('userInfo', payload)
        },
        logout(state) {
            state.userInfo = {}
            updataStorage('userInfo', {})
        }
    },
    //一般用于异步操作
    //store.dispatch(action,payload)
    actions: {
        async login(context, payload) {
            console.log('context', context.state);
            //context:一个类似于store的对象，拥有与store几乎一致的属性、方法
            // payload：调用action时传入参数
            // store._vm.$request.post()
            const {
                data
            } = await request.post("/login", payload)
            //     //触发mutation，进而修改userInfo
            context.commit('login', data.data)

            //不应该在actions不应该写在页面业务逻辑代码,而是把后端返回的数据返回到调用actins的位置在进行页面业务逻辑的操作
            return data
        }
    }
})

export default store;