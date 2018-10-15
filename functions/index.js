const functions = require('firebase-functions');
const admin = require('firebase-admin')
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
admin.initializeApp()

exports.userRecommendations = functions.https.onCall((request, response) => {
  // const recommendations = []
  // function getFollowing(user) {
  //   const uids = []
  //   user.friends.map(function(friend) {
  //     if (friend.following) {
  //       uids.push(friend.uid)
  //     }
  //   })
  //   return uids
  // }
  // // request.followingUIDS
  // admin.firestore().collection('users').doc(request.userUID).get()
  // .then(function(doc) {
  //   let user = doc.data()
  //   const uids = new Set(getFollowing(user))

  //   admin.firestore().collection('recommendations').get()
  //   .then(function(querySnapshot) {
  //     querySnapshot.forEach(function(doc) {
  //       let data = doc.data()
  //       if (uidsSet.has(data.user_id)) {
  //         let recommendation = {
  //           lat: data.lat,
  //           lng: data.lng,
  //           title: data.title,
  //           user_id: data.user_id,
  //           types: data.types,
  //           description: data.description,
  //           infoWindowOpened: false,
  //           id: doc.id
  //         }
  //         recommendations.push(recommendation)
  //       }
  //     });
  //   })
  //   .catch(function(error) {
  //       console.log("Error getting documents: ", error);
  //   });
  // })
  // response.send(recommendations)
});
