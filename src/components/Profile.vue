<template>
  <div id="profile" class="container">
    <h1 class="teal-text centered">
      Edit your profile
    </h1>
    <div class="row">
      <form class="col s12" @submit.prevent="submitForm">
        <div class="row">
          <div class="input-field col s12 m6">
            <input id="first_name" type="text" class="validate" v-name="firstName">
            <label for="first_name">First Name</label>
          </div>
          <div class="input-field col s12 m6">
            <input id="last_name" type="text" class="validate" v-name="lastName">
            <label for="last_name">Last Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="bio" type="text" class="validate">
            <label for="bio">Bio</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="address" type="text" class="validate" v-name="address">
            <label for="address">Address</label>
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
import firebase from 'firebase/app'
require("firebase/auth");

export default {
  name: "Profile",
  props: ['currentUser'],
  data() {
    return {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      address: currentUser.address,
      bio: currentUser.bio
    }
  },
  methods: {
    submitForm() {
      console.log('submitted')
    }
  }
}
</script>

<style scoped>
#profile {
  margin-top: 100px;
}

</style>
