const admin = require('firebase-admin');

// Initialize the Firebase Admin SDK with your credentials
admin.initializeApp({
    apiKey: "AIzaSyCx0PUSYW_PzIvjIgA7kS-oyCKUxtjRMsE",
    authDomain: "e-dokan-e2463.firebaseapp.com",
    projectId: "e-dokan-e2463",
    storageBucket: "e-dokan-e2463.appspot.com",
    messagingSenderId: "531300347531",
    appId: "1:531300347531:web:90abb90fc391a958da2e8e"
  });

module.exports = admin;