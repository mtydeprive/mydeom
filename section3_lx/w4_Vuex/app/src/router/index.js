import Vue from 'vue'
// 1. 安装vue-router
// 2. 引入vue-router
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Reg from '../views/Reg.vue'
import Discover from '../views/Discover.vue'
import Cart from '../views/Cart.vue'
import Mine from '../views/Mine.vue'
import Search from '../views/Search.vue'
import Goods from '../views/Goods.vue'
import NotFound from '../views/NotFound.vue'

// 3. 安装路由插件
Vue.use(VueRouter)
// 4. 实例化路由，并配置参数
const router = new VueRouter({
  routes:[
    {
      path:'/',
      // 路由重定向
      redirect:'/home',
      // redirect:{name:'Home'}
    },
    // 当浏览器地址为/home时，渲染Home组件的内容
    {
      path:'/home',
      component:Home,
      name:'Home',
    //   路由独享守卫
      beforeEnter(to,from,next){
          console.log('Home.beforeEnter')
        next()
      }
    },
    {
      path:'/reg',
      component:Reg
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/discover',
      component:Discover
    },
    {
      path:'/cart',
      component:Cart,
      // 路由元信息：路由附带信息
      meta:{
        requireAuth:true
      }
    },
    {
      path:'/mine',
      component:Mine,
      meta:{
        requireAuth:true
      }
    },
    {
      path:'/search',
      component:Search
    },
    {
      path:'/goods/:id',
      component:Goods,
      name:'Goods',
      beforeEnter(to,from,next){
          console.log('Goods.beforeEnter')
          next();
      }
    },
    // 404页面
    {
      path:'/notfound',
      component:NotFound,
    },
    {
      path:'*',
      redirect:'/notfound'
    }
  ]
})

console.log('router',router);

// 全局路由守卫
router.beforeEach(function(to,from,next){
    console.log('beforeEach');
    // 判断进入的页面是否需要登录才可访问
    // if(['/cart','/mine'].includes(to.path)){
      if(to.meta.requireAuth){
      // 获取本地存储信息，判断是否登录
      let userInfo = localStorage.getItem('userInfo')
      try{
        userInfo = JSON.parse(userInfo) || {}
      }catch(err){
        userInfo = {}
      }
      if(userInfo._id){
        // 假设所有的用户都是好人,先放行，后校验
        // 如果用户已登录，则校验用户身份
        router.app.$request.get('/user/verify',{
          params:{
            username:userInfo.username
          },
          headers:{
            Authorization:userInfo.authorization
          }
        }).then(({data})=>{
          console.log('data',data);
          if(data.code === 401){
            localStorage.removeItem('userInfo')
            router.push({
              path:'/login',
              query:{
                // 用户访问的目标页面
                targetUrl:to.fullPath
              }
            })
          }
        })
        next()
      }else{
        router.push({
          path:'/login',
          query:{
            // 用户访问的目标页面
            targetUrl:to.fullPath
          }
        })
      }
    }else{

      next();
    }
})
// router.beforeResolve(function(to,from,next){
//     console.log('beforeResolve');
//     next();
// })
// router.afterEach(function(to,from){
//     console.log('afterEach');
// })

export default router;