<template>
  <nav class="teal">
    <div class="nav-wrapper">
      <router-link :to="{ name: 'Home' }" class="brand-logo">Logo</router-link>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><router-link :to="{ name: 'SignUp'}">Sign Up</router-link></li>
        <li><router-link :to="{ name: 'LogIn'}">Log In</router-link></li>
        <li v-if="currentUser">
          <router-link :to="{ name: 'Profile' }">Profile</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
  import firebase from 'firebase/app'
  require("firebase/auth");

  export default {
    name: 'Navbar',
    data() {
      return {
        currentUser: null
      }
    },
    created() {
      this.currentUser = firebase.auth().currentUser;
    },
    methods: {
      debug() {
        debugger;
      }
    }
  }
</script>

<style scoped>
  .brand-logo {
    margin-left: 40px;
  }
  nav a {
    margin-right: 10px;
  }

</style>
