import Vue from 'vue'
import DispatchOrder from './index.vue'

const dispatchOrders = Vue.extend(DispatchOrder)
let nId = 1;
const DispatchsModal = ({params,then,cancel}) => {
    let id = 'd-o' + nId++
  
    const dispatchOrder = new dispatchOrders({
      data: {
        params: params,
      },
    }) 
    dispatchOrder.id = id
    dispatchOrder.vm = dispatchOrder.$mount()
    dispatchOrder.vm.show = true
    dispatchOrder.dom = dispatchOrder.vm.$el
    document.body.appendChild(dispatchOrder.vm.$el)
    dispatchOrder.vm.$el.style.zIndex = nId + 100001
    dispatchOrder.vm.$on('then', () => {
        if (typeof then === 'function') {
            then(dispatchOrder)
        }
        dispatchOrder.dom.remove();
        dispatchOrder.vm.$destroy()
    })
    dispatchOrder.vm.$on('cancel', () => {
        if (typeof cancel === 'function') {
            cancel(dispatchOrder)
        }
        dispatchOrder.dom.remove();
        dispatchOrder.vm.$destroy()
    })
    return dispatchOrder.vm
}

export default {
    install: Vue => {
      Vue.prototype.dispatchOrder = DispatchsModal // 组件暴露出去，并挂载在Vue的prototype上
    }
}