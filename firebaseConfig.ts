import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBwByX_0JwpgNB6JWh3C7ra2Pee-kPyD3U',
  authDomain: 'green-gifts-now.firebaseapp.com',
  projectId: 'green-gifts-now',
  storageBucket: 'green-gifts-now.appspot.com',
  messagingSenderId: '807783826076',
  appId: '1:807783826076:web:46e7f1762919c16bf06359',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
