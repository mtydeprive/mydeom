<template>
  <div>
    <form action="/">
      <van-search
        v-model="keyword"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
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
</template>
<script>
export default {
  name: "Search",
  data() {
    return {
      keyword: this.$route.query.keyword || "",
      newlist:[]
    };
  },
  created() {
      
  },
  methods:{
      onSearch(keyword){
          console.log('keyword',keyword);
          this.$request.get('/search',{
              params:{
                  keyword:this.keyword
              }
          }).then(({data})=>{
              console.log('data',data.data.result);
              this.newlist=data.data.result
          })
      },
      onCancel(){
          this.$router.push('/home')
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