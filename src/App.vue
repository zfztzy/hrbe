<template>
  <div id="app">
    <Menu/>
    <Topbanner/>
    <router-view/>
    <Foot/>
  </div>
</template>

<script>
// @ is an alias to /src

import Menu from '@/components/Menu'
import Topbanner from '@/components/banner/Topbanner'
import Foot from '@/components/Foot'
// import Topbannerwinter from './components/Topbannerwinter.vue'


export default {
  name: 'Home',
  components: {
    Menu,
    Topbanner,
    Foot,
    // Topbannerwinter,
  }
}

</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  text-align: left;
  /* color: #2c3e50; */
}

</style>
