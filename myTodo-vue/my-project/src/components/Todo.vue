<template>
  <div>
    <input v-model="newItem" @keyup.enter="addThing">
    <todolist></todolist>
  </div>
</template>

<script>
import todolist from '.\TodoList.vue'

export default {
  data () {
    return {

    }
  },
  components: {
    todolist
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
