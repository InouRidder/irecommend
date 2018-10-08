<template>
  <div class="sideFriendBar">
    <ul id="slide-out" class="sidenav">
      <li><div class="user-view">
        <div class="background">
          <img src="">
        </div>
        <a href="#user"></a>
        <a href="#name"><span class="white-text name">{{}}</span></a>
        <a href="#email"><span class="white-text email">{{}}</span></a>
      </div></li>
      <li><a href="#!"><i class="material-icons">cloud</i>{{}}</a></li>
      <li><a href="#!">Second Link</a></li>
      <li><div class="divider"></div></li>
      <li><a class="subheader">Subheader</a></li>
      <li><a class="waves-effect" href="#!">Third Link With Waves</a></li>
    </ul>
    <a @click="toggleSideNav" data-target="slide-out" class="btn waves-effect waves-light sidenav-trigger">
      <i class="material-icons">arrow_right_alt</i></a>
  </div>
</template>

<script>
  require("firebase/auth");
  import firebase from 'firebase/app'


  export default {
    name: 'FriendBar',
    data () {
      return {
        currentUser: null
      }
    },
    methods: {
      toggleSideNav() {
        this.sideNav.open()
      },
      setUserInfo() {
        this.currentUser = firebase.auth().currentUser
      }
    },
    mounted() {
      this.sideNav = M.Sidenav.init(document.querySelector('.sidenav'));
      this.setUserInfo()
    }
  }
</script>

<style scoped>
.sidenav-trigger {
  cursor: pointer;
}
</style>
