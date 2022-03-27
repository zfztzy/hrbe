<template>
    <div v-show="isSelectApplicant">
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
        <a-input v-model="entrance" placeholder="入学时间" style="margin:20px; width: 400px">
          <a-icon slot="prefix" type="calendar" />
          <a-tooltip slot="suffix" title="Extra information">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
        <a-input v-model="graduation" placeholder="毕业时间" style="margin:20px; width: 400px">
          <a-icon slot="prefix" type="calendar" />
          <a-tooltip slot="suffix" title="Extra information">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
        <a-input v-model="job" placeholder="面试岗位" style="margin:20px; width: 400px">
          <a-icon slot="prefix" type="read" />
          <a-tooltip slot="suffix" title="Extra information">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
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
        <a-button @click="close" style="float: right; margin: 50px;">Cancel</a-button>
        <a-button @click="createNewApplicant" style="float: right; margin-left: 50px; margin-top: 50px; margin-bottom: 50px;">Create</a-button>
      </div>
    </div>
</template>

<script>
import * as request from "@/network/request"
export default {
    props: {
        isSelectApplicant: {
            type: Boolean,
            default: false
        },
        id: {
            type: String
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
        job: undefined
        };
    },
    methods: {
        close () {
            this.$emit('close')
        },
        createNewApplicant () {
            if (this.userName !== undefined && this.recommender !== undefined && this.region !== undefined 
            && this.sex !== undefined && this.education !== undefined && this.entrance !== undefined 
            && this.graduation !== undefined && this.graduated_from !== undefined && this.major !== undefined 
            && this.phone_num !== undefined && this.job !== undefined){
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
                    entrance: this.entrance,
                    graduation: this.graduation,
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
        }
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
</style>