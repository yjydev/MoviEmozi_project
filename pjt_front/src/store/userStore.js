export default {
  namespaced: true,

  state: {
    LoginUser: null,
  },
  mutations: {
    GET_LOGIN_USER: function(state, username) {
      state.LoginUser = username
    },
    REMOVE_LOGIN_USER: function(state) {
      state.LoginUser = null
    }
  },
  actions: {
    getLoginUser: function({commit}, username) {
      commit('GET_LOGIN_USER', username)
    },
    removeLoginUser: function({commit}) {
      commit('REMOVE_LOGIN_USER')
    }
  }
}