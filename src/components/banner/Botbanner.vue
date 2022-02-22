<template>
    <div>
        <div class="swiperTitle">
            <h4 class="swiperTitleText">每日一题</h4>
        </div>
        <Swiper-box>
            <div :style="transform" @click="studyDetail(a.id)">
                <Leetcode-box>
                    <img slot="img" :src="a.url" alt="">
                    <p slot="type">{{a.type}}</p>
                    <p slot="title">{{a.title}}</p>
                    <p slot="date">{{a.date}}</p>
                    <p slot="text">{{a.text}}</p>
                </Leetcode-box>
            </div>
            <div :style="transform" @click="studyDetail(b.id)">
                <Leetcode-box>
                    <img slot="img" :src="b.url" alt="">
                    <p slot="type">{{b.type}}</p>
                    <p slot="title">{{b.title}}</p>
                    <p slot="date">{{b.date}}</p>
                    <p slot="text">{{b.text}}</p>
                </Leetcode-box>
            </div>
            <div :style="transform" @click="studyDetail(c.id)">
                <Leetcode-box>
                    <img slot="img" :src="c.url" alt="">
                    <p slot="type">{{c.type}}</p>
                    <p slot="title">{{c.title}}</p>
                    <p slot="date">{{c.date}}</p>
                    <p slot="text">{{c.text}}</p>
                </Leetcode-box>
            </div>
            <div v-show="isShow" :style="transform" @click="studyDetail(d.id)">
                <Leetcode-box>
                    <img slot="img" :src="d.url" alt="">
                    <p slot="type">{{d.type}}</p>
                    <p slot="title">{{d.title}}</p>
                    <p slot="date">{{d.date}}</p>
                    <p slot="text">{{d.text}}</p>
                </Leetcode-box>
            </div>
        </Swiper-box>
    </div>
</template>

<script>
import LeetcodeBox from '../study/LeetcodeBox';
import SwiperBox from '../study/SwiperBox.vue';
import * as request from '../../network/request'
export default {
  components: { SwiperBox, LeetcodeBox },
    data(){
        return {
            a:{},
            b:{},
            c:{},
            d:{},
            list:[
                {
                id:0,
                url:require('../../assets/pbg/TB1.png'),
                type:'',
                title:'',
                date:'',
                text:``
                },
                {
                id:1,
                url:require('../../assets/pbg/TB2.png'),
                type:'',
                title:'',
                date:'',
                text:``
                },
                {
                id:2,
                url:require('../../assets/pbg/TB3.png'),
                type:'',
                title:'',
                date:'',
                text:''
                },
                {
                id:3,
                url:require('../../assets/pbg/TB4.png'),
                type:' ',
                title:'',
                date:'',
                text:``
                },
            ],
            transform:'',
            //控制是否需要动画的css变量，在隐藏和交换内容的时候不需要过度，在平移的时候需要设置内容
            isShow:false
            //在动画开始之前和动画结束之后，让第四个组件隐藏，调整动画效果需要
        }
    },
    methods:{
        studyDetail(id){
            this.$router.push({path:'/study/content',query: {id:id}})
            window.scrollTo(0, 0)
        },
        swipe(){            
            setTimeout(() => {
                this.a = this.list[0]
                this.b = this.list[1]
                this.c = this.list[2]
                this.d = this.list[3]
                this.isShow = false
                this.transform = ''
            },);
            setTimeout(() => {
                this.isShow = true
            },4640); 
            setTimeout(() => {
                this.transform = 'transform: translate(-406px, 0px); transition: all 0.3s'
            },4660);
            setTimeout(() => {
                this.a = this.list[1]
                this.b = this.list[2]
                this.c = this.list[3]
                this.d = this.list[0]
                this.isShow = false
                this.transform = ''
            },5000);
            setTimeout(() => {
                this.isShow = true
            },9640); 
            setTimeout(() => {
                this.transform = 'transform: translate(-406px, 0px); transition: all 0.3s'
            },9660);
            setTimeout(() => {
                this.a = this.list[2]
                this.b = this.list[3]
                this.c = this.list[0]
                this.d = this.list[1]
                this.isShow = false
                this.transform = ''
            },10000);
            setTimeout(() => {
                this.isShow = true
            },14640); 
            setTimeout(() => {
                this.transform = 'transform: translate(-406px, 0px); transition: all 0.3s'
            },14660);
            setTimeout(() => {
                this.a = this.list[3]
                this.b = this.list[0]
                this.c = this.list[1]
                this.d = this.list[2]
                this.isShow = false
                this.transform = ''
            },15000);
            setTimeout(() => {
                this.isShow = true
            },19640); 
            setTimeout(() => {
                this.transform = 'transform: translate(-406px, 0px); transition: all 0.3s'
            },19660);
        },

    },
    mounted(){
        this.swipe()
        setInterval(() => {
            this.swipe()},20000)
    },
    created(){
        request.request({
        url:'http://39.107.227.252/getStudySwiper/',
        data:{'type': 'leetcode'},
        method: 'post',
        }).then(res =>{
        this.list = [Object.assign(this.list[0],res.data.swipeInfo[0]), Object.assign(this.list[1],res.data.swipeInfo[1]), Object.assign(this.list[2],res.data.swipeInfo[2]), Object.assign(this.list[3],res.data.swipeInfo[3])]
        }).catch(err =>{
        console.log(err);
        })
    }
}
</script>

<style>
.swiperTitle{
    font-size: 36px;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    margin-bottom: 75px;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}
</style>

