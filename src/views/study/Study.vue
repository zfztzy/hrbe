<template>
<div>
  <Navbar :links="links" :pagestyle='pagestyle' style=''>
    <a v-for='(i) in links' :key="i.msg" @click ='studyList(i.type)' :class="{right:i.isRight}">{{i.msg}}</a>
  </Navbar>
  <router-view/>
</div>
</template>

<script>
import Navbar from '../../components/Navbar.vue'
import * as request from '../../network/request'
// @ is an alias to /src



export default {
  components: {Navbar,},
  name: 'Study',
  data(){
    return{
      pagestyle:'background-color: white; color: black',
      links:[
        {type: 'front-end', msg: '前端', },
        {type: 'back-end', msg: '后端', },
        {type: 'test', msg: '测试', },
        {type: 'leetcode', msg: '力扣', },
        {type: 'ai', msg: '人工智能', },
      ],
    }
  },
  methods:{
    studyList(type){
            this.$router.push({path:'/study/list',query: {type:type}})
    },
    refresh(){
      window.scrollTo(0,0);
    }
    
  },
  created(){
    request.request({
    url:'http://39.107.227.252/getNavbarList/',
    data:{'type': 'study'},
    method: 'post',
    }).then(res =>{
    this.links = res.data.navbarList
    }).catch(err =>{
    console.log(err);
    })
  },
  watch:{
    '$route': 'refresh'
  },
}

</script>
