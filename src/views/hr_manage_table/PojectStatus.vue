<template>
  <div>
    <a-button class="newApplicantBut" @click="editApplicant">newApplicant</a-button>
    <a-button class="newApplicantBut" @click="log">log</a-button>
    <div v-show="isNewApplicant">
      <div class="newApplicantBackGround"></div>
      <div class="newApplicant">
        <a-input v-model="userName" placeholder="姓名" style="margin:20px; width: 400px">
          <a-icon slot="prefix" type="user" />
          <a-tooltip slot="suffix" title="Extra information">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
        <a-input v-model="userName" placeholder="电话" style="margin:20px; width: 400px">
          <a-icon slot="prefix" type="mobile" />
          <a-tooltip slot="suffix" title="Extra information">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
        <a-input v-model="userName" placeholder="毕业院校" style="margin:20px; width: 400px">
          <a-icon slot="prefix" type="book" />
          <a-tooltip slot="suffix" title="Extra information">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
        <a-input v-model="userName" placeholder="学历" style="margin:20px; width: 400px">
          <a-icon slot="prefix" type="idcard" />
          <a-tooltip slot="suffix" title="Extra information">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
        <a-input v-model="userName" placeholder="专业" style="margin:20px; width: 400px">
          <a-icon slot="prefix" type="tag" />
          <a-tooltip slot="suffix" title="Extra information">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
        <a-input v-model="userName" placeholder="工作年限" style="margin:20px; width: 400px">
          <a-icon slot="prefix" type="calendar" />
          <a-tooltip slot="suffix" title="Extra information">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
        <a-input v-model="userName" placeholder="面试岗位" style="margin:20px; width: 400px">
          <a-icon slot="prefix" type="read" />
          <a-tooltip slot="suffix" title="Extra information">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
        <a-input v-model="userName" placeholder="地域" style="margin:20px; width: 400px">
          <a-icon slot="prefix" type="environment" />
          <a-tooltip slot="suffix" title="Extra information">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
        <a-input v-model="userName" placeholder="关联需求" style="margin:20px; width: 400px">
          <a-icon slot="prefix" type="database" />
          <a-tooltip slot="suffix" title="Extra information">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
        <a-button @click="editApplicant" style="float: right; margin: 50px;">Cancel</a-button>
        <a-button @click="editApplicant" style="float: right; margin-left: 50px; margin-top: 50px; margin-bottom: 50px;">Create</a-button>
      </div>
    </div>
    <a-table :columns="columns" :data-source="data" bordered  :scroll="{ x: 1500, y: 300 }">
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
        v-for="col in ['date', 'department', 'pdu', 'project', 
        'region', 'sow_num', 'project_num', 'new_project_num', 
        'offset_num', 'monthly_target', 'urgency', 'mouthly_reach',
        'project_satisfaction', 'project_num_all', 'remarks', 'mouthly_target_reach']"
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
            <a :disabled="editingKey !== ''" @click="() => edit(record.key)">Edit</a>
          </span>
        </div>
      </template>
    </a-table>
  </div>
</template>
<script>
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
    dataIndex: 'mouthly_reach',
    width: 150,
    scopedSlots: { customRender: 'mouthly_reach' },
  },
  {
    title: '目标达成',
    dataIndex: 'mouthly_target_reach',
    width: 150,
    scopedSlots: { customRender: 'mouthly_target_reach' },
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
import * as request from "../../network/request"
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
      request.request({
      url:'http://139.9.160.24/update_project_status/',
      method: 'post',
      data: {data: this.data[key]}
      }).then(res =>{
        console.log(res);
      }).catch(err =>{
        console.log(err);
      })
    },
    getProjectStatusInfo () {
      request.request({
      url:'http://139.9.160.24/get_project_status_info/',
      method: 'post',
      }).then(res =>{
        let a = res.data.infoList
        this.data.length = 0
        for (let i = 0; i < a.length; i++) {
          console.log(a[i]);
          this.data.push(a[i]);
        }
        this.cacheData = data.map(item => ({ ...item }));
      }).catch(err =>{
        console.log(err);
      })
    }
  },
  created () {
    this.getProjectStatusInfo()
  }
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}

.newApplicantBackGround {
  width: 100%;
  height: 100%;
  position: absolute;
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
</style>
