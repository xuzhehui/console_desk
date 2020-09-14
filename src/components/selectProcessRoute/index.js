import Vue from 'vue'
import selectProcessRouter from './index.vue'

const SelectProcessRouter = Vue.extend(selectProcessRouter)
let nId = 1;
const selectRouter = ({params,then,cancel}) => {
    let id = 'se-router' + nId++
  
    const ProcessRouter = new SelectProcessRouter({
      data: {
        params: params||params,
      },
    }) 
    ProcessRouter.id = id
    ProcessRouter.vm = ProcessRouter.$mount() // 挂载但是并未插入dom，是一个完整的Vue实例
    ProcessRouter.vm.show = true
    ProcessRouter.dom = ProcessRouter.vm.$el
    document.body.appendChild(ProcessRouter.vm.$el) // 将dom插入body
    ProcessRouter.vm.$el.style.zIndex = nId + 100001 // 后插入的Notice组件z-index加一，保证能盖在之前的上面
    ProcessRouter.vm.$on('then', () => {
        if (typeof then === 'function') {
            then(ProcessRouter)
        }
        ProcessRouter.dom.remove();
        ProcessRouter.vm.$destroy()
    })
    ProcessRouter.vm.$on('cancel', () => {
        if (typeof cancel === 'function') {
            cancel(ProcessRouter)
        }
        ProcessRouter.dom.remove();
        ProcessRouter.vm.$destroy()
    })
    return ProcessRouter.vm
}

export default {
    install: Vue => {
      Vue.prototype.selectProcessRouter = selectRouter // 组件暴露出去，并挂载在Vue的prototype上
    }
}