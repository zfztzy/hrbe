<template>
    <div class="pnp">
        <div class="bg" :style="src">
            <div class="contentS">
                <h4 class="title" @click="studyDetail(topInfo.id)"> {{topInfo.title}}</h4>
                <p class="time" @click="studyDetail(topInfo.id)">{{topInfo.date}}</p>
                <p class="paragraph" @click="studyDetail(topInfo.id)">{{topInfo.content}}</p>
            </div>
            
        </div>
    </div>
</template>

<script>
import * as request from '../../network/request'
export default {
    name:'Toppnp',
    computed:{
        src(){
            return "background-image:url("+this.url+");"
        }
    },
    data(){
        return{
            url:require('../../assets/pbg/pbg.png'),
            topInfo:{
                id:0,
                title:'',
                date:'',
                content:``,
            }
        }
    },
    methods:{
        studyDetail(id){
            this.$router.push({path:'/study/content',query: {id:id}})
        }
    },
    created(){
        request.request({
        url:'http://39.107.227.252/getStudyTopInfo/',
        data:{'type': 'front-end'},
        method: 'post',
        }).then(res =>{
        this.topInfo = res.data.topInfo
        }).catch(err =>{
        console.log(err);
        })
    }

}
</script>

<style>
.pnp{
    color: #ffffff;
    z-index: 1;
}
.pnp .bg{
    object-fit:cover;
    height: 512px;
    width: 100%;
}

.pnp .title{
    font-size: 36px;
    text-align: justify;
    font-weight: 700;
    line-height: 64px;
    margin-bottom: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    display: -ms-flexbox;
    -webkit-line-clamp: 2;
    -ms-line-clamp: 2;
    line-clamp: 2;
    -ms-box-orient: vertical;
    -webkit-box-orient: vertical;
    margin-left: 15px;
    border-collapse: collapse;
    border-spacing: 0;
}

.pnp .contentS{
    width: 56%;
    margin-left: 44%;
    padding-top: 100px;
}
.pnp .paragraph{
    text-align: justify;
    line-height: 40px;
    height: 120px;
    margin-bottom: 64px;
    margin-bottom: 15px;
    margin-left: 15px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    margin-right: 40px;
}

.pnp .time{
    text-align: justify;
    line-height: 40px;
    height: 80px;
    margin-bottom: 64px;
    margin-bottom: 15px;
    margin-left: 15px;
}
</style>