<template>
  <div data-app>
    <h3 style="color:white">자유 게시판</h3>

    <hr>
    <v-row>
      <v-col cols="auto">
      <v-btn tile outlined style="color:silver;" @click="chatsCreate">Create</v-btn>
      </v-col>
    </v-row>
    <hr style="color:white;">
    <v-row>
      <v-col cols="3" class="px-0 py-0">
      <span style="color:white;">Category: </span>
      <v-select
        v-model="select"
        color="black"
        solo background-color="black"
        :items="items"
        item-text="name"
        item-value="value"
        label="카테고리 선택"
        dense
        id="select"
      ></v-select>
      </v-col>
      <v-col align="left">
        <v-btn outlined style="color:silver; margin-top:12px;" @click="followFilter">
          {{Fbtn}}
        </v-btn>
      </v-col>
    </v-row>
    <div v-if="boardLists">
    <board-list-item
    :boardList="CategoryFilter"
    >
    </board-list-item>
    </div>
  </div>
</template>

<script>
import BoardListItem from './BoardListItem.vue'
import {mapState} from 'vuex'
import axios from 'axios'

const userStore = 'userStore'

export default {
  name: 'BoardList',
  components:{
    BoardListItem,
  },
  data:function(){
    return{
      items: [{value:'0',name:'all'},{value:'1', name:'자유'},
      {value:'3',name:'영화 추천'},{value:'4',name:'파티 모집'}],
      select : '0',
      cnt_list : [],
      following: false,
      following_list : null,
    }
  },
  methods:{
    followFilter:function(){
      this.following = !this.following
    },
    chatsCreate:function(){
      if (this.isLogin){
      this.$router.push({name:"BoardCreate", query:{category:'chat'}})
      }
      else{
        this.$router.push({name:"Login",query:{category:'chat'}})
      }
    },
  },

  computed:{
    Fbtn:function(){
      return this.following ? 'Filter Clear' : 'Following Filter'
    },
    ...mapState([
      'boardLists',
      'userNameList',
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
        if (num.board_num != '2'){
          questions.push(num)
        }
      })
      }
      return questions
    },
    CategoryFilter(){
      var filt = []
      if (this.following && this.following_list !== []){
        filt = this.filtering.filter(board=>{
          return this.following_list.includes(board.user)
        })
      }else{
      this.filtering.forEach(board=>{
        if (board['board_num'] === this.select ){
          filt.push(board)
        } else if (this.select === '0'){
          filt = this.filtering
          return
        }
      })}
      return filt
    },
  },
  created:function(){
    axios({
        method:'get',
        url:`http://127.0.0.1:8000/accounts/${this.LoginUser}/`,
        headers: this.$store.state.config
      })
      .then(res=>{
        this.following_list = res.data[0].followings
      })
  }
}
</script>

<style>

</style>