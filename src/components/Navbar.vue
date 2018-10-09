<template>
  <nav class="teal">
    <div class="nav-wrapper">
      <router-link :to="{ name: 'Home' }" class="brand-logo">Logo</router-link>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li v-if="currentUser">
          <router-link :to="{ name: 'Profile' }">{{ currentUser.firstName}}</router-link>
        </li>
        <li v-if="loggedIn">
          <a @click="logout">Logout</a>
        </li>
        <li v-if="!loggedIn"><router-link :to="{ name: 'LogIn' }">Log In</router-link></li>
      </ul>
    </div>
  </nav>
</template>
<script>
  import firebase from 'firebase/app'
  require("firebase/auth");
  import db from '@/firebase/init'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Navbar',
    props: ['user' ],
    components: {

    },
    data() {
      return {

      }
    },
    created() {
      console.log(this.getUser())
    },
    computed: {
      ...mapGetters(['loggedIn', 'currentUser'])
    },
    methods: {
      logout() {
        firebase.auth().signOut()
        .then(() => {
          this.$store.commit('logOut')
          this.$router.push('log-in')
        })
        .catch(error => {
          console.log(error)
        })
      },
      getUser() {
        let user = firebase.auth().currentUser
        if (!user) return;
        let ref = db.collection('users').doc(user.uid)
        let currentUser = {name: 'lol'}
        ref.get().then((doc) => {
          currentUser = doc.data()
          currentUser.uid = user.uid;
          this.$store.commit('logIn', currentUser)
        })
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
