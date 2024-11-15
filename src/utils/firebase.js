import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCtdRHBsxuYLb7e4P_z_ch9LWZBZGdvWU",
  authDomain: "netflixgpt9x.firebaseapp.com",
  projectId: "netflixgpt9x",
  storageBucket: "netflixgpt9x.firebasestorage.app",
  messagingSenderId: "769709144293",
  appId: "1:769709144293:web:7d4ed43f2b96e176487c0c",
  measurementId: "G-150M3L09VL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
