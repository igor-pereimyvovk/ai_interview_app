import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDTeqawz7TN3IKys5QZ0I0LOIZw8klbFdc',
  authDomain: 'ai-interview-app-27556.firebaseapp.com',
  projectId: 'ai-interview-app-27556',
  storageBucket: 'ai-interview-app-27556.firebasestorage.app',
  messagingSenderId: '849106512302',
  appId: '1:849106512302:web:aa14e82e0c35ab868b403f',
  measurementId: 'G-HX05BF1SWY',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
