import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const app = initializeApp({
  apiKey: "AIzaSyC3YCS0MdG2f4VDtBQi-6W1Gtd6qNK4U_M",
  authDomain: "daily-todo-app-1e4a1.firebaseapp.com",
  projectId: "daily-todo-app-1e4a1",
  storageBucket: "daily-todo-app-1e4a1.appspot.com",
  messagingSenderId: "286520991254",
  appId: "1:286520991254:web:0e652db793af7ef6ee9f37",
});

export const auth = getAuth(app);
export const db = getFirestore(app);
