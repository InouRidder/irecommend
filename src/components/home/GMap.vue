<template>
  <div>
    <SideNav @setCenter="setCenter" @toggleSideNav="toggleMapClass"></SideNav>
    <gmap-map
      :center="center"
      :zoom="12"
      id="map"
      v-bind:class="mapWidth"
      @rightclick="onRightClick"
    >
      <gmap-marker
        v-for="m in filteredRecommendations"
        :key="m.uid"
        :position="{lat: m.lat, lng: m.lng}"
        :clickable="true"
        @rightclick="onRightClick"
        @click="toggleInfoWindow(m)"
        :icon="{url: require(`../../assets/${markerTypesToIcon(m.types)}`)}"
      >

        <GmapInfoWindow :opened="m.infoWindowOpened" @closeclick="toggleInfoWindow(m)">
          <h4>{{m.title}}</h4>
          <p>{{m.description}}</p>
          <small>{{m.userName}}</small>
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
        map: null,
        center: {lat: 40, lng: 32},
        fullMap: true
      }
    },
    components: {
      SideNav
    },
    computed: {
      ...mapGetters(['currentUser','recommendations', 'filteredRecommendations']),
      mapWidth: function() {
        return {
          full: this.fullMap,
          partial: !this.fullMap
        }
      }
    },
    methods: {
      ...mapMutations(['addRecommendation']),
      toggleInfoWindow(marker) {
        marker.infoWindowOpened = !marker.infoWindowOpened
      },
      markerTypesToIcon(types) {
        if (types.length > 1) {
          return 'mix.png'
        } else {
          return types[0].toLowerCase() + ".png"
        }
      },
      toggleMapClass(direction) {
        this.fullMap = direction
      },
      setCenter(place) {
        this.center = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }
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

#map.partial {
  width: calc(100% - 250px);
  height: 91vh;
  margin: 0 auto;
  background: #FFF;
  position: absolute;
  left: 250px;
  top: 9vh;
}

#map.full {
  width: 100%;
  height: 91vh;
  margin: 0 auto;
  background: #FFF;
  position: absolute;
  left: 0px;
  top: 9vh;
}

</style>
