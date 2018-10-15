<template>
  <!-- <div>
      <nav>
    <div class="nav-wrapper">
      <a href="#!" class="brand-logo">Logo</a>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      <ul class="right hide-on-med-and-down">
        <li><a href="sass.html">Sass</a></li>
        <li><a href="badges.html">Components</a></li>
        <li><a href="collapsible.html">Javascript</a></li>
        <li><a href="mobile.html">Mobile</a></li>
      </ul>
    </div>
  </nav>

  <ul class="sidenav" id="mobile-demo">
    <li><a href="sass.html">Sass</a></li>
    <li><a href="badges.html">Components</a></li>
    <li><a href="collapsible.html">Javascript</a></li>
    <li><a href="mobile.html">Mobile</a></li>
  </ul>
  </div> -->
  <nav class="teal">
    <div class="nav-wrapper">
      <router-link :to="{ name: 'Home' }" class="brand-logo">
        iRecommend
      </router-link>
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
      this.getUser()
    },
    computed: {
      ...mapGetters(['loggedIn', 'currentUser'])
    },
    methods: {
      logout() {
        firebase.auth().signOut()
        .then(() => {
          console.log('hello')
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
        let currentUser = {}
        ref.get().then((doc) => {
          currentUser = doc.data()
          currentUser.uid = user.uid;
          this.$store.dispatch('logIn', currentUser)
          this.$store.commit('setFollowingUIDS')
          this.$store.dispatch('fetchRecommendations')
          .then(this.$store.commit('setInitialRecommendations'))
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

  #mobile-demo {
    z-index: 99999;
  }

</style>
