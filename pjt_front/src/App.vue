<template>
  <div id="app">
    <v-card class="overflow-hidden">
      <v-app-bar color="#43a047" style="height:100px;"
      :style="{'background-image': 'url(' + require('@/assets/background_img.jpg') +')'}" fade-img-on-scroll shrink-on-scroll
      scroll-target="#scrolling">
      <template v-slot:img="{props}">
        <v-img v-bind="props" gradient="to top right,   rgba(25,32,72,.7), rgba(117, 116, 204, 0.5)">
        </v-img>
      </template>
    <div id="nav" class="d-flex" >
     <div style="width:200px; padding-left:20px; white-space:no-wrap;" class="detailfont"><router-link :to="{ name: 'Home'}">
       <div class="titlesize">MoviEmozi</div></router-link></div>
    
       <v-spacer></v-spacer>
      <div style="display:flex;">
        <!-- <router-link :to="{ name: 'cardGame'}" class="mx-2">Movie Recommend</router-link> | -->
        <!-- Community => 자유, Review, 건의 -->
        <router-link :to="{ name: 'Community'}" class="mx-2 detailfont">Community</router-link>  |
        <router-link :to="{ name: 'QuestionList' }" class="mx-2 detailfont">1:1 문의</router-link>  |
        <router-link :to="{ name: 'cardGame' }" class="mx-2 detailfont">영화 추천</router-link>
        <!-- profile drop down => profile logout / signup login -->
        <the-profile-bar id="profile-bar" :isLogin="isLogin"></the-profile-bar>
        </div>
    </div>
      </v-app-bar>
      <v-sheet id="scrolling" class="overflow-y-auto" style="background-color:rgb(19, 19, 19); padding-top:30px;" >

        <router-view :key="$route.fullPath" @login="isLogin=true" @logout="isLogin=false"/>

      </v-sheet>
    </v-card>

  </div>

</template>

<script>
import TheProfileBar from '@/components/TheProfileBar'

export default {
  name: 'App',
  components: {
    TheProfileBar,
  },
  data:function(){
    return{
      isLogin : false
      }
  },
  methods: {

  },
  created:function(){
    if (localStorage.getItem('jwt')){
      this.isLogin = true
      this.$store.dispatch('setToken')
    }else{
      this.isLogin = false
    }
  }
}
</script>



<style>
.v-toolbar__image{
  background: linear-gradient(
    to bottom,
    rgba(20, 20, 20, 0) 10%,
    rgba(20, 20, 20, 0.25) 25%,
    rgba(20, 20, 20, 0.5) 50%,
    rgba(20, 20, 20, 0.75) 75%,
    rgba(20, 20, 20, 1) 100%
  );
}

#scrolling{
  /* background: linear-gradient(rgb(147, 147, 212), 10%, rgb(233, 192, 198)); */
  background: rgb(19, 19, 19); 
}

#app{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.dropdown-toggle {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#img_bar {border:none;}

#nav a {
  font-weight: bold;
  color: rgb(192, 189, 189);
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: white;
}

.v-toolbar__content, .v-toolbar__extension{
  display: inline !important;
}

  .titlesize{
    font-size:25px;
  }
</style>
