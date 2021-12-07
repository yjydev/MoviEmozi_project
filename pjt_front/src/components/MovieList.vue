<template>
  <div class="d-flex flex-column p-5">
    <div class="d-flex justify-content-between mx-3">
      <the-sort-bar
      @sort-genre="sortGenre"
      @sort-runtime="sortRuntime"
      @sort-popular="sortPopular"
      @sort-release-date="sortReleaseDate"
      ></the-sort-bar>

      <the-search-bar 
      :movie-all="movieAll"
      ></the-search-bar>
      


    </div>
    <div class="home" style="flex-wrap:wrap;">
    <transition-group tag="div" name="cell" class="container111">
      <movie-card
      v-for="movieCard in showMovieList"
      :key="movieCard.id"
      :movieCard="movieCard"
      class="col-lg-2 col-md-3 col-sm-4 my-3 cell"
      >
      </movie-card>
    </transition-group>
 


    </div>
  </div>
</template>

<script>
import TheSortBar from '@/components/TheSortBar'
import TheSearchBar from '@/components/TheSearchBar'
import MovieCard from '@/components/MovieCard'
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  name: 'MovieList',
  components: {
    TheSearchBar,
    TheSortBar,
    MovieCard,
  },

  data: function () {
    return {
      genre: null,
      showMovieList: null,
      movieAll: null,
      selectMovie: null,
      searchThisMovie:null,
    }
  },

  methods: {
    sortGenre: function (genre) {
      if (genre == '장르 전체'){
        this.showMovieList = this.movieAll
      } else {
        var filteredMovie = []
        for (var movie of this.movieAll){
          if (movie.genres.includes(genre)) {
            filteredMovie.push(movie)
          }
        }
        this.showMovieList = filteredMovie
      }
    },

    sortRuntime: function(sortby) {
      var list = this.showMovieList
      list.sort(function(a,b) {
        return a.runtime - b.runtime
      })
      if (sortby === 'short') {
        this.showMovieList = list
      } else {
        this.showMovieList = list.reverse()
      }
    },

    // sortRank: function(sortby) {
    //   var list = this.showMovieList
    //   list.sort(function(a,b) {
    //     return a.vote_average - b.vote_average
    //   })
    //   if (sortby === 'low') {
    //     this.showMovieList = list
    //   } else {
    //     this.showMovieList = list.reverse()
    //   }
    // },

    sortPopular: function(sortby) {
      var list = this.showMovieList
      list.sort(function(a,b) {
        return a.popularity - b.popularity
      })
      if (sortby === 'low') {
        this.showMovieList = list
      } else {
        this.showMovieList = list.reverse()
      }
    },

    sortReleaseDate: function(sortby){
      console.log(sortby)
      var list = this.showMovieList
      for (let movie of list) {
        movie.release_date = this.changeDateFormatJoin(movie.release_date)
      }
      list.sort(function(a,b) {
        return a.release_date - b.release_date
      })
      for (let movie of list) {
        movie.release_date = this.changeDateFormatDash(movie.release_date)
      }
      if (sortby == 'old') {
        this.showMovieList = list
      } else {
        this.showMovieList = list.reverse()
      }
    },
    
    changeDateFormatJoin: function(date) {
      var changeDate = []
      for (var d of date) {
        if (d != '-') {
          changeDate.push(d)
        }
      }
      return changeDate.join('')
    },

    changeDateFormatDash: function(date) {
      return date.slice(0,4) + '-' + date.slice(4,6) + '-' + date.slice(6,8)
    },


    searchMovie: function(searchThisMovie) {
      this.searchThisMovie = searchThisMovie
    }
  },

  computed: {
    ...mapState([
      'movieList',
      'selectGenre'
    ]),
  },
  created: function () {
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/movies/',
    })
    .then(res => {
      this.movieAll = res.data
      this.showMovieList = this.movieAll
    })
  }
}
</script>




<style>
.container111 {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 10px;
}
.cell-move {
  transition: transform 2s;
}
</style>
