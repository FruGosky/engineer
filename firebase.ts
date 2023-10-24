// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeR6YFwme9c06RGubZVk0d8VHaFXDjhoE",
  authDomain: "engineer-81890.firebaseapp.com",
  databaseURL: "https://engineer-81890-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "engineer-81890",
  storageBucket: "engineer-81890.appspot.com",
  messagingSenderId: "804320314529",
  appId: "1:804320314529:web:832c57263b5dfa48a2dce0",
  measurementId: "G-45JZV2FL3E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
