<template>
  <div class="container" style="color:white;" v-if="detail">
    <div align="left">
      <v-btn id="back" @click="moveToList">
          <v-icon left>
            mdi-arrow-left
          </v-icon>목록
        </v-btn>
    </div>
    <hr>
    <div v-if="!isUpdated">
    <span style="font-size:20px; text-align:left;">Title: {{detail.title}} </span> &nbsp;
    <div id="like"><v-btn @click="like" small v-show="detail.user !== LoginUser"><v-icon>{{likeIcon}}</v-icon></v-btn></div>
      <v-btn id="edit" @click="isUpdated=true" v-show="detail.user === LoginUser">
        <v-icon left>mdi-pencil</v-icon><b> Edit</b>
      </v-btn>
    <hr>
    <div align="right">
    <span style="font-size:15px;">{{likeCnt}} 명이 이 글을 좋아합니다. </span>
    </div>
    <br>
    <div align='left'>
      <v-btn text style="color:white;"><span id="user" @click="moveTomy(detail.user)">작성자 : {{detail.user}} </span></v-btn>
    </div>
    <br>
    <div align="left">
    <img :src="imageUrl()" alt="image" style="width: 13rem; height: 310px;">
    </div>
      <div class="my-3" align='left'>
        <div id="content" style="white-space:pre;">내용 :  <br>
        {{detail.content}}
        </div>
      </div>
      <br>
      <div align="right"> 
      <v-btn id="delete" class="my-2 ma-2" @click="Delete" v-show="detail.user === LoginUser">
        <v-icon left> mdi-delete</v-icon> <b>Delete</b>
      </v-btn>
      </div>
      <div align='left'>
      <span id="time" class="my-0">등록시각 : {{created}}</span><br>
      <span id="time">수정시각 : {{updated}}</span>
      </div>
      <br>
      </div>

      <div v-else align="left">
        <form>
        <div style="font-size:20px">
        Title: <input type="text" id="updated_title" v-model="detail.title">
        <v-btn @click="editcancel" id="update_cancel" small>
          <v-icon left> mdi-format-color-marker-cancel </v-icon> <b>Cancel</b></v-btn>
        </div>
        <hr>
        <p v-if="isNull_title" id="null">제목을 입력해주세요!!</p>
        <span id="user">작성자 : {{detail.user}} </span>
        <br>
        내용 : <v-btn type="reset" style="background:white; float:right;" x-small @click="clear"><v-icon>mdi-cached</v-icon>Clear</v-btn>
        <v-textarea
          type="text"
          auto-grow
          filled
          id="updated_detail"
          v-model="detail.content"
          >
          </v-textarea>
        <p v-if="isNull_content" id="null">내용을 입력해주세요!!</p>
      <v-btn id="updated_edit" @click="update">
        <v-icon left>mdi-pencil</v-icon><b> Save</b>
      </v-btn>
      </form>
      <br><br>
      </div>

      <hr>
      <div>
      <review-detail-comment :board_pk="detail.id" ></review-detail-comment>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
import ReviewDetailComment from '../community/ReviewDetailComment.vue'

const userStore = 'userStore'
const movieTitle = 'movieTitle'

export default {
  name:"ReviewDetail",
    components:{
      ReviewDetailComment
    },
  data:function(){
    return{
      detail : null,
      updated : null,
      created : null,
      isUser : false,
      isUpdated : false,
      updated_title : null,
      title : null,
      content : null,
      reviewId : null,
      isNull_title : false,
      isNull_content : false,
      isLiked : false,
      likeCnt : 0,
    }
  },
  computed:{
    likeIcon:function(){
      return this.isLiked ? "mdi-thumb-up" : "mdi-thumb-up-outline"
    },
    ...mapState([
      'userNameList',
      'movieList',
    ]),
    ...mapState(
      userStore,
      ['LoginUser',]
    ),
    ...mapState(
      movieTitle,
      ['movieTitle']
    ),
  },
  methods:{
    moveTomy:function(name){
      this.$router.push({name:'MyProfile',params:{username:name}})
    },
    imageUrl : function(){
      const movieId = this.movieTitle.indexOf(this.detail.movie)
      const imagePath = this.movieList[movieId]['poster_path']
      return `https://image.tmdb.org/t/p/original${imagePath}` 
    },
    like:function(){
      axios({
        method:'post',
        url:`http://127.0.0.1:8000/community/${this.reviewId}/review_like/`,
        headers: this.$store.state.config
      })
      .then(res=>{
        this.isLiked = res.data.liked
        this.likeCnt = res.data.count
      })
    },
    Delete:function(){
      const reviewId = this.reviewId
      axios({
        method:'delete',
        url:`http://127.0.0.1:8000/community/${reviewId}/review_detail/`,
        headers:this.$store.state.config
      })
      .then(()=>{
        this.$router.push({name:"Community", query:{board:'review'}})
      })
    },
    update:function(){
      const reviewId = this.reviewId
      const edit_title = this.detail.title
      const edit_content = this.detail.content
      if (edit_content.trim() && edit_title.trim()){
        this.isUpdated = false
        axios({
          method:'put',
          url:`http://127.0.0.1:8000/community/${reviewId}/review_detail/`,
          data:{title:edit_title, content:edit_content},
          headers : this.$store.state.config
        })
        .then(()=>{
          this.CreateReviewDetail()
        })
      } else if (edit_title.trim()){
        this.isNull_content = true
        this.isNull_title = false
      } else if (edit_content.trim()){
        this.isNull_title = true
        this.isNull_content = false
      } else {
        this.isNull_content = true
        this.isNull_title = true
      }
    },
    editcancel:function(){
      this.isUpdated = false
      this.detail.title = this.title
      this.detail.content = this.content
      this.isNull_title = false
      this.isNull_content = false
    },
    clear:function(){
      this.detail.content = '';
      this.detail.title = '';
    },
    CreateReviewDetail:function(){
      const reviewId = this.$route.params.reviewId
      this.reviewId = reviewId
      axios({
        method:'get',
        url:`http://127.0.0.1:8000/community/${reviewId}/review_detail/`,
        headers: this.$store.state.config,
      })
      .then(res=>{
        this.detail = res.data
        this.title = res.data.title
        this.content = res.data.content
        this.$store.dispatch('dateFormat',this.detail.updated_at)
        this.updated = this.$store.state.date

        this.$store.dispatch('dateFormat', this.detail.created_at)
        this.created = this.$store.state.date

      })
      .catch(err=>{
        if (err.response){
        if (err.response.status === 401){
          console.log(err)
        }}
      })
    },
    moveToList:function(){
        this.$router.push({name:'Community', query:{board:'review'}})
        
    }
  },
  
  created: function(){
    this.CreateReviewDetail()
    this.$store.dispatch('loadMovieList')
    axios({
        method:'get',
        url:`http://127.0.0.1:8000/community/${this.reviewId}/review_like/`,
        headers: this.$store.state.config
      })
      .then(res=>{
        this.likeCnt = res.data.count
        this.isLiked = res.data.like
      })
  },
  updated:function(){
    this.$store.dispatch('CreateUserList')
  }

}
</script>

<style>
#like{
  float:right;
}
</style>