const mutations  = {
    updateCrumbs(state,payload){
        state.crumbs = [];
        for(let i in payload){
            if(payload[i]){
                state.crumbs.push(payload[i])
            }
        }
    }
}

export default mutations