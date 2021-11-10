<template>
  <div class="container">
    <todo-form :add="addItem" v-on:additem="addItem" ref="todoForm"></todo-form>
    <todo-control
      :completeItems="completeItems"
      :removeItems="removeItems"
    ></todo-control>
    <todo-content :list="datalist"></todo-content>
    <todo-footer v-slot="{ donelist, undonelist }" :list="datalist">
      <p><strong>total:</strong>{{ datalist.length }}</p>
      <p>complete:{{ donelist.length }}</p>
      <p>uncomplate:{{ undonelist.length }}</p>
    </todo-footer>
  </div>
</template>

<script>
import TodoForm from "./TodoForm.vue";
import TodoControl from "./TodoControl.vue";
import TodoContent from "./TodoContent.vue";
import TodoFooter from "./TodoFooter.vue";
//引入样式
import "bootstrap/dist/css/bootstrap.css";

//Bus方法
// 方法一：引入Vue文件创建Bus并导出
// import Vue from 'vue';
// export const Bus=new Vue()
//方法二：引入Bus.js链接todoitem（推荐使用）
import Bus from './Bus'

export default {
  name: "TodoList",
  data() {
    //给Bus添加事件 ，并把todoList的方法作为事件处理函数
    Bus.$on("removeItem", this.removeItem);
    Bus.$on("completeItem", this.completeItem);
    return {
      selectIds: [],
      datalist: [
        {
          id: 1,
          todo: "定个小目标，全球旅行",
          done: true,
          addtime: Date.now(),
        },
        {
          id: 2,
          todo: "赚他一个亿津巴布韦币",
          done: false,
          addtime: Date.now() + 3600 * 1000,
        },
        {
          id: 3,
          todo: "迎娶白富美，达到人生巅峰",
          done: false,
          addtime: Date.now() + 3600 * 1000 * 5,
        },
      ],
    };
  },
  //依赖注入
  provide: function () {
    return {
      selectItem: this.selectItem,
      selectIds: this.selectIds,
      selectAll: this.selectAll,
      // completeItem: this.completeItem,
      // removeItem: this.removeItem,
    };
  },
  components: {
    TodoForm,
    TodoControl,
    TodoContent,
    TodoFooter,
  },
  methods: {
    //添加
    addItem(todo) {
      if(!(todo == "" || todo == undefined || todo == null || (todo.length>0 && todo.trim().length == 0))){
        const newData = {
          id: parseInt(Math.random() * 10000),
          //需要输入框中的内容
          todo,
          done: false,
          addtime: Date.now(),
        };
        this.datalist.unshift(newData);
      }
    },
    //完成
    completeItem(id) {
      this.datalist.forEach((item) => {
        if (item.id === id) {
          item.done = !item.done;
        }
      });
    },
    //删除
    removeItem(id, e) {
      this.datalist = this.datalist.filter((item) => item.id != id);
    },
    //单选
    selectItem(id) {
      if (!this.selectIds.includes(id)) {
        this.selectIds.push(id);
      } else {
        // this.selectIds = this.selectIds.filter(item => item != id)
        const idx = this.selectIds.findIndex((item) => item === id);
        this.selectIds.splice(idx, 1);
      }
    },
    //全选
    selectAll(all) {
      if (all) {
        //由于是通过provide/inject传入的值所有以下写法达不到响应式结果
        // this.selectIds=this.datalist.map(item=>item.id)
        const ids = this.datalist.map((item) => item.id);
        this.selectIds.splice(0, this.selectIds.length);
        this.selectIds.push(...ids);
      } else {
        this.selectIds.splice(0, this.selectIds.length);
      }
    },
    //批量完成
    completeItems() {
      this.datalist.forEach((item) => {
        if (this.selectIds.includes(item.id)) {
          item.done = true;
        }
      });
    },
    //批量删除
    removeItems() {
      this.datalist = this.datalist.filter((item) => {
        return !this.selectIds.includes(item.id);
      });
    },
  },
};
</script>
<style>
</style>