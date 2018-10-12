<template>
  <div id="home">
    <div class="container-fluid">
      <GMap @showModal="displayRecommendationForm"></GMap>
      <AddRecommendation v-if="showModal" @close="showModal = false" @addRecommendation="addRecommendation"></AddRecommendation>
    </div>
  </div>

</template>
<script>
import GMap from '@/components/home/GMap'
import AddRecommendation from '@/components/home/AddRecommendation'
import SideNav from '@/components/home/SideNav'
import db from '@/firebase/init'
import firebase from 'firebase/app'
require("firebase/auth");
import swal from 'sweetalert'
import {mapGetters} from 'vuex'

export default {
  name: 'Home',
  props: ['message', 'isLoggedIn'],
  components:{
    GMap,
    AddRecommendation,
    SideNav
  },
  computed: {
    ...mapGetters(['loggedIn', 'currentUser'])
  },
  data() {
    return {
      showModal: false,
      newRecommendation: null,
      coords: null
    }
  },
  methods: {
    displayRecommendationForm(coords) {
      this.coords = coords
      this.showModal = true
    },
    addRecommendation(data) {
      db.collection('recommendations').add({
        lat: this.coords.lat,
        lng: this.coords.lng,
        title: data.title,
        description: data.description,
        user_id: this.currentUser.uid,
        types: data.selectedTypes
      }).then(() => {
        this.showModal = false
        swal({
          title: "Recommendation added!",
          button: "Aww yiss!"
        })
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>


</style>
