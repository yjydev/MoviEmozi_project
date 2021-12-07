<template>
  <div class="grid">
  <ul class="list">
      <button type="button" id="something0">
      <img class="gamecard" id="something0" :src="imageUrl[0]"></button>

      <button type="button" id="something0">
      <img class="gamecard" id="something0" :src="imageUrl[1]"></button>

      <button type="button" id="something0">
      <img class="gamecard" id="something0" :src="imageUrl[2]"></button>

      <button type="button" id="something0">
      <img class="gamecard" id="something0" :src="imageUrl[3]"></button>

      <button type="button" id="something0">
      <img class="gamecard" id="something0" :src="imageUrl[4]"></button>


      <button type="button" id="something0">
      <img class="gamecard" id="something0" :src="imageUrl[5]"></button>


      <button type="button" id="something0">
      <img class="gamecard" id="something0" :src="imageUrl[6]"></button>

      <button type="button" id="something0">
      <img class="gamecard" id="something0" :src="imageUrl[7]"></button>

      <button type="button" id="something0">
      <img class="gamecard" id="something0" :src="imageUrl[8]"></button>

      <button type="button" id="something0">
      <img class="gamecard" id="something0" :src="imageUrl[9]"></button>
  </ul>
  <div>
    <button class="stack btn btn-outline-light mx-5"
    @click="[stack(), shuffleCard()]">영화 다시뽑기</button>
    <button class="spread btn btn-outline-light"
    @click="spread()">펼쳐 보기</button>
  </div>
</div>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'


export default {
  name: 'gamecardGame',
  components: {
  },
  data: function () {
    return {
      movieAll: null,
      gamecards: [],
      imageUrl: [],

      on0: false,
    }
  },
  methods: {
    shuffle: (gamecards) => {
      for (let i = 0; i < gamecards.length; i++) {
        //Fisher-Yates shuffle
        const rnd = Math.random() * i | 0;
        const tmp = gamecards[i];
        gamecards[i] = gamecards[rnd];
        gamecards[rnd] = tmp;
      }
      return gamecards;
    },
    shuffleCard: function() {
      
      let random = _.sampleSize(this.movieAll, 10)
      let movies = []
      for (var ran of random) {
        movies.push(ran)
      }
      this.gamecards = movies
      let list = []
      for (var card of this.gamecards) {
        const imgSrc = `https://image.tmdb.org/t/p/original${card['poster_path']}`
        list.push(imgSrc)
      }
      this.imageUrl = list
    },


    imgUrl: function(gamecard){
      const imagePath = gamecard['poster_path']
      return `https://image.tmdb.org/t/p/original${imagePath}`
    },

    stack: function () {
      const gamecards = document.querySelectorAll('.gamecard')
      gamecards.forEach((gamecard, e) => {
        setTimeout(function() {
          gamecards[e].setAttribute('class', 'gamecard')
        }, e*150)
      })
    },

    spread: function() {
      const gamecards = document.querySelectorAll('.gamecard')
      gamecards.forEach((gamecard, e)=> {
      setTimeout(function() {
      gamecards[e].setAttribute("class", "gamecard ani" + e);
        }, e * 150)
      })
    },
    showFront: function() {

    
    
    },

  },
  computed: {
  },

  created: function () {
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/movies/',
    })
    .then(res => {
      this.movieAll = res.data

      let random = _.sampleSize(this.movieAll, 10)
      let movies = []
      for (var ran of random) {
        movies.push(ran)
      }
      this.gamecards = movies
      this.gamecards = this.shuffle(this.gamecards)

      let list = []
      for (var gamecard of this.gamecards) {
        const imagePath = gamecard['poster_path']
        list.push(`https://image.tmdb.org/t/p/original${imagePath}`)
      }
      this.imageUrl = list
    })
  },
}
</script>

<style>

.grid {
  width: 1170px;
  margin: 0 auto;
  background-color: rgb(19, 19, 19);
}

.list {
  height: 652px;
  position: relative;
  list-style-type: none;
  padding-left: 0;
  background-color: rgb(19, 19, 19);
}

.gamecard {
  transition: all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  perspective: 1000;
  -ms-transform: perspective(1000px);
  -moz-transform: perspective(1000px);
  -ms-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  float: left;
  width: 222px;
  height: 311px;
  background-color: rgb(19, 19, 19); 
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 30px 0 15px 15px;
  transition: 2s;
  border-radius: 30px
}
.gamecard:nth-child(5n) {
  margin-right: 0;
}
.gamecard.ani0 {
  right: 948px;
  bottom: 326px;
}
.gamecard.ani1 {
  right: 711px;
  bottom: 326px;
}
.gamecard.ani2 {
  right: 474px;
  bottom: 326px;
}
.gamecard.ani3 {
  right: 237px;
  bottom: 326px;
}
.gamecard.ani4 {
  right: 0;
  bottom: 326px;
}
.gamecard.ani5 {
  right: 948px;
  bottom: 0;
}
.gamecard.ani6 {
  right: 711px;
  bottom: 0;
}
.gamecard.ani7 {
  right: 474px;
  bottom: 0;
}
.gamecard.ani8 {
  right: 237px;
  bottom: 0;
}

.jb1 {
  backface-visibility: visible;
}

#something0 :hover {
  transform: rotateY( 180deg )
}

.background {
  background-color: rgb(19, 19, 19); 
}
</style>