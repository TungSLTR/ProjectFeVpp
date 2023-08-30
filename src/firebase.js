// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_REACT_APP_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_REACT_APP_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_REACT_APP_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_REACT_APP_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_REACT_APP_APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)