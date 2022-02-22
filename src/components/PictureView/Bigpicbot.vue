<template>
    <div class="bot">
        <div class="botPicture">
            <div class="botLeft">
                <div class="botLeftPicture">
                    <img src="../../assets/pbg/pbgbl.png" alt="">
                </div>
                <div class="botLeftText">
                    <div class="box">
                        <p class="title">{{botInfo.leftBigTitle}}</p> 
                        <p class="theme" @click="studyDetail(botInfo.leftId)">{{botInfo.leftContentTitle}}</p> 
                        <p class="date">{{botInfo.leftDate}}</p> 
                        <p class="text" @click="studyDetail(botInfo.leftId)">{{botInfo.leftContent}}</p>
                    </div>
                </div>
            </div> 
        </div>
        <div class="botR">
            <div class="box">
                <p class="title">{{botInfo.rightBigTitle}}</p> 
                <p class="theme" @click="studyDetail(botInfo.rightId)">{{botInfo.rightContentTitle}}</p> 
                <p class="date">{{botInfo.rightDate}}</p> 
                <p class="text" @click="studyDetail(botInfo.rightId)">{{botInfo.rightContent}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import * as request from '../../network/request'
export default {
    name:'Bigpicbot',
    data(){
        return{
            botInfo:{
                leftId:0,
                leftBigTitle:'',
                leftContentTitle:'',
                leftDate:'',
                leftContent:``,
                rightId:0,
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
        url:'http://39.107.227.252/getStudyBotInfo/',
        data:{'type': 'front-end'},
        method: 'post',
        }).then(res =>{
        this.botInfo = res.data.botInfo
        }).catch(err =>{
        console.log(err);
        })
    }
}
</script>

<style>
.bot{
    margin-top: 50px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    top: 50px;
    left: 40px;

}

.botLeft{
    -webkit-box-shadow: 0 0 60px 0 rgba(0,0,0,.1);
    box-shadow: 0 0 60px 0 rgba(0,0,0,.1);
    width: 740px;
}

.botPicture{
    
    padding-left: 25px;
    padding-right: 25px;
    width: 778px;
    float: left;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;

}


.botLeftPicture{
    float: left;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 353px;
    height: 410px;
    position: relative;
    right: 40px;
    /* display: inline-block; */
}


.botLeftText{
    display: inline-block;
    vertical-align: top;
    height: 410px;
    width: 50%;
}

.botLeftText .box{
    padding: 80px 40px 0 0;
}

.botLeftText .title{
    font-size: 18px;
    color: #2d5fde;
    letter-spacing: 0;
    line-height: 24px;
    margin-bottom: 22px;
    font-weight: 700;
}

.botLeftText .theme{
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


.botLeftText .date{
    font-size: 16px;
    color: #999;
    margin-bottom: 13px;
}


.botLeftText .text{
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

.botR{
    position: relative;
    left: 35px;
    padding-left: 25px; 
    padding-right: 25px;
    width: 366px;
    float: left;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-box-shadow: 0 0 60px 0 rgba(0,0,0,.1);
    box-shadow: 0 0 60px 0 rgba(0,0,0,.1);
    height: 410px;
}

.botR .box{
    padding: 80px 40px 0 0;
    padding-left: 25px;
    padding-right: 25px;
}


.botR .title{
    font-size: 18px;
    color: #2d5fde;
    letter-spacing: 0;
    line-height: 24px;
    margin-bottom: 22px;
    font-weight: 700;
}

.botR .theme{
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


.botR .date{
    font-size: 16px;
    color: #999;
    margin-bottom: 13px;
}


.botR .text{
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