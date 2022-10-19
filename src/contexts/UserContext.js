import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import {createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, TwitterAuthProvider, updateProfile} from 'firebase/auth'

export const AuthContext = createContext();
const auth = getAuth(app);


const UserContext = ({children}) => {
    const [user, setUser] = useState({})
    const [loading, setLoader] = useState(true);

    const googleProvider = new GoogleAuthProvider();
    const twitterProvider = new TwitterAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const createUser = (email, password) =>{
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const updatedName = name =>{
        setLoader(true)
        return updateProfile(auth.currentUser,{displayName: name})
    }

    const emailVerify = () =>{
        setLoader(true)
        return sendEmailVerification(auth.currentUser);
    }

    const signInWithGoogle = () =>{
        setLoader(true)
        return signInWithPopup(auth, googleProvider);
    }
    
    const signInWithTwitter = () =>{
        setLoader(true)
        return signInWithPopup(auth, twitterProvider)
    }

    const signInWithGithub = () =>{
        setLoader(true)
        return signInWithPopup(auth, githubProvider)
    }

    const loginWithEmailAndPassword = (email, password) =>{
        setLoader(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    
    const resetPassword = (email) =>{
        setLoader(true)
        return sendPasswordResetEmail(auth, email);
    }

    const logOutUser = () => {
        setLoader(true)
        return signOut(auth)
    }
    
    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser)
            setLoader(false)
        })
        return () => unsubscribe()

    },[])

    const authInfo = {user, createUser, emailVerify, updatedName, signInWithGoogle, signInWithTwitter, signInWithGithub, loginWithEmailAndPassword, resetPassword, logOutUser, loading}
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default UserContext;