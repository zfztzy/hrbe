<template>
  <div>
    <Topbanner-2/>
    <Login class="login"/>
    <Foot class="footStyle"/>
  </div>
</template>

<script>
import Topbanner2 from '../components/banner/Topbanner2.vue'
import Foot from '../components/Foot.vue'
import Login from '../components/userComponents/Login.vue'
export default {
  components: { Login, Topbanner2, Foot },

}
</script>

<style>
.footStyle {
  position: absolute;
  width: 100%;
  bottom: 0px;
  padding: 15px;
  text-align: center;
  background: #ddd;
  height: 55px;
}

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 130px;
  position: relative;
}
</style>