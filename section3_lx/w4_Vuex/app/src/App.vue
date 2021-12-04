<template>
  <div id="app">
    <!-- 路由视图显示：用于渲染路由对应的组件 -->
    <router-view></router-view>

    <!-- <van-tabbar v-model="active" @change="changeMenu" > -->
    <van-tabbar v-model="active" route v-show="showTabbar">
      <van-tabbar-item
        :icon="item.icon"
        v-for="item in menu"
        :key="item.path"
        :to="item.path"
        :badge="item.path === '/cart' ? cartlist.length : null"
        >{{
          item.path === "/mine" && isLogin
            ? userInfo.username
            : item.text
        }}</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
  name: "App",
  data() {
    return {
      active: 0,
      showTabbar: true,
      menu: [
        {
          path: "/home",
          text: "首页",
          icon: "wap-home",
        },
        {
          path: "/discover",
          text: "发现",
          icon: "browsing-history",
        },
        {
          path: "/cart",
          text: "购物车",
          icon: "cart-circle",
        },
        {
          path: "/mine",
          text: "我的",
          icon: "friends",
        },
      ],
    };
  },
  computed: {
  // @mapState
    // 数组写法：映射全局state（属性不可修改）
    ...mapState(['index','a']),
    // 对象写法：映射所有state
    ...mapState({
      idx:'index', // 映射全局state中的index到idx
      cartlist2:function(state){
        return state.cart.cartlist
      },
      userInfo2:state=>state.user.userInfo,
    }),
    // 设置命名空间后简化写法
    ...mapState('user',{
      user:'userInfo'
    }),

    // @mapGetters
    // 数组写法：映射全局getters（属性不可修改）
    ...mapGetters(['globalA','totalPrice']),
    // 对象写法：可以修改属性名，不支持函数
    ...mapGetters({
      ga:'globalA',
      isLogin2:'user/isLogin'
    }),
    // 设置命名空间后简化写法
    ...mapGetters('user',{
      isLogin3:'isLogin'
    }),
    cartlist() {
    //   //模块化前写法
      // return this.$store.state.cartlist;
    //   //模块化后写法
      return this.$store.state.cart.cartlist;
    },
    isLogin() {
      // return this.$store.getters.isLogin;
      //设置命名空间后
      return this.$store.getters['user/isLogin']
    },
    userInfo() {
      return this.$store.state.user.userInfo;
    },
  },
  created() {},
  methods: {
    goto(url) {
      // this.$router.push(url)
      this.$router.replace(url);
    },
    // changeMenu(index){
    //   console.log('index',index);
    //   const current=this.menu[index].path
    //   this.$router.push(current)
    // }
  },
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
.price del {
  color: #666;
  margin-right: 5px;
}
.price span {
  color: red;
}
.price del::before,
.price span::before {
  content: "￥";
}
.splist {
  height: 278px;
}
</style>
