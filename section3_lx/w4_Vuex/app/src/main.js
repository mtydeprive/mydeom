import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import request from './utils/request'
import Vant from 'vant'
import 'vant/lib/index.css'

// Vue.use(Vant)：注册全局组件，给原型添加$notify()，$toast()方法
Vue.use(Vant)


// 给Vue的原型添加方法
Vue.prototype.$request = request


Vue.config.productionTip = false

new Vue({
  // 5. 把路由实例注入Vue
  router:router,
  // 4. 把store注入Vue
  store:store,
  render: h => h(App),
}).$mount('#app')
