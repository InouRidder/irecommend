<template>
  <nav class="teal">

  </nav>
</template>
<script>
  import firebase from 'firebase/app'
  require("firebase/auth");
  import db from '@/firebase/init'

  export default {
    name: 'RecommendationFilter',
    props: ['user' ],
    data() {
      return {
        currentUser: null
      }
    },
    created() {
      this.getUser()
    },
    methods: {
      logout() {
        this.currentUser = null
        firebase.auth().signOut()
        .then(() => {
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
        ref.get().then((doc) => {
          this.currentUser = doc.data()
          this.currentUser.uid = user.uid;
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
