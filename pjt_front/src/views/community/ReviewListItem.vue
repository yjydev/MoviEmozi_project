<template>
  <div>
    <div id="app" class="my-4">
      <v-app id="inspire">
        <v-simple-table dark>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">
                  No.
                </th>
                <th class="text-center">
                  Movie
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
                v-for="(review) in DataList"
                :key="review.id"
                @click="moveToDetail(review.id)"
              >
                <td>{{ review.id }}</td>
                <td>{{movieTitle['movieTitle'][(review.movie_id-1)]}}</td>
                <!-- {{ImportComment(review.id)}} -->
                <td>{{ review.title }} &nbsp; </td>
                <td>{{userNameList[review.user]}}</td>
                <td>{{review.updated_at |dateFormat}}</td>
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

<script>
import {mapState} from 'vuex'

const movieTitle = 'movieTitle'

export default {
  name:"ReviewListItem",
  props:{
    reviewList:Array,
  },
  data:function(){
    return{
      dataPerPage:10,
      curPageNum:1,
    }
  },
  methods:{
    moveToDetail:function(reviewId){
      this.$router.push({name:'ReviewDetail', params: {reviewId:reviewId}})
    },
    
  },
  computed:{
    comment_cnt(){
      var cnt = 0
      if (this.comment_list){
        cnt = this.comment_list.length
      }
      return cnt
    },
    ...mapState([
      'userNameList',
    ]),
    ...mapState([
      movieTitle,
      ['movieTitle,']
    ]),
    startOffset(){
      return ((this.curPageNum-1) * this.dataPerPage)
    },
    endOffset(){
      return (this.startOffset + this.dataPerPage)
    },
    numOfPages(){
      return Math.ceil(this.reviewList.length / this.dataPerPage)
    },
    DataList(){
      return this.reviewList.slice(this.startOffset, this.endOffset)
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
      
      return year + '-' + month+'-'+day+' '+hour+':'+minute;
    }
  },
  // created:function(){
  //   for (let i=1; i<this.reviewList.length+1; i++){
  //     axios({
  //       method:'get',
  //       url:`http://127.0.0.1:8000/community/${i}/review_comments/`,
  //       headers: this.$store.state.config
  //     })
  //     .then(res=>{
  //       this.cnt_list.push(res.data.length)
  //     })
  //     .catch((err)=>{
  //       if(err.response.status===404){
  //         this.cnt_list.push(0)
  //       }
  //     })
  //   }
  // }
}
</script>

<style>

</style>