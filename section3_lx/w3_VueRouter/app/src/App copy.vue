<template>
  <div id="app">
    <div>
      <button @click="$router.back()">回退</button>
      <button @click="$router.forward()">前进</button>
    </div>
    <!-- 路由视图显示：用于渲染路由对应的组件 -->
    <router-view></router-view>
    <router-link to="/home" tag="span" active-class="current" replace>首页</router-link>
    <router-link to="/reg">注册</router-link>
    <router-link to="/login">登录</router-link>
    <div>
      <button @click="goto('/login')">登录</button>
      <button @click="goto('/reg')">注册</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  created(){
    console.log('app',this);
  },
  methods:{
    goto(url){
      // this.$router.push(url)
      this.$router.replace(url)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.router-link-active{color: #58bc58;}
.current{color: red;}
</style>
