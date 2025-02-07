// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDv0GtJrP59v_AQH6_KwiwuaT20cTw_nwU",
  authDomain: "ai-trip-planner-7dde6.firebaseapp.com",
  projectId: "ai-trip-planner-7dde6",
  storageBucket: "ai-trip-planner-7dde6.firebasestorage.app",
  messagingSenderId: "288492806325",
  appId: "1:288492806325:web:280ecbb67316c17b931efc",
  measurementId: "G-E9524R822J",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// const analytics = getAnalytics(app);
