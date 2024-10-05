// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrT4qijbJJYVIjJZcQLRwDhSk5D6Unk-A",
  authDomain: "fitmefirebase-2e8bd.firebaseapp.com",
  projectId: "fitmefirebase-2e8bd",
  storageBucket: "fitmefirebase-2e8bd.appspot.com",
  messagingSenderId: "679605363026",
  appId: "1:679605363026:web:b1008f61a7a0c0c6c59a8b",
  measurementId: "G-9EZWDT6DFG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const imagedb = getStorage(app);

export default app;