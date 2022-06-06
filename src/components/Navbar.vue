<template>
    <a-layout-header class="header" style="background-color: rgba(67,126,255);">
        <div class="ipsaLogo" style="float:left"/>
        <div class="userInfo" style="float:right">
            <a-dropdown>
              <div class="userHead">
                <a-badge :count="count"><a-avatar shape="square" icon="user"/>
                {{nickname}}</a-badge>
              </div>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a href="javascript:;" @click="add">用户主页</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">用户设置</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;" @click="logOut">注销</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
        </div>
        <a-menu
            theme="dark"
            mode="horizontal"
            :default-selected-keys="['1']"
            :style="{ lineHeight: '64px' }"
            style="background-color: rgba(67,126,255);"
        >
            <a-menu-item key="1" @click="showTopMenu">
              招聘管理
            </a-menu-item>
            <a-menu-item key="2" @click="showTopMenu2">
              项目管理
            </a-menu-item>
            <a-menu-item key="3" @click="showTopMenu3">
              运营管理
            </a-menu-item>
            <a-menu-item key="4" @click="showTopMenu4">
              人员管理
            </a-menu-item>
        </a-menu>
        <div class="topMenu" v-show="isShow" @mouseleave="close">
            <a-space :size="200" style="margin-left:10%">
                <a @click="jumpPath('Applicant')"><h5>候选人管理</h5></a>
                <a @click="jumpPath('Recruitment')"><h5>招聘需求</h5></a>
                <a @click="jumpPath('PojectStatus')"><h5>项目满足度</h5></a>
                <a @click="jumpPath('RecruitChart')"><h5>招聘看板</h5></a>
            </a-space>
        </div>
        <div class="topMenu" v-show="isShow2" @mouseleave="close">
            <a-space :size="200" style="margin-left:10%">
                <a @click="jumpPath2('pduinfo')"><h5>PDU信息</h5></a>
                <a @click="jumpPath2('ProjectInfo')"><h5>项目信息</h5></a>
                <a @click="jumpPath2('PoInfo')"><h5>PO信息</h5></a>
                <a @click="jumpPath2('CustomerInfo')"><h5>客户信息</h5></a>
            </a-space>
        </div>
        <div class="topMenu" v-show="isShow3" @mouseleave="close">
          <a-space :size="200" style="margin-left:10%">
              <a @click="jumpPath3('PoList')"><h5>PO运营</h5></a> 
              <a @click="jumpPath3('Salary')"><h5>薪资调整</h5></a> 
          </a-space>
        </div>
         <div class="topMenu" v-show="isShow4" @mouseleave="close">
          <a-space :size="200" style="margin-left:10%">
              <a @click="jumpPath4('EmployeeNum')"><h5>员工工号</h5></a> 
              <a @click="jumpPath4('Employee')"><h5>员工信息</h5></a> 
              <a @click="jumpPath4('Contact')"><h5>员工沟通</h5></a> 
          </a-space>
        </div>
    </a-layout-header>
</template>
  <script>
  export default {
    data() {
      return {
        collapsed: false,
        isShow: false,
        nickname: '用户名',
        count: 0,
        isShow2: false,
        isShow3: false,
        isShow4: false
      }
    },
    methods: {
        showTopMenu() {
          this.close()
          this.isShow = true  
        },
        showTopMenu2() {
          this.close()
          this.isShow2 = true 
        },
        showTopMenu3() {
          this.close()
          this.isShow3 = true
        },
        showTopMenu4() {
          this.close()
          this.isShow4 = true
        },
        close () {
          this.isShow = false
          this.isShow2 = false
          this.isShow3 = false
          this.isShow4 = false
        },
        jumpPath(value){
          this.checkLogin()
          this.$router.push({path:'/hrManageTable/' + value})
          this.close()
        },
        jumpPath2(value){
          this.checkLogin()
          this.$router.push({path:'/projectManager/' + value})
          this.close()
        },
        jumpPath3(value){
          this.checkLogin()
          this.$router.push({path:'/businessManager/' + value})
          this.close()
        },
        jumpPath4(value){
          this.checkLogin()
          this.$router.push({path:'/hrManager/' + value})
          this.close()
        },
        add () {
          this.count += 1
        },
        logOut () {
          this.$cookies.remove("userName")
          this.$cookies.remove("password")
          this.$cookies.remove("nickname")
          this.$cookies.remove("region")
          alert('注销成功')
          this.$router.push('/Login')
        }
    },
    mounted () {
      this.nickname = this.$cookies.get("nickname")
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
  color: white;
}

.userName{
  position: absolute;
  color: lightblue;
  top: 0;
}


</style>
