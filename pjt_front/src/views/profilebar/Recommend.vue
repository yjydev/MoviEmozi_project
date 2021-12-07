<template>
  <div>
    <div align="left">
    <v-file-input v-model="files" name="files" label="mood Image" @change="select()" class="rounded rounded-3 opacity-75"></v-file-input>
    <div v-if="isfileNull" id="null">이미지를 선택해주세요!!</div>
    <div v-else style="font-size:13px; margin-bottom:5px;"> ※ 얼굴 사진을 업로드하시면 현재 기분에 맞는 영화를 추천해드립니다!</div>
    <v-btn outlined style="color: silver;" @click="recommend()">Select</v-btn>
    </div>
    <div v-if="face">
    {{(face.emotion.confidence*100).toFixed(2)}} % 확률로 [{{emotion[face.emotion.value]}}] 상태입니다<div>
      <div>그런 당신을 위해 아래의 영화를 추천해드립니다!</div>
    </div>
    
    
    <div class="container" style="color:white; height:420px; margin-top:10px;">
      <v-btn outlined style="color:silver; margin-bottom:10px;" @click="play"><v-icon large style="color:silver;">{{playIcon}}</v-icon>자동 재생</v-btn>
        <v-carousel 
        height="370"
        :cycle = isplay
        interval="3000"
        >
          <v-carousel-item  
          v-for="recom in recoms"
          :key="recom.id"
          reverse-transition="fade-transition"
          transition="fade-transition"
          >
          <recom-list   
          @stop="play"
          :recom="recom">
          </recom-list>
        </v-carousel-item>
        </v-carousel>
      </div>
    </div>
  </div>
</template>

<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
<script>
import axios from 'axios'
import {mapState} from 'vuex'
import RecomList from './RecomList.vue'
import lodash from 'lodash'

export default {
  name:'Recommend',
  components:{
    RecomList,
  },
  data:function(){
    return{
      isplay : false,
      files : null,
      isfileNull : false,
      face : null,
      recoms : null,
      emotion : {
        "angry" : '화남',
        "disgust": '역겨움,기분 나쁨',
        "fear" : '근심,두려움',
        "laugh" : '웃음, 즐거움',
        "neutral" : '무표정, 별다른 감정 없음',
        "sad" : '슬픔, 진지함',
        "surprise":"놀람,당황",
        "smile" : '미소',
        "talking" : "말하는 , 표정이 풍부한"

      },
      genre : {
        "angry" : ['액션','애니메이션','코미디','전쟁','범죄','모험'],
        "disgust": ['드라마','가족','음악'],
        "fear" : ['음악','코미디','모험'],
        "laugh" : ['로맨스','모험','애니메이션'],
        "neutral" : ['코미디','공포','액션','스릴러','전쟁'],
        "sad" : ['가족','드라마','다큐멘터리'],
        "surprise":['음악','코미디','모험'],
        "smile" : ['코미디','공포','액션','스릴러','전쟁'],
        "talking" : ['SF','판타지','범죄','역사','서부']
      }
      
    }
  },
  computed:{
    ...mapState([
      'recom_list',
    ]),
    imageUrl: function(){
      const imagePath = this.movieCard['poster_path']
      return `https://image.tmdb.org/t/p/original${imagePath}`
    },
    playIcon:function(){
      return this.isplay ? 'mdi-stop-circle-outline' : 'mdi-arrow-right-drop-circle'
    }
  },
  methods:{
    shuffle:function(){
      if (this.recom_list){
        this.recoms = _.sampleSize(this.recom_list,10)
      }
    },
    play:function(){
      if (this.isplay){
        this.isplay = false
      }
      else {
      this.isplay = true
      }
    },
    select:function(){
      this.isfileNull = false
    },
    recommend:function(){
      if (this.files == null){
        this.isfileNull = true
      } else {
      let image = new FormData()
      image.append('files', this.files)
      if (this.files === ''){
        image.append('files',[])
      } else {
        for (let i=0; i<this.files.length; i++){
          image.append('files',this.files[i])
        }
      }
      const token = localStorage.getItem('jwt')

      axios({
        method: 'post',
        url:`http://127.0.0.1:8000/accounts/upload/`,
        data: image,
        headers: {
          "Content-Type":'multipart/form-data',
          'Authorization' : `JWT ${token}`
        },
      })
      .then(res=>{
        var d = JSON.parse(res.data)
        this.face = d.faces[0]
        this.$store.dispatch('RecomMovie',this.genre[this.face.emotion.value])
        setTimeout(()=>this.shuffle(), 300)
        
      })
      }


    }
  }}
</script>

<style>
.v-file-input{
  margin-bottom: 10px;
  padding-top: 5px;
  padding-right: 10px;
  background-color: rgb(121, 59, 161);
  width:230px;
  height: 45px;
}

.v-window__prev{
  display: none;
}
.v-window__next{
  display: none;
}

</style>