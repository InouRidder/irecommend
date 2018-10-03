// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import firebase from 'firebase/app'
import router from './router'

Vue.use(Vuex)

Vue.config.productionTip = false
let app = null;

firebase.auth().onAuthStateChanged(() => {

/* eslint-disable no-new */
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    })
  }
})
