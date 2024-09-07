import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration object containing project-specific settings
const firebaseConfig = {
  apiKey: "AIzaSyBoE1Ohkh7WdFNHn-Rp4FhDyxFsatK2KxI",
  authDomain: "spotify-authentication-f8fc3.firebaseapp.com",
  projectId: "spotify-authentication-f8fc3",
  storageBucket: "spotify-authentication-f8fc3.appspot.com",
  messagingSenderId: "482183097412",
  appId: "1:482183097412:web:1aa4bf2a3b2206fc766011",
};

// Initialize Firebase with the provided configuration
const app = initializeApp(firebaseConfig);

// Export Firebase Authentication instance for use in other parts of the app
export const auth = getAuth(app);

// Export the initialized Firebase app instance as default
export default app;
