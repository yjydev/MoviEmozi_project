export default {
  namespaced: true,

  state: {
    profile : {},
  },
  mutations: {
    PROFILE:function(state,[url,name]){
      state.profile[name] = url
    }
  },
  actions: {
    profile:function({commit},[url,username]){
      commit('PROFILE',[url,username])
    },
  }
}