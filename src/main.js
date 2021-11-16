import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './assets/css/root.css'

Vue.config.productionTip = false

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element)

import VueAwesomeSwiper from 'vue-awesome-swiper'
// import style (>= Swiper 6.x)
import 'swiper/swiper-bundle.css'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

import XEUtils from 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
Vue.use(VXETable);
Vue.use(XEUtils);

import router from './router'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
