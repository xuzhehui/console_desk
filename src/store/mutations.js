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
    }
}

export default mutations