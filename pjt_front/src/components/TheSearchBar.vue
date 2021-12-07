<template>
<div>

  <div class="d-flex justify-content-center">
    <div cols="3" class="my-3 px-2">
      
    </div>
    <button type="button" small @click="class_dis"
    class="navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" 
    aria-controls="offcanvasNavbar">
      <v-icon style="color: white;" type="button" >mdi-magnify</v-icon></button>
    <div v-if="movieSelect">
    </div>


    <!-- search bar hamberger-->
    <nav>
      <div class="container-fluid">
        <div class="offcanvas offcanvas-end bg-dark" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title text-light detailfont" id="offcanvasNavbarLabel">Search Movie</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <form >
              <div>
                <div class="d-flex">
                  <input type="text" @input="autoComplete" class="form-control me-2" placeholder="Search" aria-label="Search">
                </div>

                <div v-show="!isDisable" class="list-group list-group-flush">
                  <div
                  style="cursor:pointer; color:dark;" 
                  class="list-group-item list-group-item-action bg-dark text-secondary"
                  v-for="(movie, index) in keyword" 
                  :key="`key-${index}`"
                  >
                    <div 
                    class="d-flex flex-column align-items-center p-3 rounded rounded-3">
                      <div class="my-2 fw-bold fs-5 detailfont">{{movie}}</div>
                      <button type="button" class="btn" data-bs-toggle="modal" :data-bs-target="`#exampleModal-${index}`"
                      @click="[searchMovie(movie), getVideo(), getShortMent(), getStarAvg(), getLikeState()]">
                        <img  
                        :src="searchImgUrl(movie)" alt="" id="searchdark" 
                        class="rounded rounded-3" style="height:270px; width:190px;"></button>
                <!-- Modal -->         
                <!-- header -->

                <div  data-bs-backdrop="false" data-keyboard="false" class="modal fade" :id="`exampleModal-${index}`" tabindex="-1" aria-labelledby="exampleModalLabel" 
                aria-hidden="true">
                  <div class="modal-dialog modal-fullscreen" >
                    <div class="modal-content container bg-dark" style="width:1200px; height:890px;">
                      <div class="modal-header">
                        <h3 class="modal-title fw-bold text-white" id="exampleModalLabel">영화 상세정보</h3>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>

                      <!-- body -->
                      <div class="backdrop-box modal-body container" 
                      :style="`background-image: linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(${backdropUrl}); background-size: 1200px;`">
                        <div class="d-flex justify-content-between">
                          <div class="d-flex">
                            <h3 class="text-start mt-1">{{ movieCard.title }}</h3>
                            <div v-if="isLike">
                              <button  type="button" @click="bookmarkMovie">
                                <v-icon large style="color: silver;" class="mb-3 mx-2">mdi-bookmark-multiple </v-icon>
                              </button>
                            </div>
                            <div v-else>
                              <button type="button" @click="bookmarkMovie">
                                <v-icon x-large style="color: silver;" class="mb-3 mx-2">mdi-bookmark-plus-outline</v-icon>
                              </button>
                            </div>
                          </div>
                          <div class="mx-4 d-flex">
                            <div class="fs-1 mx-1">{{ averageRank }}</div><div style="color: grey;" class="mt-4"> / 5</div>
                            <v-icon x-large style="color: goldenrod; ">mdi-star</v-icon>

                          </div>
                        </div>
                        <header class="text-start d-flex justify-content-between align-items-center">
                          <div class="mb-5">
                            <span>인기도 {{ movieCard.popularity}}</span>
                            <span class="mx-3">개봉일 {{ movieCard.release_date}} </span>
                          </div>
                        </header>
                        <div class="container d-flex flex-column justify-content-center align-items-center mb-2" 
                        style="background-color:rgba(0,0,0,0.45); width:920px; border-radius: 15px;">
                          <iframe id="ytplayer" type="text/html" width="850" height="430" :src="videoUrl" frameborder="0" 
                          class="rounded rounded-3 mt-3"></iframe>
                          <hr>
                          <div class="fs-6 mb-2 text-center lh-lg" style="width:850px;">{{movieCard.overview}}</div>
                        </div>
                        <div class="container" style="width:970px;">
                          <h4 class="text-start mt-4">한줄평</h4>
                          <hr>
                        </div>
                        <div 
                        v-for="shortment in shortments"
                        :key="shortment.id"
                        class="d-flex flex-column container border border-secondary border-1 rounded-3 mb-3 bg-dark bg-opacity-50"
                        style="width:900px;">

                          <div class="d-flex justify-content-between">
                            <div class="d-flex">
                              <div class="mx-1">{{ userNameList[shortment.user] || shortment.user}}</div>
                              <!-- user가 준 별점 갯수 -->
                              <!-- rank 수정된 후, 평소 값 -->
                              <div v-show="isRankUpdate[1] == false">
                                <div class="mx-2">
                                  <span v-for="(Info, i) in movieRankInfo" :key="i">
                                    <span v-if="Object.keys(Info)[0] === userNameList[shortment.user]">
                                      <span v-for="(n,i) in Info[userNameList[shortment.user]]" :key="i+'a'">
                                        <v-icon small style="color: goldenrod;">mdi-star</v-icon>
                                      </span>
                                      <span v-for="(n, i) in (5-Info[userNameList[shortment.user]])" :key="i+'b'">
                                        <v-icon small style="color: goldenrod;">mdi-star-outline</v-icon>
                                      </span>
                                    </span>
                                  </span>
                                </div>
                              </div>

                              <!-- rank 수정 -->
                              <div v-show="isRankUpdate[1] == true">
                                <div class="mx-2">
                                  <span v-for="(star, i) in updateStars" :key="i">
                                    <button type="button" @click="toggleUpdateStar(i)">
                                      <div v-if="updateStars[i]">
                                        <v-icon style="color: goldenrod; width: 20px;" class="mx-1">mdi-star</v-icon></div>
                                      <div v-else>
                                        <v-icon small style="color: goldenrod;" class="mx-1">mdi-star-outline</v-icon></div>
                                    </button>
                                  </span>
                                </div>
                              </div>
                            </div>

                            
                            <div class="mx-3">
                              <button  type="button"
                              @click="[modifyShortment(shortment.id, shortment.user), 
                                        modifyStar(shortment.user)]" class="mx-2">
                                <v-icon small style="color: silver;">mdi-pencil</v-icon>
                              </button>

                              <button type="button" @click="[deleteShortment(shortment.id, shortment.user), deleteStar(shortment.user)]">
                                <v-icon small style="color: silver;">mdi-trash-can</v-icon>
                              </button>
                            </div>
                          </div>

                          <!-- 한줄평 수정 -->
                          <div v-if="shortment.id === isUpdate[0] && isUpdate[1]===true"
                          class="d-flex justify-content-between">
                            <textarea type="text" 
                            :value="shortment.content"
                            id="editvalue"
                            class="fs-5 text-start border border-1 rounded"
                            style="color: silver; width:600px;"></textarea>
                            <div class="d-flex flex-column">
                              <div class="mx-4 text-end">작성 {{ shortment.created_at}}</div>
                              <div class="mx-4 text-end">수정 {{ shortment.updated_at}}</div>
                            </div>
                          </div>

                          <div v-else class="d-flex justify-content-between item-align-center">
                            <div class="fs-5 text-start">{{ shortment.content }}</div>
                            <div class="d-flex flex-column">
                              <div class="mx-4 text-end">작성 {{ shortment.created_at}}</div>
                              <div class="mx-4 text-end">수정 {{ shortment.updated_at}}</div>
                            </div>
                          </div>
                        </div>
                      </div>


                      <!-- footer -->
                      <div class="modal-footer" style="height: 120px">
                        <div class="d-flex">

                          <div v-if="isLogin" class="d-flex flex-column align-items-start">
                            <!-- 별점 주기 -->
                            <div>
                              <span v-for="(star, i) in stars" :key="i">
                                <button type="button" @click="toggleStar(i)">
                                  <div v-if="stars[i]">
                                    <v-icon style="color: goldenrod; width: 20px;" class="mx-1">mdi-star</v-icon></div>
                                  <div v-else>
                                    <v-icon small style="color: goldenrod;" class="mx-1">mdi-star-outline</v-icon></div>
                                </button>
                              </span>
                            </div>

                            <!-- 한줄평 입력 -->
                            <div class="d-flex mt-2">
                              <textarea 
                              class="form-control"
                              style="width: 600px; height: 60px;" 
                              v-model="shortmentInput"></textarea>


                              <button type="button" @click="[addShortment(), addRank()]" 
                              class="btn btn-outline-secondary mx-3 mt-1" style="height: 50px;">+</button>
                            </div>
                          </div>

                          <div v-else class="d-flex justify-content-start">
                            <textarea disabled style="width: 600px;" class="form-control" placeholder="required login"></textarea>
                            <button class="btn btn-outline-secondary">+</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                           
                    
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </nav>
  </div>


  

</div>
  
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'
import axios from 'axios'
const movieTitle = 'movieTitle'
const userStore = 'userStore'


export default {
  name: 'TheSearchBar',
  props: {
    movieAll: Array,
  },
  data: function() {
    return {
      movieSelect : 'all',
      keyword: null,
      items: null,
      isDisable: false,

      movieCard: {},

      Detail: false,
      stars: [false, false, false, false, false],
      updateStars: [false, false, false, false, false],
      videoUrl: null,
      shortmentInput: null,
      isLogin: false,
      isUpdate: [0, false],
      isRankUpdate: [0, false],
      movieRankInfo: [],
      averageRank: 0,
      isLike: false,
      genreNoArray: '',
      backdrop:1,
    }
  },
  methods: {
    autoComplete: function (event) {
      this.movieSelect = event.target.value
      if(this.movieSelect) {
        this.isDisable = false
        this.keyword = this.items.filter(title => {
          return title.includes(this.movieSelect)
        })
      } else {
        this.isDisable = true
      }
    },
    searchMovie: function(select) {
      for (let movie of this.movieAll) {
        if(movie.title === select) {
          this.movieCard = movie
        }
      }
      

    },
    class_dis:function(){
      this.isDisable = true
    },

    searchImgUrl: function (item) {
      var imgsrc = null
      for (let movie of this.movieAll) {
        if (movie.title === item) {
          imgsrc = `https://image.tmdb.org/t/p/original${movie['poster_path']}`
        }
      }
      return imgsrc
    },



// modal
    getVideo: function(){
      const videoPath = this.movieCard['video_id']
      this.videoUrl = `https://www.youtube.com/embed/${videoPath}`
    },
    getShortMent: function() {
      this.$store.dispatch('getShortMent', this.movieCard.id)
    },


    alreadyGiveRank: function() {
      let giveStar = false
      for (let Info of this.movieRankInfo){
        for(let i in Info){
          if(this.LoginUser === i){
            giveStar = true
            return giveStar
          }
        }
      }
      return giveStar
    },


    addShortment: function() {
      const giveStar = this.alreadyGiveRank()

      if (!giveStar) {
        const data = {
          content: this.shortmentInput,
          id: this.movieCard.id,
        }
        this.$store.dispatch('addShortment', data)
        this.getShortMent()
        this.getStarAvg()
        this.shortmentInput = null
        this.isRankUpdate[1] = [this.LoginUser, false]
      } else{
        alert(`${this.LoginUser}님은 이미 감상평을 등록하셨습니다`)
        this.shortmentInput = ''
        this.stars = [false, false, false, false, false]
      }
      this.getStarAvg()
      this.getShortMent()
    },

    deleteShortment: function(shortmentId, author) {
      if (this.LoginUser === (this.userNameList[author]) || this.LoginUser === author){
        axios({
          method: 'delete',
          url: `http://127.0.0.1:8000/movies/shortments/${shortmentId}/`,
          headers: this.config
        })
        .then(() => {
          this.getShortMent()
          this.getStarAvg()
          })
        } else {
        alert('삭제 권한이 없습니다!')
      }
    },

    modifyShortment: function(shortmentId, author){
      if (this.LoginUser === (this.userNameList[author]) || this.LoginUser === author) {
        if (this.isUpdate[1] === false) {
          this.wantUpdate(shortmentId)
        } else {
          this.updateShortment(shortmentId)
          this.wantUpdate(shortmentId)
        }
      } else {
        alert('수정 권한이 없습니다!')
      }
      this.getStarAvg()
    },

    wantUpdate: function(shortmentId){
      this.isUpdate = [shortmentId, !this.isUpdate[1]]
    },

    updateShortment: function(shortmentId) {
      const editValue = document.getElementById('editvalue').value
      axios({
        method: 'put',
        url: `http://127.0.0.1:8000/movies/shortments/${shortmentId}/`,
        data: {content: editValue},
        headers: this.$store.state.config
      })
      .then(res=> {
        this.$store.dispatch('betweenDate', res.data.updated_at)
        res.data.updated_at = this.$store.state.betweenDate
        this.getShortMent()
        this.getStarAvg()
      })
    },
      

    // Rank
    toggleStar: function(index) {
      let starsState = Array(5).fill(false)
      if (index > 0) {
        for (let i=0; i <= index; i++) {
          starsState[i] = true
        }
      } 
      else if (this.stars[0] == true && this.stars[1] == false) {
        starsState.fill(false)
      } 
      else {
        for (let i=0; i <= index; i++) {
          starsState[i] = true
        }
      }
      this.stars = starsState
    },

    getStarAvg: function() {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/movies/${this.movieCard.id}/rank/`,
        headers: this.$store.state.config
      })
      .then(res=>{
        const ans = []
        for (let Info of res.data) {
          const InfoObj = {}
          InfoObj[Info['user']] = Info['rank']
          ans.push(InfoObj)
        }
        this.movieRankInfo = ans



        let total = 0
        let personNum = this.movieRankInfo.length
        for (let Info of this.movieRankInfo){
          for(let i in Info){
            total += Info[i]
          }
        }
        this.averageRank = 
        ((total + ((this.movieCard.vote_average/2) * this.movieCard.vote_count)) / (personNum + this.movieCard.vote_count)).toFixed(1)
      })
    },


    addRank: function() {
      let countStar = 0
      for (let i=0; i<5; i++){
        if (this.stars[i] === true) {
          countStar ++
        }
      }
      const giveStar = this.alreadyGiveRank()
      if (!giveStar) {
        axios({
          method: 'post',
          url: `http://127.0.0.1:8000/movies/${this.movieCard.id}/rank/`,
          data: { rank: countStar },
          headers: this.$store.state.config
        })
        .then(() => {
          this.stars = Array(5).fill(false)
          this.isRankUpdate = [this.LoginUser, false]
          this.getStarAvg()
        })
      }
    },

    toggleUpdateStar: function(index) {
      let starsState = Array(5).fill(false)
      if (index > 0) {
        for (let i=0; i <= index; i++) {
          starsState[i] = true
        }
      } 
      else if (this.updateStars[0] == true && this.updateStars[1] == false) {
        starsState.fill(false)
      } 
      else {
        for (let i=0; i <= index; i++) {
          starsState[i] = true
        }
      }
      this.updateStars = starsState
    },

    modifyStar: function(author) {
      if (this.LoginUser === author || this.LoginUser === this.userNameList[author]){
        // false 였다면 -> true로 변경(수정할 폼 보여주기, 폼은 [1]이 true일때 보임)
        if (this.isRankUpdate[1] === false) {
          this.isRankUpdate = [author, true]


        } else {
          // true 였다면 -> 입력된 값을 axios 넘겨주기

          let countStar = 0
          for (let i=0; i<5; i++){
            if (this.updateStars[i] === true) {
              countStar ++
            }
          }

          const user_pk = this.userNameList.indexOf(this.LoginUser)
          axios({
            method: 'put',
            url: `http://127.0.0.1:8000/movies/ranks/${user_pk}/rank_update/`,
            data: {rank:countStar},
            headers: this.$store.state.config
          })
          .then(() => {
            this.getStarAvg()
            this.isRankUpdate = [author, false]
          })
          .catch(err => {
            console.log(err)
          })
        }
        this.getStarAvg()
        this.getShortMent()
      }
    },


    deleteStar: function (author) {
      if (this.LoginUser === author || this.LoginUser === this.userNameList[author]){
        const user_pk = this.userNameList.indexOf(this.LoginUser)
        axios({
          method: 'delete',
          url: `http://127.0.0.1:8000/movies/ranks/${user_pk}/rank_update/`,
          headers: this.$store.state.config
        })
        .then(()=>{
          this.getStarAvg()
        })
      } 
    },

    getLikeState: function () {
      const movieId = this.movieCard.id
        axios({
          method: 'get',
          url: `http://127.0.0.1:8000/movies/${movieId}/like/`,
          headers: this.$store.state.config
        })
        .then(res => {
          for (let movie of res.data) {
            if (movie['id'] === this.movieCard.id) {
              this.isLike = true
              break
            }
          }
        })
    },

    bookmarkMovie: function () {
      const movieId = this.movieCard.id

      axios({
        method: 'post',
        url: `http://127.0.0.1:8000/movies/${movieId}/like/`,
        headers: this.$store.state.config
      })
      .then(res => {
        console.log(res)
        this.isLike = res.data.liked
      })
    },
  },
  computed: {
    ...mapState(
      movieTitle,
      ['movieTitle',]
    ),

    ...mapState([
    'shortments',
    'config',
    'userNameList',
    ]),
    ...mapState(userStore,['LoginUser']),
    

    backdropUrl: function() {
      const backdropPath = this.movieCard['backdrop_path']
      return `https://image.tmdb.org/t/p/original${backdropPath}`
    }
  },

  created: function() {
    this.items = _.cloneDeep(this.movieTitle)
    this.items.splice(0,0,'all') 


    if (localStorage.getItem('jwt')){
      this.isLogin = true
      this.$store.dispatch('setToken')
      this.$store.dispatch('Login')
    }
  },

  mounted() {
    
  }
}
</script>

<style>
#searchdark{
  box-shadow: 0px 0px 17px 6px black;
}
</style>