<template>
  <a-layout-content>
    <a-button class="tableButton" @click="batchInput">批量导入</a-button>
    <a-button class="tableButton" @click="batchOutput">批量导出</a-button>
    <a-space style="float:right">
      <a-button id="newAdd" class="tableButton" @click="newInfo" v-show = "showAddBtn">新增</a-button>
    </a-space>
  
  
    <router-view 
 
      tableType='test' 
      @save='log' 
      :BatchNum="BatchNum" 
      :newSwitch="newSwitch" 
      :filterData='filterData' 
      :cleanNum="cleanNum"/>
  </a-layout-content>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Profile',
  data(){
    return{
      newSwitch: 0,
      BatchNum: 0,
      isShow: false,
      filterData: {},
      cleanNum: 0,
      visible: false,
      selectDate: '',
      showAddBtn:true
     
    }
  },    
  methods:{
    refresh(){
      window.scrollTo(0,0);
      // this.switchTable()
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
  
    log (childValue) {
      console.log(childValue)
    }
  },
  watch:{
    $route: {
      handler () {
        //this.checkLogin()
        this.refresh()
      }
    }
  },
  mounted () {
    //this.switchTable()
    //this.checkLogin()
  }
}

</script>

<style>
.tableButton {
  float:right;
  margin: 20px;
  z-index: 100;
}

.SelectMonth {
  position: absolute;
  float: left;
  margin: 20px;
  z-index: 100;
}
</style>