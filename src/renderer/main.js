import Vue from 'vue'
import ElementUI from 'element-ui'
import { remote } from 'electron'

import App from './App'
import router from './router'
import store from './store'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/style/index.scss'
import './assets/style/iconfont/iconfont'

import OSS from '@/plugins/oss'

Vue.use(OSS)
Vue.use(ElementUI, { size: 'mini' })

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

document.title = `云存储客户端 v${remote.app.getVersion()}`

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
