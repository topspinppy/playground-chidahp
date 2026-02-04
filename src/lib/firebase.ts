// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "tellme-chidahp.firebaseapp.com",
  projectId: "tellme-chidahp",
  storageBucket: "tellme-chidahp.firebasestorage.app",
  messagingSenderId: "304389516553",
  appId: "1:304389516553:web:3a63be9dc150dc02c8b7d8",
  measurementId: "G-PEZC4HNS3D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
