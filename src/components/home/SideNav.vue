<template>
  <div>
  <div id="sideFriendBar" v-if="display">
    <div class="top-header">
      <div>
        {{currentUser.firstName}}
      </div>
      <a @click="toggleSideNav" class="btn-floating scale-transition"><i class="material-icons">fast_rewind</i></a>
    </div>
    <div class="row">
      <div class="col s12">
        <gmap-autocomplete
          @place_changed="setCenter">
        </gmap-autocomplete>
      </div>
    </div>

    <div class="row">
      <div class="col s12">
        <ul class="tabs">
          <li class="tab col s3"><a @click="toggleIntNav('recommendations')">Recommendations</a></li>
          <li class="tab col s3"><a @click="toggleIntNav('friends')" >Friends</a></li>
        </ul>
      </div>
    </div>

    <div class="row">
      <div class="col s12">
        <FriendNav v-if="displayFriends"></FriendNav>
        <RecommendationNav v-else></RecommendationNav>
      </div>
    </div>



  </div>
  <a v-if="!display" @click="toggleSideNav" class="btn-floating"><i class="material-icons">fast_forward</i></a>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import RecommendationNav from '@/components/home/RecommendationNav'
  import FriendNav from '@/components/home/FriendNav'
  export default {
    name: 'SideNav',
    data () {
      return {
        sideNav: null,
        display: false,
        displayFriends: true
      }
    },
    components: {
      FriendNav,
      RecommendationNav
    },
    computed: {
      ...mapGetters(['loggedIn', 'currentUser'])
    },
    methods: {
      toggleSideNav() {
        if (this.loggedIn) {
          this.display = !this.display
          this.$emit('toggleSideNav', !this.display)
        }
      },
      setCenter(place) {
        this.$emit('setCenter', place)
      },
      toggleIntNav(element) {
        this.displayFriends = (element === "friends")
      }
    }
  }
</script>

<style scoped>
#sideFriendBar {
  height: 91vh;
  background-color: #FFF;
  width: 250px;
  z-index: 999;
  border: rgba(251,251,251,0.9);
}
.top-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 30px;
}

.tabs {
  display: flex;
}

.tabs .tab {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
