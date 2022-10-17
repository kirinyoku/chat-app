import { onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, useState, useEffect } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext<any>(null);

interface ContextProviderProps {
  children?: React.ReactNode;
};

export const AuthContextProvider: React.FC<ContextProviderProps> = ({ children }) => {

  const [ currentUser, setCurrentUser ] = useState<User | null>();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      console.log(user);
    });

    return () => {
      unsub();
    };
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser }}>
      { children }  
    </AuthContext.Provider>
  );
};