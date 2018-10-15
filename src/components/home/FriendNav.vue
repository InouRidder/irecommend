<template>
  <div>
    <form @submit.prevent="submitQuery">
      <input @keyup="submitQuery" type="text" v-model="query" placeholder="Search for friends">
    </form>
    <h5 v-if="searching">
      Looking for friends.....
    </h5>
    <h5 v-if="feedback">
      {{feedback}}
    </h5>
    <ul class="collection with-header" v-else>
      <li class="collection-item" v-for="friend in results" :key="friend.uid">
        <div> {{ friend.firstName }} {{friend.lastName}}
          <a @click="beFriend(friend)" class="secondary-content">
            <i class="material-icons">person_add</i>
          </a>
        </div>
      </li>
    </ul>
    <ul class="collection with-header">
      <li class="collection-item" v-for="friend in currentUser.friends" :key="friend.uid">
        <div>{{ friend.firstName }}
          <a @click="toggleFollow(friend)" class="secondary-content"><i class="material-icons">{{friend.following ? 'toggle_on' : 'toggle_off'}}</i>
          </a>
          <a @click="unFriend(friend.uid)" class="secondary-content"><i class="material-icons">delete</i>
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import db from '@/firebase/init'

  export default {
    name: 'FriendNav',
    data () {
      return {
        query: "",
        results: [],
        usersDB: null,
        searching: false,
        feedback: null
      }
    },
    components: {
      db
    },
    computed: {
      ...mapGetters(['loggedIn', 'currentUser'])
    },
    methods: {
      submitQuery() {
        this.results = []
        this.feedback = null
        this.searching = true
        let self = this;
        this.usersDB.where('firstName', "==", this.query).get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            let data = doc.data()
            let friend = {
              uid: doc.id,
              firstName: data.firstName,
              lastName: data.lastName,
              address: data.address,
              bio: data.bio
            }
            // If already found
            if (self.results.map(function(result) {return result.uid}).includes(friend.uid)) {return}

            self.results.push(friend)
          })
          self.searching = false
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error)
        })
      },
      toggleFollow(friend) {
        friend.following = !friend.following
        this.$store.dispatch('filterOnUDIS')

      },
      unFriend(uid) {
        this.currentUser.friends = this.currentUser.friends.filter(function(friend) {
          return !(uid == friend.uid)
        })
        this.$store.dispatch('filterOnUDIS')
        this.$store.dispatch('updateUser')
      },
      beFriend(friend) {
        if (this.currentUser.friends.map(function(friend){return friend.uid}).includes(friend.uid)) {
          this.feedback = "Already friends!"
        } else {

          this.currentUser.friends.push({firstName: friend.firstName, lastName: friend.lastName, uid: friend.uid, following: true})
          this.results = this.results.filter(function(result) {
            return !(result.uid == friend.uid)
          })
          this.$store.commit('setFollowingUIDS')
          this.$store.dispatch('fetchRecommendations')
          this.$store.commit('filterByType')
          this.$store.dispatch('updateUser')
        }

      }
    },
    created() {
      this.usersDB = db.collection('users')
    }
  }
</script>

<style scoped>
.secondary-content {
  cursor: pointer;
}
</style>
