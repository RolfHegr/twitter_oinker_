import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import "firebase/auth";
import { useIsRTL } from "react-bootstrap/esm/ThemeProvider";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAaSZLu2shr1NNyt0ui20PlSHPPcl-sMtU",
  authDomain: "microblog-d9cfa.firebaseapp.com",
  databaseURL:
  "https://microblog-d9cfa-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "microblog-d9cfa",
  storageBucket: "microblog-d9cfa.appspot.com",
  messagingSenderId: "901899924091",
  appId: "1:901899924091:web:a36543784bad92d9bc68de",
  measurementId: "G-VJ3ZP65594",
};

export const firebaseApp = initializeApp(firebaseConfig);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();

export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}
