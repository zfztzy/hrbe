(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-57b1ac5b"],{3384:function(t,e,a){},4125:function(t,e,a){},"5dfc":function(t,e,a){"use strict";a("3384")},6220:function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("a-layout",[a("Navbar"),a("router-view")],1)},n=[],s=a("1bab"),i=a("d178"),c={name:"appHome",components:{Navbar:i["a"]},methods:{checkLogin:function(){var t=this;s["a"]({url:this.getBaseUrl()+"login/",method:"post",data:{userInfo:{user_name:this.$cookies.get("userName"),password:this.$cookies.get("password")}}}).then((function(e){"pass"==e.data.msg?console.log():(alert(e.data.msg),t.$router.push("/Login"))})).catch((function(t){console.log(t)}))}},created:function(){this.checkLogin()},watch:{$route:{handler:function(){this.checkLogin()}}}},r=c,u=(a("cb7f"),a("cba8")),l=Object(u["a"])(r,o,n,!1,null,null,null);e["default"]=l.exports},cb7f:function(t,e,a){"use strict";a("4125")},d178:function(t,e,a){"use strict";var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("a-layout-header",{staticClass:"header",staticStyle:{"background-color":"rgba(67,126,255)"}},[a("div",{staticClass:"ipsaLogo",staticStyle:{float:"left"}}),a("div",{staticClass:"userInfo",staticStyle:{float:"right"}},[a("a-dropdown",[a("div",{staticClass:"userHead"},[a("a-badge",{attrs:{count:t.count}},[a("a-avatar",{attrs:{shape:"square",icon:"user"}}),t._v(" "+t._s(t.nickname))],1)],1),a("a-menu",{attrs:{slot:"overlay"},slot:"overlay"},[a("a-menu-item",[a("a",{attrs:{href:"javascript:;"},on:{click:t.add}},[t._v("用户主页")])]),a("a-menu-item",[a("a",{attrs:{href:"javascript:;"}},[t._v("用户设置")])]),a("a-menu-item",[a("a",{attrs:{href:"javascript:;"},on:{click:t.logOut}},[t._v("注销")])])],1)],1)],1),a("a-menu",{staticStyle:{"background-color":"rgba(67,126,255)"},style:{lineHeight:"64px"},attrs:{theme:"dark",mode:"horizontal","default-selected-keys":["1"]}},[a("a-menu-item",{key:"1",on:{click:t.showTopMenu}},[t._v(" 招聘 ")]),a("a-menu-item",{key:"2"},[t._v(" 项目 ")]),a("a-menu-item",{key:"3"},[t._v(" KPI ")])],1),a("div",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}],staticClass:"topMenu",on:{mouseleave:t.close}},[a("a-space",{staticStyle:{"margin-left":"10%"},attrs:{size:200}},[a("a",{on:{click:function(e){return t.jumpPath("Applicant")}}},[a("h5",[t._v("候选人管理")])]),a("a",{on:{click:function(e){return t.jumpPath("Recruitment")}}},[a("h5",[t._v("招聘需求")])]),a("a",{on:{click:function(e){return t.jumpPath("PojectStatus")}}},[a("h5",[t._v("项目满足度")])]),a("a",{on:{click:function(e){return t.jumpPath("ProjectInfo")}}},[a("h5",[t._v("招聘看板")])])])],1)],1)},n=[],s={data:function(){return{collapsed:!1,isShow:!1,nickname:"用户名",count:0}},methods:{showTopMenu:function(){this.isShow=!0},close:function(){this.isShow=!1},jumpPath:function(t){this.$router.push({path:"/hrManageTable/"+t}),this.close()},add:function(){this.count+=1},logOut:function(){this.$cookies.remove("userName"),this.$cookies.remove("password"),this.$cookies.remove("nickname"),this.$cookies.remove("region"),alert("注销成功"),this.$router.push("/Login")}},mounted:function(){this.nickname=this.$cookies.get("nickname")}},i=s,c=(a("5dfc"),a("cba8")),r=Object(c["a"])(i,o,n,!1,null,null,null);e["a"]=r.exports}}]);
//# sourceMappingURL=chunk-57b1ac5b.e216d168.js.map