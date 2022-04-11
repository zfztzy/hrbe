<template>
  <div>
    <div v-show="isBatchControl || isBatchControl2 || isSelectRelatedId || isHtml5Editor || isNewRecruitment" @click="close" class="maskLayer"></div>
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
        v-for="col in ['internal_id', 'department', 'pdu', 'project', 
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
            <template v-else-if="col=='requirements'" >
              <a rel="noopener noreferrer" @click="startEditor(record.key, true)" style="
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;">查看</a>
            </template>
            <template v-else-if="col=='proposed_time'" >
              {{ text | datetime}}
            </template>
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
              {{ text | datetime}}
            </template>
            <template v-else>
              <a-popover :title="'总数:' + record.total" @mouseenter="getNum(record)">
                <template #content>
                  <p>已入职:{{record.done}}</p>
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
    title: '岗位方向',
    dataIndex: 'position_attribute',
    width: 250,
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
      customRender: 'skill_keyword' 
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
    title: '提出人',
    dataIndex: 'proposer',
    width: 150,
    scopedSlots: { customRender: 'proposer' },
  },
  {
    title: '希望到刚时间',
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
    title: '紧急程度',
    dataIndex: 'urgency',
    width: 150,
    scopedSlots: { customRender: 'urgency' },
  },
  {
    title: '需求类型',
    dataIndex: 'type',
    width: 100,
    scopedSlots: { customRender: 'type' },
  },
  {
    title: '计面官',
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
    title: '关闭时间',
    dataIndex: 'close_time',
    width: 300,
    scopedSlots: { customRender: 'close_time' },
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
import moment from 'moment';
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
  components: { BatchInput, BatchOutput, SelectProjectInfo, Html5Editor, NewRecruitment },
  props: {
    BatchNum: {
      type: Number
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
      isSelectRelatedId: false,
      recruitmentModel: {},
      isHtml5Editor: false,
      isNewRecruitment: false,
      model: {},
      editing: false,
      title: '',
      baseUrl: ''
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
      this.updateRecruitmentInfo(key)
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
    log (a) {
      console.log(a);
    },
    getNum (a) {
      if (!a.total && a.total!==0) {
        request.request({
        url:this.baseUrl + 'applicant_according_to_recruitment/',
        method: 'post',
        data: {recruitmentId: a.id}
        }).then(res =>{
          const key = a.key
          this.data[key].total = res.data.total
          this.data[key].fail = res.data.fail
          this.data[key].filtering = res.data.filtering
          this.data[key].giveUp = res.data.giveUp
          this.data[key].done = res.data.done
          console.log(this.data[key]);
          const newData = [...this.data];
          this.data = newData;
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
      request.request({
      url:'http://139.9.160.24/update_recruitment_info/',
      method: 'post',
      data: {data: this.data[key]}
      }).then(res =>{
        console.log(res);
      }).catch(err =>{
        console.log(err);
      })
    },
    getRecruitmentInfo () {
      request.request({
      url:'http://139.9.160.24/get_recruitment_info/',
      method: 'post',
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
      this.recruitmentModel = this.data[key]
      console.log(this.recruitmentModel)
      this.isSelectRelatedId = true
    },
    startEditor (key, editing) {
      this.editing = editing
      this.isHtml5Editor = true
      this.model = this.data[key]
    },
    updateRequirements (childValue) {
      console.log(childValue);
      const key = childValue.model.key
      this.data[key].requirements = childValue.value
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
        this.isNewRecruitment = true
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
