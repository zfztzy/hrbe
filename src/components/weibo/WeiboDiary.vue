<template>
  <div class="diary">
    <Navbar :links="links" :pagestyle='pagestyle' style=''>
      <a v-for='(i) in links' :key="i.msg" @click ='itemClick(i.linker)' :class="{right:i.isRight}">{{i.msg}}</a>
    </Navbar>
    <div>
      <Row>
        <div slot="main">
          <h2>这里记录一下每天的心情，瞎逼发发牢骚</h2>
          <h3>等后端完善了，这里再放一个input框，用来写日记</h3>
        </div>
        <div slot="content">
          <Left style="background-color: #fff; width: 270px; margin-top: 40px">
          <WeiboHot></WeiboHot>
          </Left>
          <Rightmsg/>
          <img src="../../assets/hotpot.webp" alt="" style="width:600px; margin-left: 75px; margin-top: 30px;margin-bottom: 30px;">
          <Mid style="">
            <Weibo-view :weiboList="weiboList"></Weibo-view>
          </Mid>
        </div>
      </Row>
    </div>
  </div>
</template>

<script>
import Mid from '../../components/LMRR/Mid'
import Left from '../../components/LMRR/Left.vue'
import Row from '../../components/LMRR/Row.vue'
import Navbar from '../../components/Navbar.vue'
import Rightmsg from '../../components/row/Rightmsg'
import WeiboView from '../../components/weibo/WeiboView.vue'
import WeiboHot from '../../components/weibo/WeiboHot'
// @ is an alias to /src



export default {
  components: { Rightmsg,Navbar, Row,Left, Mid ,WeiboView,WeiboHot },
    name: 'Diary',
    data(){
      return{
        pagestyle:'background-color: white; color: black',
        links:[
              {linker: '/', msg: '生活', },
              {linker: '/', msg: '工作', },
              {linker: '/', msg: '记账', },
          ],
        weiboList:[{
              src:require('../../assets/FG.jpg'),
              name:'FG',
              time:'2021年1月8号 15:58',
              weibo:'女朋友好难哄哦'
            },
            {
              src:require('../../assets/FG.jpg'),
              name:'FG',
              time:'2021年1月8号 15:38',
              weibo:'女朋友生气的时候好可怕哦'
            },
            {
              src:require('../../assets/FG.jpg'),
              name:'FG',
              time:'2021年1月8号 15:38',
              weibo:'有没有人告诉我，女朋友生气的时候不哄会发生什么事情？'
            }]
    }
  }
}

</script>


<style>
.diary{
  background-color: #f5f5f5;
}

</style>
