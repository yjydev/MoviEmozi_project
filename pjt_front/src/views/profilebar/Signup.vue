<template>
  <div style="color:white;" align="center">
    <h1>Signup</h1>
    <v-container id="signup">
      <v-row >
      <v-form ref="form" lazy-validation v-model="valid" >
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
      <v-col align="center">
      <v-text-field
      style="width:310px; margin-bottom:15px;"
      v-model="user.passwordConfirm"
      :rules="passwordConfirmRules"
      label="password Confirm"
      required
      type="password"
      >
      </v-text-field>
      </v-col>




      <v-btn :class="{isvalid : !valid}" class="mx-4" @click="validate" style="margin-bottom: 20px;">
        Sign Up
      </v-btn>
      <v-btn class="mx-4 reset px-3" @click="reset">
        Reset
      </v-btn>
      <v-btn @click="resetValidate" class="reset_valid mx-4 px-3">Reset Error</v-btn>

    </v-form>
        
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'

const userStore = 'userStore'

export default {
  name: 'Signup',

  data:function(){
    return{
      user:{
        username:null,
        password : null,
        passwordConfirm : null,
      },
      files:null,
      valid : true,
      nameRules:[
        v=> !!v || '이름은 필수 입력사항입니다.',
        v => (v && v.length <= 10) || '이름은 10글자를 넘을 수 없습니다.',],
      passwordRules:[
        v=>!!v || '비밀번호는 필수 입력사항입니다.',
        v=>(v && v.length >= 5 ) || '비밀번호는 5글자 이상 가능합니다.',],
      passwordConfirmRules:[
        v=>!!v || '비밀번호 확인은 필수 입력사항입니다.',
        v=>(!!v && v) === this.user.password || '비밀번호가 일치하지 않습니다.',],
      
    }
  },
  methods:{
    

    onInputImage(){
      var image = this.$refs['Image'].files[0]
      const url = URL.createObjectURL(image)
      this.user.image = url
    },
    validate () {
      if(this.$refs.form.validate()){
        this.signup()
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidate () {
      this.$refs.form.resetValidation()
    },

    signup : function(){
      axios({
        method:'post',
        url:`http://127.0.0.1:8000/accounts/signup/`,
        data: this.user,
      })
      .then(() =>{
        this.$router.push({name:'Login', query:{'isSign':true}})
      })
      .catch(err=>{
        if (err.response.status === 409){
        alert(err.response.data.error)
        this.reset()
        }
      })
    }
  },
  computed:{
    ...mapState(
      userStore,
      ['LoginUser',]
    ),
  },
  created:function(){
    if (this.LoginUser){
      this.$router.push({name:'Home'})
    }
  }
}
</script>

<style>

.v-label{
  color:white !important;
  padding-left: 10px;
}
.v-messages__message{
  color:rgb(173, 7, 7);
  font-size:15px;
  padding-top: 10px;
  color:rgba(117, 116, 204)}

.reset{
  margin-bottom: 20px;

}
.reset_valid{
  margin-bottom: 20px;
}

.isvalid  {
  background-color: rgba(117, 116, 204);
}
.theme--light.v-input input, .theme--light.v-input textarea{
  color:white;
}

#signup{
  width:650px;
  border: 2px solid rgba(117, 116, 204);
  border-radius: 30px;
}

#input-14{
  padding-left: 10px;
}
#input-17 {
  padding-left: 10px;
}

#input-20{
  padding-left: 10px;
}
</style>