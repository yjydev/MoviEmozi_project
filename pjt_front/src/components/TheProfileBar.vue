<template>
  <div>
    <div class="dropdown">
      <a class="btn btn-line pt-0 dropdown-toggle detailfont fs-4" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
        My Profile
      </a>
      
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink" >
        <li v-if="!isLogin"><router-link :to="{ name: 'Signup'}" class="dropdown-item detailfont" >Signup</router-link></li>
        <li v-if="!isLogin"><router-link :to="{ name: 'Login'}" class="dropdown-item detailfont">Login</router-link></li>

        <li v-if="isLogin"><router-link :to="{ name: 'MyProfile', params:{username:LoginUser}}" class="dropdown-item detailfont" >My Profile</router-link></li>
        <li v-if="isLogin"><router-link to="." class="dropdown-item detailfont" @click.native="logout">Logout</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

const userStore = 'userStore'

export default {
  name: 'TheProfileBar',
  data: function(){
    return{
    }
  },
  props:{
    isLogin : Boolean,
  },
  methods:{
    logout:function(){
      this.$emit('logout')
      this.$store.dispatch('userStore/removeLoginUser')
      this.$router.push({name:'Login',query:{logout:'true'}})
      this.$store.dispatch('Logout')
      this.isLogin = false
    }
  },
  computed:{
    ...mapState(
      userStore,
      ['LoginUser',]
    ),

  },
}
</script>




<style>
.dropdown-menu{
  background: linear-gradient(to top right,  rgba(101, 100, 184, 0.7), rgba(19, 24, 47, 0.7) 80%)
}
</style>
