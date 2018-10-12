<template>
  <div>
    <SideNav></SideNav>
    <gmap-map
      :center="center"
      :zoom="12"
      id="map"
      @rightclick="onRightClick"
    >
      <gmap-marker
        v-for="m in filteredRecommendations"
        :key="m.uid"
        :position="{lat: m.lat, lng: m.lng}"
        :clickable="true"
        @rightclick="onRightClick"
        @click="toggleInfoWindow(m)"
      >
        <GmapInfoWindow :opened="m.infoWindowOpened" @closeclick="toggleInfoWindow(m)">
          <h4>{{m.title}}</h4>
          <p>{{m.description}}</p>
          <small>{{m.user_id}}</small>
          <ul>
            <li v-for="type in m.types">
              {{type}}
            </li>
          </ul>

        </GmapInfoWindow>
      </gmap-marker>
    </gmap-map>
  </div>

</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import SideNav from '@/components/home/SideNav'

  export default {
    name: 'GMap',
    data() {
      return {
        center: { lat:2, lng:34 },
        map: null
      }
    },
    components: {
      SideNav
    },
    computed: {
      ...mapGetters(['currentUser','recommendations', 'filteredRecommendations'])
    },
    methods: {
      ...mapMutations(['addRecommendation']),
      toggleInfoWindow(marker) {
        marker.infoWindowOpened = !marker.infoWindowOpened
      },
      geolocate: function() {
        navigator.geolocation.getCurrentPosition(position => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
        });
      },
      onRightClick(e) {
        this.addRecommendation(e)
      },
      addRecommendation(e) {
        let lat = e.latLng.lat()
        let lng = e.latLng.lng()
        this.$emit('showModal', {lat: lat, lng: lng})
      }
    },
    created() {
      this.geolocate();
    },
  }
</script>
<style>

#map {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #FFF;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
}

</style>
