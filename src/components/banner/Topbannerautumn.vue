<template>
  <div class="container" @mouseenter="Imouseenter" @mousemove="Imousemove" @mouseleave="Imouseleave">
      <div class="layer"><img src="../../assets/bilibiliAutumn/1.png"
                              data-height="250" data-width="3000" height="290" width="3483"
                              style="filter: blur(4px); transform: translate(0px, 0px) rotate(0deg);"></div>
      <div class="layer"><img :src="eyeImg"
                              data-height="275" data-width="3000" height="191" width="2090"
                              style="transform: translate(0px, 0px) rotate(0deg); filter: blur(0px);"></div>
      <div class="layer"><img src="../../assets/bilibiliAutumn/3.png"
                              data-height="250" data-width="3000" height="290" width="3483"
                              style="transform: translate(-58.0645px, 0px) rotate(0deg); filter: blur(1px);"></div>
      <div class="layer"><img src="../../assets/bilibiliAutumn/4.png"
                              data-height="250" data-width="3000" height="174" width="2090"
                              style="transform: translate(0px, 4.87742px) rotate(0deg); filter: blur(4px);"></div>
      <div class="layer"><img src="../../assets/bilibiliAutumn/5.png"
                              data-height="275" data-width="3000" height="191" width="2090"
                              style="transform: translate(0px, -2.09032px) rotate(0deg); filter: blur(5px);"></div>
      <div class="layer"><img src="../../assets/bilibiliAutumn/6.png"
                              data-height="275" data-width="3000" height="207" width="2264"
                              style="filter: blur(6px); transform: translate(0px, 0px) rotate(0deg);"></div>
      <div class="layer"><img src="../../assets/bilibiliAutumn/2-bi.png"
                              data-height="275" data-width="3000" height="207" width="2264"
                              style="filter: blur(6px); transform: translate(0px, 0px) rotate(0deg); display: none"></div>
      <div class="layer"><img src="../../assets/bilibiliAutumn/2-zha.png"
                              data-height="275" data-width="3000" height="207" width="2264"
                              style="filter: blur(6px); transform: translate(0px, 0px) rotate(0deg); display: none"></div>
  </div>
</template>

<script>
import img1 from "../../assets/bilibiliAutumn/1.png";
import img2 from "../../assets/bilibiliAutumn/2.png";
import img3 from "../../assets/bilibiliAutumn/3.png";
import img4 from "../../assets/bilibiliAutumn/4.png";
import img5 from "../../assets/bilibiliAutumn/5.png";
import img6 from "../../assets/bilibiliAutumn/6.png";
import img2bi from "../../assets/bilibiliAutumn/2-bi.png";
import img2zha from "../../assets/bilibiliAutumn/2-zha.png";


export default {
  name: 'Topbannerautumn',
  data(){
    return{
      imgss:[img1,img2,img3,img4,img5,img6,img2bi,img2zha],
      imgs: [],
      eyeImg: img2,
      eyeArr:[img2zha, img2bi, img2],
      i: 0

    }
  },

  mounted: function () {
    this.imgs = document.querySelectorAll('img');
    this.flash();
  },
  methods: {  
    Imouseenter: function (e) {
      //获取鼠标在移入时的偏移
      this.x = e.clientX;
      //移除过渡效果
      this.imgs.forEach(item => {
          item.style.transition = 'none';
      });
    },

    Imousemove: function (e) {
      //获取鼠标移动时的偏移
      this._x = e.clientX;
      //计算鼠标移动的向量
      let disX = this._x - this.x;

      //第一张图的初始值以及变化
      //filter  blur(4px)
      //transform: translate(0px, 0px)
      //变化
      //x       0    1920    1920    disX
      //filter  4     8       4       ???
      const blur_0 = Math.abs(4 + 4 * disX / 1920);
      this.imgs[0].style.filter = `blur(${blur_0}px)`;

      //第二张图的初始值以及变化
      //filter  blur(0px)
      //transform: translate(0px, 0px)
      //变化
      //x             0    1920        disX
      //filter        0     10          ???
      //translate     0     10
      const blur_1 = Math.abs(10 * disX / 1920);
      const translateX_1 = 10 * disX / 1920;
      this.imgs[1].style.filter = `blur(${blur_1}px)`;
      this.imgs[1].style.transform = `translate(${translateX_1}px, 0px) rotate(0deg)`;

      //第三张图的初始值以及变化
      //filter  blur(1px)
      //transform: translate(-58px, 0px)
      //变化
      //x             0       1920        disX
      //filter        1       -5          ???
      //translate     -58     10          ???
      const blur_2 = Math.abs(1 - 5 * disX / 1920);
      const translateX_2 = -58 + 10 * disX / 1920;
      this.imgs[2].style.filter = `blur(${blur_2}px)`;
      this.imgs[2].style.transform = `translate(${translateX_2}px, 0px) rotate(0deg)`;

      //第四张图的初始值以及变化
      //filter  blur(4px)
      //transform: translate(0px, 4.87742px)
      //变化
      //x             0       1920        disX
      //filter        4       -10          ???
      //translate     0        42          ???
      const blur_3 = Math.abs(4 - 10 * disX / 1920);
      const translateX_3 = 42 * disX / 1920;
      this.imgs[3].style.filter = `blur(${blur_3}px)`;
      this.imgs[3].style.transform = `translate(${translateX_3}px, 4.87742px) rotate(0deg)`;

      //第五张图的初始值以及变化
      //filter  blur(5px)
      //transform: translate(0px, -2.09032px)
      //变化
      //x             0       1920        disX
      //filter        5       -10          ???
      //translate     0        91          ???
      const blur_4 = Math.abs(5 - 10 * disX / 1920);
      const translateX_4 = 91 * disX / 1920;
      this.imgs[4].style.filter = `blur(${blur_4}px)`;
      this.imgs[4].style.transform = `translate(${translateX_4}px, -2.09032px) rotate(0deg)`;

      //第六张图的初始值以及变化
      //filter  blur(5px)
      //transform: translate(0px, 0px)
      //变化
      //x             0       1920        disX
      //filter        6       -6          ???
      //translate     0        114        ???
      const blur_5 = Math.abs(6 - 6 * disX / 1920);
      const translateX_5 = 114 * disX / 1920;
      this.imgs[5].style.filter = `blur(${blur_5}px)`;
      this.imgs[5].style.transform = `translate(${translateX_5}px, 0px) rotate(0deg)`;
    },

    Imouseleave: function () {
      //增加过渡效果
      this.imgs.forEach(item => {
          item.style.transition = 'all 0.5s';
      });
      //样式清空
      this.imgs[0].style.filter = 'blur(4px)';
      this.imgs[0].style.transform = 'translate(0px, 0px) rotate(0deg)';

      this.imgs[1].style.filter = 'blur(0px)';
      this.imgs[1].style.transform = 'translate(0px, 0px) rotate(0deg)';

      this.imgs[2].style.filter = 'blur(1px)';
      this.imgs[2].style.transform = 'translate(-58.0645px, 0px) rotate(0deg)';

      this.imgs[3].style.filter = 'blur(4px)';
      this.imgs[3].style.transform = 'translate(0px, 4.87742px) rotate(0deg)';

      this.imgs[4].style.filter = 'blur(5px)';
      this.imgs[4].style.transform = 'translate(0px, -2.09032px) rotate(0deg)';

      this.imgs[5].style.filter = 'blur(6px)';
      this.imgs[5].style.transform = 'translate(0px, 0px) rotate(0deg)';
    },

    flash: function () {
      setInterval(() => {
            setTimeout(() => {
                this.eyeImg = this.eyeArr[0];
            });
            setTimeout(() => {
                this.eyeImg = this.eyeArr[1];
            }, 100);
            setTimeout(() => {
                this.eyeImg = this.eyeArr[0];
            }, 200);
            setTimeout(() => {
                this.eyeImg = this.eyeArr[2];
            }, 300);
        }, 3000);
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.container{
    overflow: hidden;
    position: relative;
    left:0;
    top:0;
    width:100%;
    height: 180px;
}

.container .layer{
    position:absolute;
    left:0;
    top:0;
    height: 100%;
    width: 100%;
    display:flex;
    justify-content: center;
    align-items: center;
}
</style>
