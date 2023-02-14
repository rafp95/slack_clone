// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIrhiLvFvC36W3kH_VwdWjm9Xb7vctiW4",
  authDomain: "react-clone-app-a0724.firebaseapp.com",
  projectId: "react-clone-app-a0724",
  storageBucket: "react-clone-app-a0724.appspot.com",
  messagingSenderId: "37814021490",
  appId: "1:37814021490:web:42193e02469e278cd181eb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
