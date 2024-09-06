import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBoE1Ohkh7WdFNHn-Rp4FhDyxFsatK2KxI",
  authDomain: "spotify-authentication-f8fc3.firebaseapp.com",
  projectId: "spotify-authentication-f8fc3",
  storageBucket: "spotify-authentication-f8fc3.appspot.com",
  messagingSenderId: "482183097412",
  appId: "1:482183097412:web:1aa4bf2a3b2206fc766011"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export default app;