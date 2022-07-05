<template>
  <a-table v-if="columns" :columns="columns" :data-source="data" bordered :pagination="{ pageSize: 15 }"  :scroll="{ x: 1500, y: 400 }">
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
      v-for="col in colList"
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
</template>
<script>
const data = [];
import * as request from "@/network/request"
export default {
  props: {
    tableType: {
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
      columns: undefined,
      editingKey: '',
      colList:[],
      isNewing: false
    };
  },
  methods: {
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.find(item => key === item.key);
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    edit(key) {
      const newData = [...this.data];
      const target = newData.find(item => key === item.key);
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    save(key) {
      const newData = [...this.data];
      const newCacheData = [...this.cacheData];
      const target = newData.find(item => key === item.key);
      const targetCache = newCacheData.find(item => key === item.key);
      if (target && targetCache) {
        delete target.editable;
        this.data = newData;
        Object.assign(targetCache, target);
        this.cacheData = newCacheData;
      }
      this.$emit('save', newData, this.editingKey)
      this.editingKey = '';
      this.cacheData = this.data.map(item => ({ ...item }));
      if(this.isNewing){
            this.createCommon()
        }else{
          this.updateCommon(key)
        }
      
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.find(item => key === item.key);
      this.editingKey = '';
      if (target) {
        Object.assign(target, this.cacheData.find(item => key === item.key));
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
    getColumns () {
      request.request({
      url: this.getBaseUrl() + 'get_columns/',
      method: 'post',
      data: {tableType: this.tableType}
      }).then(res =>{
        this.columns = res.data.columns;
        this.columns.forEach(element => {
          try {
            if (element.scopedSlots.filterIcon === 'filterIcon'){
              element.onFilter = (value, record) =>
                record[element.dataIndex]
                  .toString()
                  .toLowerCase()
                  .includes(value.toLowerCase())
              element.onFilterDropdownVisibleChange =  visible => {
                if (visible) {
                  setTimeout(() => {
                    this.searchInput.focus();
                  }, 0)
                }
              }
              console.log(element);
            }
          } catch (error) {
            console.log(error)
          }
          this.colList.push(element.dataIndex)
        });
        console.log(this.colList);
      }).catch(err =>{
        console.log(err);
      })
    },
    getData () {
      request.request({
      url: this.getBaseUrl() + 'get_common_data/',
      method: 'post',
      data: {
        tableType: this.tableType,
        filterRegion: this.$cookies.get("region"),
        filterNickname: this.$cookies.get("nickname")
        
      }
      }).then(res =>{
        this.data = res.data.tableData;
        this.cacheData = this.data.map(item => ({ ...item }));
      }).catch(err =>{
        console.log(err);
      })
    },
    handleSearch(selectedKeys, confirm, dataIndex) {
      confirm();
      this.searchText = selectedKeys[0];
      this.searchedColumn = dataIndex;
    },
    handleReset(clearFilters) {
      clearFilters();
      this.searchText = '';
    },
    updateCommon(key){
      for (const i of this.data) {
        if (i.key===key) {
          request.request({
          url: this.getBaseUrl() + 'update_common_info/',
          method: 'post',
          data: {
            tableType: this.tableType,
            data: i
            }
          }).then(res =>{
            // console.log(res);
            if(res.data.status === true){
                console.log(res);
                //alert("保存ok")
            }else{
              alert("保存失败，"+ res.data.msg)
            }
          }).catch(err =>{
            alert(err)
            console.log(err);
          })
        }
      }
    },
    createCommon(){
      request.request({
      url: this.getBaseUrl() + 'create_common_info/',
      method: 'post',
      data: {
        tableType: this.tableType,
        data: this.data[0]
        }
      }).then(res =>{
       if(res.data.status === true){
                console.log(res);
                // alert("保存ok")
        }else{
              alert("保存失败，"+ res.data.msg)
        }
      }).catch(err =>{
        console.log(err);
      })
    }
  },
  created () {
    this.getColumns()
    this.getData()
  },
  handleSearch(selectedKeys, confirm, dataIndex) {
      confirm();
      this.searchText = selectedKeys[0];
      this.searchedColumn = dataIndex;
    },
  handleReset(clearFilters) {
    clearFilters();
    this.searchText = '';
  },
  watch: {
    newSwitch:{
      handler () {
        this.isNewing = true
        for (let index = 0; index < this.data.length; index++) {
          this.data[index].key += 1;
        }
        this.data.unshift({
          key: 0,
        });
        this.cacheData = this.data.map(item => ({ ...item }));
        const newData = [...this.data];
        const target = newData.find(item => 0 === item.key);
        this.editingKey = 0;
        if (target) {
          target.editable = true;
          this.data = newData;
        }
      }
    },
  }
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
