<template>
  <div id="app">
    <navbar></navbar>
    <router-view v-on:login="login()" />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  },
  data() {
    return  {
      loggedIn: false
    }
  },
  methods: {
    login() {
      this.$children[0].getUser()
    }
  }
}
</script>

<style>

</style>
