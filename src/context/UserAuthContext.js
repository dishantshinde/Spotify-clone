// Importing necessary React hooks and Firebase authentication methods
import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  createUserWithEmailAndPassword, // Create a user with email and password
  signInWithEmailAndPassword, // Sign in a user with email and password
  signOut, // Sign out the user
  onAuthStateChanged, // Listen for authentication state changes
  GoogleAuthProvider, // Google Auth provider for signing in with Google
  signInWithPopup, // Sign in using a popup for Google authentication
} from "firebase/auth";
import { auth } from "../firebase.js"; // Firebase authentication instance

// Creating a context to manage user authentication
const UserAuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(""); // State to hold the current user

  // Function to handle user sign up with email and password
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // Function to handle user login with email and password
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Function to handle user logout
  function logOut() {
    return signOut(auth);
  }

  // Function to handle Google sign-in
  function googleSignIn() {
    const googleAuth = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuth);
  }

  // Effect to monitor authentication state changes and set the current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe(); // Cleanup listener when the component is unmounted
    };
  }, []);

  // Providing user and authentication functions through context
  return (
    <UserAuthContext.Provider
      value={{ user, signUp, logIn, logOut, googleSignIn }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

// Custom hook to use authentication context
export const useUserAuth = () => {
  return useContext(UserAuthContext);
};
