import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB6Y6oqRcm33_KLaEgQjLbozlMjblrpA7U",
  authDomain: "shirtless-62e8a.firebaseapp.com",
  databaseURL: "https://shirtless-62e8a.firebaseio.com",
  projectId: "shirtless-62e8a",
  storageBucket: "shirtless-62e8a.appspot.com",
  messagingSenderId: "269620657213",
  appId: "1:269620657213:web:82f26e952841c0fc"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
