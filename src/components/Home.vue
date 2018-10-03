<template>
  <div id="home">
    <div class="container">
      <GMap></GMap>
      <p v-if="message">
        {{ message }}
      </p>
    </div>
  </div>

</template>
<script>
import firebase from 'firebase/app'
import GMap from '@/components/home/GMap'
require("firebase/auth");


export default {
  name: 'Home',
  props: ['message', 'isLoggedIn'],
  components:{
    GMap
  },
  data() {
    return {
      password: null,
      email: null
    }
  }
}
</script>

<style scoped>

</style>
