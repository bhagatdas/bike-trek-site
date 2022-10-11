import firebase from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyBQ36CgrfE7GrOLV2ys23iKc591AknqLcM",
  authDomain: "biketrek-3bc65.firebaseapp.com",
  projectId: "biketrek-3bc65",
  storageBucket: "biketrek-3bc65.appspot.com",
  messagingSenderId: "706364258456",
  appId: "1:706364258456:web:d17c1a6f4aefeb4ea178ed",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
