import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: "AIzaSyA-TqhBtWWAXgJjOlRLA2jlznP0N4WpSFQ",
  authDomain: "eshop-dem.firebaseapp.com",
  projectId: "eshop-dem",
  storageBucket: "eshop-dem.appspot.com",
  messagingSenderId: "570315772000",
  appId: "1:570315772000:web:bacb4d6872c499737bb305"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;