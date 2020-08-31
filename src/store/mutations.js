const mutations  = {
    updateCrumbs(state,payload){
        state.crumbs = [];
        for(let i in payload){
            if(payload[i]){
                state.crumbs.push(payload[i])
            }
        }
    },
    updatekeyBoard(state,val){
        state.keyBoard_value = val
    },
    saveUser(state){
        let userInfo = localStorage.getItem('user_info');
        state.userInfo = JSON.parse(userInfo)
    }
}

export default mutations