<template>
  <div id="home">
    <div class="container">
      <h1 class="text-teal centered">
        Home
      </h1>
      <p v-if="message">
        {{ message }}
      </p>
    </div>
  </div>

</template>
<script>
  import firebase from 'firebase/app'
  require("firebase/auth");

  export default {
    name: 'Home',
    props: ['message'],
    data() {
      return {
        password: null,
        email: null
      }
    },
    methods: {
    }

  }
</script>

<style scoped>

</style>
