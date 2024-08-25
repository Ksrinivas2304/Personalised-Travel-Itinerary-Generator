// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_GOOGLE_FIREBASE_API_KEY,
  authDomain: "ai-planner-7b25a.firebaseapp.com",
  projectId: "ai-planner-7b25a",
  storageBucket: "ai-planner-7b25a.appspot.com",
  messagingSenderId: "23756665857",
  appId: "1:23756665857:web:307cb80363df1c5260bc00",
  measurementId: "G-C1HC6FE2XT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);