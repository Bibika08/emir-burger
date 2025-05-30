// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrAHDx5Ab7tiUNjRWTy0y0AMJ40g9YAmY",
  authDomain: "bikiniburger-d90f7.firebaseapp.com",
  databaseURL: "https://bikiniburger-d90f7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bikiniburger-d90f7",
  storageBucket: "bikiniburger-d90f7.firebasestorage.app",
  messagingSenderId: "335950801728",
  appId: "1:335950801728:web:2bd9188fb612bf87c368a5",
  measurementId: "G-36035R177W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);