import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "./assets/css/buju.css"
import "./assets/css/index.css"
import "./assets/css/iconfont.css"
import "./assets/scss/common.scss"
import { emoji } from './api/emoji.js'
Vue.use(ElementUI)
Vue.prototype.emoji = emoji

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
