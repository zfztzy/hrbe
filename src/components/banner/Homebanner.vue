<template>
    <!--具体参数的配置请仔细查看文档-->
  <carousel-3d
    :autoplay="true"
    :autoplayTimeout="3000"
    :perspective="50"
    :display="5"
    :animationSpeed="1000"
    :width="512"
    :height="400"
    controlsVisible
    :controlsHeight="60">
    <slide v-for="(item, i) in slides" :index="i" :key="i">{{item.text}}
        <!--通过插槽作用域可以拿到点击的图片的索引-->
      <template slot-scope="obj">
        <img @mouseover="show(obj)" @mouseleave="disshow(obj)" @click="imgClick(obj, item.type)" :src='item.src' alt="" style="height: 321px;width: 514px; border-radius: 19px">
        <h2 v-show="item.isShow">⬆️这里是关于{{item.text}}</h2>
        <h3 v-show="item.isShow">{{item.postscript}}</h3>
      </template>  
    </slide>
    
  </carousel-3d>
</template>


<script>
import { Carousel3d, Slide } from 'vue-carousel-3d'
export default {
    name:'Homebanner',
    components: {
        Carousel3d,
        Slide
    },
    data(){
        return{
            slides:[
                {text:'自定义修改内容',type:'Applicant',src:require('../../assets/homebanner/me1.png'),postscript:'自定义说明内容',isShow:false},
                {text:'自定义修改内容',type:'PojectStatus',src:require('../../assets/homebanner/page1.png'),postscript:'自定义说明内容',isShow:false},
                {text:'自定义修改内容',type:'ProjectInfo',src:require('../../assets/homebanner/work1.png'),postscript:'自定义说明内容',isShow:false},
                {text:'自定义修改内容',type:'Recruitment',src:require('../../assets/homebanner/skill1.png'),postscript:'自定义说明内容',isShow:false},
                {text:'自定义修改内容',type:'Applicant',src:require('../../assets/homebanner/me1.png'),postscript:'自定义说明内容',isShow:false},
                {text:'自定义修改内容',type:'PojectStatus',src:require('../../assets/homebanner/page1.png'),postscript:'自定义说明内容',isShow:false},
                {text:'自定义修改内容',type:'ProjectInfo',src:require('../../assets/homebanner/work1.png'),postscript:'自定义说明内容',isShow:false},
                {text:'自定义修改内容',type:'Recruitment',src:require('../../assets/homebanner/skill1.png'),postscript:'自定义说明内容',isShow:false},
                ],
        }
    },
    computed:{
        
    },
    methods:{
        imgClick(i,type){
            if(i.leftIndex==-1&i.rightIndex==-1){
                this.$router.push({path:'/hrManageTable/' + type})   
            }
        },
        show(i){
            let a = i.index
            if(a<3){
                this.slides[a].isShow = true
            }else{
                this.slides[a].isShow = true
            }

        },
        disshow(i){
            let a = i.index
            if(a<3){
                this.slides[a].isShow = false
            }else{
                this.slides[a].isShow = false
            }

        }
    }
}
</script>


<style>

.carousel-3d-slide {
  background: none;
  border: 0px;
  text-align:center;
}
</style>