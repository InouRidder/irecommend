<template>
  <div id="sign-up">
    <div class="container">
      <h1 class="text-teal centered">
        Sign Up
      </h1>
      <div class="row">
        <form class="col s12" @submit.prevent="signup">
          <div class="row">
            <div class="input-field col s12">
              <input id="first-name" type="text" class="validate" v-model="firstName">
              <label for="first-name">First Name</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="last-name" type="text" class="validate" v-model="lastName">
              <label for="last-name">Last Name</label>
            </div>
          </div>
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
          <p v-if="feedback">
            {{ feedback }}
          </p>
          <button class="btn waves-effect waves-light" @click="signup">{{ msg }}
            <i class="material-icons right"></i>
          </button>
        </form>
      </div>
      <p class="teal-text">
        Already have an account?
        <router-link :to="{ name: 'LogIn'}"> Log In </router-link>
      </p>
    </div>
  </div>
</template>
<script>
  import firebase from 'firebase/app'
  import db from '@/firebase/init'
  require("firebase/auth");

  export default {
    name: 'SignUp',
    data() {
      return {
        password: null,
        email: null,
        feedback: null,
        firstName: null,
        lastName: null,
        msg: "Sign Up"

      }
    },
    methods: {
      signup() {
        if (this.allFiedsFilled()) {
          this.feedback = null
          firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then((doc) => {
            let ref = db.collection('users').doc(doc.user.uid)
            ref.set({
              firstName: this.firstName,
              lastName: this.lastName,
              friends: []
            })
            this.$emit('login')
            this.$router.push({ name: 'Home', params: { message: 'Succesfully logged in'}})
          }).catch(error => {
            this.feedback = error.message
          })
        } else {
          this.feedback = "Please fill in all fields"
        }
      },
      allFiedsFilled() {
        return (this.email && this.password && this.firstName && this.lastName)
      }
    }

  }
</script>

<style scoped>

</style>
