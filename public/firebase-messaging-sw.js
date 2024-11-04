//New! Keyboard shortcuts … Drive keyboard shortcuts have been updated to give you first-letters navigation
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyAW2FXmhQpZZ6YM-QGIj_llw5agA8bCJ0o",
  authDomain: "rhythmchat-c36d0.firebaseapp.com",
  projectId: "rhythmchat-c36d0",
  storageBucket: "rhythmchat-c36d0.appspot.com",
  messagingSenderId: "1095864302162",
  appId: "1:1095864302162:web:86577dd9a9311bdaeafd8b",
  measurementId: "G-7BQ6JF9P3W"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});