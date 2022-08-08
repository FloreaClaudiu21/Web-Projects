import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, createUserWithEmailAndPassword, GoogleAuthProvider, } from "firebase/auth"

const Firebase = initializeApp({
    apiKey: "AIzaSyAGLroThRzWxcHi5UDAHY85GXnMeAmvyto",
    authDomain: "ticketsystem-d8cf0.firebaseapp.com",
    projectId: "ticketsystem-d8cf0",
    storageBucket: "ticketsystem-d8cf0.appspot.com",
    messagingSenderId: "368046017065",
    appId: "1:368046017065:web:4f2948e249fadbc44eaa38"
})

export const Auth = getAuth(Firebase)
export const Google = new GoogleAuthProvider();
export const signInWithGoogle = signInWithPopup
export const createUser = createUserWithEmailAndPassword
