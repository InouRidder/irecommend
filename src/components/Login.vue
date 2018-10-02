<template>
  <div id="log-in">
    <div class="container">
      <h1 class="teal-text centered">
        {{ msg }}
      </h1>
      <div class="row">
        <form class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <input id="email" type="email" class="validate" v-model="email">
              <label for="email">Email</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="password" type="password" class="validate" v-model="password">
              <label for="password">Password</label>
            </div>
          </div>
          <p v-if="feedback" class="red-text">
            {{feedback}}
          </p>
          <button class="btn waves-effect waves-light" @click="submitForm">{{ msg }}
            <i class="material-icons right"></i>
          </button>

        </form>
      </div>
      <p class="teal-text">
        Dont have an account?
        <router-link :to="{ name: 'SignUp'}"> Sign Up here </router-link>
      </p>
    </div>
  </div>

</template>
<script>

import firebase from 'firebase/app'
require("firebase/auth");

export default {
  name: 'LogIn',
  data() {
    return {
      msg: "Log In",
      password: null,
      email: null,
      feedback: null
    }
  },
  methods: {
    submitForm() {
      if (this.email && this.password) {
        this.feedback = null
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push({ name: 'Home', params: { message: 'Succesfully logged in'}})
        }).catch(error => {
          this.feedback = error.message
        })
      } else {
        this.feedback = "Please enter an email and password"
      }
    },
  }

}

</script>

<style scoped>

</style>
