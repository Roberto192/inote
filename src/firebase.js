// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABCg5ytlwpUcEp2X6EjfWwU8XKhsPJfiU",
  authDomain: "inote-299c6.firebaseapp.com",
  projectId: "inote-299c6",
  storageBucket: "inote-299c6.appspot.com",
  messagingSenderId: "534422813094",
  appId: "1:534422813094:web:d683d377cd370c545cf767"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const userCollection = collection(db, "users")
export const noteCollection = collection(db, "notes")
export const auth = getAuth(app)