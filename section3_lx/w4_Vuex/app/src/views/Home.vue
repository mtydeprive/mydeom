<template>
  <div>
    <van-search
      v-model="keyword"
      placeholder="请输入搜索关键词"
      disabled
      @click="gotoSearch"
    />
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in hotlist" :key="item._id">
        <van-image
          width="100%"
          height="100%"
          fit="cover"
          :src="$request.baseUrl + item.img_url"
          @click="gotoDetail(item._id)"
        />
      </van-swipe-item>
    </van-swipe>
    <div style="padding: 10px">
      <h4>最新商品</h4>
      <van-row gutter="20">
        <van-col span="12" v-for="item in newlist" :key="item._id" class="splist">
          <div style="text-align: center" @click="gotoDetail(item._id)">
            <van-image
              width="100"
              height="100"
              :src="$request.baseUrl + item.img_url"
            />
          </div>
          <h5>{{ item.goods_name }}</h5>
          <p class="price">
            <del>{{ item.price }}</del>
            <span>{{ item.sales_price }}</span>
          </p>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
// import axios from 'axios'

export default {
  name: "Home",
  data() {
    return {
      keyword: "EDG夺冠啦！",
      newlist: [],
      hotlist: [],
    };
  },
  beforeRouteEnter(to, from, next) {
    // console.log("Home.beforeRouteEnter");
    next();
  },
  beforeRouteLeave(to, from, next) {
    // console.log("Home.beforeRouteLeave");
    next();
  },
  created() {
    // console.log("Home.created", this);

    //请求最新商品
    // axios.get('http://120.76.247.5:2003/api/goods',{
    //   // url参数
    //   params:{
    //     total:false,
    //     size:8
    //   },
    //   //request body
    //   data:{

    //   },
    //   //request header
    //   headers:{

    //   }
    // }).then(({data})=>{
    //     console.log('data',data); //{code,data,msg}
    //     this.newlist=data.data
    // })
    this.$request
      .get("/goods", {
        params: {
          total: false,
          size: 8,
        },
      })
      .then(({ data }) => {
        // console.log("data", data); //{code,data,msg}
        this.newlist = data.data;
      });

    //请求热门商品
    // axios.get('http://120.76.247.5:2003/api/goods',{
    this.$request
      .get("/goods", {
        params: {
          sort: "views",
          size: 5,
          total: false,
        },
      })
      .then(({ data }) => {
        this.hotlist = data.data;
      });
  },
  methods: {
    gotoSearch() {
      this.$router.push("/search?keyword=" + this.keyword);
    },
    gotoDetail(id) {
      //  this.$router.push('/goods/'+id)
      this.$router.push({
        name: "Goods",
        params: {
          id,
        },
      });
    },
  },
};
</script>
<style scoped>
.my-swipe .van-swipe-item {
  height: 160px;
  text-align: center;
}
.van-image {
  margin: 0 auto;
}

/* Vue组件局部样式：给style添加scoped属性后，Vue组件在编译时自动给当前组件所有元素添加data-v-[hash]属性并把添加了scoped属性的style标签下的样式添加属性选择器进行精确匹配 */
</style>
