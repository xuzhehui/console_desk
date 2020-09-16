import Vue from 'vue'
import DownProduction from './index.vue'

const downProduction = Vue.extend(DownProduction)
let nId = 1;
const ProductionModal = ({title,params,type,then,cancel}) => {
    let id = 'd-m' + nId++
  
    const Production = new downProduction({
      data: {
        title:title,
        planInfo: params,
        type:type,//1下生产  2下生产计划
      },
    }) 
    Production.id = id
    Production.vm = Production.$mount() // 挂载但是并未插入dom，是一个完整的Vue实例
    Production.vm.show = true
    Production.dom = Production.vm.$el
    document.body.appendChild(Production.vm.$el) // 将dom插入body
    Production.vm.$el.style.zIndex = nId + 100001 // 后插入的Notice组件z-index加一，保证能盖在之前的上面
    Production.vm.$on('then', () => {
        if (typeof then === 'function') {
            then(Production)
        }
        Production.dom.remove();
        Production.vm.$destroy()
    })
    Production.vm.$on('cancel', () => {
        if (typeof cancel === 'function') {
            cancel(Production)
        }
        Production.dom.remove();
        Production.vm.$destroy()
    })
    return Production.vm
}

export default {
    install: Vue => {
      Vue.prototype.downProduction = ProductionModal // 组件暴露出去，并挂载在Vue的prototype上
    }
}