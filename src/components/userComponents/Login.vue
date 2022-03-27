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
      },
    };
  },
  methods: {
    handleSubmit() {
      console.log(this.formInline);
      request.request({
        url:'http://139.9.160.24/login/',
        method: 'post',
        data: {
          userInfo: {
            user_name: this.formInline.user + '10086',
            password: this.formInline.password + '12315'
          }
        }
      }).then(res =>{
        if (res.data.msg == 'pass'){
          this.$cookies.set("userName", this.formInline.user + '10086',60 * 60 * 1) //return this
          this.$cookies.set("password", this.formInline.password + '12315',60 * 60 * 1) //return this
          this.$router.push('/hrManageTable')
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
