<template>
  <div>
    <div v-show="isBatchControl || isBatchControl2 || isSelectRelatedId || isHtml5Editor || isNewRecruitment" @click="close" class="maskLayer"></div>
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
    <html-5-editor @confirm='updateRequirements' :editType="editing" :model="model" v-show="isHtml5Editor" @close='close' class="newApplicant"></html-5-editor>
    <new-recruitment  :isNewRecruitment='isNewRecruitment' @close='close2'></new-recruitment>
    <batch-input batchType='RecruitmentInfo' v-show="isBatchControl" @close='close' class="newApplicant"></batch-input>
    <batch-output batchType='RecruitmentInfo' v-show="isBatchControl2"  @close='close' class="newApplicant"></batch-output>
    <select-project-info v-if="recruitmentModel!=''" :model='recruitmentModel' :isSelectRelatedId='isSelectRelatedId' @close='close' @confirm='relatedConfirm'></select-project-info>
    <a-table :columns="columns" :data-source="data" bordered :pagination="{ pageSize: 15 }"  :scroll="{ x: 1500, y: 550 }">
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
        v-for="col in ['internal_id', 'department', 'omptype', 'type2', 'pdu', 'project', 
        'position_attribute', 'skill_keyword', 'requirements', 'working_seniority', 
        'proposed_time', 'proposer', 'arrival_time', 'num', 
        'recruiter', 'project_leader', 'region', 'location', 
        'urgency', 'type', 'interviewer', 'synthetical_interviewer', 
        'arrival_num', 'status', 'close_time', 'remarks']"
        :slot="col"
        slot-scope="text, record"
      >
        <div :key="col">
          <template v-if="record.editable">
            <a-input
              v-if="col=='project'" 
              placeholder="项目"
              style="margin: -5px 0"
              :value="text"
              @click="selectProject(record.key)"
              @change="e => handleChange(e.target.value, record.key, col)"
            />
            <a-input
              v-else-if="col=='pdu'" 
              placeholder="PDU"
              style="margin: -5px 0"
              :value="text"
              @click="selectProject(record.key)"
              @change="e => handleChange(e.target.value, record.key, col)"
            />
            <a-input
              v-else-if="col=='department'" 
              placeholder="部门"
              style="margin: -5px 0"
              :value="text"
              @click="selectProject(record.key)"
              @change="e => handleChange(e.target.value, record.key, col)"
            />
            <template v-else-if="col=='requirements'" >
              <a rel="noopener noreferrer" @click="startEditor(record.key, true)" style="
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;">查看</a>
            </template>
            <template v-else-if="col=='proposed_time'" >
              <a-date-picker
                placeholder="提出时间"
                style="margin: -5px 0"
                @change="dateString => handleChange(dateString.format('YYYY-MM-DD'), record.key, col)"/>
            </template>
            <template v-else-if="col=='arrival_time'" >
              <a-date-picker
                placeholder="希望到岗时间"
                style="margin: -5px 0"
                @change="dateString => handleChange(dateString.format('YYYY-MM-DD'), record.key, col)"/>
            </template>
            <template v-else-if="col=='close_time'" >
              <a-date-picker
                placeholder="关闭时间"
                style="margin: -5px 0"
                @change="dateString => handleChange(dateString.format('YYYY-MM-DD'), record.key, col)"/>
            </template>
            <a-select
              v-else-if="col=='position_attribute'" 
              ref="select"
              style="margin: -5px 0; width: 122px"
              :value="text"
              @change="e => handleChange(e, record.key, col)"
            >
              <a-select-option v-for="job in jobList" :key="job" :value='job'>{{job}}</a-select-option>
            </a-select>
            <a-select
              v-else-if="col=='urgency'" 
              ref="select"
              style="margin: -5px 0; width: 122px"
              :value="text"
              @change="e => handleChange(e, record.key, col)"
            >
              <a-select-option v-for="urgency in urgencyList" :key="urgency" :value='urgency'>{{urgency}}</a-select-option>
            </a-select>
            <a-select
              v-else-if="col=='type2'" 
              ref="select"
              style="margin: -5px 0; width: 122px"
              :value="text"
              @change="e => handleChange(e, record.key, col)"
            >
              <a-select-option v-for="type in typeList" :key="type" :value='type'>{{type}}</a-select-option>
            </a-select>
            <a-select
              v-else-if="col=='omptype'" 
              ref="select"
              style="margin: -5px 0; width: 122px"
              :value="text"
              @change="e => handleChange(e, record.key, col)"
            >
              <a-select-option v-for="omp in ompList" :key="omp" :value='omp'>{{omp}}</a-select-option>
            </a-select>
            <a-input
              v-else
              style="margin: -5px 0"
              :value="text"
              @change="e => handleChange(e.target.value, record.key, col)"
            />
          </template>
          <template v-else>
            <template v-if="col=='requirements'" >
              <a rel="noopener noreferrer" @click="startEditor(record.key, false)" style="
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;">查看</a>
            </template>
            <template v-else-if="col=='proposed_time'" >
              {{ text | date}}
            </template>
            <template v-else-if="col=='arrival_time'" >
              {{ text | date}}
            </template>
            <template v-else-if="col=='close_time'" >
              {{ text | date}}
            </template>
            <template v-else>
              <a-popover :title="'总数:' + record.total" @mouseenter="getNum(record)">
                <template #content>
                  <p>已入职:{{record.done}}</p>
                  <p>待入职:{{record.standBy}}</p>
                  <p>谈offer中:{{record.discuss}}</p>
                  <p>流程中:{{record.filtering}}</p>
                  <p>不通过:{{record.fail}}</p>
                  <p>拒绝:{{record.giveUp}}</p>
                </template>
                {{ text }}
              </a-popover>
            </template>
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
            <a :disabled="editingKey !== ''" @click="() => edit(record.key)">Edit</a>
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
    title: '序号',
    dataIndex: 'key',
    width: 70,
    fixed: 'left',
    scopedSlots: { customRender: 'key' },
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
    width: 250,
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
    title: '项目',
    dataIndex: 'project',
    width: 200,
    fixed: 'left',
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
      customRender: 'project',
    },
    onFilter: (value, record) =>
      record.project
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
    title: '提出人',
    dataIndex: 'proposer',
    fixed: 'left',
    width: 150,
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
      customRender: 'proposer',
    },
    onFilter: (value, record) =>
      record.proposer
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
    title: '岗位方向',
    dataIndex: 'position_attribute',
    width: 150,
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
      customRender: 'position_attribute',
    },
    onFilter: (value, record) =>
      record.position_attribute
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
    title: '关键字段',
    dataIndex: 'skill_keyword',
    width: 200,
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
      customRender: 'skill_keyword',
    },
    onFilter: (value, record) =>
      record.skill_keyword
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
    title: '地域',
    dataIndex: 'region',
    width: 300,
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
    title: '类型',
    dataIndex: 'type2',
    width: 200,
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
      customRender: 'type2',
    },
    onFilter: (value, record) =>
      record.type2
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
    title: '紧急程度',
    dataIndex: 'urgency',
    width: 200,
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
      customRender: 'urgency',
    },
    onFilter: (value, record) =>
      record.urgency
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
    title: '岗位要求',
    dataIndex: 'requirements',
    width: 200,
    scopedSlots: {
      customRender: 'requirements' 
    }
  },
  {
    title: '年限',
    dataIndex: 'working_seniority',
    width: 100,
    scopedSlots: { customRender: 'working_seniority' },
  },
  {
    title: '提出时间',
    dataIndex: 'proposed_time',
    width: 200,
    scopedSlots: { customRender: 'proposed_time' },
  },
  {
    title: '希望到岗时间',
    dataIndex: 'arrival_time',
    width: 120,
    scopedSlots: { customRender: 'arrival_time' },
  },
  {
    title: '人数',
    dataIndex: 'num',
    width: 150,
    scopedSlots: { customRender: 'num' },
  },
  {
    title: '招聘助理',
    dataIndex: 'recruiter',
    width: 120,
    scopedSlots: { customRender: 'recruiter' },
  },
  {
    title: '项目负责人',
    dataIndex: 'project_leader',
    width: 100,
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
      customRender: 'project_leader',
    },
    onFilter: (value, record) =>
      record.project_leader
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
    title: '报价类型',
    dataIndex: 'type',
    width: 210,
    scopedSlots: { customRender: 'type' },
  },
  {
    title: '工作地点',
    dataIndex: 'location',
    width: 210,
    scopedSlots: { customRender: 'location' },
  },
  {
    title: '技面官',
    dataIndex: 'interviewer',
    width: 100,
    scopedSlots: { customRender: 'interviewer' },
  },
  {
    title: '综面官',
    dataIndex: 'synthetical_interviewer',
    width: 150,
    scopedSlots: { customRender: 'synthetical_interviewer' },
  },
  {
    title: '已到岗人数',
    dataIndex: 'arrival_num',
    width: 120,
    scopedSlots: { customRender: 'arrival_num' },
  },
  {
    title: 'OMP岗位',
    dataIndex: 'omptype',
    width: 180,
    scopedSlots: { customRender: 'omptype' },
  },
  {
    title: '关闭时间',
    dataIndex: 'close_time',
    width: 300,
    scopedSlots: { customRender: 'close_time' },
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
      customRender: 'status',
    },
    onFilter: (value, record) =>
      record.status
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
import SelectProjectInfo from '@/components/recruitmentCompoment/SelectProjectInfo.vue';
import Html5Editor from '@/components/Html5Editor.vue';
import NewRecruitment from '@/components/recruitmentCompoment/NewRecruitment.vue';
import Chart from '@/components/Chart.vue';
import moment from 'moment';
export default {
  components: { BatchInput, BatchOutput, SelectProjectInfo, Html5Editor, NewRecruitment, Chart },
  props: {
    BatchNum: {
      type: Number
    },
    newSwitch: {
      type: Number
    },
    visible: {
      type: Boolean,
      default: false
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
      isSelectRelatedId: false,
      recruitmentModel: {},
      isHtml5Editor: false,
      isNewRecruitment: false,
      model: {},
      editing: false,
      title: '',
      baseUrl: '',
      isNewing: false,
      jobList: ['C开发', 'C++开发', 'JAVA开发', 'PYTHON开发', 'WEB开发', '自动化测试', '芯片验证', '手动测试', '软件开发测试', '硬件开发', '硬件测试', '硬件维护', '资料开发', 'BA', '资料', '标注', '大数据', '运维', 'C#开发', '图像PQ', 'CAD开发', 'IC验证', '结构工程师', '其他'],
      urgencyList: ['高', '中', '低', '暂停'],
      typeList: ['SLA', '离职补缺', '新需求'],
      ompList: ['软件开发工程', '硬件开发工程师', '测试工程师', '资料开发工程师', '项目经理', '质量工程师', 'UCD设计工程师', '版图开发工程师', '维护工程师', '实验室管理工程师', '研发支撑类工程师'],
      titleData: ['需求总数', '月度满足数', '需求满足度'],
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
    onClose() {
      this.$emit('visibleClose')
    },
    afterVisibleChange(val) {
      console.log('visible', val);
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
      if (this.isNewing){
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
        this.createRecruitmentInfo()
      } else {
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
        this.updateRecruitmentInfo(key)
      }
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
      if (this.isNewing) {
        this.isNewing = false
        const newData = [...this.data];
        newData.remove(0)
        this.data = newData;
      }
    },
    handleSearch(selectedKeys, confirm, dataIndex) {
      confirm();
      this.searchText = selectedKeys[0];
      this.searchedColumn = dataIndex;
    },
    log (a) {
      console.log(a);
    },
    getNum (a) {
      if (!a.total && a.total!==0) {
        request.request({
        url:this.baseUrl + 'applicant_according_to_recruitment/',
        method: 'post',
        data: {recruitmentId: a.key}
        }).then(res =>{
          const key = a.key
          for (const i of this.data) {
            if (i.key===key) {
              i.total = res.data.total
              i.fail = res.data.fail
              i.filtering = res.data.filtering
              i.giveUp = res.data.giveUp
              i.done = res.data.done
              i.discuss = res.data.discuss
              i.standBy = res.data.standBy
              console.log(i);
              const newData = [...this.data];
              this.data = newData;
            }
          }
        }).catch(err =>{
          console.log(err);
        })
      }
    },
    handleReset(clearFilters) {
      clearFilters();
      this.searchText = '';
    },
    editApplicant () {
      this.isNewApplicant = !this.isNewApplicant
    },
    updateRecruitmentInfo (key) {
      for (const i of this.data) {
        if (i.key===key) {
          request.request({
          url: this.getBaseUrl() + 'update_recruitment_info/',
          method: 'post',
          data: {data: i}
          }).then(res =>{
            console.log(res);
          }).catch(err =>{
            console.log(err);
          })
        }
      }
    },
    createRecruitmentInfo () {
      // delete this.data[0].key
      request.request({
      url: this.getBaseUrl() + 'create_recruitment_info/',
      method: 'post',
      data: {data: this.data[0]}
      }).then(res =>{
        console.log(res);
      }).catch(err =>{
        console.log(err);
      })
    },
    getRecruitmentInfo () {
      request.request({
        url: this.getBaseUrl() + 'get_recruitment_info/',
        method: 'post',
        data: {
            filterData: this.filterData,
            filterRegion: this.$cookies.get("region")
        }
      }).then(res =>{
        let a = res.data.infoList
        this.data.length = 0
        for (let i = 0; i < a.length; i++) {
          this.data.push(a[i]);
        }
        this.cacheData = data.map(item => ({ ...item }));
      }).catch(err =>{
        console.log(err);
      })
    },
    close () {
      this.isBatchControl = false
      this.isBatchControl2 = false
      this.isSelectRelatedId = false
      this.isHtml5Editor = false
      this.isNewRecruitment = false
    },
    close2 () {
      this.isBatchControl = false
      this.isBatchControl2 = false
      this.isSelectRelatedId = false
      this.isHtml5Editor = false
      this.isNewRecruitment = false
      this.getRecruitmentInfo()
    },
    relatedConfirm (childValue) {
      this.close()
      const key = childValue.key
      this.handleChange(childValue.department, key, 'department')
      this.handleChange(childValue.pdu, key, 'pdu')
      this.handleChange(childValue.project_name, key, 'project')
    },
    selectProject (key) {
      console.log(key)
      for (const i of this.data) {
        if (i.key===key) {
          this.recruitmentModel = i
          console.log(i);
        }
      }
      console.log(this.recruitmentModel)
      this.isSelectRelatedId = true
    },
    startEditor (key, editing) {
      this.editing = editing
      this.isHtml5Editor = true
      for (const i of this.data) {
        if (i.key===key) {
          this.model = i
        }
      }
    },
    updateRequirements (childValue) {
      console.log(childValue);
      const key = childValue.model.key
      for (const i of this.data) {
        if (i.key===key) {
          i.requirements = childValue.value
        }
      }
      this.updateRecruitmentInfo(key)
    }
  },
  created () {
    this.getRecruitmentInfo()
    this.baseUrl = this.getBaseUrl()
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
    newSwitch:{
      handler () {
        this.isNewing = true
        let num = this.data[0].key
        this.data.unshift({
          key: num += 1,
        });
        this.cacheData = this.data.map(item => ({ ...item }));
        const newData = [...this.data];
        const target = newData.find(item => num += 1 === item.key);
        this.editingKey = 0;
        if (target) {
          target.editable = true;
          this.data = newData;
        }
      }
    },
  },
  filters: {
    datetime(text) {
      return moment(text).format('YYYY-MM-DD HH:MM:ss') 
    },
    date(text) {
      return moment(text).format('YYYY-MM-DD') 
    }
  }
};
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

.maskLayer {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 108;
  background:rgba(0, 0, 0, 0.4);
  filter:alpha(opacity=60);  /*设置透明度为60%*/
  opacity:0.6;  /*非IE浏览器下设置透明度为60%*/
}
</style>
