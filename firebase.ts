import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration (Harino's Orders)
const firebaseConfig = {
  apiKey: "AIzaSyCP-DIWSWFo_iBNqFPfMulCFi9_ahO3Ik0",
  authDomain: "harinos-orders.firebaseapp.com",
  projectId: "harinos-orders",
  storageBucket: "harinos-orders.firebasestorage.app",
  messagingSenderId: "947016135083",
  appId: "1:947016135083:web:847d240bedc1899cdee2ee",
  measurementId: "G-MHB850LZZV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore database
export const db = getFirestore(app);
