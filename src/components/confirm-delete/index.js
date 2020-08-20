import Vue from 'vue'
import Delete from './index.vue'
const ConfirmDelete = Vue.extend(Delete) // 直接将Vue组件作为Vue.extend的参数
let nId = 1;

const Notice = ({content,type,title,then,cancel}) => {
    let id = 'notice-' + nId++
  
    const ConfirmDeleteInstance = new ConfirmDelete({
      data: {
        content: content,
        type:type||'error',
        title:title||'确认删除'
      },
    }) // 实例化一个带有content内容then方法cancel方法的ConfirmDeleteInstance
    ConfirmDeleteInstance.id = id
    ConfirmDeleteInstance.vm = ConfirmDeleteInstance.$mount() // 挂载但是并未插入dom，是一个完整的Vue实例
    ConfirmDeleteInstance.vm.show = true
    ConfirmDeleteInstance.dom = ConfirmDeleteInstance.vm.$el
    document.body.appendChild(ConfirmDeleteInstance.vm.$el) // 将dom插入body
    ConfirmDeleteInstance.vm.$el.style.zIndex = nId + 100001 // 后插入的Notice组件z-index加一，保证能盖在之前的上面
    ConfirmDeleteInstance.vm.$on('then', () => {
        if (typeof then === 'function') {
            then(ConfirmDeleteInstance)
        }
        ConfirmDeleteInstance.dom.remove();
        ConfirmDeleteInstance.vm.$destroy()
    })
    ConfirmDeleteInstance.vm.$on('cancel', () => {
        if (typeof cancel === 'function') {
            cancel(ConfirmDeleteInstance)
        }
        ConfirmDeleteInstance.dom.remove();
        ConfirmDeleteInstance.vm.$destroy()
    })
    return ConfirmDeleteInstance.vm
}


export default {
    install: Vue => {
      Vue.prototype.confirmDelete = Notice // 组件暴露出去，并挂载在Vue的prototype上
    }
}