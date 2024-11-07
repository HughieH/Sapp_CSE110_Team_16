// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA27OTLldu0IDQFC8RPdgikeri9XSGQOkw",
  authDomain: "sapp-17054.firebaseapp.com",
  projectId: "sapp-17054",
  storageBucket: "sapp-17054.firebasestorage.app",
  messagingSenderId: "890463666023",
  appId: "1:890463666023:web:008443498edc28925139c2",
  measurementId: "G-8ESW71PF73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)