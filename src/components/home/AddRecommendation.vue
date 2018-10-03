<template>
  <div id="recommendation-form" class="modal">
    <form class="col s12" @submit.prevent="addRecommendation">
      <div class="modal-content">
        <div class="row">
          <div class="input-field col s6">
            <input placeholder="Placeholder" id="first_name" type="text" class="validate">
            <label for="first_name">Title</label>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
      </div>
    </form>
  </div>

</template>
<script>
  export default {
    name: 'AddRecommendation',
    props: ['coords'],
    data() {
      return {
        location: null,
        title: null,
        tags: []
      }
    },
    methods: {
      addRecommendation() {
        console.log('adding')
      }
    }

  }
</script>

<style scoped>

</style>
