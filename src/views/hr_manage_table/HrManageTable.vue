<template>
  <a-layout-content>
    <a-space :size="8" style="width: 100%; margin: 20px" class="" v-if="isShow">
      <div v-for='(i) in filter' :key="i.title"  style="width:300px"><a-input :placeholder="i.title" v-model="i.vModel" type="text"/></div>
    </a-space>
    <a-space :size="8" style="width: 100%; margin-left: 20px; margin-bottom: 20px; margin-right: 20px" class="" v-if="isShow">
      <div v-for='(i) in filter2' :key="i.title"  style="width:300px"><a-input :placeholder="i.title" v-model="i.vModel" type="text"/></div>
        <a-button @click="updateFilter">搜索</a-button>
        <a-button @click="resetFilter">清除</a-button>
    </a-space>
    <a-space style="float:right">
      <a-button class="tableButton" @click="newInfo">新增</a-button>
      <a-button class="tableButton" @click="batchInput">批量导入</a-button>
      <a-button class="tableButton" @click="batchOutput">批量导出</a-button>
    </a-space>
    <router-view :BatchNum="BatchNum" :newSwitch="newSwitch" :filterData='filterData' :cleanNum="cleanNum"/>
  </a-layout-content>
</template>

<script>
// @ is an alias to /src



export default {
  name: 'Profile',
  data(){
    return{
      filter:[
        {vModel: undefined, title: '招聘顾问'},
        {vModel: undefined, title: '候选人推荐时间'},
        {vModel: undefined, title: '关联需求'},
        {vModel: undefined, title: '简历状态'},
      ],
      filter2: [
        {vModel: undefined, title: '地域'},
        {vModel: undefined, title: '岗位'}
      ],
      newSwitch: 0,
      BatchNum: 0,
      isShow: false,
      filterData: {},
      cleanNum: 0
    }
  },    
  methods:{
    profileDetail(type){
        this.$router.push({path:'/hrManageTable/' + type})
    },
    refresh(){
      window.scrollTo(0,0);
      this.switchTable()
    },
    batchInput () {
      this.BatchNum += 1
    },
    batchOutput () {
      this.BatchNum -= 1
    },
    newInfo() {
      this.newSwitch += 1
    },
    switchTable () {
      if (this.$route.name==='Applicant') {
        this.isShow = true
      } else {
        this.isShow = false
      }
    },
    resetFilter () {
      this.filter = [
        {vModel: undefined, title: '招聘顾问'},
        {vModel: undefined, title: '候选人推荐时间'},
        {vModel: undefined, title: '关联需求'},
        {vModel: undefined, title: '简历状态'}
      ]
      this.filter2 = [
        {vModel: undefined, title: '地域'},
        {vModel: undefined, title: '岗位'}
      ]
      this.filterData = {
        recommender: this.filter[0].vModel,
        recommend_time: this.filter[1].vModel,
        related: this.filter[2].vModel,
        resume_status: this.filter[3].vModel,
        region: this.filter2[0].vModel,
        job: this.filter2[1].vModel
      }
      this.cleanNum += 1
    },
    updateFilter () {
      this.filterData = {
        recommender__icontains: this.filter[0].vModel,
        recommend_time__icontains: this.filter[1].vModel,
        related__icontains: this.filter[2].vModel,
        resume_status__icontains: this.filter[3].vModel,
        region__icontains: this.filter2[0].vModel,
        job__icontains: this.filter2[1].vModel
      }
      console.log(this.filterData);
    },
    log (a) {
      console.log(a);
    }
  },
  watch:{
    '$route': 'refresh'
  },
  mounted () {
    this.switchTable()
  }
}

</script>

<style>
.tableButton {
  float:right;
  margin: 20px;
  z-index: 100;
}
</style>