// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDp8wG9OKaPBFzqEXlrVH1_LIeYpXwPOkM",
  authDomain: "sardar-auth.firebaseapp.com",
  databaseURL: "https://sardar-auth-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sardar-auth",
  storageBucket: "sardar-auth.firebasestorage.app",
  messagingSenderId: "1067707710802",
  appId: "1:1067707710802:web:d927617e27667983c1ce8b"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };