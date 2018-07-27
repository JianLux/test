<template>
  <div>
    <ul>
      <!-- v-for有一个记录个数的index，需要设置key，否则报错 -->
      <li v-for="(item,index) in items" v-bind:key="index" :class="{ isFinished: item.isFinished }" @click="finishThing(item)">
        <div class="circle">w   </div>
        {{ item.message }}
        <div class="prioritySign">☆</div>
        <div class="deleteSign">X</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { message: "123"}
      ],
      newItem:''
    }
  },
  methods: {
    finishThing: function(item) {
      item.isFinished = !item.isFinished;
    },
    addThing: function() {
      this.items.push({
        message: this.newItem,
        isFinished: false
      });
      this.newItem = '';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li {
  display: inline-block;
  width: 400px;
  border: 1px solid black;
}

ul {
  border: 1px solid black;
}

.isFinished {
  text-decoration-line: line-through
}

.circle {
  border: 1px solid black;
  border-radius: 50%;
  display: inline-block;
  height: 20px;
  width: 20px;
  margin: 10px 10px 10px 10px;
  text-align: center;
}

.deleteSign {
  display: inline-block;
  margin: 14.5px 20px 10px 10px;
  float: right;
  color: rgba(232, 125, 117, 0.51);
  font-size: 22px;
}

.prioritySign {
  display: inline-block;
  color: rgba(232, 125, 117, 0.51);
  font-size: 30px;
  vertical-align: middle;
}

.deleteSign:hover {
  color: rgba(255, 89, 77, 0.795);
  text-shadow: 2px 0px 0px #dad8d8;
}

.prioritySign:hover {
  color: rgba(255, 89, 77, 0.95);
  text-shadow: 2px 0px 0px #dad8d8;
}

.priority {
  color: rgba(255, 89, 77, 0.95);
}
</style>
