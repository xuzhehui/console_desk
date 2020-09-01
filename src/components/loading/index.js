import Vue from 'vue'
import loadingComponent from './index.vue'

const LoadingConstructor = Vue.extend(loadingComponent)

const instance = new LoadingConstructor({
  el: document.createElement('div')
})

instance.show = false // 默认隐藏
const loading = {
  show() { // 显示方法
    instance.show = true
    document.body.appendChild(instance.$el)
  },
  hide() { // 隐藏方法
    instance.show = false
    // let dom = document.querySelector('.loading-box')
    // if(dom){
    //   setTimeout(()=>document.body.removeChild(dom),1000)
    // }
  }
}

export default {
  install() {
    if (!Vue.$loading) {
      Vue.prototype.$loading = loading
    }
    Vue.mixin({
      created() {
        this.$loading = Vue.prototype.$loading
      }
    })
  }
}