// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgYGLCGjXGDsfkk0RI0fruOR8EQ2z9bg0",
  authDomain: "genious-car-service-8d13d.firebaseapp.com",
  projectId: "genious-car-service-8d13d",
  storageBucket: "genious-car-service-8d13d.appspot.com",
  messagingSenderId: "555902570980",
  appId: "1:555902570980:web:6cca1d89f001f18760f7f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;