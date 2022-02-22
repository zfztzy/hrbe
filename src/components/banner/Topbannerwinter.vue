<template>
  <header :class="{'moving':ismoving}" @mouseover="Imouseenter" @mousemove="Imousemove" @mouseleave="Imouseleave">
    <div class="view" :style="{transform:viewtransform}">
        <img src="../../assets/bilibiliWinter/bilibili-winter-view-1.jpg" class="morning" :style="{opacity:morningopacity}" alt="">
        <img src="../../assets/bilibiliWinter/bilibili-winter-view-2.jpg" class="afternoon" :style="{opacity:afternoonopacity}" alt="">
        <video autoplay loop muted class="evening">
        <source src="../../assets/bilibiliWinter/bilibili-winter-view-3.webm" type="video/webm" />
        </video>
        <img src="../../assets/bilibiliWinter/bilibili-winter-view-3-snow.png" class="window-cover" :style="{opacity:windowscover}" alt="">
    </div>
    
    <div class="tree">
        <img src="../../assets/bilibiliWinter/bilibili-winter-tree-1.png" class="morning" :style="{opacity:morningopacity, transform:treetransform}" alt="">
        <img src="../../assets/bilibiliWinter/bilibili-winter-tree-2.png" class="afternoon" :style="{opacity:afternoonopacity, transform:treetransform}" alt="">
        <img src="../../assets/bilibiliWinter/bilibili-winter-tree-3.png" class="evening" alt="">
    </div>
  </header>
</template>

<script>
export default {
    name:'Topbannerwinter',
    data(){
        return{
            data:new Date().getHours(),
            // data:20,
            header:[],
            startingPoint:0,
            ismoving:false,
            morningopacity:0,
            afternoonopacity:1,
            viewtransform:0,
            treetransform:0,
            windowcovernightopacity:0,
            windowscover:0
        }
    },
    mounted(){
        this.header = document.querySelector('header')  
        if(this.data>6&this.data<13){
          this.morningopacity = 1
          this.afternoonopacity = 0
        }else if(this.data>12&this.data<19){
          this.morningopacity = 0
          this.afternoonopacity = 1
        }
        else{
          this.morningopacity = 0
          this.afternoonopacity = 0
          this.windowscover = 1
        }
    },
    methods:{
        Imouseenter(e) {
          this.startingPoint = e.clientX
          this.ismoving = true
        },
        Imouseleave() {
          if(this.data>6&this.data<13){
            this.morningopacity = 1
            this.afternoonopacity = 0
            this.windowscover = -4
          }else if(this.data>12&this.data<19){
            this.morningopacity = 0
            this.afternoonopacity = 1
            this.windowscover = -4
          }
          else{
            this.morningopacity = 0
            this.afternoonopacity = 0
            this.windowscover = 1
          }
          this.ismoving = false
          this.viewtransform = 50
          this.treetransform = 50
        },
        Imousemove(e) {
          let percentage
          if(this.data>6&this.data<13){
            percentage = (e.clientX - this.startingPoint) / window.outerWidth + 0
          }else if(this.data>12&this.data<19){
            percentage = (e.clientX - this.startingPoint) / window.outerWidth + 0.247
          }
          else{
            percentage = (e.clientX - this.startingPoint) / window.outerWidth + 0.6
          }
          percentage = percentage * 2
          this.morningopacity = 1 - (percentage - 0.25) / 0.25
          this.afternoonopacity = 1 - (percentage - 0.5) / 0.5
          this.viewtransform = percentage * 100
          this.treetransform = percentage * 100
          this.windowscover = (percentage - 0.9) / 0.1
        }
    }
}
</script>

<style>
body {
  margin: 0;
}

header {
  height: 160px;
  position: relative;
  overflow: hidden;
  
  --percentage: 0.5;
}

header .view, header .tree {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

header img, header video {
  position: absolute;
  display: block;
  width: 120%;
  height: 100%;
  object-fit: cover;
}

header .morning {
  z-index: 20;
}

header .afternoon {
  z-index: 10;
}

header .view {
  transform: translatex(calc(var(--percentage) * 100px));
}

header .tree {
  transform: translatex(calc(var(--percentage) * 50px));
  filter: blur(3px);
}

header .view,
header .tree,
header .morning,
header .afternoon {
  transition: .2s all ease-in;
}

header.moving .view,
header.moving .tree,
header.moving .morning,
header.moving .afternoon {
  transition: none;
}

header .window-cover {
  opacity: calc((var(--percentage) - 0.9) / 0.1);
}
</style>