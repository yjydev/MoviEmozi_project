<template>
  <div>
    <h1 class="p text-white">Box office</h1>
    <div class="carouselm">
      <carousel-3d  
      :controls-visible="true" 
      :controls-prev-html="'&#10092;'" 
      :controls-next-html="'&#10093;'" 
      :height="485" :width="340"
      :clickable="false"
      
      >
        <slide 
        v-for="(slide, i) in slides" 
        :index="i"
        :key="i"
        id="shadow"
        class="border border-dark rounded rounded-3"
        >
          <figure v-if="topTenPosterPath[i]">
              <img :src="`https://image.tmdb.org/t/p/original/${topTenPosterPath[i]}`" >
          </figure>
        </slide>
      </carousel-3d>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Carousel3d, Slide } from 'vue-carousel-3d';

export default {
  name: 'BoxOffice',
  components: {
    Carousel3d,
    Slide
  },
  data: function() {
    return {
      topTenMovie: [],
      topTenPosterPath: [],
      slides: 10
    }
  },
  methods: {
  },

  created() {
    const KOFIC_API = process.env.VUE_APP_KOFIC_API
    const TMDB_API = process.env.VUE_APP_TMDB_API

    var date = new Date()
    var year = date.getFullYear()
    var month = ("0" + (1 + date.getMonth())).slice(-2)
    var tday = ("0" + date.getDate()).slice(-2)
    const today = year + month + tday - 7

    axios({
      method: 'get',
      url: `http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=${KOFIC_API}&targetDt=${today}&weekGb=0`,
    })
    .then(res => {
      // console.log(res.data.boxOfficeResult.weeklyBoxOfficeList)
      for (const boxofficeobj of res.data.boxOfficeResult.weeklyBoxOfficeList) {
        var boxOfficeMovie = JSON.parse(JSON.stringify(boxofficeobj))
        this.topTenMovie.push(boxOfficeMovie.movieNm)
      }
    // console.log(this.topTenMovie)

      for (const movie of this.topTenMovie) {
        // console.log(movie)
        axios({
          method: 'get',
          url: `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API}&language=ko-KR&page=1&include_adult=false&query=${movie}`
        })
        .then(res => {
          this.topTenPosterPath.push(res.data.results[0].poster_path)
        })
      }
      // console.log(this.topTenPosterPath)
    })
  }
}
</script>


<style>
#shadow{
  box-shadow: 0px 0px 40px 15px rgb(30, 20, 61);
}

.p {
    /* font-family: 'Aleo', serif; */
    font-family: 'Hahmlet', serif;
    font-size: 70px;
    font-weight: 500;
    margin: 70px 25px 60px 25px;
  }

.carouselm {
  margin-bottom: 80px;
}
</style>
