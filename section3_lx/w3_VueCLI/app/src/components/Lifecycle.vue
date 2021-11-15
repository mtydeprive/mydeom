<template>
  <div>
    Vue的生命周期
    <button @click="counter++">counter:{{ counter }}</button>
    <div>
      <p>{{data}}:{{ page }}</p>
      <button v-for="item in 10" :key="item" @click="page=item">{{ item }}</button>
    </div>
  </div>
</template> if

<script>
export default {
  name: "Lifecycle",
  data() {
    return {
      data: '',
      counter: 1,
      page: 1,
    };
  },
  methods: {
    getData() {
      this.data=`第${this.page}页的数据`
    },
  },
  beforeUpdate() {},
  updated() {
    //要注意避免在此期间更改数据，因为这可能会导致死循环
    this.getData();
  },
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");
    // ajax()获取第一页的数据
    this.getData();
  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted() {
    console.log("mounted");
      // this.timer = setInterval(()=>{
        //     console.log('interval')
        //     this.counter++;
        // },1000)
  },
  beforeDestroy() {
    console.log("beforeDestroy");
  },
  destroyed() {
    console.log("destroyed");
  },
};
</script>