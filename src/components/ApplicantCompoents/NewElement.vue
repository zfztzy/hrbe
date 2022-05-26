<template>
    <div v-show="isNewApplicant">
      <div class="newApplicant">
        <a-date-picker placeholder="推荐时间" style="margin:20px; width: 400px" v-model="recommend_time"/>
        <a-input v-model="recommender" placeholder="招聘顾问" style="margin:20px; width: 400px">
          <a-tooltip slot="suffix" title="招聘顾问">
            <a-icon type="user" style="color: rgba(0,0,0,.25)"/>
          </a-tooltip>
        </a-input>
        <a-input v-model="userName" placeholder="姓名" style="margin:20px; width: 400px">
          <a-tooltip slot="suffix" title="姓名">
            <a-icon type="smile" style="color: rgba(0,0,0,.25)"/>
          </a-tooltip>
        </a-input>
        <a-input v-model="phone_num" placeholder="电话" style="margin:20px; width: 400px">
          <a-tooltip slot="suffix" title="电话">
            <a-icon type="mobile" style="color: rgba(0,0,0,.25)"/>
          </a-tooltip>
        </a-input>
        <a-input v-model="sex" placeholder="性别" style="margin:20px; width: 400px">
          <a-tooltip slot="suffix" title="性别">
          <a-icon type="man" style="color: rgba(0,0,0,.25)"/>
          <a-icon type="woman" style="margin-left: -24px; color: rgba(0,0,0,.25)"/>
          </a-tooltip>
        </a-input>
        <a-input v-model="education" placeholder="学历" style="margin:20px; width: 400px">
          <a-tooltip slot="suffix" title="Extra information">
            <a-icon type="idcard" style="color: rgba(0,0,0,.25)"/>
          </a-tooltip>
        </a-input>
        <a-input v-model="graduated_from" placeholder="毕业院校" style="margin:20px; width: 400px">
          <a-tooltip slot="suffix" title="毕业院校">
            <a-icon type="book" style="color: rgba(0,0,0,.25)"/>
          </a-tooltip>
        </a-input>
        <a-input v-model="major" placeholder="专业" style="margin:20px; width: 400px">
          <a-tooltip slot="suffix" title="专业">
            <a-icon type="tag" style="color: rgba(0,0,0,.25)"/>
          </a-tooltip>
        </a-input>
        <a-date-picker placeholder="毕业时间" style="margin:20px; width: 400px" v-model="graduation"/>
        <a-input v-model="working_seniority" placeholder="工作年限" style="margin:20px; width: 400px">
          <a-tooltip slot="suffix" title="工作年限">
            <a-icon type="solution" style="color: rgba(0,0,0,.25)"/>
          </a-tooltip>
        </a-input>
        <a-input v-model="job" placeholder="面试岗位" style="margin:20px; width: 400px">
          <a-tooltip slot="suffix" title="面试岗位">
            <a-icon type="code" style="color: rgba(0,0,0,.25)"/>
          </a-tooltip>
        </a-input>
        <a-input v-model="onjob" placeholder="在/离职状态" style="margin:20px; width: 400px">
          <a-tooltip slot="suffix" title="在/离职状态">
            <a-icon type="contacts" style="color: rgba(0,0,0,.25)"/>
          </a-tooltip>
        </a-input>
        <a-input v-model="interviews" placeholder="期望面试时间及方式" style="margin:20px; width: 400px">
          <a-tooltip slot="suffix" title="期望面试时间及方式">
            <a-icon type="schedule" style="color: rgba(0,0,0,.25)"/>
          </a-tooltip>
        </a-input>
        <a-input v-model="region" placeholder="意向地" style="margin:20px; width: 400px">
          <a-tooltip slot="suffix" title="意向地">
            <a-icon type="environment" style="color: rgba(0,0,0,.25)"/>
          </a-tooltip>
        </a-input>
        <a-input v-model="reason1" placeholder="HR沟通记录" style="margin:20px; width: 400px">
          <a-tooltip slot="suffix" title="HR沟通记录">
            <a-icon type="profile" style="color: rgba(0,0,0,.25)"/>
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
      reason1: undefined,
      sex: undefined,
      education: undefined,
      recommend_time: undefined,
      graduation: undefined,
      graduated_from: undefined,
      major: undefined,
      interviews: undefined,
      onjob: undefined,
      working_seniority: undefined
    }
  },
  methods: {
    close () {
        this.$emit('close')
    },
    createNewApplicant () {
      if (this.userName !== undefined && this.recommender !== undefined && this.region !== undefined
      && this.sex !== undefined && this.education !== undefined && this.recommend_time !== undefined 
      && this.graduation !== undefined && this.graduated_from !== undefined && this.major !== undefined 
      && this.phone_num !== undefined && this.reason1 !== undefined && this.interviews !== undefined 
      && this.onjob !== undefined && this.working_seniority !== undefined && this.reason1 !== undefined 
      && this.reason1 !== undefined ){
        request.request({
        url: this.getBaseUrl() + 'create_applicant_info/',
        method: 'post',
        data: {
          data: {
            name: this.userName,
            recommender: this.recommender,
            region: this.region,
            reason1:this.reason1,
            interviews:this.interviews,
            onjob:this.onjob,
            working_seniority:this.working_seniority,
            sex: this.sex,
            education: this.education,
            recommend_time: this.recommend_time.format('YYYY-MM-DD'),
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
          this.reason1 = undefined
          this.interviews = undefined
          this.onjob = undefined
          this.working_seniority = undefined
          this.sex = undefined
          this.education = undefined
          this.recommend_time = undefined
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
  width: 100%;
  height: 70%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: #fff;
  z-index: 999;
  /* left: 15%; */
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