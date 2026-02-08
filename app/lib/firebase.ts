// app/lib/firebase.ts
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCK7bDdJzQwr4K48WGBXLeAG6UzDWdxDQQ",
  authDomain: "gdg-website-40e1e.firebaseapp.com",
  projectId: "gdg-website-40e1e",
  storageBucket: "gdg-website-40e1e.firebasestorage.app",
  messagingSenderId: "1088309802783",
  appId: "1:1088309802783:web:b41b3383800647f7dae22a",
  measurementId: "G-7V0CW9M7Z9"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
export default app;