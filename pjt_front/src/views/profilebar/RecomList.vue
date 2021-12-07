<template>
  <div>
    <div class="d-flex justify-content-center" >
          <div @click="stop" class="card bg-dark text-white borderround" style="width: 500px; height: 310px;">
            <img :src="imageUrl" class="card-img-top borderround" alt="image" style="height: 310px; width:500px;">
            <div 
            @mouseover="Detail=true" 
            @mouseout="Detail=false"
            class="card-img-overlay p-0"
            >
              <button 
              v-show="Detail"
              class="search-this-movie card jbGrad04 border-dark borderround" 
              style="border-box; width: 500px; height: 310px; opacity: 0.7;"
              >
                <div class="container d-flex" style="width: 500px; height: 310px;">
                  <img style="width:180px;" class="rounded rounded-3" :src="`https://image.tmdb.org/t/p/original${recom.poster_path}`" alt="">
                  <div class="d-flex flex-column align-items-start">
                    <div class="cardtitle card-title mt-3 mx-3 detailfont" style="color: violet; ">{{recom.title}}</div>
                    <div class="card-text mx-3 mb-2 detailfont">{{genreNoArray}}</div>
                    <div class="card-text mx-1 detailfont "><v-icon style="color: silver;" class="mx-1 mb-1">mdi-fire </v-icon>{{recom.popularity}} 
                    <v-icon class="mx-1 mb-1" style="color: silver;">mdi-clock-time-three-outline</v-icon>{{recom.runtime}}</div>
                  </div>
                </div>
                
              </button>
            </div>
          </div>
        </div>
  </div>
</template>

<script>
export default {
  name:"RecomList",
  props:{
    recom:Object,
  },
  data:function(){
    return{
      Detail:false,
      genreNoArray: [],
    }
  },
  computed:{
    imageUrl: function(){
      const imagePath = this.recom['backdrop_path']
      return `https://image.tmdb.org/t/p/original${imagePath}`
    },
  },
  methods:{
    stop:function(){
      this.$emit('stop')
    }
  },
  created: function () {
    for (var genre of this.recom.genres) {
      var array = ['[', ']', ',', "'"]
      if (!array.includes(genre)){
        this.genreNoArray += genre
      }
    }
  }


}
</script>

<style>
.detailfont {
  font-family: 'Hahmlet', serif;
}
.cardtitle {
  font-size: 30px;
  font-weight: 700;
}

.jbGrad04 {
  background: linear-gradient( to left, rgb(207, 207, 207), rgb(54, 54, 54) 30%, rgb(0, 0, 0) );
}

.borderround{
  border-radius: 20px;
}
</style>