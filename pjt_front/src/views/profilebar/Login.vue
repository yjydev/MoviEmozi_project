<template>
  <div style="color:white;">
    <h1>Login</h1>
    <v-container id="login">
      <v-row>
      <v-form ref="form" lazy-validation v-model="valid">
      <v-col align="center">
      <v-text-field
      style="width:250px;"
      light
      v-model="user.username"
      :counter="10"
      :rules="nameRules"
      label="userName"
      required
      >
      </v-text-field>
      </v-col>
      <v-col align="center">
      <v-text-field
      style="width:300px;"
      v-model="user.password"
      :rules="passwordRules"
      label="password"
      required
      type="password"
      >
      </v-text-field>
      </v-col>

      <v-btn :class="{isvalid : !valid}" class="mx-4 my-4" @click="validate" style="margin-bottom: 20px;">
        Login
      </v-btn>
      <v-btn class="mx-4 reset px-3 my-4" @click="reset">
        Reset
      </v-btn>
      <v-btn @click="resetValidate" class="reset_valid mx-4 px-3 my-4">Reset Error</v-btn>

    </v-form>
        
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',

  data:function(){
    return{
      user:{
        username:null,
        password : null,
      },
      valid : true,
      nameRules:[
        v=> !!v || '이름은 필수 입력사항입니다.',
        v => (v && v.length <= 10) || '이름은 10글자를 넘을 수 없습니다.',],
      passwordRules:[
        v=>!!v || '비밀번호는 필수 입력사항입니다.',],
    }
  },
  methods:{
    validate () {
      if(this.$refs.form.validate()){
        this.Login()
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidate () {
      this.$refs.form.resetValidation()
    },
    Login : function(){
      axios({
        method:'post',
        url:`http://127.0.0.1:8000/accounts/api-token-auth/`,
        data: this.user
      })
      .then((res) =>{
        localStorage.setItem('jwt', res.data.token)
        this.$emit('login')
        this.$store.dispatch('setToken')
        this.$store.dispatch('userStore/getLoginUser', this.user.username)
        this.$store.dispatch('Login')
        if (document.referrer){
          if (this.$route.query.isSign){
            this.$router.push({name:'Home'})}
          else if (this.$route.query.category === 'review'){
            this.$router.push({name:'ReviewList'})
          } else if (this.$route.query.category === 'question'){
            this.$router.push({name:'QuestionList'})
          } else if (this.$route.query.logout === 'true'){
            history.go(-2)
          }
          else{
          history.back();
          }
        }
        else{
        this.$router.push({name:'Home'})
        }
      })
      .catch(()=>{
        alert('아이디 또는 비밀번호가 잘못 입력 되었습니다. 아이디와 비밀번호를 정확히 입력해 주세요!')
        this.$refs.form.reset()
      })

    }
  }
}
</script>

<style>
#login{
  width:600px;
  height: 300px;
  border: 2px solid rgba(117, 116, 204);
  border-radius: 30px;
}
</style>