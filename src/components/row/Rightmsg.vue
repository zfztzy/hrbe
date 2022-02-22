<template>
    <Right>
            <Tab-bar-item  v-for="i in barList" :key="i.name" :path='i.path'>
                <img slot="item-icon" :src="i.src" alt="">
                <img slot="item-active" :src="i.src2" alt="">
                <div slot="item-text">{{i.name}}</div>
            </Tab-bar-item>
    </Right>
</template>

<script>
import Right from '../LMRR/Right.vue'
import TabBarItem from '../tabbar/TabBarItem.vue'
export default {
  components: { TabBarItem, Right },
    name:'Rightmsg',
    data(){
        return{
            barList:[
                {name:'我的',src:require('../../assets/tabbar/good1.png'),src2:require('../../assets/tabbar/good2.png'),path:'/profile'},
                {name:'心情',src:require('../../assets/tabbar/life1.jpg'),src2:require('../../assets/tabbar/life2.jpg'),path:'/diary'},
                {name:'学习',src:require('../../assets/tabbar/ball1.png'),src2:require('../../assets/tabbar/ball2.png'),path:'/study'},
                {name:'打卡',src:require('../../assets/tabbar/movie1.jpg'),src2:require('../../assets/tabbar/movie2.jpg'),path:'/clockIn'},
                {name:'疑问',src:require('../../assets/tabbar/hobby1.jpg'),src2:require('../../assets/tabbar/hobby2.jpg'),path:'/qa'},
                {name:'填坑',src:require('../../assets/tabbar/technology1.jpg'),src2:require('../../assets/tabbar/technology2.jpg'),path:'/difficulty'},]
        }
    },
}
</script>

<style>
</style>