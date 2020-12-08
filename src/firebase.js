// Core Firebase SDK:
import firebase from 'firebase/app';

// Realtime database library.
import 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAlgZj6El4zcWxBFVZITap4Sy_BB9fEsgk",
    authDomain: "meme-in-a-giffy-project6.firebaseapp.com",
    projectId: "meme-in-a-giffy-project6",
    storageBucket: "meme-in-a-giffy-project6.appspot.com",
    messagingSenderId: "1028861060339",
    appId: "1:1028861060339:web:0bf76cea4d32c4a2110386"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;