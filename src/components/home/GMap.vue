<template>
  <div>
    <gmap-map
      :center="center"
      :zoom="12"
      id="map"
      @rightclick="onRightClick"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="{lat: m.lat, lng: m.lng}"
        @rightclick="onRightClick"
        @click="openInfoWindow(m)"
      >
        <GmapInfoWindow :opened="m.infoWindowOpened">
          <h1>{{m.title}}</h1>
          <p>{{m.description}}</p>
        </GmapInfoWindow>
      </gmap-marker>
    </gmap-map>
  </div>

</template>

<script>
  import db from '@/firebase/init'
  export default {
    name: 'GMap',
    data() {
      return {
        center: { lat:2, lng:34 },
        markers: [],
        map: null
      }
    },
    methods: {
      openInfoWindow(marker) {
        marker.infoWindowOpened = true
      },
      setPlace(place) {
        this.currentPlace = place;
      },
      addMarker(recommendation) {
        const marker = {
          lat: recommendation.lat,
          lng: recommendation.lng,
          title: recommendation.title
        };
        this.markers.push(marker);
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
    mounted() {
      let ref = db.collection('recommendations')
      ref.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            let data = change.doc.data()

            let marker = {
              lat: data.lat,
              lng: data.lng,
              title: data.title,
              infoWindowOpened: false,
              infoWindow: `<h1> ${data.title} </h1> <p> ${data.description} </p>`
            }

            this.markers.push(marker)
          }
        })
      })
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
