<template>
    <Row>
        <div slot="main">
            <img src="../../assets/FG.jpg" style="float:left; height:80px; width: 80px; border-radius: 50%">
            <h2 style="margin-left: 90px;">{{studyInfo.imsg}}</h2> 
            <p style="margin:0; padding: 0; margin-left: 100px; margin-top:0px; ">{{studyInfo.imsgb}}</p>
            <p style="margin:0; padding: 0; margin-left: 100px; margin-top:0px;" >最后更新时间： {{studyInfo.imsgt}}</p>
            <div v-show="studyInfo.leetCodeLink" class="leetcode"  >
                <h3>链接查看题目详情</h3>
                <a class="Link"  :href="studyInfo.leetCodeLink"  target="_blank">{{studyInfo.aa}}</a>
            </div>
            
        </div>
        <div slot="content">
            <Left> 
                <ul>
                    <div v-for='(i, index) in studyInfo.menulist' :key="i" style="display: block;" :id="index">
                        <br>
                        <br>
                        <li @click="jump(numList[index])" :class='{active:isActive===index}'>{{i}}</li>
                    </div>
                    <br><br>
                    <li @click="top()" >--返回顶部</li>
                </ul>
            </Left>
            <Rightmsg/>
            <Mid>
                <div v-html="studyInfo.imsgp" v-if="studyInfo.imsgp"></div>
            </Mid>
        </div>
    </Row>
</template>

<script>
import Left from '../LMRR/Left.vue'
import Mid from '../LMRR/Mid.vue'
import Row from '../LMRR/Row.vue'
import Rightmsg from './Rightmsg.vue'
export default {
    name:'StudyRow',
    props:['studyInfo'],
    data(){
        return{
            numList:['#top','#one','#two','#three','#four','#five','#six',],
            isActive:0,
            heightList:[],
        }
    },
    components:{
        Row,
        Rightmsg,
        Left,
        Mid,
    },
    watch:{
        studyInfo(newValue){
            if(newValue.munNum){
                window.addEventListener("scroll",this.handleScroll); 
            }
        }
    },
    methods:{
        handleScroll() {
            let top = document.querySelector('#top').getClientRects()[0].y
            let limit
            let half = (window.screen.availHeight -100)/2
            let zz = document.querySelector('#bot').getClientRects()[0].y
            if(this.studyInfo.munNum[0]){
                var aa = document.querySelector('#one').getClientRects()[0].y
                if (aa < half&&top!=0){
                    this.isActive = 1
                }
            }if(this.studyInfo.munNum[1]){
                var bb = document.querySelector('#two').getClientRects()[0].y
                if (bb < half){
                    this.isActive = 2
                }
                if (!this.studyInfo.munNum[2]){
                    const secondLastLength = bb-aa
                    const lastLength = zz-bb
                    if(secondLastLength>half&&lastLength>half){
                        limit = half
                    }else if(secondLastLength<half&&lastLength>80){
                        limit = half - lastLength
                    }else if(secondLastLength>half&&lastLength>80){
                        limit = half - (secondLastLength-lastLength)
                    }else{
                        limit = half - 80
                    }
                    if(bb<limit){
                        this.isActive = 2
                    }
                }
            }if(this.studyInfo.munNum[2]){
                var cc = document.querySelector('#three').getClientRects()[0].y
                if (cc < half){
                    this.isActive = 3
                }
                if (!this.studyInfo.munNum[3]){
                    const secondLastLength = cc-bb
                    const lastLength = zz-cc
                    if(secondLastLength>half&&lastLength>half){
                        limit = half
                    }else if(secondLastLength<half&&lastLength>80){
                        limit = half - lastLength
                    }else if(secondLastLength>half&&lastLength>80){
                        limit = half - (secondLastLength-lastLength)
                    }else{
                        limit = half - 80
                    }
                    if(cc<limit){
                        this.isActive = 3
                    }
                }
            }if(this.studyInfo.munNum[3]){
                var dd = document.querySelector('#four').getClientRects()[0].y
                if (dd < half){
                    this.isActive = 4
                }
                if (!this.studyInfo.munNum[4]){
                    const secondLastLength = dd-cc
                    const lastLength = zz-dd
                    if(secondLastLength>half&&lastLength>half){
                        limit = half
                    }else if(secondLastLength<half&&lastLength>80){
                        limit = half - lastLength
                    }else if(secondLastLength>half&&lastLength>80){
                        limit = half - (secondLastLength-lastLength)
                    }else{
                        limit = half - 80
                    }
                    if(dd < limit){
                        this.isActive = 4
                    }
                } 
            }if(this.studyInfo.munNum[4]){
                var ee = document.querySelector('#five').getClientRects()[0].y
                if (ee < half){
                    this.isActive = 5
                }
                if (!this.studyInfo.munNum[5]){
                    const secondLastLength = ee-dd
                    const lastLength = zz-ee
                    if(secondLastLength>half&&lastLength>half){
                        limit = half
                    }else if(secondLastLength<half&&lastLength>80){
                        limit = half - lastLength
                    }else if(secondLastLength>half&&lastLength>80){
                        limit = half - (secondLastLength-lastLength)
                    }else{
                        limit = half - 80
                    }
                    if(ee < limit){
                        this.isActive = 5
                    }
                }
            }if(this.studyInfo.munNum[5]){
                var ff = document.querySelector('#six').getClientRects()[0].y
                if (ff < half){
                    this.isActive = 6
                }
                if (!this.studyInfo.munNum[6]){
                    const secondLastLength = ff-ee
                    const lastLength = zz-ff
                    if(secondLastLength>half&&lastLength>half){
                        limit = half
                    }else if(secondLastLength<half&&lastLength>80){
                        limit = half - lastLength
                    }else if(secondLastLength>half&&lastLength>80){
                        limit = half - (secondLastLength-lastLength)
                    }else{
                        limit = half - 80
                    }
                    if(ff < limit){
                        this.isActive = 6
                    }
                }
            }
            if(top===0){
                this.isActive = 0
            }
        },
        jump(i){
            const returnEle = document.querySelector(i); 
            returnEle.scrollIntoView({behavior: "smooth", block: "center", inline: "start"});
        },
        top(){
            const returnEle = document.querySelector('#top');
            returnEle.scrollIntoView({behavior: "smooth", block: "center", inline: "start"});
        }
    },
    mounted(){
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll)
    }
}
</script>

<style>
.main {   
    -ms-flex: 70%; /* IE10 */
    flex: 70%;
    background-color: white;
    padding: 20px;

}

.active{
    color: rgb(0, 161, 214);
  }


.leetcode{
    position: relative; 
    top: 20px; 
    right: -18%; 
    width: 700px;
    color: coral;

}

.leetcode .Link{
    position: relative; 
    width: 700px;
    right: 28px;
    color: coral;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -ms-line-clamp: 2;
    -ms-box-orient: vertical;
    -webkit-box-orient: vertical;
}
</style>