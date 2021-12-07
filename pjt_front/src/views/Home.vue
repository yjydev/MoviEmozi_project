<template>
  <div class="home">
    <box-office></box-office>
    <movie-list></movie-list>
  </div>
</template>

<script>
import BoxOffice from '@/components/BoxOffice'
import MovieList from '@/components/MovieList'

export default {
  name: 'Home',
  components: {
    BoxOffice,
    MovieList,
  },
  data: function() {
    return {
      isLogin: false,
    }
  },
  methods: {
  },
  created: function() {
    // this.$store.dispatch('loadMovieList')

    if (localStorage.getItem('jwt')){
      this.isLogin = true
      this.$store.dispatch('setToken')
    }

    this.$store.dispatch('CreateUserList')
  }
}
</script>
