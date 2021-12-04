<template>
  <div>
    <van-search
      v-model="keyword"
      placeholder="请输入搜索关键词"
      disabled
      @click="gotoSearch"
    />
    <van-tabs v-model="active">
      <van-tab v-for="item in catelist" :key="item.text" :title="item.text">
        <div style="padding: 10px">
          <van-row gutter="20">
            <van-col span="12" v-for="item in goodslist" :key="item._id" class="splist">
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
      </van-tab>
    </van-tabs>
  <h4 class="jz" @click="genduo()">点击加载更多</h4>
  </div>
</template>
<script>
export default {
  name: "Discover",
  data() {
    return {
      keyword: "EDG夺冠啦！",
      goodslist: [],
      catelist: [],
      active: 0,
      page:2,
    };
  },
  created() {
    console.log("Discover", this);
    this.$request
      .get("/category", {
        params: {
          total: false,
          size: 5,
        },
      })
      .then(({ data }) => {
        // console.log("data", data);
        this.catelist = data.data;

        this.$request
          .get("/goods", {
            params: {
              total: false,
              category: "女士表",
            },
          })
          .then(({ data }) => {
            console.log(data);
            this.goodslist = data.data;
            // console.log("goodslist", this.goodslist);
          });
      });
  },
  watch: {
    active: function (n, o) {
      // console.log(n, o);
      this.$request
        .get("/goods", {
          params: {
            total: false,
            category: this.catelist[this.active].text,
          },
        })
        .then(({ data }) => {
          this.goodslist = data.data;
          // console.log("goodslist", this.goodslist);
        });
    },
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
    genduo(){
        this.$request.get('/goods',{
          params:{
            category:this.catelist[this.active].text,
            page:this.page++,
            size:10
          }
        }).then(({data})=>{
          data.data.result.forEach(item=>{
            this.goodslist.push(item)
          })
        })
    }
  },
};
</script>
<style scoped>
  .jz{
    margin: 0;
    padding: 0;
    height: 100px;
    text-align: center;
  }
</style>
