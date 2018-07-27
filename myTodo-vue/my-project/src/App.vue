<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <todo/>
  </div>
</template>

<script>
import todo from './components/Todo'

export default {
  name: 'App',
  data () {
    return {
      title: 'Welcome to My todo'
    }
  },
  components: {
    todo 
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
