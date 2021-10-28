// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyA7Upet9av5cnmJCwtfG7xC9OhaUJUYbVo",
    authDomain: "challenge-b6352.firebaseapp.com",
    projectId: "challenge-b6352",
    storageBucket: "challenge-b6352.appspot.com",
    messagingSenderId: "876851079527",
    appId: "1:876851079527:web:82d7bf8fd463a11de267c2",
    measurementId: "G-8DPZT28YT6"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)

  const db = firebaseApp.firestore()
  const auth = firebase.auth()

  export { db, auth }