import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAGzVPK7YIXsskObNG19vN8FBGXSYX7xXE",
    authDomain: "location-a70d4.firebaseapp.com",
    databaseURL: "https://location-a70d4.firebaseio.com",
    projectId: "location-a70d4",
    storageBucket: "location-a70d4.appspot.com",
    messagingSenderId: "644825095012"
  };
  firebase.initializeApp(config);

  export const f = firebase;
  export const database = firebase.database();
  export const auth = firebase.auth();
  export const storage = firebase.storage();