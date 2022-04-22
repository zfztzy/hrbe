<template>
  <div>
    <div v-show="isBatchControl || isBatchControl2" @click="close" class="maskLayer"></div>
    <batch-input batchType='ProjectInfo' v-show="isBatchControl" @close='close'  class="newApplicant"></batch-input>
    <batch-output batchType='ProjectInfo' v-show="isBatchControl2"  @close='close' class="newApplicant"></batch-output>
    <common-table tableType='pdu_info' @save='updateProjectInfo' :newSwitch='newSwitch'></common-table>
  </div>
</template>

<script>
import * as request from "@/network/request"
import CommonTable from '@/components/CommonTable.vue'
import BatchInput from '@/components/batchControl/BatchInput.vue';
import BatchOutput from '@/components/batchControl/BatchOutput.vue';
export default {
  components: { CommonTable, BatchInput, BatchOutput },
  props:{
    newSwitch: {
      type: Number
    },
    BatchNum: {
      type: Number
    }
  },
  data () {
    return{
      isBatchControl: false,
      isBatchControl2: false,
    }
  },
  methods: {
    updateProjectInfo2 (reqData) {
      request.request({
      url: this.getBaseUrl() + 'update_project_info/',
      method: 'post',
      data: {data: reqData}
      }).then(res =>{
        console.log(res);
      }).catch(err =>{
        console.log(err);
      })
    },
    updateProjectInfo (childValue,childValue2) {
      for (let index = 0; index < childValue.length; index++) {
        const element = childValue[index];
        if (element.key === childValue2) {
          this.updateProjectInfo2(element)
        }
      }
    },
    close () {
      this.isBatchControl = false
      this.isBatchControl2 = false
    },
  },
  watch: {
    BatchNum: {
      handler: function (newValue, oldValue) {
        console.log(newValue)
        console.log(oldValue)
        if (newValue > oldValue){
          this.isBatchControl = true
        }
        if (oldValue > newValue){
          this.isBatchControl2 = true
        }
      }
    }
  }
}
</script>

<style>

.maskLayer {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 998;
  background:rgba(0, 0, 0, 0.4);
  filter:alpha(opacity=60);  /*设置透明度为60%*/
  opacity:0.6;  /*非IE浏览器下设置透明度为60%*/
}

.newApplicant {
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