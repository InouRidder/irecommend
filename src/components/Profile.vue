<template>
  <div id="profile" class="container">
    <h1 class="teal-text centered">
      Edit your profile
    </h1>
    <div class="row">
       <form class="col s12" @submit.prevent="submitForm" v-if="currentUser">
        <div class="row">
          <div class="input-field col s12 m6">
            <input id="first_name" type="text" class="validate" v-model="currentUser.firstName">
            <label for="first_name">{{ currentUser.firstName ? '' : 'First name'}}</label>
          </div>
          <div class="input-field col s12 m6">
            <input id="last_name" type="text" class="validate" v-model="currentUser.lastName">
            <label for="last_name">{{ currentUser.lastName ? '' : 'Last name'}}</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="bio" type="text" class="validate" v-model="currentUser.bio">
            <label for="bio">{{ currentUser.bio ? '' : 'Bio'}}</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="address" type="text" class="validate" v-model="currentUser.address">
            <label for="address">{{ currentUser.address ? '' : 'Address'}}</label>
          </div>
        </div>
        <div class="row">
          <button class="btn waves-effect waves-light">Update
            <i class="material-icons right"></i>
          </button>
      </div>
      </form>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'
import store from '@/store/index'
import { mapGetters } from 'vuex'
import swal from 'sweetalert'

export default {
  name: "Profile",
  data() {
    return {

    }
  },
  computed: {
      ...mapGetters(['loggedIn', 'currentUser'])
    },
  methods: {
    submitForm() {
      let ref = db.collection('users').doc(this.currentUser.uid).update({
        firstName: this.currentUser.firstName,
        lastName: this.currentUser.lastName,
        address: this.currentUser.address
      })
      .then(() => {
        this.$store.commit('logIn', this.currentUser)
        swal({
          title: "Good job!",
          text: "You updated your information!",
          icon: "success",
          button: "Aww yiss!",
        })
      })
      .catch(error => {
        swal({
          title: "Oh noes!",
          text: "Something went wrong..",
          icon: "error",
          button: "Dammit!",
        })
      })

    }
  },
  created() {

  }
}
</script>

<style scoped>
#profile {
  margin-top: 100px;
}

</style>
