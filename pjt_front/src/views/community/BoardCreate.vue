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
        sm="4"
      >
      <span style="margin-right:10px;">Category: </span>
      <v-select
        v-model="category_select"
        color="black"
        solo background-color="black"
        :items="items"
        item-text="name"
        item-value="value"
        label="자유"
        dense
        id="select"
      ></v-select>
      </v-col>
      </v-row>

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
        style="color:black;"
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

export default {
  name:"BoardCreate",
  data:function(){
    return{
      category : this.$route.query.category,
      title : '',
      content : '',
      isNull_title : false,
      isNull_content : false,
      category_select : '1',
      
    }
  },
  methods:{
    moveToList:function(){
      if (this.category === "question" ){
        this.$router.push({name:"Community", query:{board:'question'}})
        } else{
        this.$router.push({name:"Community", query:{board:'chat'}})
      }
    },
    clear:function(){
      this.content = '';
      this.title = '';
    },
    create:function(){
      if (this.content.trim() && this.title.trim()){
        var content = this.content.replace(/"\n"/gi,"</br>")
        axios({
          method:'post',
          url:`http://127.0.0.1:8000/community/chats/`,
          data:{title:this.title, content:content, board_num:this.category_select},
          headers: this.$store.state.config
        })
        .then(res=>{
          this.$router.push({name:'BoardDetail', params: {chatId:res.data.id}})
        })
      } else if (this.title.trim()){
        this.isNull_title = false
        this.isNull_content = true
      } else if (this.content.trim()){
        this.isNull_title = true
        this.isNull_content = false
      } else{
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
    items(){
      if (this.category === 'question'){
        return [{name:'건의', value:'2'}]
      } else{
       return [
        {name:'자유', value:'1'},{name:'건의',value:'2'},
      {name:'영화추천',value:'3'},{name:'파티모집',value:'4'}]
      }
    },
  },
  created:function(){
    if (this.category === 'question'){
      this. category_select = '2'
    } 
  }

}
</script>

<style>
</style>