import Vue from 'vue'
import Router from 'vue-router'
import LogIn from '@/components/LogIn'
import SignUp from '@/components/SignUp'
import Home from '@/components/Home'
import Profile from '@/components/Profile'
import firebase from 'firebase/app'
require("firebase/auth");

Vue.use(Router)

export default new Router({
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
          next('LogIn')
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
      path: '/profile',
      name: 'Profile',
      component: Profile
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
