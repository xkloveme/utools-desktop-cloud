import Vue from 'vue'
import App from './App.vue'
// import vuetify from './plugins/vuetify';
import "@/assets/tailwind.css"
import 'material-design-icons-iconfont/dist/material-design-icons.css'
// axios
import VueAxios from 'vue-axios'
import axios from 'axios'
import {request} from "./network/request"
// router
import VueRouter from 'vue-router'
import router from './router'
// vuex
import store from './store'
// title
import VueWechatTitle from 'vue-wechat-title'
// cookies
import cookies from './plugins/cookies'
import utils from './plugins/utils'
import WtUI from "./packages"


// vuetify
Vue.config.productionTip = false
// axios
Vue.use(VueAxios, axios)
Vue.prototype.$axios = request
// router
Vue.use(VueRouter)
// title
Vue.use(VueWechatTitle)
// cookies
Vue.use(cookies)
Vue.use(utils)
Vue.use(WtUI)



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
