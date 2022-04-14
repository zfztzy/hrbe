<template>
    <div v-show="isSelectRelatedId">
      <div class="selectRecruitment">
        <el-scrollbar style="height:100%">
            <a-row :gutter="16"  style="margin: 20px" >
                <a-col :span="4">
                    <a-statistic v-if='related' title="需求ID" groupSeparator="" :value="related" style="margin-right: 50px"/>
                    <a-statistic v-else title="需求ID" value="---" class="demo-class"/>
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
                    <a-select placeholder="部门" style="width: 200px; position: absolute; top: 0; left: 0;" v-model="department" class="typeChoice">
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
                    <a-button @click="selectRecruitmentInfo">搜索</a-button>
                </a-col>
            </a-row>
            <el-table
                :data="tableData"
                style="width: 80%;
                margin-left: 20px;
                margin-top: 10px"
                max-height="400">
                <el-table-column
                prop="key"
                label="项目ID"
                width="120">
                </el-table-column>
                <el-table-column
                prop="pdu"
                label="PDU"
                width="120">
                </el-table-column>
                <el-table-column
                prop="project"
                label="项目名称"
                width="300">
                </el-table-column>
                <el-table-column
                prop="skill_keyword"
                label="关键字">
                </el-table-column>
                <el-table-column
                prop="region"
                label="地域"
                width="120">
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
                width="120">
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
            baseUrl: '',
            related: '',
            pdu: '',
            project_name: '',
            tableData: [],
            departmentList: '',
            department: undefined,
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
            console.log(this.model);
            this.confirmData = {
                key: this.model.key,
                related: this.related,
                pdu: this.pdu,
                project_name: this.project_name,
            }
            this.$emit('confirm', this.confirmData)
        },
        deleteRow(index, rows) { 
            this.related = rows[index].key
            this.pdu = rows[index].pdu
            this.project_name = rows[index].project
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
                this.tableData.length = 0
                for (let i = 0; i < a.length; i++) {
                    console.log(a[i]);
                    this.tableData.push(a[i]);
                }
            }).catch(err =>{
                console.log(err);
            })
        },
        selectRecruitmentInfo () {
            this.filterData = {
                project__icontains: this.project_name_input,
                pdu__icontains: this.pdu_input,
                department__icontains: this.department,
            }
            this.getRecruitmentInfo()
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
        this.getRecruitmentInfo()
        this.getDepartmentList()
    },
    mounted() {
        this.related = this.model.related
        this.pdu = this.model.pdu
        this.project_name = this.model.project_name
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