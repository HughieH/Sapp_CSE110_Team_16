import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// 디버깅 로그 추가
console.log("Firebase Configuration:");
console.log("API Key:", process.env.REACT_APP_FIREBASE_API_KEY);
console.log("Auth Domain:", process.env.REACT_APP_FIREBASE_AUTH_DOMAIN);
console.log("Project ID:", process.env.REACT_APP_FIREBASE_PROJECT_ID);
console.log("Storage Bucket:", process.env.REACT_APP_FIREBASE_STORAGE_BUCKET);
console.log("Messaging Sender ID:", process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID);
console.log("App ID:", process.env.REACT_APP_FIREBASE_APP_ID);
console.log("Firebase App Initialized:", app.name);

// 인증 및 Firestore 초기화
export const auth = getAuth(app);
export const db = getFirestore(app);

// 인증 및 Firestore 초기화 확인 로그
console.log("Auth Initialized:", auth);
console.log("Firestore Initialized:", db);
