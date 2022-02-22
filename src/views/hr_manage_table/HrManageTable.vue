<template>
  <div class="profile">
    <Navbar>
      <a v-for='(i) in links' :key="i.msg" @click ='profileDetail(i.type)' :class="{right:i.isRight}">{{i.msg}}</a>
      <a @click="newInfo" :class="{barright:true}">新增</a>
    </Navbar>
    <router-view :newSwitch="newSwitch"/>
  </div>
</template>

<script>
import Navbar from '../../components/Navbar.vue'
// @ is an alias to /src



export default {
  components: { Navbar },
  name: 'Profile',
  data(){
    return{
      links:[
            {type:'applicant', msg: '候选人管理', },
            {type:'recruitment', msg: '招聘需求', },
            {type:'pojectStatus', msg: '项目满足度', },
            {type:'projectInfo', msg: '项目信息', },
      ],
      newSwitch: 0
    }
  },    
  methods:{
        profileDetail(type){
            this.$router.push({path:'/hrManageTable/' + type})
        },
        refresh(){
          window.scrollTo(0,0);
        },
        newInfo() {
          this.newSwitch += 1
        }
  },
  watch:{
    '$route': 'refresh'
  },
  
}

</script>
