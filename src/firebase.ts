// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD61M7YULLKSoLH_OksrqaHSfuh378tk1o",
  authDomain: "messenger-9da30.firebaseapp.com",
  projectId: "messenger-9da30",
  storageBucket: "messenger-9da30.appspot.com",
  messagingSenderId: "714844678198",
  appId: "1:714844678198:web:0e0863634122cef6fad097",
  measurementId: "G-P5T98RXPES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);