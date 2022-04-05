<template>
  <div>
    <div v-show="isNewApplicant || isBatchControl || isSelectApplicant || isSelectRelatedId || isBatchControl2" @click="close" class="maskLayer"></div>
    <batch-input batchType='ApplicantInfo' v-show="isBatchControl"  @close='close' class="newApplicant"></batch-input>
    <batch-output batchType='ApplicantInfo' v-show="isBatchControl2"  @close='close' class="newApplicant"></batch-output>
    <new-element :isNewApplicant='isNewApplicant' @close='close2'></new-element>
    <select-applicant v-if="model!=''" :Applicant='model' :isSelectApplicant='isSelectApplicant' @close='close'></select-applicant>
    <select-recruitment v-if="recruitmentModel!=''" :model='recruitmentModel' :isSelectRelatedId='isSelectRelatedId' @close='close' @confirm='relatedConfirm'></select-recruitment>
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
          {{ text }}
        </template>
      </template>
      <template
        v-for="col in ['name', 'phone_num', 'graduated_from', 'education', 
        'major', 'working_seniority', 'job', 'region', 
        'related', 'pdu', 'project_name', 'arrival_time', 'recommender', 'recommend_time', 
        'own_interviewer', 'own_interview_results', 'reason1', 'own_interview_time', 
        'machine_test_type', 'machine_test_score', 'machine_test_time', 'hw_interviewer1', 
        'hw_interview_results1', 'reason2', 'hw_interview_time1', 'hw_interviewer2', 
        'hw_interview_results2', 'reason3', 'hw_interview_time2', 'final_result', 'final_time', 'reason4',
        'process_status', 'resume_status', 'sex', 'suggest_level', 'giveup_time', 'entrance', 'graduation']"
        :slot="col"
        slot-scope="text, record"
      >
        <div :key="col">
          <template v-if="record.editable">
            <a-date-picker
              show-time
              v-if="col=='machine_test_time'" 
              placeholder="机试时间"
              style="margin: -5px 0"
              @change="dateString => handleChange(dateString.format('YYYY-MM-DD HH:MM:ss'), record.key, col)"
              @ok="dateString => handleChange(dateString.format('YYYY-MM-DD HH:MM:ss'), record.key, col)"/>
            <a-date-picker
              show-time
              v-else-if="col=='hw_interview_time1'" 
              placeholder="华为技面时间"
              style="margin: -5px 0"
              @change="dateString => handleChange(dateString.format('YYYY-MM-DD HH:MM:ss'), record.key, col)"
              @ok="dateString => handleChange(dateString.format('YYYY-MM-DD HH:MM:ss'), record.key, col)"/>
            <a-date-picker
              show-time
              v-else-if="col=='recommend_time'" 
              placeholder="推荐时间"
              style="margin: -5px 0"
              @change="dateString => handleChange(dateString.format('YYYY-MM-DD HH:MM:ss'), record.key, col)"
              @ok="dateString => handleChange(dateString.format('YYYY-MM-DD HH:MM:ss'), record.key, col)"/>
            <a-date-picker
              show-time
              v-else-if="col=='hw_interview_time2'" 
              placeholder="华为综面时间"
              style="margin: -5px 0"
              @change="dateString => handleChange(dateString.format('YYYY-MM-DD HH:MM:ss'), record.key, col)"
              @ok="dateString => handleChange(dateString.format('YYYY-MM-DD HH:MM:ss'), record.key, col)"/>
            <a-date-picker
              show-time
              v-else-if="col=='own_interview_time'" 
              placeholder="软通面试时间"
              style="margin: -5px 0"
              @change="dateString => handleChange(dateString.format('YYYY-MM-DD HH:MM:ss'), record.key, col)"
              @ok="dateString => handleChange(dateString.format('YYYY-MM-DD HH:MM:ss'), record.key, col)"/>
            <a-date-picker 
              v-else-if="col=='arrival_time'" 
              placeholder="能够到岗时间"
              style="margin: -5px 0"
              @change="dateString => handleChange(dateString.format('YYYY-MM-DD'), record.key, col)"/>
            <a-date-picker 
              v-else-if="col=='entrance'" 
              placeholder="入学日期"
              style="margin: -5px 0"
              @change="dateString => handleChange(dateString.format('YYYY-MM-DD'), record.key, col)"/>
            <a-date-picker 
              v-else-if="col=='graduation'" 
              placeholder="毕业日期"
              style="margin: -5px 0"
              @change="dateString => handleChange(dateString.format('YYYY-MM-DD'), record.key, col)"/>
            <a-date-picker 
              v-else-if="col=='final_time'" 
              placeholder="入项时间"
              style="margin: -5px 0"
              @change="dateString => handleChange(dateString.format('YYYY-MM-DD'), record.key, col)"/>
            <a-date-picker 
              v-else-if="col=='giveup_time'" 
              placeholder="放弃offer时间"
              style="margin: -5px 0"
              @change="dateString => handleChange(dateString.format('YYYY-MM-DD'), record.key, col)"/>
            <a-input
              v-else-if="col=='related'" 
              placeholder="关联需求"
              style="margin: -5px 0"
              :value="text"
              @click="selectRelated(record.key)"
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
            <template v-if="col=='name'">
              <a @click="selectId(record)">{{ text }}</a>
            </template>
            <!-- <template v-else-if="col=='related'">
              <a @click="selectId(record)">{{ text }}</a>
            </template> -->
            <template v-else>
              <template v-if="col=='machine_test_time'||col=='hw_interview_time1'||col=='recommend_time'||col=='hw_interview_time2'||col=='own_interview_time'">
                {{ text | datetime}}
              </template>
              <template v-else-if="col=='giveup_time'||col=='final_time'||col=='graduation'||col=='entrance'||col=='arrival_time'">
                {{ text | date}}
              </template>
              <template v-else>
                {{ text }}
              </template>
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
    width: 130,
    scopedSlots: { customRender: 'entrance' },
  },
  {
    title: '毕业日期',
    dataIndex: 'graduation',
    width: 130,
    scopedSlots: { customRender: 'graduation' },
  },
  {
    title: '关联需求',
    dataIndex: 'related',
    width: 200,
    scopedSlots: { customRender: 'related' },
  },
  {
    title: 'PDU',
    dataIndex: 'pdu',
    width: 100,
    scopedSlots: { customRender: 'pdu' },
  },
  {
    title: '项目名称',
    dataIndex: 'project_name',
    width: 250,
    scopedSlots: { customRender: 'project_name' },
  },
  {
    title: '能够到岗时间',
    dataIndex: 'arrival_time',
    width: 250,
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
    width: 250,
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
    width: 240,
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
    width: 240,
    scopedSlots: { customRender: 'machine_test_time' },
  },
  {
    title: '华为技面人',
    dataIndex: 'hw_interviewer1',
    width: 120,
    scopedSlots: { customRender: 'hw_interviewer1' },
  },
  {
    title: '华为技面结果',
    dataIndex: 'hw_interview_results1',
    width: 100,
    scopedSlots: { customRender: 'hw_interview_results1' },
  },
  {
    title: '华为技面时间',
    dataIndex: 'hw_interview_time1',
    width: 240,
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
    width: 240,
    scopedSlots: { customRender: 'hw_interview_time2' },
  },
  {
    title: '放弃offer时间',
    dataIndex: 'giveup_time',
    width: 240,
    scopedSlots: { customRender: 'giveup_time' },
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
    width: 240,
    scopedSlots: { customRender: 'final_time' },
  },
  {
    title: 'operation',
    dataIndex: 'operation',
    fixed: 'right',
    scopedSlots: { customRender: 'operation' },
    width: 180,
  },
];

const data = [];
import * as request from "@/network/request"
import SelectApplicant from '../../components/ApplicantCompoents/SelectApplicant.vue';
import SelectRecruitment from '../../components/ApplicantCompoents/SelectRecruitment.vue';
import moment from 'moment';

export default {
  components: { BatchInput, NewElement, SelectApplicant, SelectRecruitment, BatchOutput },
  data() {
    this.cacheData = data.map(item => ({ ...item }));
    return {
      data,
      columns,
      editingKey: '',
      isNewApplicant: false,
      isBatchControl: false,
      isBatchControl2: false,
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
      isSelectApplicant: false,
      model: '',
      isSelectRelatedId: false,
      recruitmentModel: ''
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
    },
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
      this.isBatchControl2 = false
      this.isSelectApplicant = false
      this.isSelectRelatedId = false
    },
    close2 () {
      this.isNewApplicant = false
      this.isBatchControl = false
      this.isBatchControl2 = false
      this.isSelectApplicant = false
      this.isSelectRelatedId = false
      this.getApplicantInfo()
    },
    updateApplicant (key) {
      console.log(this.data)
      console.log(key);
      console.log(this.data[key]);
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
    },
    selectId (model) {
      console.log(model)
      this.model = model
      this.isSelectApplicant = true
    },
    selectRelated (key) {
      console.log(key)
      this.recruitmentModel = this.data[key]
      console.log(this.recruitmentModel)
      this.isSelectRelatedId = true
    },
    relatedConfirm (childValue) {
      this.close()
      const key = childValue.key
      this.handleChange(childValue.related, key, 'related')
      this.handleChange(childValue.pdu, key, 'pdu')
      this.handleChange(childValue.project_name, key, 'project_name')
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
    }
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
