<template>
    <div v-show="isSelectRelatedId">
      <div class="selectRecruitment">
        <el-scrollbar style="height:100%">
            <a-row :gutter="16"  style="margin: 20px" >
                <a-col :span="4">
                    <a-statistic v-if='department' title="部门" :value="department" groupSeparator="" class="demo-class"/>
                    <a-statistic v-else title="department" value="---" class="demo-class"/>
                </a-col>
                <a-col :span="4">
                    <a-statistic v-if='pdu' title="PDU" :value="pdu" groupSeparator="" class="demo-class"/>
                    <a-statistic v-else title="PDU" value="---" class="demo-class"/>
                </a-col>
                <a-col :span="4">
                    <a-statistic v-if='project_name' title="项目名称" :value="project_name" class="demo-class"/>
                    <a-statistic v-else title="项目名称" value="---" class="demo-class"/>
                </a-col>
            </a-row>
            <a-row :gutter="16"  style="margin: 20px" >
                <a-col :span="4">
                    <a-select placeholder="部门" style="width: 200px; position: absolute; top: 0; left: 0;" v-model="department2" class="typeChoice">
                        <template v-for="i in departmentList">
                            <a-select-option :key='i' :value="i">
                                {{i}}
                            </a-select-option>
                        </template>
                    </a-select>
                </a-col>
                <a-col :span="4">
                    <a-input placeholder="PDU" v-model="pdu_input" />
                </a-col>
                <a-col :span="4">
                    <a-input placeholder="项目名称" v-model="project_name_input" />
                </a-col>
                <a-col :span="4">
                    <a-button @click="selectProjectInfo">搜索</a-button>
                </a-col>
            </a-row>
            <el-table
                :data="tableData"
                style="width: 80%;
                margin-left: 20px;
                margin-top: 10px"
                max-height="400">
                <el-table-column
                prop="department"
                label="部门"
                width="120">
                </el-table-column>
                <el-table-column
                prop="pdu"
                label="PDU"
                width="120">
                </el-table-column>
                <el-table-column
                prop="name"
                label="项目名称"
                width="300">
                </el-table-column>
                <el-table-column
                prop="hwpm"
                label="华为pm"
                width="160">
                </el-table-column>
                <el-table-column
                prop="region"
                label="地域"
                width="120">
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作">
                <template slot-scope="scope">
                    <el-button
                    @click.native.prevent="deleteRow(scope.$index, tableData)"
                    type="text"
                    size="small">
                    选择
                    </el-button>
                </template>
                </el-table-column>
            </el-table>
            <a-button @click="confirm" class="confirmButtom">确认</a-button>
            <a-button @click="close" class="cancelButtom">取消</a-button>
        </el-scrollbar>
      </div>
    </div>
</template>

<script>
import * as request from "../../network/request"
export default {
    props: {
        isSelectRelatedId: {
            type: Boolean,
            default: false
        },
        model: {
            type: Object
        }
    },
    data() {
        return {
            department: '',
            baseUrl: '',
            related: '',
            pdu: '',
            project_name: '',
            tableData: [],
            departmentList: '',
            department2: undefined,
            pdu_input: undefined,
            project_name_input: undefined,
            filterData: undefined,
            confirmData: undefined
        };
    },
    methods: {
        close () {
            this.$emit('close')
        },
        confirm () {
            let modelKey 
            if (this.model) {
                modelKey = this.model.key
            }
            this.confirmData = {
                key: modelKey,
                department: this.department,
                pdu: this.pdu,
                project_name: this.project_name,
            }
            this.$emit('confirm', this.confirmData)
        },
        deleteRow(index, rows) { 
            this.department = rows[index].department
            this.pdu = rows[index].pdu
            this.project_name = rows[index].name
        },
        getProjectInfo () {
            request.request({
                url:'http://139.9.160.24/get_project_info/',
                method: 'post',
                data: {filterData: this.filterData}
            }).then(res =>{
                let a = res.data.infoList
                this.tableData.length = 0
                for (let i = 0; i < a.length; i++) {
                    this.tableData.push(a[i]);
                }
            }).catch(err =>{
                console.log(err);
            })
        },
        selectProjectInfo () {
            this.filterData = {
                name__icontains: this.project_name_input,
                pdu__icontains: this.pdu_input,
                department__icontains: this.department2,
            }
            this.getProjectInfo()
        },
        getDepartmentList () {
            request.request({
                url: this.baseUrl +'get_department_list/',
                method: 'post',
            }).then(res =>{
                console.log(res)
                this.departmentList = res.data.departmentList
            }).catch(err =>{
                console.log(err);
            })
        }
    },
    created() {
        this.baseUrl = this.getBaseUrl()
        this.getProjectInfo()
        this.getDepartmentList()
    },
    mounted() {
        if (this.model) {
            this.related = this.model.related
            this.pdu = this.model.pdu
            this.project_name = this.model.project_name
        }
    }
}
</script>

<style>
.selectRecruitment {
  width: 98%;
  height: 90%;
  position: fixed;
  background-color: #fff;
  z-index: 999;
  left: 1%;
  top: 5%;
  border-radius: 2%
}

.confirmButtom {
  position: absolute;
  right: 12%;
  bottom: 5%;
}

.cancelButtom {
  position: absolute;
  right: 5%;
  bottom: 5%;
}
</style>