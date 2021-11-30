import React, { useState, useEffect, useContext, createContext } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, User } from "firebase/auth";
import { FirebaseError } from "@firebase/util";
import { firebaseApp } from "../firebase/firebase";

const authContext = createContext<IAuth | undefined>(undefined);

type IAuth = ReturnType<typeof useProvideAuth>;

export function ProvideAuth({ children }: { children: React.ReactNode }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
};

export const useAuth = () => {
    const context = useContext(authContext);
    if (context === undefined) {
        throw new Error("useAuth must be within authContext");
    }

    return context;
};

function useProvideAuth() {
    const [user, setUser] = useState<User | null>(null);
    const auth = getAuth(firebaseApp);

    const login = (email: string, password: string, callback: VoidFunction) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
                callback();
            })
            .catch((error: FirebaseError) => {
                console.log(error.code);
                console.log(error.message);
            });
    };

    const signup = (email: string, password: string, callback: VoidFunction) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
                callback();
                /*
                if (auth.currentUser) {
                    updateProfile(auth.currentUser, {
                        displayName: username
                    }).then(() => callback())
                      .catch((error: FirebaseError) => {
                          console.log(error.code);
                          console.log(error.message);
                      });
                };
                */
            })
            .catch((error: FirebaseError) => {
                console.log(error.code);
                console.log(error.message);
            });   
    };

    const logout = (callback: VoidFunction) => {
        signOut(auth).then(() => {
            setUser(null);
            callback();
        }).catch((error: FirebaseError) => {
            console.log(error.message);
        });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return;
};
