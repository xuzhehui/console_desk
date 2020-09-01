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
            let deepData = function(row){
                row.map(v=>{
                    if(v.sub_action!=0){
                        v.sub.map(k=>k.page=v.page)
                        v.page = '';
                    }
                    v.page = ''
                })
                return row
            };
            let result = deepObjToArray(res.data)
            result = deepData(result)
            store.commit('updataNavgation',result)
        })
    }
}

export default actions