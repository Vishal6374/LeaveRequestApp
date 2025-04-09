// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYp2E1TTxfhjNG3sBbpJN_VfQvU3Cwt0g",
  authDomain: "leaverequestapp-ba8c6.firebaseapp.com",
  projectId: "leaverequestapp-ba8c6",
  storageBucket: "leaverequestapp-ba8c6.firebasestorage.app",
  messagingSenderId: "634633914850",
  appId: "1:634633914850:web:926318dbdb5d586bc9d1bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);