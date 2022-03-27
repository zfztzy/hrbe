<template>
  <div>
    <div v-show="isNewApplicant || isBatchControl" @click="close" class="maskLayer"></div>
    <batch-input v-show="isBatchControl" class="newApplicant"></batch-input>
    <new-element :isNewApplicant='isNewApplicant' @close='close'></new-element>
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
              >{{ fragment + '' }}</mark
            >
            <template v-else>{{ fragment + '' }}</template>
          </template>
        </span>
        <template v-else>
          {{ text + '' }}
        </template>
      </template>
      <template
        v-for="col in ['name', 'phone_num', 'graduated_from', 'education', 
        'major', 'working_seniority', 'job', 'region', 
        'related', 'arrival_time', 'recommender', 'recommend_time', 
        'own_interviewer', 'own_interview_results', 'reason1', 'own_interview_time', 
        'machine_test_type', 'machine_test_score', 'machine_test_time', 'hw_interviewer1', 
        'hw_interview_results1', 'reason2', 'hw_interview_time1', 'hw_interviewer2', 
        'hw_interview_results2', 'reason3', 'hw_interview_time2', 'final_result', 'final_time', 'reason4',
        'process_status', 'resume_status', 'sex', 'suggest_level', 'entrance', 'graduation']"
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
            {{ text + '' }}
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
import NewElement from '@/components/ApplicantCompoents/NewElement.vue';
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: 100,
    fixed: 'left',
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
      customRender: 'name',
    },
    onFilter: (value, record) =>
      record.name
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => {
          this.searchInput.focus();
        }, 0);
      }
    },
  },
  {
    title: '流程状态',
    dataIndex: 'process_status',
    width: 130,
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
      customRender: 'process_status',
    },
    onFilter: (value, record) =>
      record.process_status
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => {
          this.searchInput.focus();
        }, 0);
      }
    },
  },
  {
    title: '简历状态',
    dataIndex: 'resume_status',
    width: 130,
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
      customRender: 'resume_status',
    },
    onFilter: (value, record) =>
      record.resume_status
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => {
          this.searchInput.focus();
        }, 0);
      }
    },
  },
  {
    title: '电话',
    dataIndex: 'phone_num',
    width: 200,
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
      customRender: 'phone_num',
    },
    onFilter: (value, record) =>
      record.phone_num
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => {
          this.searchInput.focus();
        }, 0);
      }
    },
  },
  {
    title: '毕业院校',
    dataIndex: 'graduated_from',
    width: 250,
    scopedSlots: { customRender: 'graduated_from' },
  },
  {
    title: '学历',
    dataIndex: 'education',
    width: 100,
    scopedSlots: { customRender: 'education' },
  },
  {
    title: '专业',
    dataIndex: 'major',
    width: 250,
    scopedSlots: { customRender: 'major' },
  },
  {
    title: '工作年限',
    dataIndex: 'working_seniority',
    width: 100,
    scopedSlots: { customRender: 'working_seniority' },
  },
  {
    title: '面试岗位',
    dataIndex: 'job',
    width: 200,
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon', 
      customRender: 'job' 
    },
    onFilter: (value, record) =>
      record.job
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => {
          this.searchInput.focus();
        }, 0);
      }
    },
  },
  {
    title: '地域',
    dataIndex: 'region',
    width: 100,
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon', 
      customRender: 'region' 
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
    },
  },
  {
    title: '性别',
    dataIndex: 'sex',
    width: 100,
    scopedSlots: { customRender: 'sex' },
  },
  {
    title: '建议职级',
    dataIndex: 'suggest_level',
    width: 100,
    scopedSlots: { customRender: 'suggest_level' },
  },
  {
    title: '入学日期',
    dataIndex: 'entrance',
    width: 100,
    scopedSlots: { customRender: 'entrance' },
  },
  {
    title: '毕业日期',
    dataIndex: 'graduation',
    width: 100,
    scopedSlots: { customRender: 'graduation' },
  },
  {
    title: '关联需求',
    dataIndex: 'related',
    width: 200,
    scopedSlots: { customRender: 'related' },
  },
  {
    title: '能够到岗时间',
    dataIndex: 'arrival_time',
    width: 150,
    scopedSlots: { customRender: 'arrival_time' },
  },
  {
    title: '招聘顾问',
    dataIndex: 'recommender',
    width: 120,
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
      customRender: 'recommender',
    },
    onFilter: (value, record) =>
      record.recommender
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
    title: '推荐时间',
    dataIndex: 'recommend_time',
    width: 150,
    scopedSlots: { customRender: 'recommend_time' },
  },
  {
    title: '软通面试人',
    dataIndex: 'own_interviewer',
    width: 120,
    scopedSlots: { customRender: 'own_interviewer' },
  },
  {
    title: '软通面试结果',
    dataIndex: 'own_interview_results',
    width: 100,
    scopedSlots: { customRender: 'own_interview_results' },
  },
  {
    title: '原因',
    dataIndex: 'reason1',
    width: 300,
    scopedSlots: { customRender: 'reason1' },
  },
  {
    title: '软通面试时间',
    dataIndex: 'own_interview_time',
    width: 150,
    scopedSlots: { customRender: 'own_interview_time' },
  },
  {
    title: '软通机试类型',
    dataIndex: 'machine_test_type',
    width: 100,
    scopedSlots: { customRender: 'machine_test_type' },
  },
  {
    title: '机试成绩',
    dataIndex: 'machine_test_score',
    width: 100,
    scopedSlots: { customRender: 'machine_test_score' },
  },
  {
    title: '机试时间',
    dataIndex: 'machine_test_time',
    width: 150,
    scopedSlots: { customRender: 'machine_test_time' },
  },
  {
    title: '华为技面人',
    dataIndex: 'hw_interviewer1',
    width: 120,
    scopedSlots: { customRender: 'hw_interviewer1' },
  },
  {
    title: '华为计面结果',
    dataIndex: 'hw_interview_results1',
    width: 100,
    scopedSlots: { customRender: 'hw_interview_results1' },
  },
  {
    title: '华为技面时间',
    dataIndex: 'hw_interview_time1',
    width: 150,
    scopedSlots: { customRender: 'hw_interview_time1' },
  },
  {
    title: '华为综面人',
    dataIndex: 'hw_interviewer2',
    width: 120,
    scopedSlots: { customRender: 'hw_interviewer2' },
  },
  {
    title: '华为综面结果',
    dataIndex: 'hw_interview_results2',
    width: 100,
    scopedSlots: { customRender: 'hw_interview_results2' },
  },
  {
    title: '华为综面时间',
    dataIndex: 'hw_interview_time2',
    width: 150,
    scopedSlots: { customRender: 'hw_interview_time2' },
  },
  {
    title: '入项结果',
    dataIndex: 'final_result',
    width: 150,
    scopedSlots: { customRender: 'final_result' },
  },
  {
    title: '入项时间',
    dataIndex: 'final_time',
    width: 150,
    scopedSlots: { customRender: 'final_time' },
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

export default {
  components: { BatchInput, NewElement },
  data() {
    this.cacheData = data.map(item => ({ ...item }));
    return {
      data,
      columns,
      editingKey: '',
      isNewApplicant: false,
      isBatchControl: false,
      userName: undefined,
      recommender: undefined,
      region: undefined,
      sex: undefined,
      education: undefined,
      entrance: undefined,
      graduation: undefined,
      graduated_from: undefined,
      major: undefined,
      phone_num: undefined,
      job: undefined,
      searchText: '',
      searchInput: undefined,
      searchedColumn: '',
    };
  },
  props: {
    newSwitch: {
      type: Number
    },
    filterData: {
      type: Object
    },
    BatchNum: {
      type: Number
    }
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
      this.updateApplicant(key)
      this.editingKey = '';
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
      // console.log(this.searchedColumn);
      // console.log(this.searchInput);
      // console.log(this.searchText);
    },
    handleReset(clearFilters) {
      clearFilters();
      this.searchText = '';
    },
    newApplicant () {
      this.isNewApplicant = true
      console.log(this.newSwitch)
    },
    close () {
      this.isNewApplicant = false
      this.isBatchControl = false
    },
    updateApplicant (key) {
      request.request({
      url:'http://139.9.160.24/update_applicant_info/',
      method: 'post',
      data: {data: this.data[key]}
      }).then(res =>{
        console.log(res);
      }).catch(err =>{
        console.log(err);
      })
    },
    getApplicantInfo () {
      request.request({
      url:'http://139.9.160.24/get_applicant_info/',
      method: 'post',
      data: {filterData: this.filterData}
      }).then(res =>{
        let a = res.data.applicantList
        this.data.length = 0
        for (let i = 0; i < a.length; i++) {
          this.data.push(a[i]);
        }
        this.cacheData = data.map(item => ({ ...item }));
      }).catch(err =>{
        console.log(err);
      })
    }
  },
  created () {
    this.getApplicantInfo()
  },
  watch: {
    newSwitch:'newApplicant',
    filterData:{
      handler (newValue) {
        console.log(newValue)
        this.getApplicantInfo()
      }
    },
    BatchNum: {
      handler: function (newValue, oldValue) {
        console.log(newValue)
        console.log(oldValue)
        this.isBatchControl = true
      }
    },
    cleanNum: {
      handler: function (newValue, oldValue) {
        console.log(newValue)
        console.log(oldValue)
        this.isBatchControl = true
      }
    }
  }

};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
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

.newApplicant {
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
</style>
