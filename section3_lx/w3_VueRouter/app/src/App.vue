<template>
  <div id="app">
    <!-- 路由视图显示：用于渲染路由对应的组件 -->
    <router-view></router-view>

    <!-- <van-tabbar v-model="active" @change="changeMenu" > -->
    <van-tabbar v-model="active" route v-show="showTabbar">
      <van-tabbar-item :icon="item.icon" v-for="item in menu" :key="item.path" :to="item.path"
      :badge="item.path==='/cart'? catrlist.length:null"
      >{{item.text}}</van-tabbar-item>
     </van-tabbar>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      active:0,
      showTabbar:true,
      menu:[
        {
          path:'/home',
          text:'首页',
          icon:'wap-home'
        },
        {
          path:'/discover',
          text:'发现',
          icon:'browsing-history'
        },
        {
          path:'/cart',
          text:'购物车',
          icon:'cart-circle'
        },
        {
          path:'/mine',
          text:'我的',
          icon:'friends'
        },
      ],
      catrlist:[],
    }
  },
  created(){
    // const index=this.menu.findIndex(item=>{
    //   return item.path===this.$route.path
    // })
    //   console.log('app',this.$route);
    // this.active=index
    let catrlist = localStorage.getItem("cartlist"); //null
      try {
        catrlist = JSON.parse(catrlist) || [];
      } catch (err) {
        catrlist = [];
      }
      this.catrlist=catrlist
  },
  methods:{
    goto(url){
      // this.$router.push(url)
      this.$router.replace(url)
    },
    // changeMenu(index){
    //   console.log('index',index);
    //   const current=this.menu[index].path
    //   this.$router.push(current)
    // }
  }
}
</script>

<style>
  #app{
    width: 100%;
    height: 100%;
  }
  .price del{color: #666;margin-right: 5px;}
  .price span{color: red;}
  .price del::before,.price span::before{
    content: '￥';
  }
  .splist{
    height: 278px;
  }
</style>
