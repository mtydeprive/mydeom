<template>
  <div>
    <h1>用户登录</h1>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
        <span>还没有账号?点击去<a @click="goto('/reg')">注册</a></span>
      </div>
    </van-form>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  created() {
    console.log("Login", this);
  },
  methods:{
    // @mapActions
    // 数组写法
    ...mapActions(['globalLogin']),
    // 对象写法
    // ...mapActions({
    //   login:'user/login',
    //   login2:async function(dispatch,payload){
    //     const data = await dispatch('user/login',payload)
    //     if(data.code === 200){
    //       this.$toast('登录成功')
  
    //       const {targetUrl='/mine'} = this.$route.query;
    //       this.$router.replace(targetUrl)

    //     }
    //   }
    // }),
    // 命名空间写法
    ...mapActions('user',{
      login3:'login',
      async login4(dispatch,payload){
        const data = await dispatch('login',payload)
        if(data.code === 200){
          this.$toast('登录成功')
  
          const {targetUrl='/mine'} = this.$route.query;
          this.$router.replace(targetUrl)

        }
      }
    }),
    async onSubmit(values){
      // values： 必须给表单元素添加name属性才能获取值
      console.log('values',values)

    // axios.get(url,config)
    // axios.post(url,data,config)
      // this.$request.post('/login',values).then(({data})=>{
      //   console.log('data=',data);

      //   this.$store.commit('login',data.data)

        

        // this.$toast('登录成功')

      //   const {targetUrl='/mine'} = this.$route.query;
      //   this.$router.replace(targetUrl)
      // })

      // const data = await this.$store.dispatch('login',values)
      // 设置命名空间后写法
      const data = await this.$store.dispatch('user/login',values)
      

      console.log('data=',data);
      if(data.code === 200){
          this.$toast('登录成功')
  
        const {targetUrl='/mine'} = this.$route.query;
        this.$router.replace(targetUrl)

      }

        // mapActions后的写法
        // const data = await this.login(values);
        // this.login2(values)
    },
    goto(value) {
      this.$router.push(value);
    },
  },
};
</script>
<style >
a {
  color: #58bc58;
}
</style>