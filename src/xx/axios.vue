<template>
  <div id="axions">

  </div>
</template>

<script>
import axios from 'axios'
import request from '../network/request'
import request2 from '../network/request'
import requests1 from '../network/request'
import requests from '../network/request'
axios.defaults.baseURL = ''
axios.defaults.timeout = 5000
const instance1 = axios.create({
    baseURL: '',
    timeout: 5000
})

export default {
    methods:{
        aa(){
            axios({
                url:'http://',
                method:'post',
                params:{
                    type:'test'
                }
            }).then(res => {
                console.log(res);
            })
        },
        bb(){
            instance1({
                url:'',
                method:'post',
                params:{
                    type:'test'
                }
            })
        },
        cc(){
            request({
                url:'',
                method:'post',
                params:{
                    type:'test'
                },
            },res => {
                console.log(res);
            },err => {
                console.log(err);
            })
        },
        dd(){
            request2({
                baseConfig:{
                    url:'',
                    method:'post',
                    params:{
                        type:'test'
                    },
                },
                success:res =>{
                    console.log(res);
                },
                failure:err =>{
                    console.log(err);
                }
            })
        },
        ee(){
            requests({
                url:'',
                method: 'post',
                params:{
                    type:'test'
                },
            }).then(res => {
                console.log(res);
            }).catch(err =>{
                console.log(err);
            })
        },
        ff(){
            requests({
                url:'',
                method:'post',
                params:{
                    type:'test'
                },
            }).then(res => {
                console.log(res);
            }).catch(err =>{
                console.log(err);
            })
        }
    }
}
</script>

<style>

</style>