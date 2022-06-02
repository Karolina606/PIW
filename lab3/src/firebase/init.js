// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuMrEPMVHBjeGLNaWQyNiUuzoAQj_MAgI",
  authDomain: "piw-tinder-dla-projektow-3d682.firebaseapp.com",
  projectId: "piw-tinder-dla-projektow-3d682",
  storageBucket: "piw-tinder-dla-projektow-3d682.appspot.com",
  messagingSenderId: "690538294908",
  appId: "1:690538294908:web:672fdad8977175015923f9",
  measurementId: "G-WZ5GT0B3MV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);