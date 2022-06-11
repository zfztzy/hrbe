<template>
  <a-layout-content>
     <a-space :size="8" style="width: 50%; margin-top: 20px; margin-bottom: 0px" class="" v-if="isShow">
        <template  v-for='(i) in filter'>
            <a-range-picker
              style=" margin-left: 20px; "
              v-if="i.title=='沟通时间'"
              :key="i.title"
              format="YYYY-MM-DD"
              :placeholder="['沟通时间开始', '沟通时间结束']"
              @change="onChange"
              @ok="onOk"
            />
        
          <div v-else :key="i.title"  style="width:300px">
            <a-input style=" margin-left: 20px; " :placeholder="i.title" v-model="i.vModel" type="text"/>
          </div>
         
        </template>
        <a-button style=" margin-left: 20px; " @click="updateFilter">搜索</a-button>
        <a-button style=" margin-left: 20px; " @click="resetFilter">清除</a-button>
      </a-space>
    <a-button class="tableButton" @click="batchInput">批量导入</a-button>
    <a-button class="tableButton" @click="batchOutput">批量导出</a-button>
    <a-space style="float:right">
      <a-button  class="tableButton" @click="newInfo">新增</a-button>
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
  data(){
    return{
       filter:[
        {vModel: undefined, title: '沟通时间'},
      ],
      newSwitch: 0,
      BatchNum: 0,
      isShow: true,
      filterData: {},
      cleanNum: 0,
      visible: false,
      selectDate: '',
      isEmployeeNumPage:false
    }
  },    
  methods:{
    refresh(){
      window.scrollTo(0,0);
      // this.switchTable()
    },
    switchPage(){
      if (this.$route.name === "employeenum") {
        this.isEmployeeNumPage = false
      } else {
        this.isEmployeeNumPage = true
      }
    },
    resetFilter () {
      this.filter = [
        {vModel: undefined, title: '勾通时间'},
      ]
      this.filterData = {
        recommend_time: this.filter[0].vModel,
      }
      this.cleanNum += 1
    },
     updateFilter () {
      this.filterData = {
        contact_date__range: this.filter[0].vModel,
      }
      console.log(this.filterData);
    },
     onChange (dateString) {
      let aa =  deepCopy(dateString[0])
      let bb =  deepCopy(dateString[1])
      // console.log(aa.format('YYYY-MM-DD 00:00:00'));
      // console.log(bb.format('YYYY-MM-DD 23:59:59'));
      this.filter[0].vModel = []
      this.filter[0].vModel.push(aa.format('YYYY-MM-DD 00:00:00'))
      this.filter[0].vModel.push(bb.format('YYYY-MM-DD 23:59:59'))
      console.log(this.filter[0].vModel);
    },
    onOk (dateString) {
      this.filter[0].vModel = dateString
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
        // this.switchTable()
        // this.checkLogin()
        this.switchPage()
        this.refresh()
      }
    }
  },
  mounted () {
    // this.switchTable()
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