<template>
    <div v-show="isNewRecruitment">
    <html-5-editor @confirm='updateRequirements' :model="requirements" v-show="isHtml5Editor" @close='close2' :editType='true'  class="editor2"></html-5-editor>
    <select-project-info :isSelectRelatedId='isSelectRelatedId' @close='close2' @confirm='relatedConfirm'></select-project-info>
      <div class="newRecruitment">
        <a-input v-model="department" placeholder="部门" style="margin:20px; width: 400px" @click="selectProject">
          <a-tooltip slot="suffix" title="Extra information">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
        <a-input v-model="pdu" placeholder="PDU" style="margin:20px; width: 400px" @click="selectProject">
          <a-tooltip slot="suffix" title="Extra information">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
        <a-input v-model="project" placeholder="项目" style="margin:20px; width: 400px" @click="selectProject">
          <a-tooltip slot="suffix" title="Extra information">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
        <a-input v-model="position_attribute" placeholder="岗位方向" style="margin:20px; width: 400px">
          <a-tooltip slot="suffix" title="Extra information">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
        <a-input v-model="region" placeholder="地域" style="margin:20px; width: 400px">
          <a-tooltip slot="suffix" title="Extra information">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
        <a-input v-model="requirements" placeholder="岗位要求" style="margin:20px; width: 400px" @click="startEditor">
          <a-tooltip slot="suffix" title="Extra information">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
        <a-input v-model="working_seniority" placeholder="年限" style="margin:20px; width: 400px">
          <a-tooltip slot="suffix" title="Extra information">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
        <a-input v-model="proposer" placeholder="提出人" style="margin:20px; width: 400px">
          <a-tooltip slot="suffix" title="Extra information">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
        <a-input v-model="num" placeholder="人数" style="margin:20px; width: 400px">
          <a-tooltip slot="suffix" title="Extra information">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
        <a-input v-model="recruiter" placeholder="招聘助理" style="margin:20px; width: 400px">
          <a-tooltip slot="suffix" title="Extra information">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
        <a-button @click="close" class="newElementCencal">取消</a-button>
        <a-button @click="createRecruitment" class="newElementNew">新建</a-button>
      </div>
    </div>
</template>

<script>
import * as request from "@/network/request"
import SelectProjectInfo from '@/components/recruitmentCompoment/SelectProjectInfo.vue';
import Html5Editor from '@/components/Html5Editor.vue';
export default {
  components: { SelectProjectInfo, Html5Editor },
  props: {
    isNewRecruitment: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      department: undefined,
      pdu: undefined,
      project: undefined,
      position_attribute: undefined,
      region: undefined,
      requirements: undefined,
      working_seniority: undefined,
      proposer: undefined,
      num: undefined,
      recruiter: undefined,
      isSelectRelatedId: false,
      isHtml5Editor: false
    }
  },
  methods: {
    close () {
        this.$emit('close')
    },
    createRecruitment () {
      if (this.position_attribute !== undefined && this.region !== undefined && this.requirements !== undefined 
      && this.working_seniority !== undefined && this.proposer !== undefined && this.num !== undefined 
      && this.recruiter !== undefined && this.department !== undefined && this.pdu !== undefined 
      && this.project !== undefined){
        request.request({
        url:'http://139.9.160.24/create_recruitment_info/',
        method: 'post',
        data: {
          data: {
            department: this.department,
            pdu: this.pdu,
            project: this.project,
            position_attribute: this.position_attribute,
            region: this.region,
            requirements: this.requirements,
            sex: this.sex,
            working_seniority: this.working_seniority,
            proposer: this.proposer,
            num: this.num,
            recruiter: this.recruiter
          }
        }
        }).then(res =>{
        alert(res.data.msg)
          this.userName = undefined
          this.recommender = undefined
          this.region = undefined
          this.sex = undefined
          this.education = undefined
          this.entrance = undefined
          this.graduation = undefined
          this.graduated_from = undefined
          this.major = undefined
          this.phone_num = undefined
          this.job = undefined
          this.close()
        }).catch(err =>{
          console.log(err);
        alert(err)
          this.close()
        })
      } else {
          alert('必选项没填完')
      }
    },
    selectProject () {
      this.isSelectRelatedId = true
    },
    startEditor () {
      this.isHtml5Editor = true
      this.requirements = ''
    },
    close2 () {
      this.isSelectRelatedId = false
      this.isHtml5Editor = false
    },
    relatedConfirm (childValue) {
      this.close2()
      this.department = childValue.department
      this.pdu = childValue.pdu
      this.project = childValue.project_name
    },
    updateRequirements (childValue) {
      this.requirements = childValue.value
    }
  }
}
</script>

<style>
.newRecruitment {
  width: 70%;
  height: 70%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: #fff;
  z-index: 109;
  left: 15%;
  top: 15%;
  border-radius: 2%
}


.newElementCencal{
  position: absolute;
  bottom: 30px;
  right: 80px;
}

.newElementNew{
  position: absolute;
  bottom: 30px;
  right: 170px;
}

.editor2 {
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
</style>