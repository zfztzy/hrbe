<template>
  <div>
    <h3 style="margin: 20px;">{{batchTypeName}}-已生成导出文件</h3>
    <el-table
      :data="fileList"
      style="width: 80%
      margin-top:10px;
      margin-left:20px"
      max-height="270">
      <el-table-column
        fixed
        prop="name"
        label="文件名称"
        width='500px'>
      </el-table-column>
      <el-table-column
        fixed
        prop="msg"
        label="大小"
        width='300px'>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="downLoad(scope.$index, fileList)"
            type="text"
            size="small">
            下载
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <a-button class="batchOutButtom" @click="newDownloadExcel">导出新文件</a-button>
    <a-button class="batchOutCancel" @click="close">取消</a-button>
  </div>
</template>
<script>
import * as request from "../../network/request"
// import axios from 'axios'
// import reqwest from 'reqwest';
export default {
  props: {
    batchType: {
      type: String
    }
  },
  data() {
    return {
      fileList: [],
      batchTypeName: ''
    };
  },
  methods: {
    getFileList() {
      console.log(this);
      request.request({
      url: this.getBaseUrl() + 'get_file_list/',
      method: 'post',
      data: {batchType: this.batchType},
      headers: { "Content-Type": "multipart/form-data" }
      }).then(res =>{
        this.fileList = res.data.fileList
      }).catch(err =>{
        console.log(err);
      })
    },
    newDownloadExcel() {
      console.log(this);
      request.request({
      url: this.getBaseUrl() + 'new_download_excel/',
      method: 'post',
      data: {batchType: this.batchType},
      headers: { "Content-Type": "multipart/form-data" }
      }).then(res =>{
        this.fileList.unshift(res.data.fileInfo)
      }).catch(err =>{
        console.log(err);
      })
    },
    downLoad(index, rows) {
      window.open(this.baseUrl + rows[index].path)
    },
    close() {
     this.$emit('close')
    },
    handleChange(value) {
      if (value === 'ApplicantInfo') {
        this.batchTypeName = '候选人'
      } else if (value === 'ProjectInfo') {  
        this.batchTypeName = '项目信息'    
      } else if (value === 'ProjectStatusInfo') {
        this.batchTypeName = '项目满足度'      
      } else if (value === 'RecruitmentInfo') {
        this.batchTypeName = '招聘需求'      
      }
    },
  },
  created () {
    this.baseUrl = this.getBaseUrl()
    this.getFileList()
    this.handleChange(this.batchType)
  }
};
</script>

<style>
.batchOutButtom {
  position: absolute;
  bottom: 30px;
  right: 170px;
}

.batchOutCancel {
  position: absolute;
  bottom: 30px;
  right: 60px;
}

</style>