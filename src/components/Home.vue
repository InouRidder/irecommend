<template>
  <div id="home">
    <div class="container">
      <GMap @showModal="displayRecommendationForm"></GMap>
      <AddRecommendation v-if="showModal" @close="showModal = false" @addRecommendation="addRecommendation"></AddRecommendation>
    </div>
  </div>

</template>
<script>
import GMap from '@/components/home/GMap'
import AddRecommendation from '@/components/home/AddRecommendation'
import db from '@/firebase/init'
import firebase from 'firebase/app'
require("firebase/auth");
import swal from 'sweetalert'


export default {
  name: 'Home',
  props: ['message', 'isLoggedIn'],
  components:{
    GMap,
    AddRecommendation
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
      console.log(data)
      db.collection('recommendations').add({
        lat: this.coords.lat,
        lng: this.coords.lng,
        title: data.title,
        description: data.description,
        user_id: firebase.auth().currentUser.uid,
        types: data.selectedTypes
      }).then(() => {
        this.showModal = false
        swal({
          title: "Recommendation added!",
          button: "Aww yiss!"
        })
      }).catch(error => {

      })
    }
  }
}
</script>

<style scoped>

</style>
