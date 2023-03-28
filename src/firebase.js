// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDj9cSOqQnXSGo3ewvIFQ3w9DXaIC6jIn8",
  authDomain: "jeopardy-e10a0.firebaseapp.com",
  projectId: "jeopardy-e10a0",
  storageBucket: "jeopardy-e10a0.appspot.com",
  messagingSenderId: "630790657866",
  appId: "1:630790657866:web:4c311ba8d15644fe5b93b3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
