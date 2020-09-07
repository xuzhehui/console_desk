
const mutations  = {
    updateCrumbs(state,payload){
        state.crumbs = [];
        for(let i in payload){
            if(payload[i]){
                state.crumbs.push(payload[i])
            }
        }
    },
    saveUser(state){
        let userInfo = localStorage.getItem('user_info');
        state.userInfo = JSON.parse(userInfo)
    },
    updataNavgation(state,payload){
        state.navgationData = payload
    },
    savePageEditData(state,payload){
        state.pageEditData = payload
    },
    clearPageEditData(state){
        state.pageEditData = []
    },
}

export default mutations