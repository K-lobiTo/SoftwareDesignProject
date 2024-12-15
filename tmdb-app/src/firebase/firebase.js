import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
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
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };