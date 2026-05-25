// lib/firebase/config.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyByiJcl4Ji296GecNX3K1k-TiJaFUZGXBU",
  authDomain: "soilx-38291.firebaseapp.com",
  projectId: "soilx-38291",
  storageBucket: "soilx-38291.firebasestorage.app",
  messagingSenderId: "299644593137",
  appId: "1:299644593137:web:2bd8681173580b6ed9da50",
  measurementId: "G-DZLB0N3YEV"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };