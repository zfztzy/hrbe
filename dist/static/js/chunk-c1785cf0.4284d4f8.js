(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c1785cf0"],{"1d92":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("Navbar",{attrs:{links:t.links,pagestyle:t.pagestyle}},t._l(t.links,(function(e){return s("a",{key:e.msg,class:{right:e.isRight},on:{click:function(s){return t.studyList(e.type)}}},[t._v(t._s(e.msg))])})),0),s("router-view")],1)},n=[],o=s("d178"),i=s("1bab"),c={components:{Navbar:o["a"]},name:"Study",data:function(){return{pagestyle:"background-color: white; color: black",links:[{type:"front-end",msg:"前端"},{type:"back-end",msg:"后端"},{type:"test",msg:"测试"},{type:"leetcode",msg:"力扣"},{type:"ai",msg:"人工智能"}]}},methods:{studyList:function(t){this.$router.push({path:"/study/list",query:{type:t}})},refresh:function(){window.scrollTo(0,0)}},created:function(){var t=this;i["a"]({url:"http://39.107.227.252/getNavbarList/",data:{type:"study"},method:"post"}).then((function(e){t.links=e.data.navbarList})).catch((function(t){console.log(t)}))},watch:{$route:"refresh"}},r=c,u=s("cba8"),l=Object(u["a"])(r,a,n,!1,null,null,null);e["default"]=l.exports},3384:function(t,e,s){},"5dfc":function(t,e,s){"use strict";s("3384")},d178:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("a-layout-header",{staticClass:"header",staticStyle:{"background-color":"rgba(67,126,255)"}},[s("div",{staticClass:"ipsaLogo",staticStyle:{float:"left"}}),s("div",{staticClass:"userInfo",staticStyle:{float:"right"}},[s("a-dropdown",[s("div",{staticClass:"userHead"},[s("a-badge",{attrs:{count:t.count}},[s("a-avatar",{attrs:{shape:"square",icon:"user"}}),t._v(" "+t._s(t.nickname))],1)],1),s("a-menu",{attrs:{slot:"overlay"},slot:"overlay"},[s("a-menu-item",[s("a",{attrs:{href:"javascript:;"},on:{click:t.add}},[t._v("用户主页")])]),s("a-menu-item",[s("a",{attrs:{href:"javascript:;"}},[t._v("用户设置")])]),s("a-menu-item",[s("a",{attrs:{href:"javascript:;"},on:{click:t.logOut}},[t._v("注销")])])],1)],1)],1),s("a-menu",{staticStyle:{"background-color":"rgba(67,126,255)"},style:{lineHeight:"64px"},attrs:{theme:"dark",mode:"horizontal","default-selected-keys":["1"]}},[s("a-menu-item",{key:"1",on:{click:t.showTopMenu}},[t._v(" 招聘 ")]),s("a-menu-item",{key:"2",on:{click:t.showTopMenu2}},[t._v(" 项目 ")]),s("a-menu-item",{key:"3"},[t._v(" KPI ")])],1),s("div",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}],staticClass:"topMenu",on:{mouseleave:t.close}},[s("a-space",{staticStyle:{"margin-left":"10%"},attrs:{size:200}},[s("a",{on:{click:function(e){return t.jumpPath("Applicant")}}},[s("h5",[t._v("候选人管理")])]),s("a",{on:{click:function(e){return t.jumpPath("Recruitment")}}},[s("h5",[t._v("招聘需求")])]),s("a",{on:{click:function(e){return t.jumpPath("PojectStatus")}}},[s("h5",[t._v("项目满足度")])]),s("a",{on:{click:function(e){return t.jumpPath("ProjectInfo")}}},[s("h5",[t._v("招聘看板")])])])],1),s("div",{directives:[{name:"show",rawName:"v-show",value:t.isShow2,expression:"isShow2"}],staticClass:"topMenu",on:{mouseleave:t.close}},[s("a-space",{staticStyle:{"margin-left":"10%"},attrs:{size:200}},[s("a",{on:{click:function(e){return t.jumpPath2("ProjectInfo")}}},[s("h5",[t._v("项目信息")])])])],1)],1)},n=[],o={data:function(){return{collapsed:!1,isShow:!1,nickname:"用户名",count:0,isShow2:!1}},methods:{showTopMenu:function(){this.isShow=!0},showTopMenu2:function(){this.isShow2=!0},close:function(){this.isShow=!1,this.isShow2=!1},jumpPath:function(t){this.$router.push({path:"/hrManageTable/"+t}),this.close()},jumpPath2:function(t){this.$router.push({path:"/projectManager/"+t}),this.close()},add:function(){this.count+=1},logOut:function(){this.$cookies.remove("userName"),this.$cookies.remove("password"),this.$cookies.remove("nickname"),this.$cookies.remove("region"),alert("注销成功"),this.$router.push("/Login")}},mounted:function(){this.nickname=this.$cookies.get("nickname")}},i=o,c=(s("5dfc"),s("cba8")),r=Object(c["a"])(i,a,n,!1,null,null,null);e["a"]=r.exports}}]);
//# sourceMappingURL=chunk-c1785cf0.4284d4f8.js.map