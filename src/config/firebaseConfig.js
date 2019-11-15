import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyAN_bgjcowKUSRuf8Xp9FQdnmR3MzXVoPM",
    authDomain: "khuang-todo-316.firebaseapp.com",
    databaseURL: "https://khuang-todo-316.firebaseio.com",
    projectId: "khuang-todo-316",
    storageBucket: "khuang-todo-316.appspot.com",
    messagingSenderId: "500332885171",
    appId: "1:500332885171:web:1cae89c65265279b04ecc6",
    measurementId: "G-1GE6FG78WX"
  };
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;