import { Children, createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
 } from 'firebase/auth';
import { auth } from '../firebase.js';

const UserAuthContext=createContext();

export const UserAuthContextProvider=({children})=>{
const [user,setUser]=useState("");

    function signUp(email,password){
        return createUserWithEmailAndPassword(auth,email,password)
    }

    function logIn(email,password){
        return signInWithEmailAndPassword(auth,email,password)
    }

    function logOut(){
        return signOut(auth);
    }

    function googleSignIn(){
        const googleAuth= new GoogleAuthProvider();
        return signInWithPopup(auth,googleAuth)
    }

    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
          setUser(currentUser)
        });
        return ()=>{
            unsubscribe();
        }
    },[])

     return <UserAuthContext.Provider value={{user,signUp,logIn,logOut,googleSignIn}}>{children}
     </UserAuthContext.Provider> 
}

export const useUserAuth=()=>{
    return useContext(UserAuthContext)
}
