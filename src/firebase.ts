import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAW2FXmhQpZZ6YM-QGIj_llw5agA8bCJ0o",
  authDomain: "rhythmchat-c36d0.firebaseapp.com",
  projectId: "rhythmchat-c36d0",
  storageBucket: "rhythmchat-c36d0.appspot.com",
  messagingSenderId: "1095864302162",
  appId: "1:1095864302162:web:86577dd9a9311bdaeafd8b",
  measurementId: "G-7BQ6JF9P3W"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export {app, messaging};