<template>
  <a-layout style="height: 100%">
    <router-view/>
    <!-- <Foot/> -->
  </a-layout>
</template>

<script>
// @ is an alias to /src

// import Topbanner from '@/components/banner/Topbanner'
// import Foot from '@/components/Foot'
// import Topbannerwinter from './components/Topbannerwinter.vue'
import * as request from "@/network/request"


export default {
  name: 'appHome',
  // components: {
  //   Foot,
  //   // Topbannerwinter,
  // },
  methods: {
    checkLogin () {
      request.request({
        url: this.getBaseUrl() + 'login/',
        method: 'post',
        data: {
          userInfo: {
            user_name: this.$cookies.get("userName"),
            password: this.$cookies.get("password")
          }
        }
      }).then(res =>{
        if (res.data.msg == 'pass'){
          console.log();
        } else {
          alert(res.data.msg)
          this.$router.push('/Login')
        }
      }).catch(err =>{
        console.log(err);
      })
    }
  },
  created () {
    // this.checkLogin()
  }
}

</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
