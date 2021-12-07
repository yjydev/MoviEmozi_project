<template>
  <div class = "container">
    <h3 style="color:white">1:1 문의</h3>
    <hr>
    <v-row>
      <v-col cols="6" align="left">
      <v-btn tile outlined style="color:silver;" @click="chatsCreate">Create</v-btn>
      </v-col>
      <v-col cols="6" align="right">
      <v-btn tile outlined style="color:silver;" @click="moveAdmin">Admin</v-btn>
      </v-col>
    </v-row>
    <board-list-item
    :boardList="filtering"
    >
    </board-list-item>
  </div>
</template>

<script>
import BoardListItem from './BoardListItem.vue'
import {mapState} from 'vuex'
import axios from 'axios'
const userStore = 'userStore'

export default {
  name: 'Question',
  components:{
    BoardListItem,
  },
  methods:{
    moveAdmin:function(){
      if (this.LoginUser === 'admin'){
        axios({
          method:'get',
          url:'http://127.0.0.1:8000/admin/'
        })
        .then(res=>{
          window.open(res.config.url)
        })
      } else{
        alert('관리자만 접근할 수 있습니다!')
      }
    },
    chatsCreate:function(){
      if (this.isLogin){
      this.$router.push({name:'BoardCreate', query:{category:'question'}})
      } else{
        this.$router.push({name:'Login',query:{category:'question'}})
      }
    },
  },
  computed:{
    ...mapState([
      'boardLists',
      'isLogin',
    ]),
    ...mapState(
      userStore,
      ['LoginUser',]
    ),
    filtering:function(){
      const questions = []

      if (this.boardLists){
      this.boardLists.forEach(num=>{
        if (num.board_num === '2'){
          questions.push(num)
        }
      })}
      return questions
    },
  },

}
</script>

<style>

</style>