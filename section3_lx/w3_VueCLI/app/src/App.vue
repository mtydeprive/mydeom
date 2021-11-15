<template>
  <div id="app">
    <TodoList/>
    <p>hello Vue</p>
    <Lifecycle v-if="show"/>
    <button @click="show=!show">销毁</button>
  </div>
</template>

<script>
import TodoList from './components/TodoList/TodoList.vue'
import Lifecycle from './components/Lifecycle.vue'

export default {
  name: 'App',
  data(){
    return{
      show:true
    }
  },
  components: {
    TodoList,
    Lifecycle
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
