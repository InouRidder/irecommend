import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    loggedIn: false,
  },
  mutations: {
    logIn(state, currentUser) {
      state.currentUser = currentUser
      state.loggedIn = true
    },
    logOut (state, payload) {
      this.currentUser = null
      this.loggedIn = false
    }
  },
  getters: {
    loggedIn(state) {
      return state.loggedIn
    },
    currentUser(state) {
      return state.currentUser
    }
  }
})
