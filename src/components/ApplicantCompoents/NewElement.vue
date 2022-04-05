<template>
    <div v-show="isNewApplicant">
      <div class="newApplicant">
        <a-input v-model="userName" placeholder="姓名" style="margin:20px; width: 400px">
          <a-icon slot="prefix" type="user" />
          <a-tooltip slot="suffix" title="Extra information">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
        <a-input v-model="recommender" placeholder="招聘顾问" style="margin:20px; width: 400px">
          <a-icon slot="prefix" type="user" />
          <a-tooltip slot="suffix" title="Extra information">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
        <a-input v-model="phone_num" placeholder="电话" style="margin:20px; width: 400px">
          <a-icon slot="prefix" type="mobile" />
          <a-tooltip slot="suffix" title="Extra information">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
        <a-input v-model="graduated_from" placeholder="毕业院校" style="margin:20px; width: 400px">
          <a-icon slot="prefix" type="book" />
          <a-tooltip slot="suffix" title="Extra information">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
        <a-input v-model="education" placeholder="学历" style="margin:20px; width: 400px">
          <a-icon slot="prefix" type="idcard" />
          <a-tooltip slot="suffix" title="Extra information">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
        <a-input v-model="major" placeholder="专业" style="margin:20px; width: 400px">
          <a-icon slot="prefix" type="tag" />
          <a-tooltip slot="suffix" title="Extra information">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
        <a-date-picker placeholder="入学时间" style="margin:20px; width: 400px" v-model="entrance"/>
        <a-date-picker placeholder="毕业时间" style="margin:20px; width: 400px" v-model="graduation"/>
        <a-input v-model="region" placeholder="地域" style="margin:20px; width: 400px">
          <a-icon slot="prefix" type="environment" />
          <a-tooltip slot="suffix" title="Extra information">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
        <a-input v-model="sex" placeholder="性别" style="margin:20px; width: 400px">
          <a-icon slot="prefix" type="man" />
          <a-icon slot="prefix" type="woman" style="margin-left: -24px;"/>
          <a-tooltip slot="suffix" title="Extra information">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
        <a-button @click="close" class="newElementCencal">取消</a-button>
        <a-button @click="createNewApplicant" class="newElementNew">新建</a-button>
      </div>
    </div>
</template>

<script>
import * as request from "@/network/request"
export default {
  props: {
    isNewApplicant: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
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
    }
  },
  methods: {
    close () {
        this.$emit('close')
    },
    createNewApplicant () {
      if (this.userName !== undefined && this.recommender !== undefined && this.region !== undefined 
      && this.sex !== undefined && this.education !== undefined && this.entrance !== undefined 
      && this.graduation !== undefined && this.graduated_from !== undefined && this.major !== undefined 
      && this.phone_num !== undefined){
        request.request({
        url:'http://139.9.160.24/create_applicant_info/',
        method: 'post',
        data: {
          data: {
            name: this.userName,
            recommender: this.recommender,
            region: this.region,
            sex: this.sex,
            education: this.education,
            entrance: this.entrance.format('YYYY-MM-DD'),
            graduation: this.graduation.format('YYYY-MM-DD'),
            graduated_from: this.graduated_from,
            major: this.major,
            phone_num: this.phone_num,
            job: this.job,
          }
        }
        }).then(res =>{
          console.log(res)
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
    onChange(date, dateString) {
      console.log(date, dateString)
      console.log(this.graduation.format('YYYY-MM-DD'))
    },
  }
}
</script>

<style>
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
</style>