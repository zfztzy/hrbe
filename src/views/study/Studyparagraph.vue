<template>
  <div>
    <Studyrow :studyInfo="studyInfo"></Studyrow>
  </div>
</template>

<script>
import Studyrow from '../../components/row/Studyrow.vue'
import * as request from '../../network/request'
// @ is an alias to /src



export default {
  components: {Studyrow},
  data(){
      return{
          studyInfo:{
          }
      }
  },
  watch:{
    '$route': 'refresh'
  },
  created() {
    let id = this.$route.query.id
    request.request({
    url:'http://39.107.227.252/getStudyInfo/',
    data:{'sid': id,},
    method: 'post',
    }).then(res =>{
      this.studyInfo = res.data
    }).catch(err =>{
      console.log(err);
    })

  }
}

</script>


<style>
.study{
  height: 1875px;

}
</style>