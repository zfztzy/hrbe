<template>
    <div class="coding">      
        <h2 class="codingText">拼命开发中。。。</h2>
        <img class="codingImg" :src="src" alt="">
        <Rightmsg/>
    </div>
</template>

<script>
import Rightmsg from './row/Rightmsg.vue'
export default {
  name:'Coding',
  components: { Rightmsg },
  data(){
    return{
      src:require('../assets/coding2.gif'),
    }
  },
  mounted(){
    this.src = require('../assets/coding3.jpg')
  },
  
}
</script>

<style>

.coding {
  overflow-x: hidden;
}

.coding .codingImg{
  position: relative;
  left: 35%;
  margin-top: 80px;
  margin-bottom: 80px;
}

.coding .codingText{
  margin-top: 40px;
  position: relative;
  left: 40%;
}
</style>