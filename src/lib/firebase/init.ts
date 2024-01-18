// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDL8dyN4QLbgA8cp91BGIVyXfmC63AFtbk",
  authDomain: "ecomers-next-6df73.firebaseapp.com",
  projectId: "ecomers-next-6df73",
  storageBucket: "ecomers-next-6df73.appspot.com",
  messagingSenderId: "909396370171",
  appId: "1:909396370171:web:15a9f0baa676932218865e"
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;