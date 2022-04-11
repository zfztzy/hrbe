<template>
    <a-popover :title="'总数:' + record.total">
    <template #content>
        <p>已入职:{{record.done}}</p>
        <p>流程中:{{record.filtering}}</p>
        <p>不通过:{{record.fail}}</p>
        <p>拒绝:{{record.giveUp}}</p>
    </template>
    {{ text }}
    </a-popover>
</template>

<script>
import * as request from "@/network/request"
export default {
    props: {
        recruitmentId: {
            type: String
        },
        text : {
            type: String
        }
    },
    data () {
        return {
            record: {}
        }
    },
    methods: {
        getNum () {
            request.request({
            url: this.getBaseUrl() + 'applicant_according_to_recruitment/',
            method: 'post',
            data: {recruitmentId: this.recruitmentId}
            }).then(res =>{
                this.record.total = res.data.total
                this.record.fail = res.data.fail
                this.record.filtering = res.data.filtering
                this.record.giveUp = res.data.giveUp
                this.record.done = res.data.done
                console.log(this.record);
            }).catch(err =>{
                console.log(err);
            })
        }
    },
    created () {
        this.getNum ()
    }

}
</script>

<style>

</style>