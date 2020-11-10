import axios from '../axios/index'
import fn from '../untils/until'
const actions = {
    undata_navData(store){//全局侧边栏更新
        axios('/api/menu').then(res=>{
            let deepObjToArray = function(obj){
                let result = Object.values(obj);
                result.map(v=> fn.isType(v.sub) == 'Object' ? v.sub = deepObjToArray(v.sub) : '' )
                return result
            };
            let result = deepObjToArray(res.data)
            store.commit('updataNavgation',result)
        })
    },
    update_notice(store){
        axios('/api/notice_list_unread/')
        .then(res=>{
            if(res.code == 200){
                store.commit('updataNoticeNum',res.data.total)
            }
        })
    }
}

export default actions