import Vue from 'vue'
import App from './App.vue'
import router from './route/index'
import store from './store/index'
import components  from '@/untils/components'
import axios from './axios/index'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import untilFn from './untils/until'
import IconFont from './assets/iconfont/iconfont.js'
import echarts from 'echarts'

import Print from 'vue-print-nb'

Vue.use(Print)

Vue.use(ViewUI)

Vue.use(IconFont)

Vue.use(components)

Vue.prototype.axios = axios

Vue.prototype.func = untilFn//全局引入自定义函数库

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$Message.config({//全局提示演示关闭时间
  duration: 3
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
