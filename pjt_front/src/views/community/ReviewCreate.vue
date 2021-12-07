<template>
  <div class="container" style="color:white" data-app>
    <div align="left">
      <v-btn id="back" @click="moveToList">
        <v-icon left>mdi-arrow-left</v-icon>목록
        </v-btn>
    </div> 
    <br>
    <h2>Create</h2>
    <hr>

    <div align="left">
    <form>
      <v-row align="center">
      <v-col
        class="d-flex"
        cols="12"
        sm="6"
      >
      <span style="margin-right:10px;">Movie: </span>
      <v-select
        v-model="movie_select"
        color="black"
        solo background-color="black"
        :items="movieTitle"
        :label="movieTitle[0]"
        dense
        id="select"
      ></v-select>
      </v-col>
      </v-row>
      <p v-if="isNull_movie" id="null">영화를 선택해주세요!!</p>

      <div style="font-size:20px">
      Title: <input type="text" v-model="title">
      </div>
      <br>
      <p v-if="isNull_title" id="null">제목을 입력해주세요!!</p>
      <br>
      <div id="user">작성자 : {{LoginUser}} </div>
      <br>
      내용 : <v-btn type="reset" style="background:white; float:right;" x-small @click="clear"><v-icon>mdi-cached</v-icon>Clear</v-btn>
      <v-textarea
        type="text"
        auto-grow
        filled
        style="background-color:black; border-color:white;"
        v-model="content"
        >
        </v-textarea>
      <p v-if="isNull_content" id="null">내용을 입력해주세요!!</p>
      <br>
    <v-btn id="updated_edit" @click="create">
      <v-icon left>mdi-pencil</v-icon><b> Save</b>
    </v-btn>
    </form>
    </div>
    


  </div>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
const userStore = 'userStore'
const movieTitle = 'movieTitle'

export default {
  name:"BoardCreate",
  data:function(){
    return{
      title : '',
      content : '',
      isNull_title : false,
      isNull_content : false,
      movie_select : null,
      isNull_movie : false,
    }
  },
  methods:{
    moveToList:function(){
      this.$router.push({name:"Community", query:{board:'review'}})
    },
    clear:function(){
      this.content = '';
      this.title = '';
    },
    create:function(){
      const movieId = this.movieTitle.indexOf(this.movie_select) + 1
      if (movieId === 0){
        this.isNull_movie = true
      }
      else if (this.content.trim() && this.title.trim() && this.movie_select){
      var content = this.content.replace(/"\n"/gi,"</br>")
      axios({
        method:'post',
        url:`http://127.0.0.1:8000/community/${movieId}/reviews/`,
        data:{title:this.title, content:content},
        headers: this.$store.state.config
      })
      .then(res=>{
        this.$router.push({name:'ReviewDetail', params: {reviewId:res.data.id}})
      })
      }
      else if (this.content.trim()){
        this.isNull_content = false
        this.isNull_title = true
        this.isNull_movie = true
      } else if (this.title.trim()){
        this.isNull_content = true
        this.isNull_title = false
        this.isNull_movie = true
      } else if (this.movie_select){
        this.isNull_title = true
        this.isNull_content = true
        this.isNull_movie = false
      } else {
        this.isNull_movie = true
        this.isNull_content = true
        this.isNull_title = true
      }
    }
  },
  computed:{
    ...mapState(
      userStore,
      ['LoginUser',]
    ),
    ...mapState(
      movieTitle,
      ['movieTitle',]
    ),
    movieList:function(){
      return this.$store.state.movieList
    },
  },
  created:function(){
  }

}
</script>

<style>
</style>