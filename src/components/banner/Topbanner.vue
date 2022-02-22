<template>
  <div>
    <div id='top'></div>
    <Topbannerautumn v-if="rannum%2==0"/>
    <Topbannerwinter v-else/>
  </div>
</template>

<script>
import Topbannerautumn from './Topbannerautumn'
import Topbannerwinter from './Topbannerwinter'
export default {
    name:'Topbanner',
    data(){
        return{
            rannum:Math.round(Math.random()*5)
        }
    },
    components: { Topbannerautumn, Topbannerwinter },
    mount(){
        console.log(this.rannum);
    }
}
</script>

<style>

</style>