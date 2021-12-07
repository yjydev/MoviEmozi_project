<template>
  <div>
    <div id="app" class="my-4">
      <v-app>
        <v-simple-table dark>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">
                  No.
                </th>
                <th class="text-center">
                  Category
                </th>
                <th class="text-center">
                  Title
                </th>
                <th class="text-center">
                  User
                </th>
                <th class="text-center">
                  Updated_at
                </th>
              </tr>
            </thead>
            <tbody>
              
              <tr
                v-for="board in DataList"
                :key="board.id"
                @click="moveToDetail(board.id)"
              > 
                <td>{{ board.id }}</td>
                <td>{{ boardNum[board.board_num] }}</td>
                
                <td>{{ board.title }} &nbsp; </td>
                <td>{{ userNameList[board.user]}}</td>
                <td>{{board.updated_at | dateFormat}}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <hr>
          <v-pagination
            v-model="curPageNum"    
            :length="numOfPages"
          ></v-pagination>
      </v-app>
    </div>
  </div>
</template>
<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
<script>
import { mapState } from 'vuex'
import _ from 'lodash'

const userStore = 'userStore'

export default {
  name:"BoardListItem",
  props:{
    boardList:Array,
  },
  data:function(){
    return{
      dataPerPage:10,
      curPageNum:1,
    }
  },
  methods:{
    moveToDetail:function(chatId){
      if (this.LoginUser){
      this.$router.push({name:'BoardDetail', params: {chatId:chatId}})
      }
      else{
        this.$router.push({name:'Login'})
      }
    },
    
  },
  computed:{
    ...mapState(
      ['boardNum',
      'userNameList'
    ]),
    ...mapState(
      userStore,
      ['LoginUser',]
    ),
    startOffset(){
      return ((this.curPageNum-1) * this.dataPerPage)
    },
    endOffset(){
      return (this.startOffset + this.dataPerPage)
    },
    numOfPages(){
      return Math.ceil(this.boardList.length / this.dataPerPage)
    },
    DataList(){
      return this.boardList.slice(this.startOffset, this.endOffset)
    },
  },
  filters:{
    dateFormat:function(value){
      if (value===""){
        return ''
      }
      const date = new Date(value)
      const year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      var hour = date.getHours()
      var minute = date.getMinutes()

      hour = (hour>12) ? 'PM' +' '+(hour-12) : 'AM' +' '+hour
      month = (month<10) ? '0'+month : month
      day = (day<10) ? '0'+day : day
      minute = (minute<10)? '0'+minute : minute
      
      const res =  `${year} - ${month} - ${day} ${hour} : ${minute}`
      return res
    }
  },
  

}
</script>

<style>

</style>