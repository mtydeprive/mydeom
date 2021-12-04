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
    <van-empty description="购物车空空的" v-if="cartlist.length === 0">
      <van-button
        round
        plain
        type="primary"
        size="small"
        @click="goto('/discover')"
        >去购买</van-button
      >
    </van-empty>
    <van-swipe-cell v-else v-for="item in cartlist" :key="item._id">
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
                v-bind:value="item.qty"
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
            >加入收藏</van-button>
          <van-button size="mini" type="danger" plain round @click="remove"
            >批量删除</van-button>
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

    };
  },
  created() {

  },
  computed: {
    totalPrice() {
      // return (
      //   100 *
      //   this.cartlist.reduce(
      //     (val, item) => val + item.sales_price * item.qty,
      //     0
      //   )
      // );
      return this.$store.getters.totalPrice*100
    },
    selectAll: {
      get() {
        return this.cartlist.every((item) =>
          this.selectIds.includes(item._id)
        );
      },
      set(val) {
        this.selectIds = val ? this.cartlist.map((item) => item._id) : [];
      },
    },
    cartlist(){
      return this.$store.state.cart.cartlist;
    },
  },
  methods: {
    changeGoodsQty(val,detail) {
        this.$store.commit('changeqty',{_id:detail.name,qty:val})
    },
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
      if(typeof id === 'string'){
          this.$store.commit('remove',{_id:id})
        }else{
          this.$store.commit('remove',{_id:this.selectIds})
        }
    },
  },
};
</script>