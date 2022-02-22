<template>
    <div class="weiboView">
        <Weibo-paragraph v-for="i in weiboList" :key="i">
            <img slot="img" :src="i.src" style="float:left; height:55px; width: 55px; border-radius: 50%">
            <h2 slot="name">{{i.name}}</h2> 
            <p slot="time" style="margin:0; padding: 0; margin-top:0px;" >更新时间：{{i.time}}</p>
            <p slot="weibo" style="margin-left:30px;">{{i.weibo}}</p>
        </Weibo-paragraph>
    </div>
</template>

<script>
import WeiboParagraph from '../../components/weibo/WeiboParagraph.vue'
// @ is an alias to /src



export default {
  components: {WeiboParagraph },
    name: 'WeiboView',
    props:{
      weiboList:{
        type:Array,
        default(){
            return[{
              src:require('../../assets/FG.jpg'),
              name:'FG',
              time:'现在',
              weibo:'还没想好要写点啥呢，你说写点啥好呢'
            },
            {
              src:require('../../assets/FG.jpg'),
              name:'FG',
              time:'现在',
              weibo:'不如随便放那么几条'
            },
            {
              src:require('../../assets/FG.jpg'),
              name:'FG',
              time:'现在',
              weibo:'让这页面看起来没那么丑'
            }]
          }
        }
    },
}

</script>

<style>

</style>