import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuFMbk_VsxAr2UDDWZrbHljjKpTZI6pH0",
  authDomain: "spot-it-k.firebaseapp.com",
  projectId: "spot-it-k",
  storageBucket: "spot-it-k.firebasestorage.app",
  messagingSenderId: "130833813646",
  appId: "1:130833813646:web:9a134e70e4f05f2a2639df",
  measurementId: "G-8ZY0RN2WH4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); //this will not be use at the moment 
const auth = getAuth(app);