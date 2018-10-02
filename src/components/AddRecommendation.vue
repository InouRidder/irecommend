<template>
  <div id="home">
    <div class="container">
      <h1 class="text-teal centered">
        Home
      </h1>
      <p v-if="message">
        {{ message }}
      </p>
    </div>
  </div>

</template>
<script>
  export default {
    name: 'AddRecommendation',
    data() {
      return {
        location: null,
        name: null,
        tags: []
      }
    }

  }
</script>

<style scoped>

</style>
