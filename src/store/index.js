import Vuex from 'vuex'
import Vue from 'vue'
import db from '@/firebase/init'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    loggedIn: false,
    recommendations: [],
    filteredRecommendations: [],
    possibleTypes: [
      {
        selected: true,
        value: 'Eat'
      },
      {
        selected: true,
        value: 'Do'
      },
      {
        selected: true,
        value: 'See'
      }
    ]
  },
  mutations: {
    logIn(state, currentUser) {
      state.currentUser = currentUser
      state.loggedIn = true
    },
    logOut (state, payload) {
      state.currentUser = null
      state.loggedIn = false
    },
    addRecommendation(state, payload) {
      state.recommendations.push(payload)
    },
    setInitialFilteredRecommenations(state, payload) {
      state.filteredRecommendations = state.recommendations
    },
    filterByType (state, payload) {
      // If a recommendation has one of the selected types in its type array, then it should be returned as false
      if (payload.selectedTypes) {
        state.filteredRecommendations = state.recommendations.filter(recommendation => {
          let recommendationTypes = new Set(recommendation.types)
          let included;
          payload.selectedTypes.some(type => {
            included = recommendationTypes.has(type.value)
            return included
          })
          return included // dont filter it out if one of the types is included
        })
      } else { // if not filtered, just set it to all recommendations of user
        state.filteredRecommendations = state.recommendations
      }
    },
    saveCurrentUser(state, payload) {
      db.collection('users').doc(state.currentUser.uid).update({
        friends: state.currentUser.friends
      })
    }
  },
  getters: {
    possibleTypes(state) {
      return state.possibleTypes
    },
    loggedIn(state) {
      return state.loggedIn
    },
    currentUser(state) {
      return state.currentUser
    },
    recommendations(state) {
      return state.recommendations
    },
    filteredRecommendations(state) {
      return state.filteredRecommendations
    }
  },
  actions: {
    fetchRecommendations({commit}, uid) {
      return new Promise((resove, reject) => {
        let ref = db.collection('recommendations')
        ref.onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type === 'added') {
              let data = change.doc.data()
              let recommendation = {
                lat: data.lat,
                lng: data.lng,
                title: data.title,
                types: data.types,
                description: data.description,
                infoWindowOpened: false
              }
              commit('addRecommendation', recommendation)
            }
          })
        })
      })
    },
    async updateUser({commit}) {
      commit('saveCurrentUser')
    }
  }
})
