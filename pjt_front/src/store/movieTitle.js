export default {
  namespaced: true,

  state: {
    movieTitle: [],
  },
  mutations: {
    GET_MOVIE_TITLE: function(state,list) {
      const lst = []
      for (let movie of list){
        lst.push(`${movie.title}`)
      state.movieTitle = lst
      }
    },
  },
  actions: {
    getMovieTitle: function({commit,rootState}) {
      commit('GET_MOVIE_TITLE',rootState.movieList)
    },
  }
}