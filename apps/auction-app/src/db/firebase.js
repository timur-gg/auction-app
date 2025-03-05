// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxw4XHNyg82np0aPMmjvPbll24i1_-LhQ",
  authDomain: "auction-app-eda25.firebaseapp.com",
  projectId: "auction-app-eda25",
  storageBucket: "auction-app-eda25.appspot.com",
  messagingSenderId: "178494873656",
  appId: "1:178494873656:web:20f2754c341fa1969dc6cd",
  measurementId: "G-65PSQ9JBY8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getDatabase(app);
