<template>
  <div>
    <a-button class="tableButton" @click="showModal" >新增</a-button>
		<el-dialog title="新增" :visible.sync="visible" :destroy-on-close='destroy'>
			<el-scrollbar style="height:300px">
				<a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
					<a-form-model-item label="日期">
						<a-input v-model="form.date"/>
					</a-form-model-item>
					<a-form-model-item label="部门">
						<a-input v-model="form.department"/>
					</a-form-model-item>
					<a-form-model-item label="PDU">
						<a-input v-model="form.pdu"/>
					</a-form-model-item>
					<a-form-model-item label="PO">
						<a-input v-model="form.po_num"/>
					</a-form-model-item>
					<a-form-model-item label="项目">
						<a-input v-model="form.project"/>
					</a-form-model-item>
					<a-form-model-item label="地域">
						<a-input v-model="form.region"/>
					</a-form-model-item>
					<a-form-model-item label="sow人力">
						<a-input v-model="form.sow_num"/>
					</a-form-model-item>
					<a-form-model-item label="当前项目组人数">
						<a-input v-model="form.project_num"/>
					</a-form-model-item>
				</a-form-model>
			</el-scrollbar>
			<div slot="footer" class="dialog-footer">
				<a-button @click="hideModal" style="margin-right:15px">取 消</a-button>
				<a-button type="primary" @click="onSubmit">确 定</a-button>
			</div>
		</el-dialog>
  </div>
</template>
<script>
import * as request from "@/network/request"
export default {
  data() {
    return {
			visible: false,
			labelCol: { span: 4 },
			wrapperCol: { span: 14 },
			destroy:true,
			form: {
				date: '',
				department: '',
				pdu: '',
				po_num: '',
				project: '',
				region: '',
				sow_num: '',
				project_num: ''
			},
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    hideModal() {
      this.visible = false;
		},
    onSubmit() {
			console.log('submit!', this.form);
			request.request({
      url: this.getBaseUrl() + 'create_project_status/',
      method: 'post',
      data: {data: this.form}
      }).then(res =>{
				if (res.data.data === "新增成功") {
					alert("新增成功")
					this.hideModal()
				} else {
					alert(res.data.data)
				}
      }).catch(err =>{
        console.log(err);
      })
    }
  },
};
</script>
