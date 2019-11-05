import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyBaG_jM9zPVA3Sv1Lxcutawjt2xYMuyvCQ",
    authDomain: "todolist3-d2000.firebaseapp.com",
    databaseURL: "https://todolist3-d2000.firebaseio.com",
    projectId: "todolist3-d2000",
    storageBucket: "todolist3-d2000.appspot.com",
    messagingSenderId: "217261187930",
    appId: "1:217261187930:web:b3dc33a593abee86fe4963",
    measurementId: "G-0SHC9YV2EE"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;