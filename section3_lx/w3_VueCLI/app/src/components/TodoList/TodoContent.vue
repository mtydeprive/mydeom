<template>
    <table class="table">
      <thead>
        <tr>
          <th scope="col"><input type="checkbox" v-model="checkAll" /></th>
          <th scope="col">#</th>
          <th scope="col">代办事项</th>
          <th scope="col">添加时间</th>
          <th scope="col">是否完成</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
    <tbody>
      <TodoItem v-for="(item,idx) in list" :key="item.id" :item="item" :idx="idx"></TodoItem>
    </tbody>
    </table>
</template>

<script>
import TodoItem from './TodoItem.vue'
export default {
  name: "TodoContent",
  props: ["list"],
  inject: ["selectIds", "selectAll"],
  computed: {
    checkAll: {
      get() {
        return this.list.every((item) => this.selectIds.includes(item.id));
      },
      set(newValue) {
        // this.selectAll(newValue)
        this.$parent.selectIds.splice(0, this.$parent);
        if (newValue) {
          const ids = this.list.map((item) => item.id);
          this.$parent.selectIds.push(...ids);
        }
      },
    },
  },

  components: {
    TodoItem,
  },
};
</script>
<style>
</style>