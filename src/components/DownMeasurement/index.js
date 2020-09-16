import Vue from 'vue'
import DowmMeasurement from './index.vue'

const dowmMeasurement = Vue.extend(DowmMeasurement)
let nId = 1;
const Measurement = ({params,then,cancel}) => {
    let id = 'd-m' + nId++
  
    const downMent = new dowmMeasurement({
      data: {
        postInfo: params,
      },
    }) 
    downMent.id = id
    downMent.vm = downMent.$mount() // 挂载但是并未插入dom，是一个完整的Vue实例
    downMent.vm.show = true
    downMent.dom = downMent.vm.$el
    document.body.appendChild(downMent.vm.$el) // 将dom插入body
    downMent.vm.$el.style.zIndex = nId + 100001 // 后插入的Notice组件z-index加一，保证能盖在之前的上面
    downMent.vm.$on('then', () => {
        if (typeof then === 'function') {
            then(downMent)
        }
        downMent.dom.remove();
        downMent.vm.$destroy()
    })
    downMent.vm.$on('cancel', () => {
        if (typeof cancel === 'function') {
            cancel(downMent)
        }
        downMent.dom.remove();
        downMent.vm.$destroy()
    })
    return downMent.vm
}

export default {
    install: Vue => {
      Vue.prototype.dowmMeasurement = Measurement // 组件暴露出去，并挂载在Vue的prototype上
    }
}