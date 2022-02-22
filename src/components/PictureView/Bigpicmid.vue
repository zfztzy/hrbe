<template>
    <div class="bigPicture">
        <div class="bigPictureBox">
            <div class="bpl">
                <h4>{{midInfo.leftBigTitle}}</h4>
                <h2 class="title" @click="studyDetail(midInfo.leftId)"> {{midInfo.leftContentTitle}}</h2>
                <p class="time">{{midInfo.leftDate}}</p>
                <p class="paragraph" @click="studyDetail(midInfo.leftId)">{{midInfo.leftContent}}</p>
            </div>
        </div>
        <div class="bigPictureBox2">
            <div class="up">
                <img src="../../assets/pbg/pbgr.png" alt="" class="bpr">
            </div>
            <div class="down">
                <p class="title">{{midInfo.rightBigTitle}}</p>
                <p class="theme" @click="studyDetail(midInfo.rightId)">{{midInfo.rightContentTitle}}</p>
                <p class="date">{{midInfo.rightDate}}</p>
                <p class="text" @click="studyDetail(midInfo.rightId)">{{midInfo.rightContent}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import * as request from '../../network/request'
export default {
    name:'Bigpicmid',
    data(){
        return{
            midInfo:{
                leftId:0,
                leftBigTitle:'',
                leftContentTitle:'、',
                leftDate:'',
                leftContent:``,
                rightId:2,
                rightBigTitle:'',
                rightContentTitle:'',
                rightDate:'',
                rightContent:``
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
        url:'http://39.107.227.252/getStudyMidInfo/',
        data:{'type': 'front-end'},
        method: 'post',
        }).then(res =>{
        this.midInfo = res.data.midInfo
        }).catch(err =>{
        console.log(err);
        })
    }
}

</script>

<style>
.bigPicture{
  padding-left: -25px;
  padding-right: -25px;
  box-sizing: border-box;
  position: relative;
}
.bigPictureBox{
    padding-left: 25px;
    padding-right: 50px;
    /* width: 560px; */
    float: left;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.bigPictureBox2{
    float: left;
    height: 729px;
    -webkit-box-shadow: 0 0 60px 0 rgba(0,0,0,.1);
    box-shadow: 0 0 60px 0 rgba(0,0,0,.1);
}

.bpl{
  background-image: url(../../assets/pbg/pbgl.png);
  color: #fff;
  height: 540px;
  width: 540px;
  background-size: 100%;
  padding-top: 189px;
  padding-left: 70px;
  padding-right: 168px;
  box-shadow: 0 0 60px 0 rgba(0,0,0,.1);
}

.bpl h4{
    font-size: 24px;
    color: #fff;
    font-weight: 700;
    height: 24px;
    line-height: 24px;
    margin-bottom: 22px;
}

.bpl .time{
    text-align: justify;
    line-height: 40px;
    height: 80px;
    margin-bottom: 64px;
    margin-bottom: 15px;
}

.bpl .paragraph{
    font-size: 16px;
    text-align: justify;
    line-height: 32px;
    height: 96px;
    margin-bottom: 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}

.bpl .title{
    text-align: justify;
    font-size: 36px;
    font-weight: 700;
    line-height: 46px;
    margin-bottom: 26px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    display: -ms-flexbox;
    -webkit-line-clamp: 2;
    -ms-line-clamp: 2;
    line-clamp: 2;
    -ms-box-orient: vertical;
    -webkit-box-orient: vertical;
    border-collapse: collapse;
    border-spacing: 0;
}

.down{
    padding: 65px 30px 0;
    width: 306px;
}
.down .title{
    font-size: 18px;
    color: #2d5fde;
    letter-spacing: 0;
    line-height: 24px;
    margin-bottom: 22px;
    font-weight: 700;
}

.down .theme{
    font-size: 22px;
    font-weight: 700;
    color: #333;
    letter-spacing: 0;
    line-height: 40px;
    margin-bottom: 13px;
    height: 80px;
    display: -ms-flexbox;
    -ms-line-clamp: 2;
    line-clamp: 2;
    -ms-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; 
    -webkit-box-orient: vertical;
}
.down .date{
    font-size: 16px;
    color: #999;
    margin-bottom: 13px;
}

.down .text{
    font-size: 16px;
    color: #333;
    letter-spacing: 0;
    line-height: 32px;
    height: 96px;
    display: -ms-flexbox;
    -ms-line-clamp: 3;
    line-clamp: 3;
    -ms-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; 
    -webkit-box-orient: vertical;
}
</style>