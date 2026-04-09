import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMwDTgNvddTjy6moJsHO3PJ6Mh9vSLP3s",
  authDomain: "resumescreening-49e02.firebaseapp.com",
  projectId: "resumescreening-49e02",
  storageBucket: "resumescreening-49e02.firebasestorage.app",
  messagingSenderId: "1005604242968",
  appId: "1:1005604242968:web:97e56c22433b3b6e32a56d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);