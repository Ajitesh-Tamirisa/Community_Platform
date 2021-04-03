import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [pending, setPending] = useState(true)

    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password)    
    }

    function signout(params) {
        return auth.signOut()        
    }

    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password)    
    }

    useEffect(()=> {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setPending(false)
        })

        return unsubscribe
    }, [])    

    const value= {
        currentUser,
        pending,
        signup,
        login,
        signout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

