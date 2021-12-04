<template>
  <div>
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
    />
    <van-nav-bar :title="data.goods_name" left-text="返回" left-arrow>
      <template #left>
        <van-icon
          name="arrow-left"
          @click="$router.back()"
          size="20"
          style="margin: 5px"
        />
        <van-icon name="wap-home-o" size="20" @click="goto('/home')" />
      </template>
      <template #right>
        <van-cell @click="showShare = true" style="padding: 0px">
          <van-icon name="share-o" size="20" />
        </van-cell>
      </template>
    </van-nav-bar>
    <van-image width="100%" :src="$request.baseUrl + data.img_url" />
    <h5>{{ data.goods_name }}</h5>
    <p class="price">
      <del>{{ data.price }}</del>
      <span>{{ data.sales_price }}</span>
    </p>
    <h4>{{ data.category }}相关商品</h4>
    <van-row gutter="20">
      <van-col
        class="splist"
        span="12"
        v-for="item in goodslist"
        :key="item._id"
        style="height: 260px"
      >
        <div style="text-align: center" @click="goto('/goods/' + item._id)">
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

           <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服" dot />
            <van-goods-action-icon icon="cart-o" text="购物车" :badge="cartlist.length" @click="goto('/cart')" />
            <van-goods-action-icon icon="shop-o" text="店铺" badge="12" />
            <van-goods-action-button type="warning" text="加入购物车" @click="addToCart" />
            <van-goods-action-button type="danger" text="立即购买" @click="buyNow" />
        </van-goods-action>
  </div>
</template>
<script>

export default {
  name: "Goods",
  data() {
    return {
      data: {},
      goodslist: [],
      showShare: false,
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "朋友圈", icon: "wechat-moments" },
          { name: "微博", icon: "weibo" },
          { name: "QQ", icon: "qq" },
        ],
        [
          { name: "复制链接", icon: "link" },
          { name: "分享海报", icon: "poster" },
          { name: "二维码", icon: "qrcode" },
          { name: "小程序码", icon: "weapp-qrcode" },
        ],
      ],
    };
  },
    computed:{
        cartlist(){
            return this.$store.state.cart.cartlist;
        }
    },
  //watch监听路由变化
  watch: {
    "$route.params.id": function (n, o) {
      console.log("watch", n, o);
      // this.getData();
    },
  },

  created() {
    this.getData();

    // 隐藏Tabbar
    this.$parent.showTabbar = false;

  },
  destroyed() {
    this.$parent.showTabbar = true;
  },

  //路由钩子函数
  beforeRouteUpdate(to, from, next) {
    // console.log("Goods.beforeRouteUpdate", to, from);
    const { id } = to.params;
    //跳转前进入该守卫，所以$route中的id与from的id
    //this.$route.params.id===from.params.id
    this.getData(id);
    next();
  },
  methods: {
    goto(url) {
      this.$router.push(url);
    },
    getData(goodsid) {
      const id = goodsid || this.$route.params.id;
      this.$request.get("/goods/" + id).then(({ data }) => {
        console.log("goods", data);
        this.data = data.data;

        //请求相关商品
        this.$request("/goods", {
          params: {
            category: data.data.category,
            total: false,
            size: 8,
          },
        }).then(({ data }) => {
          this.goodslist = data.data.filter((item) => {
            return item._id != this.data._id;
          });

          if (this.goodslist.length > 6) {
            this.goodslist = this.goodslist.slice(0, 6);
          }
        });
      });
    },
    addToCart(){
            const {_id,goods_name,price,sales_price,img_url} = this.data;
            
            // 判断当前商品是否存在购物车中
            // 存在：数量+1
            // 不存在：添加
            const current = this.cartlist.find(item=>item._id === _id);
            if(current){
                this.$store.commit('changeqty',{_id,qty:current.qty+1})
            }else{
                const goodsData = {
                    _id,goods_name,price,sales_price,img_url,
                    qty:1
                }
                this.$store.commit('add',goodsData)

            }

            
        },
    buyNow() {
      this.addToCart();
      this.goto("/cart");
    },
  },
};
</script>