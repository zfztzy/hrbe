<template>
  <div>
    <Topbanner-2/>
    <Navbar></Navbar>
    <Foot class="footStyle"/>
  </div>
</template>

<script>
import Topbanner2 from '../components/banner/Topbanner2.vue'
import Navbar from '../components/Navbar.vue'
import Foot from '../components/Foot.vue'
export default {
  components: { Topbanner2, Foot, Navbar },

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
</style>