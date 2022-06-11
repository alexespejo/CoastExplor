// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8IMI5IiiFqPVVCcQEKUZ3EWDI9_syf1E",
  authDomain: "adventrr.firebaseapp.com",
  projectId: "adventrr",
  storageBucket: "adventrr.appspot.com",
  messagingSenderId: "1067604946461",
  appId: "1:1067604946461:web:551314de2ef7b99768a0f4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
