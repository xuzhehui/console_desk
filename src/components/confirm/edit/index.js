import Vue from 'vue'
import Edit from './index.vue'

const EditConfirm = Vue.extend(Edit)

const Content = ({title,info,placeholder,then,cancel})=>{
    const instance = new EditConfirm({
        data:{
            title:title,
            info:info,
            show:false,
            placeholder:placeholder||'请输入'
        }
    })
    instance.vm = instance.$mount()
    instance.vm.show = true
    instance.dom = instance.vm.$el
    document.body.appendChild(instance.vm.$el) // 将dom插入body
    instance.vm.$on('then', (result) => {
        if (typeof then === 'function') {
            then(instance.info)
        }
        instance.dom.remove();
        instance.vm.$destroy()
    })
    instance.vm.$on('cancel', () => {
        if (typeof cancel === 'function') {
            cancel(instance)
        }
        instance.dom.remove();
        instance.vm.$destroy()
    })
    return instance.vm
}
export default {
    install: Vue => {
      Vue.prototype.confirmEdit = Content // 组件暴露出去，并挂载在Vue的prototype上
    }
}


