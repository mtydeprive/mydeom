<template>
  <div>
    <h1>免费注册</h1>
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
          >注册</van-button
        >
        <span>已有账号?点击去<a @click="goto('/login')">登录</a></span>
      </div>
    </van-form>
  </div>
</template>
<script>
export default {
  name: "Reg",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  created() {
    // console.log("reg", this);
  },
  methods: {
    onSubmit(value) {
      //value:必须给表单元素添加name属性才能获取值
      // console.log("value", value);
      this.$request
        .get("/user/check?username=" + this.username)
        .then(({ data }) => {
          // console.log("data", data);
          if (data.code === 200) {
            this.$request.post("/reg", value).then(({ data }) => {
              // console.log("data=", data);
              this.$toast("注册成功");
              this.$router.replace("/login");
            });
          } else {
            this.$toast("用户名已存在");
          }
        });
    },
    goto(value) {
      this.$router.push(value);
    },
  },
};
</script>