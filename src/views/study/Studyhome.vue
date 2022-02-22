<template>
  <div>
    <div class="study">
      <Toppnp></Toppnp>
      <Bigpicturepnp/>
    </div>
    <Botbanner/>
    <Study-bar/>
  </div>
</template>

<script>
import Botbanner from '../../components/banner/Botbanner.vue'
import Bigpicturepnp from '../../components/PictureView/Bigpicturepnp.vue'
import Toppnp from '../../components/PictureView/Toppnp.vue'
import StudyBar from '../../components/tabbar/StudyBar.vue'
// @ is an alias to /src


export default {
  components: { Toppnp, StudyBar, Bigpicturepnp, Botbanner },
  name: 'StudyHome',
}

</script>


<style>
.study{
  height: 1875px;
}
</style>