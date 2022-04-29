<template>
  <a-form-model layout="inline" :model="formInline" @submit="handleSubmit" @submit.native.prevent>
    <a-form-model-item>
      <a-input v-model="formInline.user" placeholder="Username">
        <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-model-item>
    <a-form-model-item>
      <a-input v-model="formInline.password" type="password" placeholder="Password">
        <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-model-item>
    <a-form-model-item>
      <a-button
        type="primary"
        html-type="submit"
        :disabled="formInline.user === '' || formInline.password === ''"
      >
        Log in
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import * as request from "@/network/request"
export default {
  data() {
    return {
      formInline: {
        user: '',
        password: '',
        nickname: '',
        region: ''
      },
    };
  },
  methods: {
    handleSubmit() {
      console.log(this.formInline);
      request.request({
        url: this.getBaseUrl() + 'login/',
        method: 'post',
        data: {
          userInfo: {
            user_name: this.formInline.user + '10086',
            password: this.formInline.password + '12315'
          }
        }
      }).then(res =>{
        if (res.data.msg == 'pass'){
          console.log(res.data)
          this.$cookies.set("userName", this.formInline.user + '10086',60 * 60 * 1)
          this.$cookies.set("password", this.formInline.password + '12315',60 * 60 * 1)
          this.$cookies.set("nickname", res.data.nickname + '',60 * 60 * 1)
          this.$cookies.set("region", res.data.region + '',60 * 60 * 1)
          this.$cookies.set("level", res.data.level + '',60 * 60 * 1)
          console.log(this.$cookies.get("nickname"))
          this.$router.push('/home')
        } else {
          alert(res.data.msg)
        }
      }).catch(err =>{
        console.log(err);
      })
    },
  },
};
</script>
