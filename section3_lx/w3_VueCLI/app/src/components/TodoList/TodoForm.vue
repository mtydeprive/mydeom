<template>
  <div>
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        ref="input"
        v-model="todo"
        @keyup.enter="addItem"
      />
      <button class="btn btn-success" @click="addItem">添加</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoForm",
  data() {
    return {
      todo: "",
    };
  },
  methods: {
    addItem() {
      this.$emit("additem", this.todo);
      this.todo = "";

      this.$refs.input.focus();
    },
  },
};
</script>
<style>
</style>