<template>
    <a-layout-header class="header" style="background-color: rgba(67,126,255);">
        <div class="ipsaLogo" style="float:left"/>
        <div class="userInfo" style="float:right">
            <div class="userHead"></div>
        </div>
        <a-menu
            theme="dark"
            mode="horizontal"
            :default-selected-keys="['2']"
            :style="{ lineHeight: '64px' }"
            style="background-color: rgba(67,126,255);"
        >
            <a-menu-item key="1" @click="showTopMenu">
            招聘
            </a-menu-item>
            <a-menu-item key="2">
            </a-menu-item>
            <a-menu-item key="3">
            </a-menu-item>
        </a-menu>
        <div class="topMenu" v-show="isShow" @mouseleave="close">
            <a-space :size="200" style="margin-left:10%">
                <a @click="jumpPath('Applicant')"><h5>候选人管理</h5></a>
                <a @click="jumpPath('Recruitment')"><h5>招聘需求</h5></a>
                <a @click="jumpPath('PojectStatus')"><h5>项目满足度</h5></a>
                <a @click="jumpPath('ProjectInfo')"><h5>招聘看板</h5></a>
            </a-space>
        </div>
    </a-layout-header>
</template>
  <script>
  export default {
    data() {
      return {
        collapsed: false,
        isShow: false
      }
    },
    methods: {
        showTopMenu() {
            this.isShow = true  
        },
        close () {
            this.isShow = false
        },
        jumpPath(value){
            this.$router.push({path:'/hrManageTable/' + value})
            this.close()
        }
    }
  };
  </script>
  
  <style>
  #components-layout-demo-top-side-2 .logo {
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 28px 16px 0;
    float: left;
  }

  .topMenu{
      background:  #e6e6e6;
      width: 100%;
      min-height: 200px;
      position: absolute;
      z-index: 1000;
      left: 0;
  }

  .ipsaLogo {
    width: 100px;
    height: 40px;
    padding: 10px 20px 10px;
    background-image: url(https://ipsapro.isoftstone.com/portal/styles/img/logos/iPSA_Logo.png);
    background-repeat: no-repeat;
    background-position: 19px 0px;
    padding: 10px 20px 10px;
    float: left;
    padding: 10px 20px 10px;
    margin-left: -20px;
    margin-top: 10px;
    font-size: 20px;
    font-weight: 200;
    color: #777777;
  }


.userHead {
margin-top: 5px;
border-radius: 50%;
width: 50px;
height: 50px;
background: yellow;
}

  </style>
  