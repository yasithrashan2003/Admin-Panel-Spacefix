// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration object (replace with your own Firebase credentials)
const firebaseConfig = {
  apiKey: "AIzaSyAgNQk250elb8rLxxiCDrz7CiTKNz0P74s",
  authDomain: "spacefix-app.firebaseapp.com",
  projectId: "spacefix-app",
  storageBucket: "spacefix-app.appspot.com",
  messagingSenderId: "282490331387",
  appId: "1:282490331387:web:4f306f6fc540122479505e",
  measurementId: "G-RBBZZBN6D5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore, Auth, and Analytics services
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, db, auth, analytics };
