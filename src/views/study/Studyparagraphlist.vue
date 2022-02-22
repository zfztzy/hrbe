<template>
  <div class="StudyList">
    <div>
      <Row>
        <div slot="main"> 
          <div v-html="foreword"></div>
        </div>
        <div slot="content">
          <Left style="background-color: #fff; width: 270px; margin-top: 40px">

          </Left>
          <Rightmsg/>
          <Mid style="">
            <Studylist :slist="slist"></Studylist>
          </Mid>
        </div>
      </Row>
    </div>
  </div>
</template>

<script>
import Mid from '../../components/LMRR/Mid'
import Left from '../../components/LMRR/Left.vue'
import Row from '../../components/LMRR/Row.vue'
import Rightmsg from '../../components/row/Rightmsg'
import Studylist from '../../components/study/Studylist.vue'
import * as request from '../../network/request'



export default {
  components: { Rightmsg, Row,Left, Mid, Studylist },
    name: 'StudyList',
    data(){
      return{
        type:this.$route.query.type,
        foreword:'',
        slist:[],
      }
    },
    methods:{
      refresh(){
        let type = this.$route.query.type
        request.request({
        url:'http://39.107.227.252/getStudyType/',
        data:{'sType': type,},
        method: 'post',
        }).then(res =>{
          this.foreword = res.data.msg
        }).catch(err =>{
          console.log(err);
        })
        request.request({
        url:'http://39.107.227.252/getStudyList/',
        data:{'sType': type,},
        method: 'post',
        }).then(res =>{
            this.slist = res.data.slist
        }).catch(err =>{
            console.log(err);
        })
      }
    },
    watch:{
    '$route': 'refresh'
    },
    mounted(){
      this.refresh()
    }
}

</script>


<style>
.StudyList{
  margin: 0;
  padding: 0;
}

</style>
