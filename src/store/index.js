import Vuex from 'vuex'
import Vue from 'vue'
import db from '@/firebase/init'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    loggedIn: false,
    followingUIDS: [],
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
    setFollowingUIDS(state) {
      state.followingUIDS = state.currentUser.friends.map(friend => {
        return friend.uid
      })
      state.followingUIDS.push(state.currentUser.uid)
    },
    // filterRecommendationUID(state) {
    //   state.filteredRecommendations = state.filteredRecommendations.filter((recommendation) => {
    //     return state.followingUIDS.includes(recommendation.user_id)
    //   })
    // },
    logOut (state, payload) {
      state.currentUser = null
      state.loggedIn = false
    },
    addRecommendation(state, payload) {
      state.recommendations.push(payload)
    },
    setInitialRecommendations(state, payload) {
      state.filteredRecommendations = state.recommendations
    },
    filterByType (state, payload) {
      // remove filter based on userUID if not in FOLLOWINGUID
      // If a recommendation has one of the selected types in its type array, then it should be returned as false
      let selectedTypes = state.possibleTypes.filter(type => type.selected)

      let followingUIDS = new Set(state.followingUIDS)
      state.filteredRecommendations = state.recommendations.filter(recommendation => {
        let recommendationTypes = new Set(recommendation.types)
        let typeIncluded;
        let following = followingUIDS.has(recommendation.user_id)

        if (!following) return // if not following, dont test if filter matches

        selectedTypes.some(type => {
          typeIncluded = recommendationTypes.has(type.value)
          return typeIncluded
        })
        return typeIncluded // dont filter it out if one of the types is included
      })
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
    // dispatch, commit, state
    logIn({dispatch, commit}, currentUser) {
      commit('logIn', currentUser)
      dispatch('fetchRecommendations')
    },
    fetchRecommendations({commit, state}) {
      // 1. Remove UID loop and move to Single Query
      // 2. Automatically update filteredRecommendations on every update

      state.followingUIDS.forEach(uid => {
        let ref = db.collection('recommendations').where("user_id", "==", uid)
        ref.onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type === 'added') {
              let data = change.doc.data()
              let recommendation = {
                lat: data.lat,
                lng: data.lng,
                title: data.title,
                user_id: data.user_id,
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
    updateUser({dispatch, commit}) {
      commit('saveCurrentUser')
    }
  }
})
