<template>
    <div style="padding:15px">
      <template v-if="isLogin">
      <p>
       {{userInfo.username}}
      </p>
      <van-button block type="danger" @click="logout">退出</van-button>
      </template>
      <van-button v-else block type="primary" @click="$router.push('/login')">登录</van-button>
    </div>
</template>
<script>
export default {
    name:'Mine',
      created(){
    console.log('Mine',this);
  },
  computed:{
    userInfo(){
      return this.$store.state.user.userInfo
    },
    isLogin(){
      return this.$store.getters.isLogin
      //设置命名空间后写法
      // return this.$store.getters['user/isLogin']
    }
  },
  methods:{
    logout(){
      this.$store.commit('logout')
      //设置命名空间后写法
      // this.$store.commit('user/logout')
    }
  }
}
</script>