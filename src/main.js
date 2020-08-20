import Vue from 'vue'
import App from './App.vue'
import router from './route/index'
import store from './store/index'
import components  from '@/untils/components'
import axios from './axios/index'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import untilFn from './untils/until'

import ConfirmDelete from './components/confirm-delete/index.js'

Vue.use(ViewUI)

Vue.use(components)

Vue.use(ConfirmDelete)

Vue.prototype.axios = axios

Vue.prototype.func = untilFn

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
