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

Vue.use(VueCookies)
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Antd)
new Vue({
  ElementUI,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
