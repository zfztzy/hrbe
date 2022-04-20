import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './element.js'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
import VueCookies from 'vue-cookies'
import moment from 'moment'
import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor, /* { default global options } */)



Vue.use(VueCookies)
Vue.prototype.$moment = moment;
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Antd)


new Vue({
  ElementUI,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.prototype.getBaseUrl = function (){//changeData是函数名
  return 'http://139.9.160.24/'
}

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};