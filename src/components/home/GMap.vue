<template>
  <div id="map">
    <div class="google-map" id="map" @dblclick="addRecommendation"></div>
    <AddRecommendation></AddRecommendation>
  </div>

</template>

<script>
  import AddRecommendation from '@/components/home/AddRecommendation'
  export default {
    name: 'GMap',
    components: {
      AddRecommendation
    },
    data() {
      return {
        lat: 53,
        lng: -2,
        coords: null,
        modal: null
      }
    },
    methods: {
      getCoordinates() {
        return new Promise(function(resolve, reject) {
          if (
            !("geolocation" in navigator) ||
            !("getCurrentPosition" in navigator.geolocation)
          ) {
            return Promise.reject(new Error("geolocation API not available"));
          }
          var options = {
            timeout: 10000
          };

          // browser prompts for permission
          navigator.geolocation.getCurrentPosition(
            getPositionCallBack,
            reject,
            options
          );

          function getPositionCallBack(position) {
            var coords = "";
            try {
              coords = {
                lat: position.coords.latitude,
                long: position.coords.longitude
              };
            } catch (err) {
              return reject(err);
            }
            return resolve(coords);
          }
        });
      },
      renderMap() {
        const map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: this.lat, lng: this.lng },
          zoom: 15,
          maxZoom: 15,
          minZoom: 3,
          streetViewControl: false
        })
        map.addListener('mouseup', (e) => {
          if (Date.now() - this.clickStart > 500) {
            this.addRecommendation(e, map)
          }
        })
        map.addListener('mousedown', (e) => {
          this.clickStart = Date.now()
        })
      },
      addRecommendation(e, map) {
        let lat = e.latLng.lat()
        let lng = e.latLng.lng()
        this.modal.open()
      },
      selectModal() {
        document.addEventListener('DOMContentLoaded', () => {
          let element = document.getElementById('recommendation-form')
          this.modal = M.Modal.getInstance(element)
        })
      }
    },
    created() {
      this.getCoordinates()
      .then((coords) => {
        this.lat = coords.lat
        this.lng = coords.long
        this.renderMap()
      })
      .catch(error => {
        console.log(error)
      })
    },
    mounted () {
      this.selectModal()
      this.renderMap()
    }
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
