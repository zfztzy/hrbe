<template>
  <div>
    <div v-show="isBatchControl || isBatchControl2" @click="close" class="maskLayer"></div>
    <a-drawer
      title="图表总览"
      placement="right"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
      width='900px'
    >
    <el-scrollbar style="height:100%">
      <chart title="海思半导体PDU需求" keyId="chart1" :series="[series1A, series2A, series3A]" :xAxis="[xDataA]" :yAxis="[yData1A, yData2A]" :titleData="titleData"/>
      <chart title="上海海思PDU需求" keyId="chart2" :series="[series1B, series2B, series3B]" :xAxis="[xDataB]" :yAxis="[yData1B, yData2B]" :titleData="titleData"/>
      <chart title="地域需求" keyId="chart3" :series="[series1C, series2C, series3C]" :xAxis="[xDataC]" :yAxis="[yData1C, yData2C]" :titleData="titleData"/>
    </el-scrollbar>
    </a-drawer>
    <batch-input batchType='ProjectStatusInfo' v-show="isBatchControl"  @close='close' class="newApplicant"></batch-input>
    <batch-output batchType='ProjectStatusInfo' v-show="isBatchControl2"  @close='close' class="newApplicant"></batch-output>
    <a-table :columns="columns" :data-source="data" bordered :pagination="{ pageSize: 70 }"  :scroll="{ x: 1500, y: 500 }">
      <div
        slot="filterDropdown"
        slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
        style="padding: 8px"
      >
        <a-input
          v-ant-ref="c => (searchInput = c)"
          :placeholder="`Search ${column.dataIndex}`"
          :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block;"
          @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
          @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
        />
        <a-button
          type="primary"
          icon="search"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          Search
        </a-button>
        <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">
          Reset
        </a-button>
      </div>
      <a-icon
        slot="filterIcon"
        slot-scope="filtered"
        type="search"
        :style="{ color: filtered ? '#108ee9' : undefined }"
      />
      <template slot="customRender" slot-scope="text, record, index, column">
        <span v-if="searchText && searchedColumn === column.dataIndex">
          <template
            v-for="(fragment, i) in text
              .toString()
              .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
          >
            <mark
              v-if="fragment.toLowerCase() === searchText.toLowerCase()"
              :key="i"
              class="highlight"
              >{{ fragment }}</mark
            >
            <template v-else>{{ fragment }}</template>
          </template>
        </span>
        <template v-else>
          {{ text }}
        </template>
      </template>
      <template
        v-for="col in ['sow_num', 'project_num', 'new_project_num', 
        'offset_num', 'monthly_target', 'urgency', 'monthly_reach', 'remarks',]"
        :slot="col"
        slot-scope="text, record"
      >
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.key, col)"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.key)">Save</a>
            <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <template v-if="record.canEdit">
              <a :disabled="editingKey !== ''" @click="() => edit(record.key)">Edit</a>
            </template>
            <template v-else>
              <a style="color:#d9d9d9">Edit</a>
            </template>
          </span>
        </div>
      </template>
    </a-table>
  </div>
</template>
<script>

import BatchInput from '@/components/batchControl/BatchInput.vue';
import BatchOutput from '@/components/batchControl/BatchOutput.vue';
const columns = [
  {
    title: '日期',
    dataIndex: 'date',
    width: 200,
    scopedSlots: { customRender: 'date' },
  },
  {
    title: '部门',
    dataIndex: 'department',
    width: 250,
    scopedSlots: { customRender: 'department' },
  },
  {
    title: 'PDU',
    dataIndex: 'pdu',
    width: 100,
    scopedSlots: { customRender: 'pdu' },
  },
  {
    title: '项目',
    dataIndex: 'project',
    width: 100,
    scopedSlots: { customRender: 'project' },
  },
  {
    title: '地域',
    dataIndex: 'region',
    width: 250,
    scopedSlots: { customRender: 'region' },
  },
  {
    title: 'sow人力',
    dataIndex: 'sow_num',
    width: 100,
    scopedSlots: { customRender: 'sow_num' },
  },
  {
    title: '当前项目组人数',
    dataIndex: 'project_num',
    width: 200,
    scopedSlots: {
      customRender: 'project_num' 
    }
  },
  {
    title: '需求满足度',
    dataIndex: 'project_satisfaction',
    width: 200,
    scopedSlots: {
      customRender: 'project_satisfaction' 
    }
  },
  {
    title: '剩余需求总数',
    dataIndex: 'project_num_all',
    width: 200,
    scopedSlots: {
      customRender: 'project_num_all' 
    }
  },
  {
    title: '新增需求',
    dataIndex: 'new_project_num',
    width: 100,
    scopedSlots: { customRender: 'new_project_num' },
  },
  {
    title: '离补需求',
    dataIndex: 'offset_num',
    width: 200,
    scopedSlots: { customRender: 'offset_num' },
  },
  {
    title: '月度目标数',
    dataIndex: 'monthly_target',
    width: 150,
    scopedSlots: { customRender: 'monthly_target' },
  },
  {
    title: '需求紧急程度',
    dataIndex: 'urgency',
    width: 150,
    scopedSlots: { customRender: 'urgency' },
  },
  {
    title: '月度满足数',
    dataIndex: 'monthly_reach',
    width: 150,
    scopedSlots: { customRender: 'monthly_reach' },
  },
  {
    title: '目标达成',
    dataIndex: 'monthly_target_reach',
    width: 150,
    scopedSlots: { customRender: 'monthly_target_reach' },
  },
  {
    title: '备注',
    dataIndex: 'remarks',
    width: 150,
    scopedSlots: { customRender: 'remarks' },
  },
  {
    title: 'operation',
    dataIndex: 'operation',
    fixed: 'right',
    scopedSlots: { customRender: 'operation' },
    width: 130,
  },
];

const data = [];
import * as request from "@/network/request"
import Chart from '@/components/Chart.vue';
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
    job: `Ed${i}`
  });
}
export default {
  components: { BatchInput, BatchOutput, Chart },
  props: {
    BatchNum: {
      type: Number
    },
    visible: {
      type: Boolean,
      default: false
    },
    selectDate: {
      type: String
    }
  },
  data() {
    this.cacheData = data.map(item => ({ ...item }));
    return {
      data,
      columns,
      editingKey: '',
      isNewApplicant: false,
      userName: '',
      searchText: '',
      searchInput: null,
      searchedColumn: '',
      isBatchControl: false,
      isBatchControl2: false,
      titleData: ['需求总数', '月度满足数', '需求满足度'],
			xDataA: {
				type: 'category',
				data: [],
				axisPointer: {
					type: 'shadow'
				}
			},
			xDataB: {
				type: 'category',
				data: [],
				axisPointer: {
					type: 'shadow'
				}
			},
			xDataC: {
				type: 'category',
				data: [],
				axisPointer: {
					type: 'shadow'
				}
			},
			yData1A: {
				type: 'value',
				name: '人数',
				min: 0,
				max: 50,
				interval: 5,
				axisLabel: {
					formatter: '{value} '
				}
			},
			yData2A: {
				type: 'value',
				name: '满足度',
				min: 0,
				max: 100,
				interval: 5,
				axisLabel: {
					formatter: '{value} %'
				}
			},
			yData1B: {
				type: 'value',
				name: '人数',
				min: 0,
				max: 50,
				interval: 5,
				axisLabel: {
					formatter: '{value} '
				}
			},
			yData2B: {
				type: 'value',
				name: '满足度',
				min: 0,
				max: 100,
				interval: 5,
				axisLabel: {
					formatter: '{value} %'
				}
			},
			yData1C: {
				type: 'value',
				name: '人数',
				min: 0,
				max: 50,
				interval: 5,
				axisLabel: {
					formatter: '{value} '
				}
			},
			yData2C: {
				type: 'value',
				name: '满足度',
				min: 0,
				max: 100,
				interval: 5,
				axisLabel: {
					formatter: '{value} %'
				}
			},
			series1A: {
				name: '需求总数',
				type: 'bar',
				tooltip: {
					valueFormatter: function (value) {
						return value + '人';
					}
				},
				data: []
			},
			series2A: {
				name: '月度满足数',
				type: 'bar',
				tooltip: {
					valueFormatter: function (value) {
						return value + '人';
					}
				},
				data: []
			},
			series3A: {
				name: '需求满足度',
				type: 'line',
				yAxisIndex: 1,
				tooltip: {
					valueFormatter: function (value) {
						return value + ' %';
					}
				},
				data: []
			},
			series1B: {
				name: '需求总数',
				type: 'bar',
				tooltip: {
					valueFormatter: function (value) {
						return value + '人';
					}
				},
				data: []
			},
			series2B: {
				name: '月度满足数',
				type: 'bar',
				tooltip: {
					valueFormatter: function (value) {
						return value + '人';
					}
				},
				data: []
			},
			series3B: {
				name: '需求满足度',
				type: 'line',
				yAxisIndex: 1,
				tooltip: {
					valueFormatter: function (value) {
						return value + ' %';
					}
				},
				data: []
			},
			series1C: {
				name: '需求总数',
				type: 'bar',
				tooltip: {
					valueFormatter: function (value) {
						return value + '人';
					}
				},
				data: []
			},
			series2C: {
				name: '月度满足数',
				type: 'bar',
				tooltip: {
					valueFormatter: function (value) {
						return value + '人';
					}
				},
				data: []
			},
			series3C: {
				name: '需求满足度',
				type: 'line',
				yAxisIndex: 1,
				tooltip: {
					valueFormatter: function (value) {
						return value + ' %';
					}
				},
				data: []
			}
    };
  },
  methods: {
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    afterVisibleChange(val) {
      console.log('visible', val);
    },
    showDrawer() {
      // this.visible = true;
    },
    onClose() {
      this.$emit('visibleClose')
    },
    edit(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    save(key) {
      const newData = [...this.data];
      const newCacheData = [...this.cacheData];
      const target = newData.filter(item => key === item.key)[0];
      const targetCache = newCacheData.filter(item => key === item.key)[0];
      if (target && targetCache) {
        delete target.editable;
        this.data = newData;
        Object.assign(targetCache, target);
        this.cacheData = newCacheData;
      }
      this.editingKey = '';
      this.updateProjectStatusInfo(key)
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      this.editingKey = '';
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
        delete target.editable;
        this.data = newData;
      }
    },
    handleSearch(selectedKeys, confirm, dataIndex) {
      confirm();
      this.searchText = selectedKeys[0];
      this.searchedColumn = dataIndex;
    },
    log () {
      console.log(this.searchedColumn);
      console.log(this.searchInput);
      console.log(this.searchText);
    },
    handleReset(clearFilters) {
      clearFilters();
      this.searchText = '';
    },
    editApplicant () {
      this.isNewApplicant = !this.isNewApplicant
    },
    updateProjectStatusInfo (key) {
      let target = {} 
      for (const i of this.data) {
        if (i.key===key) {
          target = i
        }
      }
      request.request({
      url: this.getBaseUrl() + 'update_project_status/',
      method: 'post',
      data: {data: target}
      }).then(res =>{
        console.log(res);
      }).catch(err =>{
        console.log(err);
      })
    },
    getPduList (xData, department) {
      request.request({
      url: this.getBaseUrl() + 'get_pdu_list/',
      method: 'post',
      data: {department: department}
      }).then(res =>{
        xData.data = res.data.pduList
        console.log(res);
      }).catch(err =>{
        console.log(err);
      })
    },
    getProjectStatusInfo () {
      this.cacheData = []
      this.data = []
      request.request({
      url: this.getBaseUrl() + 'get_project_status_info/',
      method: 'post',
      data: {
        selectDate: this.selectDate,
        filterRegion: this.$cookies.get("region"),
      }
      }).then(res =>{
        this.cacheData = []
        let a = res.data.infoList
        if (this.selectDate==='') {
          this.data.length = 0
          for (let i = 0; i < a.length; i++) {
            this.data.push(a[i]);
          }
          this.cacheData = data.map(item => ({ ...item }));
        } else {
        // console.log(this.data);
          let xDataA = []
          let yData1A = []
          let yData2A = []
          let yLineA = []
          let xDataB = []
          let yData1B = []
          let yData2B = []
          let yLineB = []
          let xDataC = []
          let yData1C = []
          let yData2C = []
          let yLineC = []
          this.data.length = 0
          a.forEach(e => {
            this.data.push(e)
            this.cacheData = data.map(item => ({ ...item }));
            xDataC.push(e.pdu + '/'  + e.region)
            yData1C.push(e.project_num_all)
            yData2C.push(e.monthly_target_reach)
            yLineC.push(e.project_satisfaction)
            if (e.department==='海思半导体') {
              xDataA.push(e.pdu)
              yData1A.push(e.project_num_all)
              yData2A.push(e.monthly_target_reach)
              yLineA.push(e.project_satisfaction)
            }
            if (e.department==='上海海思') {
              xDataB.push(e.pdu)
              yData1B.push(e.project_num_all)
              yData2B.push(e.monthly_target_reach)
              yLineB.push(e.project_satisfaction)
            }
          });
          this.xDataA.data = xDataA
          this.xDataB.data = xDataB
          this.xDataC.data = xDataC
          this.series1A.data = yData1A
          this.series2A.data = yData2A
          this.series3A.data = yLineA
          this.series1B.data = yData1B
          this.series2B.data = yData2B
          this.series3B.data = yLineB
          this.series1C.data = yData1C
          this.series2C.data = yData2C
          this.series3C.data = yLineC
        }
      }).catch(err =>{
        console.log(err);
      })
    },
    close () {
      this.isBatchControl = false
      this.isBatchControl2 = false
    },
  },
  created () {
    this.getProjectStatusInfo()
    // this.getPduList(this.xData, '海思半导体')
  },
  watch: {
    BatchNum: {
      handler: function (newValue, oldValue) {
        console.log(newValue)
        console.log(oldValue)
        if (newValue > oldValue){
          this.isBatchControl = true
        }
        if (oldValue > newValue){
          this.isBatchControl2 = true
        }
      }
    },
    cleanNum: {
      handler: function (newValue, oldValue) {
        console.log(newValue)
        console.log(oldValue)
        this.isBatchControl = true
      }
    },
    selectDate: {
      handler: function (newValue, oldValue) {
        console.log(newValue)
        console.log(oldValue)
        this.getProjectStatusInfo()
      }
    }
  }
}
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}

.newApplicant {
  width: 70%;
  height: 70%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #fff;
  z-index: 999;
  left: 15%;
  top: 15%;
  border-radius: 2%
}

.newApplicantBut {
    z-index: 100;
}

.isBatchControl{
  width: 70%;
  height: 70%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: #fff;
  z-index: 999;
  left: 15%;
  top: 15%;
  border-radius: 2%
}

.maskLayer {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 998;
  background:rgba(0, 0, 0, 0.4);
  filter:alpha(opacity=60);  /*设置透明度为60%*/
  opacity:0.6;  /*非IE浏览器下设置透明度为60%*/
}
</style>
