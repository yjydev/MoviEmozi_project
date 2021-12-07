<template>
  <div>
    <v-btn tile outlined color="primary" class="mx-2" style="color:white;" @click="board">
      자유 게시판
    </v-btn>
    <v-btn tile outlined color="success" class="mx-2" style="color:white;" @click="review">
      리뷰 게시판
    </v-btn>
    <v-btn tile outlined color="success" class="mx-2" style="color:white;" @click="questions">
      건의 게시판
    </v-btn>
    <div class="my-4 container">
    
      <board-list v-if="isBoard"></board-list>
      <question-list v-if="isQuestions"></question-list>
      <review-list v-if="isReview"></review-list>
    </div>
  </div>
</template>

<script>
import BoardList from './BoardList.vue'
import QuestionList from './QuestionList.vue'
import ReviewList from './ReviewList.vue'

export default {
  name: 'Community',
  components:{
    BoardList,
    QuestionList,
    ReviewList,
  },
  data : function(){
    return{
      isBoard : true,
      isQuestions : false,
      isReview : false,
    }
  },
  methods:{
    board(){
      this.isBoard = true
      this.isQuestions = this.isReview = false
    },
    questions(){
      this.isQuestions = true
      this.isBoard = this.isReview = false
    },
    review(){
      this.isReview = true
      this.isQuestions = this.isBoard = false
    }
  },
  created: function(){
    this.$store.dispatch('CreateChatBoard')
    this.$store.dispatch('CreateReviewBoard')
    this.$store.dispatch('CreateUserList')
    this.$store.dispatch('loadMovieList')
    if (this.$route.query.board === 'question'){
      this.questions()
    } else if (this.$route.query.board === 'chat'){
      this.board()
    } else if (this.$route.query.board === 'review') {
      this.review()
    }
  }
}
</script>

<style>

</style>