<template>
  <tr @click="selectItem(item.id)">
    <td><input type="checkbox" :checked="selectIds.includes(item.id)" /></td>
    <th scope="row">{{ idx + 1 }}</th>
    <td>{{ item.todo }}</td>
    <td v-once>{{ formatDate(item.addtime) }}</td>
    <!-- <td v-once>{{formatDate(item.addtime)}}</td> -->
    <td>{{ item.done ? "是" : "否" }}</td>
    <td>
      <button
        type="button"
        class="btn btn-outline-success btn-sm"
        @click.stop="completeItem(item.id)"
      >
        {{ item.done ? "取消" : "完成" }}
      </button>
      <button
        type="button"
        class="btn btn-outline-danger btn-sm"
        @click.stop="removeItem(item.id)"
      >
        删除
      </button>
    </td>
  </tr>
</template>

<script>
// 对应TodoList方法一：引入TodoList.vue文件中的Bus
// import {Bus} from './TodoList.vue'

// 对应TodoList方法二：引入Bus.js文件链接TodoList的bus （推荐）
import Bus from './Bus'

export default {
  name: "TodoItem",
  props: ["item", "idx"],
  inject: ["selectItem", "selectIds"],
  computed: {
    date() {
      console.log("date");
      return new Date(this.item.addtime).toLocaleDateString();
    },
  },
  methods: {
    completeItem(id) {
      Bus.$emit("completeItem", id);
    },
    removeItem(id) {
      Bus.$emit("removeItem", id);
    },
    formatDate(d) {
      console.log("formatDate");
      return new Date(d).toLocaleDateString();
    },
  },
};
</script>
<style>
</style>