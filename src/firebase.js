import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyDFWTto2DSXbBXgj8_n4Yb-eQxhDNwyyXA",
    authDomain: "makansaviors.firebaseapp.com",
    projectId: "makansaviors",
    storageBucket: "makansaviors.appspot.com",
    messagingSenderId: "669841142399",
    appId: "1:669841142399:web:84d1bc286a2f99a897054a",
    measurementId: "G-6QW0D0V34F",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;