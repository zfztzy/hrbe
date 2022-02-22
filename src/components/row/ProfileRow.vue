<template>
    <Row>
        <div slot="main">
            <img src="../../assets/FG.jpg" style="float:left; height:80px; width: 80px; border-radius: 50%">
            <h2 style="margin-left: 90px;">{{profileInfo.iMsg}}</h2> 
            <p v-show="isShow" style="margin:0; padding: 0; margin-left: 100px; margin-top:0px; ">{{profileInfo.iMsg2}}</p>
            <el-button v-show="!isShow" @click="open" type="text" style="font-size:20px; margin:0; padding: 0; margin-left: 20px; margin-top:0px; color: #ff502c;" >⏬⏬⏬点击下载简历⏬⏬⏬</el-button>
            <!-- <p v-show="!isShow" target="_blank" @click="open" href="http://39.107.227.252/static/profile/梁澈峰简历.pdf" style="margin:0; padding: 0; margin-left: 20px; margin-top:0px; color: #ff502c;">{{profileInfo.iMsg2}}</p> -->
            <p style="margin:0; padding: 0; margin-left: 100px; margin-top:0px;" >最后更新时间： {{profileInfo.imsgt}}</p>
        </div>
        <div slot="content">
            <Left> 
                <ul>
                    <div v-for='(i, index) in profileInfo.menuList' :key="i" style="display: block;" :id="index">
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
                <div v-html="profileInfo.paragraph" v-if="profileInfo.paragraph"></div>
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
    name:'ProfileRow',
    props:['profileInfo'],
    computed:{
        isImsgp(){
            return this.profileInfo.imsgp!=''
        },
        isShow(){
            if (this.$route.query.type == 'work'){
                return false
            } 
            else{
                return true
            }
        }
    },
    data(){
        return{
            numList:['#top','#one','#two','#three','#four','#five','#six','#bot'],
            isActive:0
        }
    },
    components:{
        Row,
        Rightmsg,
        Left,
        Mid,
    },
    watch:{
        profileInfo(newValue){    
            if(newValue.munNum){    
                window.addEventListener("scroll",this.handleScroll); 
            }
        }
    },
    methods:{
        open() {
            this.$confirm('贵公司是否双休', '', {
                confirmButtonText: '双休，继续下载简历',
                cancelButtonText: '不双休，放弃下载',
                type: 'warning'
            }).then(() => {
                this.$message({
                type: 'success',
                message: '下载成功!',
                });
                window.open("http://39.107.227.252/static/profile/梁澈峰简历.pdf")
            }).catch(() => {        
            });
        },
        handleScroll() {
            let top = document.querySelector('#top').getClientRects()[0].y
            let limit
            let half = (window.screen.availHeight -100)/2
            let zz = document.querySelector('#bot').getClientRects()[0].y
            if(this.profileInfo.munNum[0]){
                var aa = document.querySelector('#one').getClientRects()[0].y
                if (aa < half&&top!=0){
                    this.isActive = 1
                }
            }if(this.profileInfo.munNum[1]){
                var bb = document.querySelector('#two').getClientRects()[0].y
                if (bb < half){
                    this.isActive = 2
                }
                if (!this.profileInfo.munNum[2]){
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
            }if(this.profileInfo.munNum[2]){
                var cc = document.querySelector('#three').getClientRects()[0].y
                if (cc < half){
                    this.isActive = 3
                }
                if (!this.profileInfo.munNum[3]){
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
            }if(this.profileInfo.munNum[3]){
                var dd = document.querySelector('#four').getClientRects()[0].y
                if (dd < half){
                    this.isActive = 4
                }
                if (!this.profileInfo.munNum[4]){
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
                    if(cc<limit){
                        this.isActive = 4
                    }
                } 
            }if(this.profileInfo.munNum[4]){
                var ee = document.querySelector('#five').getClientRects()[0].y
                if (ee < half){
                    this.isActive = 5
                }
                if (!this.profileInfo.munNum[5]){
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
                    if(dd<limit){
                        this.isActive = 5
                    }
                }
            }if(this.profileInfo.munNum[5]){
                var ff = document.querySelector('#six').getClientRects()[0].y
                if (ff < half){
                    this.isActive = 6
                }
                if (!this.profileInfo.munNum[6]){
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
                    if(ee<limit){
                        this.isActive = 6
                    }
                }
            }
            if(top===0){
                this.isActive = 0
            }
        },
            
            // let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            // if(this.profileInfo.heightList){
            //     if (scrollTop>this.profileInfo.heightList[0]&scrollTop<this.profileInfo.heightList[1]){
            //         this.isActive=0
            //     }
            // }
            // if(this.profileInfo.heightList[1]){
            //     if (scrollTop>=this.profileInfo.heightList[1]-10&scrollTop<this.profileInfo.heightList[2]){
            //         this.isActive=1
            //     }
            // }if(this.profileInfo.heightList[2]){
            //     if (scrollTop>=this.profileInfo.heightList[2]-10&scrollTop<this.profileInfo.heightList[3]){
            //         this.isActive=2
            //     }
            // }if(this.profileInfo.heightList[3]){
            //     if (scrollTop>=this.profileInfo.heightList[3]-10&scrollTop<this.profileInfo.heightList[4]){
            //         this.isActive=3
            //     }
            // }if(this.profileInfo.heightList[4]){
            //     if (scrollTop>=this.profileInfo.heightList[4]-10&scrollTop<this.profileInfo.heightList[5]){
            //         this.isActive=4
            //     }
            // }if(this.profileInfo.heightList[5]){
            //     if (scrollTop>=this.profileInfo.heightList[5]-10&scrollTop<this.profileInfo.heightList[6]){
            //         this.isActive=5
            //     }
            // }if(this.profileInfo.heightList[6]){
            //     if (scrollTop>=this.profileInfo.heightList[6]-10&scrollTop<this.profileInfo.heightList[7]){
            //         this.isActive=6
            //     }
            // }if(this.profileInfo.heightList[7]){
            //     if (scrollTop>=this.profileInfo.heightList[7]-10&scrollTop<this.profileInfo.heightList[8]){
            //         this.isActive=7
            //     }
            // }if(this.profileInfo.heightList[8]){
            //     if (scrollTop>=this.profileInfo.heightList[8]-10&scrollTop<this.profileInfo.heightList[9]){
            //         this.isActive=8
            //     }
            // }
            
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

</style>