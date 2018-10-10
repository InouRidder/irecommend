<template>
  <div>
    <div class="row">
      <label class="col s12" v-for="(type, index) in possibleTypes">
        <input type="checkbox" v-on:change="filterRecommendations()" v-model="type.selected"/>
        <span>{{ type.value }}</span>
      </label>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapMutations } from 'vuex'


  export default {
    name: 'RecommendationNav',
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters(['loggedIn', 'currentUser', "possibleTypes"]),
      ...mapMutations(['filter']),
      selectedTypes() {
        let selection = this.possibleTypes.filter(type => {
          return type.selected
        })
        return selection
      }
    },
    methods: {
      filterRecommendations() {
        this.$store.commit('filterByType', { selectedTypes: this.selectedTypes })
      }
    }
  }
</script>

<style scoped>

</style>
