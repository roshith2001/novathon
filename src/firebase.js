// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzfGU_tQki-3A5kpHT_Aeb-_uFhQjXUMs",
  authDomain: "roshith-chat.firebaseapp.com",
  projectId: "roshith-chat",
  storageBucket: "roshith-chat.appspot.com",
  messagingSenderId: "584762155879",
  appId: "1:584762155879:web:5191270ad3c9f01d9805c2",
  measurementId: "G-4EKWGPV7JM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);