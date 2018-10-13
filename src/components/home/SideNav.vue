<template>
  <div>
  <div id="sideFriendBar" v-if="display">
    <div class="top-header">
      <div>
        {{currentUser.firstName}}
      </div>
      <div>
        <a  @click="explain" class="btn-floating"><i class="material-icons">info_outline
        </i></a>
        <a @click="toggleSideNav" class="btn-floating scale-transition"><i class="material-icons">keyboard_arrow_left</i></a>
      </div>
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
          <li class="tab col s6 active">
            <a @click="toggleIntNav('recommendations')">Recommendations</a>
          </li>
          <li class="tab col s6">
            <a @click="toggleIntNav('friends')" >Friends</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="row">
      <div class="col s12">
        <FriendNav v-if="displayFriends"></FriendNav>
        <RecommendationNav v-else></RecommendationNav>
      </div>
    </div>

    <div class="row">

    </div>



  </div>
  <a v-if="!display" @click="toggleSideNav" class="see-nav btn-floating"><i class=" material-icons">keyboard_arrow_right</i></a>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import RecommendationNav from '@/components/home/RecommendationNav'
  import FriendNav from '@/components/home/FriendNav'
  import swal from 'sweetalert'


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
      explain() {
        swal("Right click on the map to add your own recommendation, or use the location search bar to search for a place elsewhere", {
          buttons: {
            cancel: "Sweet",
            catch: {
              text: "I goooot this!",
              value: "BOOM",
            }
          },
        })
        .then((value) => {
          switch (value) {

            case "defeat":
              swal("I love to recommend stuff!!");
              break;

            case "catch":
              swal("You", "Be", "Da Best");
              break;

            default:
              swal("These are the best recommendations of my life!");
          }
        });
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
.see-nav {
  margin-top: 60px;
  margin-left: 10px;
}
</style>
