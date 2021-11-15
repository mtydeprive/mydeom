import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
import request from './utils/request'
import 'vant/lib/index.css'

//Vue.use(Vant):注册全局组件，给原型添加$motify()，$toast()方法
Vue.use(Vant)

// 给Vue的原型添加方法
Vue.prototype.$request=request

Vue.config.productionTip = false

new Vue({
  // 5. 把路由实例注入Vue
  router:router,
  render: h => h(App),
}).$mount('#app')

