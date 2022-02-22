
<template>
  <div class="WeiboParagraph">
    <Row>
        <div slot="main">
            <slot name="img"></slot>
            <slot name="name"></slot>
            <slot name="time"></slot>
        </div>
        <div slot="content" style="margin-left:60px; padding:0">
            <slot name="weibo"></slot>
        </div>
    </Row>
    <Tab-bar>
      <Tab-bar-item>
        <img slot="item-icon" src="../../assets/tabbar/game1.png" alt="" style="">
        <div slot="item-text" style="font-size:12px">点赞</div>
      </Tab-bar-item>
      <br><br><br>
      <Tab-bar-item>
        <img slot="item-icon" src="../../assets/tabbar/game1.png" alt="" style="">
        <div slot="item-text" style="font-size:12px">点赞</div>
      </Tab-bar-item>
      <br><br><br>
      <Tab-bar-item>
        <img slot="item-icon" src="../../assets/tabbar/game1.png" alt="" style="">
        <div slot="item-text" style="font-size:12px">点赞</div>
      </Tab-bar-item>
      <br><br><br>
    </Tab-bar>
  </div>
</template>

<script>
import Row from '../LMRR/Row.vue'
import TabBar from '../tabbar/TabBar.vue'
import TabBarItem from '../tabbar/TabBarItem.vue'
export default {
  components: { Row, TabBar, TabBarItem },

}
</script>

<style>
.WeiboParagraph{
    width: 600px;
    background-color: #f9f9f9;
    margin-left: 100px;
    margin-top: 30px;
    margin-bottom: 30px;
}
</style>