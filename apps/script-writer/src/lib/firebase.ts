import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider,signInWithPopup,  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAf3oDQ16_Lk00jQ3JS1QGSHnGa2erSWWQ",
  authDomain: "screenplay-190d3.firebaseapp.com",
  projectId: "screenplay-190d3",
  storageBucket: "screenplay-190d3.firebasestorage.app",
  messagingSenderId: "311337883285",
  appId: "1:311337883285:web:492e0d3e15329e0de1ed9c",
  measurementId: "G-15YCSHGTB9"
};

const provider = new GoogleAuthProvider();

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
