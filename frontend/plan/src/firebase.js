// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase configuration object
const firebaseConfig = {
  apiKey: 'AIzaSyAshGH0XL13-NyzuyyGh0cxhL2T9Ua5Bn4',
  authDomain: 'library-eed2e.firebaseapp.com',
  projectId: 'library-eed2e',
  storageBucket: 'library-eed2e.appspot.com',
  messagingSenderId: '366041123526',
  appId: '1:366041123526:web:bd64956004c9ce405a65c7',
  measurementId: 'G-ST4KK60CK9',
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Export the `auth` object correctly
export { auth };
