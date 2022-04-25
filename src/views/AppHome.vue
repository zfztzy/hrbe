<template>
  <a-layout>
    <Navbar></Navbar>
    <router-view/>
  </a-layout>
</template>

<script>
// @ is an alias to /src

// import Topbanner from '@/components/banner/Topbanner'
// import Topbannerwinter from './components/Topbannerwinter.vue'
// import * as request from "@/network/request"
import Navbar from '../components/Navbar.vue'


export default {
  name: 'appHome',
  components: {
    Navbar,
    // Topbannerwinter,
  },
  methods: {
  },
  created () {
  },
  watch: {
    $route: {
      handler () {
        // this.checkLogin()
      }
    }
  }
}

</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
