// webpack会自动处理以下引入
import Vue from 'vue' // node_modules/vue/dist/vue.runtime.esm.js
import App from './App.vue' // 引入App.vue中的js代码
console.log('App=',App)

// // ****module测试代码****
// // 导入模块对象中所有属性并写入userObject变量
// import * as userObject from './module/user.js'

// // 导入模块对象中的username属性
// import {username} from './module/user.js'

// // 导入模块对象中的username属性并赋值给personname变量
// import {username as personname,age,setAge} from './module/user.js'

// // 导入模块对象的中的默认属性（default）
// import score from './module/user.js'
// import myScore,{age as myAge} from './module/user.js'

// console.log('userObject',userObject)
// console.log('username,personname,age',username,personname,age)
// setAge(19);
// console.log('score=',score)
// console.log('myScore=',myScore,myAge)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
