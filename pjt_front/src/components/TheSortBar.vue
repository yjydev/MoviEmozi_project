<template>
  <div class="d-flex justify-content-between" style="width: 530px">
    <div class="d-flex">
      <!-- 러닝타임(긴순/짧은순) -->
      <div class="dropdown text-white mx-3">
        <button class="btn btn-outline-secondary dropdown-toggle slow" 
        type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
          <span class="mx-2">러닝타임 {{sortbyRunTime}}</span>
        </button>
          <ul class="dropdown-menu dropdown-menu-dark flip-list-move" aria-labelledby="dropdownMenuButton2">
            <li><button class="dropdown-item" @click="sortRuntime('long')">내림차순</button></li>
            <li><button class="dropdown-item" @click="sortRuntime('short')">오름차순</button></li>
          </ul>
      </div>
      <!-- 평점(vote_average) -->
      <!-- <div class="dropdown text-white mx-3">
        <button class="btn btn-outline-secondary dropdown-toggle" 
        type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
          <span class="mx-2">평점 {{selectRank}}</span>
        </button>
          <ul class="dropdown-menu dropdown-menu-dark flip-list-move" aria-labelledby="dropdownMenuButton2">
            <li><button class="dropdown-item" @click="sortRank('high')">높은 순</button></li>
            <li><button class="dropdown-item" @click="sortRank('low')">낮은 순</button></li>
          </ul>
      </div> -->

      <!-- 인기도(popularity) -->
      <div class="dropdown text-white mx-3">
        <button class="btn btn-outline-secondary dropdown-toggle" 
        type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
          <span class="mx-2">인기도 {{selectPopular}}</span>
        </button>
          <ul class="dropdown-menu dropdown-menu-dark flip-list-move" aria-labelledby="dropdownMenuButton2">
            <li><button class="dropdown-item" @click="sortPopular('high')">높은 순</button></li>
            <li><button class="dropdown-item" @click="sortPopular('low')">낮은 순</button></li>
          </ul>
      </div>


      <!-- 장르 -->
      <div class="dropdown text-white mx-3">
        <button 
        class="btn btn-outline-secondary dropdown-toggle" 
        type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
          <span class="mx-2">{{selectGenre}}</span>
        </button>
        <ul class="dropdown-menu dropdown-menu-dark flip-list-move" aria-labelledby="dropdownMenuButton2">
          <div v-for="(genre, i) in genres" :key="i">
            <li><button @click="sortMovieList(genre)" class="dropdown-item">{{ genre }}</button></li>
          </div>
        </ul>
      </div>
      
      <!-- 개봉일(최신순/오래된순) -->
      <div class="dropdown text-white mx-3">
        <button class="btn btn-outline-secondary dropdown-toggle" 
        type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
          <span class="mx-2">개봉일 {{sortbyReleaseDate}}</span>
        </button>
          <ul class="dropdown-menu dropdown-menu-dark flip-list-move" aria-labelledby="dropdownMenuButton2">
            <li><button class="dropdown-item" @click="sortReleaseDate('new')">최신순</button></li>
            <li><button class="dropdown-item" @click="sortReleaseDate('old')">오래된순</button></li>
          </ul>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TheSortBar',
  data: function () {
    return {
      selectGenre: '장르 전체',
      genres: ['장르 전체', '액션', '드라마', '코미디', 'SF','공포', '스릴러','애니메이션', ],
      sortbyRunTime: null,
      selectRank: null,
      selectPopular: null,
      sortbyReleaseDate: null,
    }
  },
  
  methods: {
    sortMovieList: function(genre) {
      this.selectGenre = genre
      this.$emit('sort-genre', genre)
    },
    sortRuntime: function(sortby) {
      if (sortby === 'short') {
        this.sortbyRunTime = '오름차순'
      } else {
        this.sortbyRunTime = '내림차순'
      }
      this.$emit('sort-runtime', sortby)
    },


    // sortRank: function(sortby) {
    //   if (sortby === 'high') {
    //     this.selectRank = '높은 순'
    //   } else {
    //     this.selectRank = '낮은 순'
    //   }
    //   this.$emit('sort-rank', sortby)
    // },

    sortPopular: function(sortby) {
      if (sortby === 'high') {
        this.selectPopular = '높은 순'
      } else {
        this.selectPopular = '낮은 순'
      }
      this.$emit('sort-popular', sortby)
    },

    sortReleaseDate: function(sortby) {
      if (sortby === 'new'){
        this.sortbyReleaseDate = '최신순'
      } else {
        this.sortbyReleaseDate = '오래된순'
      }
      this.$emit('sort-release-date', sortby)
    },

  },
  computed: {
    ...mapState([
      'movieList'
    ])
  }
}
</script>

<style>
.flip-list-move {
  transition: transform 1s;
}
</style>