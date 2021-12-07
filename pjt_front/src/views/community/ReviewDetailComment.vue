<template>
  <div>
    <div align="left">
    <h3>Comment ({{comment_cnt}})</h3>
      <div v-if="loginRequest" style="color:red">로그인하시면 댓글 작성이 가능합니다!! </div>
    <span style="margin: 4px 30px 0 10px;">
      <input type="text" style="width:85%; height:60px" @keyup.enter="createComment"
      v-model="value"
      >
    <v-btn class="mx-2" fab dark id="create" @click="createComment">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    </span>
    <br>
    <hr>
    <p v-if="!exist" style="text-align:left; font-size:15px;">댓글이 아직 없습니다.</p>
    <div
    v-for="(comment,index) in comment_list"
    :key="index"
    >
        <div v-if="profile[userNameList[comment.user]]">
        <img :src="profile[userNameList[comment.user]]" alt="" style="width:70px; height:70px; border-radius:70%; margin-bottom:10px;">
         </div>
         <div v-else>
          <img :src="require(`@/assets/profile_default.png`)" alt="" style="width:70px; height:70px; border-radius:70%; margin-bottom:10px;">
        </div>
      <p style="text-align:left;">
        작성자: {{userNameList[comment.user]}}
      <span>
      <v-btn fab id="del" @click="DeleteComment(comment.id)" v-show="userNameList[comment.user] === LoginUser">
        <v-icon >mdi-trash-can</v-icon>
      </v-btn>
      </span>
      </p>

    <div v-if="isUpdated[index] === false">
    <span style="font-size:20px">{{comment.content}}</span>
      <v-btn fab id="update" class="mx-2" @click="isupdated(index)" v-show="userNameList[comment.user] === LoginUser">
        <v-icon >mdi-pen</v-icon>
      </v-btn>
      <span id="time" class="my-2">
        등록 : {{created_list[index]}} <br>
        수정 : {{updated_list[index]}}
      </span>
    </div>
      <div v-else>
        <input type="text" style="width:85%; height:60px" 
        id="editvalue" :value="comment.content" @keyup.enter="updateValue(comment.id,index)">
      <v-btn type="button" class="mx-2" fab dark id="update" @click="updateValue(comment.id,index)">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>

      </div>
    <br>
    <br>
    <hr>
    </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'

const userStore = 'userStore'
const profile = 'profile'

export default {
  name:"BoardDetailComment",
  props:{
    board_pk:Number,
  },
  data:function(){
    return{
      comment_list:null,
      value:null,
      updated_value:null,
      loginRequest:false,
      updated_list : [],
      created_list : [],
      isUpdated: null,
      exist : null,
      category:null,
      comment_cnt : 0,
    }
  },
  computed:{
    ...mapState([
      'userNameList',
    ]),
    ...mapState(
      userStore,
      ['LoginUser',]
    ),
    ...mapState(
      profile,
      ['profile',]
    )
  },
  methods:{
    updateValue:function(Id,index){
      const update = document.getElementById('editvalue').value
      axios({
        method:'put',
        url:`http://127.0.0.1:8000/community/review_comments/${Id}/`,
        data: {content:update},
        headers: this.$store.state.config
      })
      .then(()=>{
        this.ImportComment()
        let isupdated = [...this.isUpdated]
        isupdated.splice(index,1,false)
        this.isUpdated = isupdated
      })
      document.getElementById('editvalue').value = null
    },
    isupdated:function(index){
      let isupdated = [...this.isUpdated]
      isupdated.splice(index,1,true)
      this.isUpdated = isupdated
    },
    createComment:function(){
      var data = {content: this.value}
      const boardId = this.board_pk
      axios({
        method:'post',
        url:`http://127.0.0.1:8000/community/${boardId}/review_comments/`,
        data, 
        headers: this.$store.state.config
      })
      .then(res=>{
        if (res.data){
        this.ImportComment()
        this.loginRequest = false
        this.value = null
        }
      })
      .catch(err=>{
        if(err.response){
          if (err.response.status === 401){
            this.loginRequest = true
            this.value = ''
          }
        }

      })
    },
    ImportComment : function(){
    const boardId = this.board_pk
    axios({
      method:'get',
      url:`http://127.0.0.1:8000/community/${boardId}/review_comments/`,
      headers: this.$store.state.config
    })
    .then(res=>{
      this.exist = true
      this.comment_list = res.data 
      this.comment_cnt = res.data.length
      this.isUpdated = Array(this.comment_list.length).fill(false)
      this.updated_list = []
      this.created_list = []
      res.data.forEach(comment=>{
        this.$store.dispatch('betweenDate',comment.updated_at)
        this.updated_list.push(this.$store.state.betweenDate)

        this.$store.dispatch('betweenDate', comment.created_at)
        this.created_list.push(this.$store.state.betweenDate)
      })
    })
    .catch(err=>{
      if (err.response.status === 404){
        this.exist = false
      }
    })
    },

    DeleteComment:function(Id){
      axios({
        method:'delete',
        url:`http://127.0.0.1:8000/community/review_comments/${Id}/`,
        headers: this.$store.state.config
      })
      .then(()=>{
        this.ImportComment()
      })
    }
  },
  created:function(){
    this.ImportComment()
  }


}
</script>

<style>
input{
  color:white;
  border: 1px solid white;
  
}
#create{
  width: 30px;
  height: 30px;
}

#time{
  font-size:12px;
  float:right;
}

#del{
  float: right;
  width: 30px;
  height: 30px;
  color:black;
  background-color: #B71C1C;
}

#update{
  width:30px;
  height: 30px;
  color:black;
  background-color: cadetblue;
}

</style>