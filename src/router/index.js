import Vue from 'vue'
import Router from 'vue-router'

import firebase from 'firebase/app'
require("firebase/auth");

import LogIn from '@/components/auth/LogIn'
import SignUp from '@/components/auth/SignUp'
import Home from '@/components/Home'
import Profile from '@/components/Profile'
import GMap from '@/components/home/GMap'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      props: true,
      meta: {
        requiresAuth: true
      },
      beforeEnter(to, from, next) {
        let currentUser = firebase.auth().currentUser;
        if (currentUser) {
          next()
        } else {
          next('log-in')
        }
      }
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/log-in',
      name: 'LogIn',
      component: LogIn
    },
    {
      path: '/map',
      name: 'GMap',
      component: GMap
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      props: true,
      beforeEnter(to, from, next) {
        let currentUser = firebase.auth().currentUser;
        if (currentUser) {
          next()
        } else {
          from()
        }
      }
    }
  ]
})

// function isAuthorized(to, from, next, self) {
//   let currentUser = firebase.auth().currentUser;
//   if (self.meta.requiresAuth && currentUser) {
//     next()
//   } else {
//     from()
//   }
// }
