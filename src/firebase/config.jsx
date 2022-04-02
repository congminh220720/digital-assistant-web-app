import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACdGKSVNVhYZqRubBnaVycLyHl0oNYriI",
  authDomain: "digital-assitant-344814.firebaseapp.com",
  projectId: "digital-assitant-344814",
  storageBucket: "digital-assitant-344814.appspot.com",
  messagingSenderId: "902185219274",
  appId: "1:902185219274:web:85931dad9255dd9083f033",
  measurementId: "G-PX2KZC6ZW3",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

// auth.useEmulator("http://localhost:9099");

// if (window.location.hostname === "localhost") {
//   db.useEmulator("localhost", "8080");
//   auth.useEmulator("http://localhost:9099");
// }

export { db, auth };
export default firebase;
