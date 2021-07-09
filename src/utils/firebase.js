// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase"



const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDCiusUucLnSviNU3iBbo6idrW1GOJGOg0",
    authDomain: "social-media-14457.firebaseapp.com",
    projectId: "social-media-14457",
    storageBucket: "social-media-14457.appspot.com",
    messagingSenderId: "472336580273",
    appId: "1:472336580273:web:c5e18a7ec0664291676c90",
    measurementId: "G-1H72WPJPVE"
  });

  const db = firebaseApp.firestore()
  const auth = firebase.auth()
  const storage = firebase.storage()

 export {db,auth,storage}
 export default firebase


