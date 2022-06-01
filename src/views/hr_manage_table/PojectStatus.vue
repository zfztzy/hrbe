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
      <chart title="海思半导体地域需求" keyId="chart3" :series="[series1C, series2C, series3C]" :xAxis="[xDataC]" :yAxis="[yData1C, yData2C]" :titleData="titleData"/>
      <chart title="上海海思地域需求" keyId="chart4" :series="[series1D, series2D, series3D]" :xAxis="[xDataD]" :yAxis="[yData1D, yData2D]" :titleData="titleData"/>
    </el-scrollbar>
    </a-drawer>
    <batch-input batchType='ProjectStatusInfo' v-show="isBatchControl"  @close='close' class="newApplicant"></batch-input>
    <batch-output batchType='ProjectStatusInfo' :selectDate='selectDate' v-show="isBatchControl2"  @close='close' class="newApplicant"></batch-output>
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
        v-for="col in colList"
        :slot="col"
        slot-scope="text, record"
      >
        <div :key="col">
          <template v-if="record.editable">
            <a-input
              v-if="col=='monthly_target' & date3 > 4 & record.date == '202204'"
              style="margin: -5px 0"
              :disabled='date3 > 4'
              :value="text"
              @change="e => handleChange(e.target.value, record.key, col)"
            />
            <a-input
              v-else
              style="margin: -5px 0"
              :value="text"
              @change="e => handleChange(e.target.value, record.key, col)"
            />
          </template>
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
              <a-popconfirm
                title="Sure to delete?"
                @confirm="() => onDelete(record.key)"
              >
                <a href="javascript:;">Delete</a>
              </a-popconfirm>
            </template>
            <template v-else>
              <a style="color:#d9d9d9">Edit</a>
              <a-popconfirm
                title="Sure to delete?"
                @confirm="() => onDelete(record.key)"
              >
                <a href="javascript:;">Delete</a>
              </a-popconfirm>
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
    width: 120,
    fixed: 'left',
    scopedSlots: { customRender: 'date' },
  },
  {
    title: '部门',
    dataIndex: 'department',
    width: 130,
    fixed: 'left',
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
      customRender: 'department',
    },
    onFilter: (value, record) =>
      record.department
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => {
          this.searchInput.focus();
        }, 0);
      }
    }
  },
  {
    title: 'PDU',
    dataIndex: 'pdu',
    width: 140,
    fixed: 'left',
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
      customRender: 'pdu',
    },
    onFilter: (value, record) =>
      record.pdu
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => {
          this.searchInput.focus();
        }, 0);
      }
    }
  },
  {
    title: 'PO',
    dataIndex: 'po_num',
    width: 150,
    fixed: 'left',
    scopedSlots: { customRender: 'po_num' },
  },
  {
    title: '项目',
    dataIndex: 'project',
    width: 280,
    fixed: 'left',
    scopedSlots: { customRender: 'project' },
  },
  {
    title: '地域',
    dataIndex: 'region',
    width: 100,
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
      customRender: 'region',
    },
    onFilter: (value, record) =>
      record.region
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => {
          this.searchInput.focus();
        }, 0);
      }
    }
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
    },
    newSwitch: {
      type: Number
    },
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
      isNewing: false,
      date1: '',
      date2: '',
      date3: '',
			xDataA: {
				type: 'category',
				data: [],
				axisPointer: {
					type: 'shadow'
        },
        // formatter:function(val){
        //     return val.split("").join("\n");
        // }
        axisLabel: {
        rotate: 50, //文字旋转
        },

			},
			xDataB: {
				type: 'category',
				data: [],
				axisPointer: {
					type: 'shadow'
				},
        axisLabel: {
        rotate: 50, //文字旋转
        },
			},
			xDataC: {
				type: 'category',
				data: [],
				axisPointer: {
					type: 'shadow'
				},
        // axisLabel: {
        // rotate: 50, //文字旋转
        // },
			},
			xDataD: {
				type: 'category',
				data: [],
				axisPointer: {
					type: 'shadow'
				},
        // axisLabel: {
        // rotate: 50, //文字旋转
        // },
			},
			yData1A: {
				type: 'value',
				name: '人数',
				min: 0,
				max: 50,
				interval: 3,
				axisLabel: {
					formatter: '{value} '
				}
			},
			yData2A: {
				type: 'value',
				name: '满足度',
				min: 0,
				max: 150,
				interval: 15,
				axisLabel: {
					formatter: '{value} %'
				}
			},
			yData1B: {
				type: 'value',
				name: '人数',
				min: 0,
				max: 50,
				interval: 3,
				axisLabel: {
					formatter: '{value} '
				}
			},
			yData2B: {
				type: 'value',
				name: '满足度',
				min: 0,
				max: 150,
				interval: 15,
				axisLabel: {
					formatter: '{value} %'
				}
			},
			yData1C: {
				type: 'value',
				name: '人数',
				min: 0,
				max: 50,
				interval: 3,
				axisLabel: {
					formatter: '{value} '
				}
			},
			yData2C: {
				type: 'value',
				name: '满足度',
				min: 0,
				max: 150,
				interval: 15,
				axisLabel: {
					formatter: '{value} %'
				}
			},
			yData1D: {
				type: 'value',
				name: '人数',
				min: 0,
				max: 50,
				interval: 3,
				axisLabel: {
					formatter: '{value} '
				}
			},
			yData2D: {
				type: 'value',
				name: '满足度',
				min: 0,
				max: 150,
				interval: 15,
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
        data: [],
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
			},
			series1D: {
				name: '需求总数',
				type: 'bar',
				tooltip: {
					valueFormatter: function (value) {
						return value + '人';
					}
				},
				data: []
			},
			series2D: {
				name: '月度满足数',
				type: 'bar',
				tooltip: {
					valueFormatter: function (value) {
						return value + '人';
					}
				},
				data: []
			},
			series3D: {
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
      colList: ['project', 'po_num', 'pdu', 'sow_num', 'project_num', 'new_project_num', 
      'offset_num', 'urgency', 'monthly_reach', 'remarks', 'monthly_target']
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
        target = res.data
        this.cacheData = []
        // this.cacheData = this.data.map(item => ({ ...item }))
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
    onDelete(key) {
      console.log(key);
      for (let index = 0; index < this.data.length; index++) {
        const element = this.data[index]
        if (element.key == key) {
          console.log(this.data)
          this.data.remove(index)
          console.log(this.data)
        }
      }
      request.request({
      url: this.getBaseUrl() + 'delete_project_status_info/',
      method: 'post',
      data: {
        deleteKey: key,
      }
      }).then(res =>{
        console.log(res);
      }).catch(err =>{
        console.log(err);
      })
      this.cacheData = []
      this.cacheData = this.data.map(item => ({ ...item }))
    },
    getProjectStatusInfo () {
      this.cacheData = []
      this.data = []
      console.log(this.selectDate)
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
        for (let i = 0; i < a.length; i++) {
          this.data.push(a[i]);
        }
        this.cacheData = this.data.map(item => ({ ...item }));
        let b = res.data.remove
        if (b) {
          if(this.colList.length === 11){
            this.colList.pop()
            console.log(this.colList);
          }
        } else {
          if(this.colList.length < 11){
            this.colList.push('monthly_target')
            console.log(this.colList);
          }
        }
      }).catch(err =>{
        console.log(err);
      })
    },
    getPicValue() {
      request.request({
      url: this.getBaseUrl() + 'get_status_pic_value/',
      method: 'post',
      data: {
        selectDate: this.selectDate,
        filterRegion: this.$cookies.get("region"),
      }
      }).then(res =>{
        console.log(res.data.picData);
        this.xDataA.data = res.data.picData['海思半导体pduXData']
        this.xDataB.data = res.data.picData['上海海思pduXData']
        this.xDataC.data = res.data.picData['海思半导体地域xData']
        this.xDataD.data = res.data.picData['上海海思地域xData']
        this.yData1A.max = Math.max(...res.data.picData['海思半导体pdu剩余需求数'])
        this.yData1A.interval = parseInt(Math.max(...res.data.picData['海思半导体pdu剩余需求数'])/10)
        this.yData2A.max = Math.max(...res.data.picData['海思半导体pdu月度满足度'])
        this.yData2A.interval = parseInt(Math.max(...res.data.picData['海思半导体pdu月度满足度'])/10)
        this.yData1B.max = Math.max(...res.data.picData['上海海思pdu剩余需求数'])
        this.yData1B.interval = parseInt(Math.max(...res.data.picData['上海海思pdu剩余需求数'])/10)
        this.yData2B.max = Math.max(...res.data.picData['上海海思pdu月度满足度'])
        this.yData2B.interval = parseInt(Math.max(...res.data.picData['上海海思pdu月度满足度'])/10)
        this.yData1C.max = Math.max(...res.data.picData['海思半导体pdu剩余需求数'])
        this.yData1C.interval = parseInt(Math.max(...res.data.picData['海思半导体地域剩余需求数'])/10)
        this.yData2C.max = Math.max(...res.data.picData['海思半导体地域月度满足度'])
        this.yData2C.interval = parseInt(Math.max(...res.data.picData['海思半导体地域月度满足度'])/10)
        this.yData1D.max = Math.max(...res.data.picData['上海海思地域剩余需求数'])
        this.yData1D.interval = parseInt(Math.max(...res.data.picData['上海海思地域剩余需求数'])/10)
        this.yData2D.max = Math.max(...res.data.picData['上海海思地域月度满足度'])
        this.yData2D.interval = parseInt(Math.max(...res.data.picData['上海海思地域月度满足度'])/10)
        this.series1A.data = res.data.picData['海思半导体pdu剩余需求数']
        this.series2A.data = res.data.picData['海思半导体pdu月度满足数']
        this.series3A.data = res.data.picData['海思半导体pdu月度满足度']
        this.series1B.data = res.data.picData['上海海思pdu剩余需求数']
        this.series2B.data = res.data.picData['上海海思pdu月度满足数']
        this.series3B.data = res.data.picData['上海海思pdu月度满足度']
        this.series1C.data = res.data.picData['海思半导体地域剩余需求数']
        this.series2C.data = res.data.picData['海思半导体地域月度满足数']
        this.series3C.data = res.data.picData['海思半导体地域月度满足度']
        this.series1D.data = res.data.picData['上海海思地域剩余需求数']
        this.series2D.data = res.data.picData['上海海思地域月度满足数']
        this.series3D.data = res.data.picData['上海海思地域月度满足度']

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
    this.getPicValue()
    // this.getPduList(this.xData, '海思半导体')
    let todayDate = new Date();
    console.log(todayDate.toLocaleDateString().replace(/\//g, '-').replace(/-(\d)\b/g, '-0$1'));
    this.date2 = todayDate.getMonth()
    this.date3 = todayDate.getDate()
    console.log(this.date1);
    console.log(this.date2);
    console.log(this.date3);

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
        this.getPicValue()
      }
    },
    newSwitch:{
      handler () {
        this.isNewing = true
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
