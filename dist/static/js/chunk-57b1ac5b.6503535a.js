(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-57b1ac5b"],{3384:function(t,e,a){},4125:function(t,e,a){},"5dfc":function(t,e,a){"use strict";a("3384")},6220:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("a-layout",[a("Navbar"),a("router-view")],1)},o=[],s=a("1bab"),c=a("d178"),i={name:"appHome",components:{Navbar:c["a"]},methods:{checkLogin:function(){var t=this;s["a"]({url:"http://139.9.160.24/login/",method:"post",data:{userInfo:{user_name:this.$cookies.get("userName"),password:this.$cookies.get("password")}}}).then((function(e){"pass"==e.data.msg?console.log():(alert(e.data.msg),t.$router.push("/Login"))})).catch((function(t){console.log(t)}))}},created:function(){this.checkLogin()}},u=i,r=(a("cb7f"),a("cba8")),l=Object(r["a"])(u,n,o,!1,null,null,null);e["default"]=l.exports},cb7f:function(t,e,a){"use strict";a("4125")},d178:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("a-layout-header",{staticClass:"header",staticStyle:{"background-color":"rgba(67,126,255)"}},[a("div",{staticClass:"ipsaLogo",staticStyle:{float:"left"}}),a("div",{staticClass:"userInfo",staticStyle:{float:"right"}},[a("div",{staticClass:"userHead"})]),a("a-menu",{staticStyle:{"background-color":"rgba(67,126,255)"},style:{lineHeight:"64px"},attrs:{theme:"dark",mode:"horizontal","default-selected-keys":["2"]}},[a("a-menu-item",{key:"1",on:{click:t.showTopMenu}},[t._v(" 招聘 ")]),a("a-menu-item",{key:"2"}),a("a-menu-item",{key:"3"})],1),a("div",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}],staticClass:"topMenu",on:{mouseleave:t.close}},[a("a-space",{staticStyle:{"margin-left":"10%"},attrs:{size:200}},[a("a",{on:{click:function(e){return t.jumpPath("Applicant")}}},[a("h5",[t._v("候选人管理")])]),a("a",{on:{click:function(e){return t.jumpPath("Recruitment")}}},[a("h5",[t._v("招聘需求")])]),a("a",{on:{click:function(e){return t.jumpPath("PojectStatus")}}},[a("h5",[t._v("项目满足度")])]),a("a",{on:{click:function(e){return t.jumpPath("ProjectInfo")}}},[a("h5",[t._v("招聘看板")])])])],1)],1)},o=[],s={data:function(){return{collapsed:!1,isShow:!1}},methods:{showTopMenu:function(){this.isShow=!0},close:function(){this.isShow=!1},jumpPath:function(t){this.$router.push({path:"/hrManageTable/"+t}),this.close()}}},c=s,i=(a("5dfc"),a("cba8")),u=Object(i["a"])(c,n,o,!1,null,null,null);e["a"]=u.exports}}]);
//# sourceMappingURL=chunk-57b1ac5b.6503535a.js.map