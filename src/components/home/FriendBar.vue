<template>
  <div class="sideFriendBar">
    <ul id="slide-out" class="sidenav" v-if="loggedIn">
      <li>
        <div class="user-view">
          <div class="background">
            <img src="">
          </div>
        <a href="#user">{{currentUser.firstName}}</a>
        <a href="#name"><span class="white-text name"></span></a>
        <a href="#email"><span class="white-text email">{{currentUser.email}}</span></a>
        </div>
      </li>
      <li><a href="#!"><i class="material-icons">cloud</i>{{currentUser.bio}}</a></li>
      <li><a href="#!">Second Link</a></li>
      <li><div class="divider"></div></li>
      <li><a class="subheader">Subheader</a></li>
      <li><a class="waves-effect" href="#!">Third Link With Waves</a></li>
    </ul>
    <a @click="toggleSideNav" data-target="slide-out" class="btn waves-effect waves-light sidenav-trigger" v-if="loggedIn">
      <i class="material-icons">arrow_right_alt</i>
    </a>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'FriendBar',
    data () {
      return {
        sideNav: null
      }
    },
    computed: {
      ...mapGetters(['loggedIn', 'currentUser'])
    },
    methods: {
      toggleSideNav() {
        this.sideNav.open()
      },
    },
    mounted() {
      this.sideNav = M.Sidenav.init(document.querySelector('.sidenav'));
    }
  }
</script>

<style scoped>
.sidenav-trigger {
  cursor: pointer;
}
</style>
