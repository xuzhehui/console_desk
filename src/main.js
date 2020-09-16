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
import VCharts from 'v-charts'

import ConfirmDelete from './components/confirm-delete/index.js'
import SelectProcessRouter from './components/selectProcessRoute/index.js'
import DownMeasurement from './components/DownMeasurement/index.js'
import DownProduction from './components/DownProduction/index.js'

Vue.use(ViewUI)

Vue.use(IconFont)

Vue.use(VCharts)
Vue.use(components)

Vue.use(ConfirmDelete)
Vue.use(SelectProcessRouter)//工艺路线
Vue.use(DownMeasurement)//下测量
Vue.use(DownProduction)//下生产---下生产计划

Vue.prototype.axios = axios

Vue.prototype.func = untilFn

Vue.config.productionTip = false
Vue.prototype.$Message.config({//全局提示演示关闭时间
  duration: 3
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
