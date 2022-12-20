import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const env = process.env.NODE_ENV;

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_API_kEY,

  //use different domain for development
  authDomain:
    env !== 'production'
      ? process.env.NEXT_PUBLIC_AUTH_DOMAIN
      : 'daily-todo-app-1e4a1.firebaseapp.com',

  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
});

export const auth = getAuth(app);
export const db = getFirestore(app);
