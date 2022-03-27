<template>
  <div class="clearfix">
     <a-select placeholder="选择导入表格类型" style="width: 400px" @change="handleChange" class="typeChoice">
      <a-select-option value="ApplicantInfo">
        候选人管理
      </a-select-option>
      <a-select-option value="ProjectInfo">
        项目信息
      </a-select-option>
      <a-select-option value="ProjectStatusInfo">
        项目满足度
      </a-select-option>
      <a-select-option value="RecruitmentInfo">
        招聘需求
      </a-select-option>
    </a-select>
    <div class="fileDownload">
      <p v-if="isDisabled" style="color:red;">请选择下载模版</p>
      <a-button :disabled="isDisabled" @click="downloadModel">下载{{fileName}}</a-button>
    </div>
    <a-upload :fileList="fileList" :remove="handleRemove" :beforeUpload="beforeUpload" class="fileChoice">
      <a-button> <a-icon type="upload" /> 选择导入文件 </a-button>
    </a-upload>
    <a-button
      type="primary"
      @click="handleUpload"
      :disabled="fileList.length === 0"
      :loading="uploading"
      style="
        position: absolute;
        bottom: 50px;
        right: 50px;"
    >
      {{ uploading ? 'Uploading' : 'Start Upload' }}
    </a-button>
  </div>
</template>
<script>
import * as request from "../../network/request"
// import axios from 'axios'
// import reqwest from 'reqwest';
export default {
  data() {
    return {
      fileList: [],
      uploading: false,
      excelType: 'ApplicantInfo',
      fileName: '',
      filePath:'http://139.9.160.24/static/model/',
      isDisabled: true
    };
  },
  methods: {
    handleChange(value) {
      this.isDisabled = false
      this.excelType = `${value}`;
      if (value === 'ApplicantInfo') {
        this.fileName = '候选人模版.xlsx'
      } else if (value === 'ProjectInfo') {
        this.fileName = '项目信息模版.xlsx'        
      } else if (value === 'ProjectStatusInfo') {
        this.fileName = '项目满足度模版.xlsx'        
      } else if (value === 'RecruitmentInfo') {
        this.fileName = '招聘需求模版.xlsx'        
      }
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    beforeUpload(file) {
      this.fileList = [...this.fileList, file];
      return false;
    },
    handleUpload() {
      console.log(this);
      // const { fileList } = this;
      const formData = new FormData();
      formData.append('file',this.fileList[0]);
      formData.append('type',this.excelType);
      this.uploading = true;
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      console.log(config);
      // axios.post("http://139.9.160.24/save_excel/", formData, config);
      request.request({
      url:'http://139.9.160.24/save_excel/',
      method: 'post',
      data: formData,
      headers: { "Content-Type": "multipart/form-data" }
      }).then(res =>{
        console.log(res);
        alert(res.data.msg)
        this.uploading = false;
      }).catch(err =>{
        console.log(err);
      })
    },
    downloadModel(){
      window.open(this.filePath + this.fileName)
    }
  },
};
</script>

<style>

.bottomUpload{
    position: absolute;
    bottom: 50px;
    right: 50px;
}

.fileChoice{
    position: absolute;
    top: 275px;
    left: 50px;
}

.fileDownload{
    position: absolute;
    top: 150px;
    left: 50px;
}

.typeChoice{
    position: absolute;
    top: 50px;
    left: 50px;
}

</style>