<template>
  <div style="color:white;" class="container" data-app>
    <div v-if="profile.profile[username] !== null">
    <img :src="profile.profile[username]" alt="" style="width:100px; height:100px; border-radius:70%; object-fit:cover;">
    </div>
    <div v-else>
  <!-- <v-icon large style="color:silver;">mdi-account-circle</v-icon> -->
  <img :src="require(`@/assets/profile_default.png`)" alt="" style="width:100px; border-radius:70%; object-fit:cover;">
    </div>

      <v-row v-if="username === LoginUser" style="margin-top:10px;">
      <v-col cols="6" align="right">
      <v-file-input v-model="files" name="files" class="rounded rounded-3 opacity-75" style="width:200px; height:30px; padding-top:0px;" label="profile image"></v-file-input>
      </v-col>
      <v-col cols="2" align="right">
       <v-btn outlined style="color: silver;" @click="sendImage()">Select</v-btn> 
      </v-col>
      <v-col cols="4" align="left">
      <v-btn outlined style="color:silver;" @click="clear"><v-icon>mdi-cached</v-icon>Clear</v-btn>
      </v-col>


      </v-row>
    <h1 class="my-5">{{username}}  
      <v-btn outlined @click="follow" v-if="username !== LoginUser"><v-icon large style="color: silver;" >{{follow_btn}}</v-icon></v-btn>
      </h1>
    <v-row>
      <v-col cols="6">
        <v-menu top :offset-x="offset"> 
          <template v-slot:activator="{on, attrs}">
        <v-btn outlined style="color:silver" v-bind="attrs" v-on="on"><v-icon style="color: silver;">mdi-account-details</v-icon>Followings</v-btn>
          </template>

      <v-list>
        <div v-if="following_name.length !== 0">
        <v-list-item v-for="(person,i) in following_name" :key="i" >
          <div style="border-bottom-color:white;">
          <v-btn text style="color:white;"><span @click="moveTomy(person)">{{person}} </span></v-btn>

          </div>
        
        </v-list-item>
          </div>
        <div v-else>
          <v-list-item>
            <p>팔로잉 목록이 없습니다.</p>
          </v-list-item>
        </div>
      </v-list>
        </v-menu>
      
      </v-col>
      <v-col cols="6">

        <v-menu top :offset-x="offset"> 
          <template v-slot:activator="{on, attrs}">
        <v-btn outlined style="color:silver" v-bind="attrs" v-on="on">
          <v-icon style="color: silver;">mdi-account-details-outline</v-icon>Followers</v-btn>
          </template>
      <v-list>

        <div v-if="follower_name.length !== 0">
        <v-list-item v-for="(person,i) in follower_name" :key="i" style="border-bottom: 1px solid black;">
         <v-btn text style="color:white;"><span @click="moveTomy(person)">{{person}} </span></v-btn>
        </v-list-item>
          </div>
        <div v-else>
          <v-list-item>
            <p>팔로워 목록이 없습니다.</p>
          </v-list-item>
        </div>
      </v-list>
        </v-menu>


      
      </v-col>
    </v-row>
    <hr>
    <div class="container contentbox">
    <div align="left">
    <v-icon large style="color: silver;" class="mb-3 mx-2">mdi-bookmark-multiple </v-icon> 
    <span style="font-size:20px;">찜한 영화 </span>
    </div>
    <div v-if="like_movie.length !== 0">
      <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
        <v-carousel-item  v-for="movie in like_movie" :key="movie.id" class="rounded rounded-3">
        <recom-list :recom="movie">
        </recom-list>
        </v-carousel-item>
      </v-carousel>
    </div>


  <div v-else>
    <h4 style="margin-bottom:30px;">아직 찜한 영화가 없습니다.</h4>
  </div>
  </div>
    <hr>

    <div class="container contentbox">
      <div align="left">
      <v-icon large style="color:silver;" class="mb-3 mx-2">mdi-thumb-up</v-icon>
      <span style="font-size:20px;">영화 추천</span>
      </div>
      <recommend ></recommend>
    </div>

    <hr>

    <v-container >
      <v-row>
        <v-col cols="6" style="text-align:left; border-right:1px solid white;">
        <div align="left">
        <v-icon large style="color:silver;" class="mb-3 mx-2">mdi-pen</v-icon>
        <span style="font-size:20px;">POST</span>         
        </div>

          <div v-if="board">
            <div v-for="post in board" :key="post.id" class="container">
              <p @click="movePost(post.id)">[{{boardNum[post.board_num]}}] - {{post.title}} 
                <v-icon style="color:silver;margin-left:25px;">mdi-arrow-right</v-icon></p>
              <p style="font-size:13px;">마지막 수정 : {{post.updated_at | betweenDate}}</p>
              <hr>
            </div>
          </div>
          <div v-if="review">
            <div v-for="rev in review" :key="rev.id" class="container">
              <p @click="moveReview(rev.id)">[{{movieTitle[rev.movie_id-1]}}'s review] - {{rev.title}}
                <v-icon style="color:silver;margin-left:25px;">mdi-arrow-right</v-icon></p>
              <p style="font-size:13px;">마지막 수정 : {{rev.updated_at |betweenDate}}</p>
              <hr>
            </div>

          </div>

          <div v-if="!review && !board">
            <p>아직 작성한 글이 없습니다.</p>
          </div>

        </v-col>

        <v-col cols="6" style="text-align:left; padding-left:20px;">
        <div align="left">             
        <v-icon large style="color:silver;" class="mb-3 mx-2">mdi-forum</v-icon>
        <span style="font-size:20px;">Comment</span>
        </div>

          <div v-if="chat_comments">
            <div v-for="chat_comment in chat_comments" :key="chat_comment.id" 
            class="container">
              <p>[{{chat_comment.chatboard}}] - {{chat_comment.content}}</p>
              <p style="font-size:13px;">마지막 수정 : {{chat_comment.updated_at | betweenDate}}</p>
              <hr>
            </div>
          </div>

          <div v-if="review_comments">
            <div v-for="review_comment in review_comments" :key="review_comment.id" 
            class="container">
              <p>[{{review_comment.review}}] - {{review_comment.content}}</p>
              <p style="font-size:13px;">마지막 수정 : {{review_comment.updated_at | betweenDate}}</p>
            <hr>
            </div>
          </div>

          <div v-if="chat_comments.length === 0 && review_comments.length === 0">
            <p>아직 작성한 댓글이 없습니다.</p>
          </div>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
import Recommend from './Recommend.vue'
import RecomList from './RecomList.vue'

const movieTitle = 'movieTitle'
const userStore = 'userStore'
const profile = 'profile'

export default {
  name: 'MyProfile',
  components:{
    Recommend,
    RecomList,
  },
  data:function(){
    return{
    username : this.$route.params.username,
    user_info : null,
    files:null,
    board : null,
    review : null,
    review_comments:null,
    chat_comments:null,
    isfollowed:null,
    followers : null,
    followings : null,
    isfileNull : null,
    follower_name : null,
    following_name : null,
    offset : true,
    like_movie : null,


    image : null,   
  }},
  computed:{
    ...mapState(
      userStore,
      ['LoginUser',]
    ),
    follow_btn(){
      return this.isfollowed ? 'mdi-account-multiple-check' : 'mdi-account-multiple-plus'
    },
    ...mapState(
      profile,
      ['profile',]
    ),
    ...mapState([
      'boardLists',
      'reviewLists',
      'boardNum',
      'userId_name',
      'profile',
    ]),
    ...mapState(
      movieTitle,
      ['movieTitle',]
    ),
  }
  ,
  methods:{
    moveTomy:function(name){
      this.$router.push({name:'MyProfile',params:{username:name}})
    },
    sendImage(){
      if (this.files === null){
        this.isfileNull = true
      }
      let info = new FormData()
      info.append('files',this.files)
      if (this.files === ''){
        info.append('files',[])
      } else {
        for (let i=0; i < this.files.length; i++){
          info.append('files',this.files[i])
        }
      }
      const token = localStorage.getItem('jwt')
      axios({
        method:'post',
        url:`http://127.0.0.1:8000/accounts/profile/`,
        data : info,
        headers:{'Content-Type': 'multipart/form-data','Authorization' : `JWT ${token}`}
      })
      .then(res=>{
        this.profile_url = res.data.url[0]
        axios({
          method:'get',
          url:`http://127.0.0.1:8000/accounts${this.profile_url}`,
        })
        .then(res=>{
          var url = res.config.url
          var name = this.username
          if (!this.profile.profile[this.username]){
            this.$store.dispatch('profile/profile',[url,name])
            window.location.reload()
          } else {
            this.$store.dispatch('profile/profile',[url,name])
          }
          this.files = ''
        })


      })
    },
    clear:function(){
      this.$store.dispatch('profile/profile',[null,this.username])
      window.location.reload()
    },
    follow:function(){
      axios({
        method:'post',
        url:`http://127.0.0.1:8000/accounts/${this.user_info.id}/follow/`,
        headers: this.$store.state.config
      })
      .then(res=>{
        this.isfollowed = res.data.followed
        this.followers = res.data.followers[0]
        this.followings = res.data.followings[0]
        this.follower_name = []
        this.followers.forEach(person=>{
        this.follower_name.push(person.username)
          })
        this.following_name = []
        this.followings.forEach(person=>{
          this.following_name.push(person.username)
        })
        if (this.follower_name.includes(this.LoginUser)){
          this.isfollowed = true
        } else{
          this.isfollowed = false
        }

      })
      .catch(err=>{
        if (err.response.status === 406){
          alert(err.response.data.error)
        }
      })
    },
    movePost:function(id){
      this.$router.push({name:'BoardDetail', params: {chatId:id}})
    },
    moveReview:function(id){
      this.$router.push({name:'ReviewDetail', params: {reviewId:id}})
    },
    
    

  import_review_comment:function(){
      axios({
        method:'get',
        url:`http://127.0.0.1:8000/community/${this.user_info.id}/comment_list_review/`,
        headers: this.$store.state.config
      })
      .then(res=>{
        this.review_comments = res.data
      })
    },
  },
  created:function(){
    this.$store.dispatch('CreateUserList')
    axios({
      method:'get',
      url:`http://127.0.0.1:8000/accounts/${this.username}/`,
      headers: this.$store.state.config
    })
    .then(res=>{
      this.user_info = res.data[0]
      axios({
        method:'get',
        url:`http://127.0.0.1:8000/accounts/${this.user_info.id}/follow/`,
        headers: this.$store.state.config
      })
      .then(res=>{
        this.followers = res.data.followers[0]
        this.followings = res.data.followings[0]
        this.follower_name = []
        this.followers.forEach(person=>{
        this.follower_name.push(person.username)
          })
        this.following_name = []
        this.followings.forEach(person=>{
          this.following_name.push(person.username)
        })
        if (this.follower_name.includes(this.LoginUser)){
          this.isfollowed = true
        } else{
          this.isfollowed = false
        }

      })

      axios({
        method:'get',
        url:`http://127.0.0.1:8000/community/${this.user_info.id}/comment_list_chat/`,
        headers: this.$store.state.config
      })
      .then(res=>{
        this.chat_comments = res.data
      })
      this.import_review_comment()
      this.$store.dispatch('CreateChatBoard')
      this.$store.dispatch('CreateReviewBoard')
      setTimeout(()=> function(){
      if (this.boardLists){
      var post = this.boardLists.filter(post=>{
        return post.user === this.user_info.id
      })
      this.board = post
      }
      if (this.reviewLists){
      var rev = this.reviewLists.filter(rev=>{
        return rev.user === this.user_info.id
      })
      this.review = rev
      }}
      , 300)

      axios({
        method:'get',
        url:`http://127.0.0.1:8000/movies/${this.username}/like_users/`,
        headers: this.$store.state.config
      })
      .then(res=>{
        this.like_movie = res.data
      })
    })
    
    

  },
  filters:{
    betweenDate:function(value){
      if (value===""){
        return ''
      }
      const date = new Date(value)
      const today = new Date()
      const takenTime = today - date
      const takenSecond = takenTime / 1000 
      const takenMinute = takenSecond / 60
      const takenHour = takenMinute / 60
      const takenDay = takenHour / 24
      const takenWeek = takenDay / 7

      if (takenSecond < 60) {return '방금전'}
      if (takenMinute < 60) {return `${Math.floor(takenMinute)}분 전`} 
      if (takenHour < 24) {return `${Math.floor(takenHour)}시간 전`}
      if (takenDay < 7) {return `${Math.floor(takenDay)}일 전`}  
      if (takenWeek < 5) {return `${Math.floor(takenWeek)}주 전`} 
    },
  }

}
</script>

<style scoped>
.v-file-input{
  margin-bottom: 10px;
  padding-top: 5px;
  padding-right: 10px;
  background-color: rgb(121, 59, 161);
  width:310px;
  height: 45px;
}

.v-input__prepend-outer{
  height: 10px;
}

.contentbox{
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.05);
}
</style>