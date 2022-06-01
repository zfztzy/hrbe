<template>
  <a-layout-content>
    <a-space :size="8" style="width: 100%; margin-top: 20px; margin-bottom: 20px" class="" v-if="isShow">
          <!-- :show-time="{ format: 'HH:mm' }" -->
      <template  v-for='(i) in filter'>
        <a-range-picker
          style=" margin-left: 20px; "
          v-if="i.title=='候选人推荐时间'"
          :key="i.title"
          format="YYYY-MM-DD"
          :placeholder="['候选人推荐时间开始', '候选人推荐时间结束']"
          @change="onChange"
          @ok="onOk"
        />
        <div v-else :key="i.title"  style="width:300px">
          <a-input style=" margin-left: 20px; " :placeholder="i.title" v-model="i.vModel" type="text"/>
        </div>
      </template>
    </a-space>
    <a-space :size="8" style="width: 100%;margin-bottom: 20px;" class="" v-if="isShow">
      <template v-for='(i) in filter2'>
        <div :key="i.title"  style="width:300px">
          <a-input style=" margin-left: 20px; " :placeholder="i.title" v-model="i.vModel" type="text"/>
        </div>
      </template>
        <a-button style=" margin-left: 20px; " @click="updateFilter">搜索</a-button>
        <a-button style=" margin-left: 20px; " @click="resetFilter">清除</a-button>
    </a-space>
    <a-space v-if="!isProjectStatus" style="float:right">
      <a-button class="tableButton" @click="newInfo">新增</a-button>
      <a-button class="tableButton" @click="batchInput">批量导入</a-button>
      <a-button class="tableButton" @click="batchOutput">批量导出</a-button>
    </a-space>
    <a-space class="SelectMonth" v-if="isProjectStatus">
      <a-month-picker placeholder="Select month" @change="onChange2" />
    </a-space>
    <a-space v-if="isProjectStatus" style="float:right">
      <!-- <a-button class="tableButton" @click="newInfo">新增</a-button> -->
      <new-element/>
      <a-button class="tableButton" @click="batchOutput">导出</a-button>
      <a-button class="tableButton" @click="showDrawer">图表总览</a-button>
    </a-space>
    <router-view 
      :visible='visible' 
      @visibleClose='visibleClose'
      :selectDate='selectDate'
      tableType='test' 
      @save='log' 
      :BatchNum="BatchNum" 
      :newSwitch="newSwitch" 
      :filterData='filterData' 
      :cleanNum="cleanNum"/>
  </a-layout-content>
</template>

<script>
import NewElement from '@/components/ProjectStatusCompoment/NewElement.vue';
// @ is an alias to /src


// deepCopy
function typeOf(obj) {
  const toString = Object.prototype.toString;
  const map = {
    '[object Boolean]'  : 'boolean',
    '[object Number]'   : 'number',
    '[object String]'   : 'string',
    '[object Function]' : 'function',
    '[object Array]'    : 'array',
    '[object Date]'     : 'date',
    '[object RegExp]'   : 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]'     : 'null',
    '[object Object]'   : 'object'
  };
  return map[toString.call(obj)];
}
function deepCopy(data) {
  const t = typeOf(data);
  let o;

  if (t === 'array') {
    o = [];
  } else if ( t === 'object') {
    o = {};
  } else {
    return data;
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]));
    }
  } else if ( t === 'object') {
    for (let i in data) {
      o[i] = deepCopy(data[i]);
    }
  }
  return o;
}


export default {
  name: 'Profile',
  components: {
    NewElement
  },
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
      cleanNum: 0,
      isProjectStatus: false,
      visible: false,
      selectDate: undefined
    }
  },    
  methods:{
    profileDetail(type){
        this.$router.push({path:'/hrManageTable/' + type})
    },
    showDrawer() {
      this.visible = true;
    },
    visibleClose () {
      this.visible = false;
    },
    onChange2(date, dateString) {
      this.selectDate = dateString.substring(0,4) + dateString.substring(5,7)
      console.log(this.selectDate);
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
      if (this.$route.name==='applicant') {
        this.isShow = true
      } else {
        this.isShow = false
      }
      if (this.$route.name==='pojectstatus') {
        this.isProjectStatus = true
      } else {
        this.isProjectStatus = false
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
        recommend_time__range: this.filter[1].vModel,
        related__icontains: this.filter[2].vModel,
        resume_status__icontains: this.filter[3].vModel,
        region__icontains: this.filter2[0].vModel,
        job__icontains: this.filter2[1].vModel
      }
      console.log(this.filterData);
    },
    onChange (dateString) {
      let aa =  deepCopy(dateString[0])
      let bb =  deepCopy(dateString[1])
      console.log(aa.format('YYYY-MM-DD 00:00:00'));
      console.log(bb.format('YYYY-MM-DD 23:59:59'));
      this.filter[1].vModel = []
      this.filter[1].vModel.push(aa.format('YYYY-MM-DD 00:00:00'))
      this.filter[1].vModel.push(bb.format('YYYY-MM-DD 23:59:59'))
      console.log(this.filter[1].vModel);
    },
    onOk (dateString) {
      this.filter[1].vModel = dateString
    },
    log (childValue) {
      console.log(childValue)
    }
  },
  watch:{
    $route: {
      handler () {
        this.switchTable()
        // this.checkLogin()
        this.refresh()
      }
    }
  },
  mounted () {
    this.switchTable()
    // let todayDate = new Date();
    // const date = todayDate.toLocaleDateString().replace(/\//g, '').replace(/-(\d)\b/g, '-0$1')
    // this.selectDate = date
    // this.checkLogin()
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