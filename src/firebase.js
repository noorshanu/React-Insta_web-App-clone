// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAlcbggSwh_76ubwJYZg9kbYJDYYxfRDgA",
  authDomain: "instagram-clone-d5439.firebaseapp.com",
  databaseURL: "https://instagram-clone-d5439.firebaseio.com",
  projectId: "instagram-clone-d5439",
  storageBucket: "instagram-clone-d5439.appspot.com",
  messagingSenderId: "250514933685",
  appId: "1:250514933685:web:b71a7a2e2a18e075c2bbfc",
  measurementId: "G-78FM4VL0TD",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { db, auth, storage };
