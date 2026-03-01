// firebase connected
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCP-DIWSWFo_iBNqFPfMulCFi9_ahO3Ik0",
  authDomain: "harinos-orders.firebaseapp.com",
  projectId: "harinos-orders",
  storageBucket: "harinos-orders.firebasestorage.app",
  messagingSenderId: "947016135083",
  appId: "1:947016135083:web:847d240bedc1899cdee2ee",
  measurementId: "G-MHB850LZZV"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const saveOrderToFirebase = async (orderData: any) => {
  try {
    await addDoc(collection(db, "orders"), {
      ...orderData,
      createdAt: serverTimestamp()
    });
    console.log("Order saved to Firestore");
  } catch (error) {
    console.error("Firebase error:", error);
  }
};
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

export const subscribeToOrders = (callback: (orders: any[]) => void) => {
  const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));

  return onSnapshot(q, (snapshot) => {
    const orders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(orders);
  });
};
