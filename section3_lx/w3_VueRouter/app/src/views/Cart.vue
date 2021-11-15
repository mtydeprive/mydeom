<template>
  <div>
    <van-nav-bar title="购物车" left-text="返回" left-arrow>
      <template #left>
        <van-icon
          name="arrow-left"
          size="20"
          @click="$router.back()"
          style="margin-right: 5px"
        />
        <van-icon name="wap-home-o" size="20" @click="goto('/home')" />
      </template>
      <template #right>
        <van-icon name="edit" size="20" @click="edit = !edit" />
      </template>
    </van-nav-bar>
    <van-steps :active="0">
      <van-step>1.购物车</van-step>
      <van-step>2.下单</van-step>
      <van-step>3.支付</van-step>
      <van-step>4.购买成功</van-step>
    </van-steps>
    <van-empty description="购物车空空的" v-if="goodslist.length === 0">
      <van-button
        round
        plain
        type="primary"
        size="small"
        @click="goto('/discover')"
        >去购买</van-button
      >
    </van-empty>
    <van-swipe-cell v-else v-for="item in goodslist" :key="item._id">
      <van-row type="flex" align="center" style="padding-left: 15px">
        <van-col span="2">
          <van-checkbox
            :value="selectIds.includes(item._id)"
            @click="selectItem(item._id)"
          />
        </van-col>
        <van-col span="22">
          <van-card
            style="padding-left: 0; background-color: #fff"
            :thumb-link="'#/goods/' + item._id"
            :thumb="$request.baseUrl + item.img_url"
            :origin-price="item.price"
            :price="item.sales_price"
            :title="item.goods_name"
            :num="item.qty"
          >
            <template #num>
              <van-stepper
                v-model="item.qty"
                :name="item._id"
                theme="round"
                button-size="20px"
                disable-input
                @change="changeGoodsQty"
              />
            </template>
          </van-card>
        </van-col>
      </van-row>
      <template #right>
        <van-button
          size="mini"
          square
          type="danger"
          text="删除"
          style="height: 100%"
          @click="remove(item._id)"
        />
      </template>
    </van-swipe-cell>
    <van-submit-bar :price="totalPrice" button-text="去结算" @submit="onSubmit">
      <van-checkbox v-model="selectAll">全选</van-checkbox>
      <template #button v-if="edit">
        <div>
          <van-button size="mini" type="primary" plain round
            >加入收藏</van-button
          >
          <van-button size="mini" type="danger" plain round @click="remove"
            >批量删除</van-button
          >
        </div>
      </template>
    </van-submit-bar>
  </div>
</template>
<script>
export default {
  name: "Cart",
  data() {
    return {
      edit: false,
      selectIds: [],
      goodslist: [
      //   {
      //     _id: "6037755f08f65d3a6c243510",
      //     goods_name:
      //       "瑞士 爱宝时（EPOS）-Sportive运动系列海兽克拉肯 深海蓝 3441.131.96.56.30 潜水机械男表",
      //     category: "运动表",
      //     price: 9900,
      //     sales_price: 7095,
      //     img_url: "/img/a6e3bdaff5094acb86e77320d3074c47.jpg",
      //     qty: 5,
      //   },
      //   {
      //     _id: "6037755f08f65d3a6c243511",
      //     goods_name:
      //       "瑞士艺术制表大师 爱宝时（EPOS）-Sportive运动系列海兽克拉肯 砾岩黑 3441.131.20.55.30 潜水机",
      //     category: "运动表",
      //     price: 9900,
      //     sales_price: 7095,
      //     img_url: "/img/62973840d24947d696882fdec2174492.jpg",
      //     qty: 1,
      //   },
      //   {
      //     _id: "6037755f08f65d3a6c243512",
      //     goods_name:
      //       "瑞士艺术制表大师 爱宝时（EPOS）-Sportive运动系列 飞行员 3401.132.20.35.30 机械男表",
      //     category: "运动表",
      //     price: 9500,
      //     sales_price: 6865,
      //     img_url: "/img/6efd68a992fe4594b45eba4763c45a3f.jpg",
      //     qty: 2,
      //   },
      ],
    };
  },
  created() {
    // let userInfo=JSON.parse(localStorage.getItem('userInfo'))
    // console.log(userInfo);
    // this.$request.get('cart',{
    //   userid:userInfo._id
    // },
    // {
    //   headers:{
    //     Athorization:userInfo.athorization
    //   }
    // }
    // ).then(({data})=>{
    //   console.log(data.data.goodslist);
    //   this.goodslist=data.data.goodslist
    // })
    let catrlist = localStorage.getItem("cartlist"); //null
      try {
        catrlist = JSON.parse(catrlist) || [];
      } catch (err) {
        catrlist = [];
      }
      this.goodslist=catrlist;
  },
  computed: {
    totalPrice() {
      return (
        100 *
        this.goodslist.reduce(
          (val, item) => val + item.sales_price * item.qty,
          0
        )
      );
    },
    selectAll: {
      get() {
        return this.goodslist.every((item) =>
          this.selectIds.includes(item._id)
        );
      },
      set(val) {
        this.selectIds = val ? this.goodslist.map((item) => item._id) : [];
      },
    },
  },
  methods: {
    changeGoodsQty() {},
    goto(url) {
      this.$router.push(url);
    },
    onSubmit() {},
    selectItem(id) {
      const idx = this.selectIds.indexOf(id);
      if (idx >= 0) {
        this.selectIds.splice(idx, 1);
      } else {
        this.selectIds.push(id);
      }
    },
    remove(id) {
      if (typeof id==='string') {
        //删除单个商品
          this.goodslist = this.goodslist.filter((item) => {
            return item._id != id;
          });
      } else {
        //批量删除
        this.goodslist = this.goodslist.filter((item) => {
          return !this.selectIds.includes(item._id);
        });
      }
    },
  },
};
</script>