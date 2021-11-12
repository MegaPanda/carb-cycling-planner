import React, { useState, useEffect, useContext, createContext } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";
import { FirebaseError } from "@firebase/util";

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

    return useContext(authContext);
};

function useProvideAuth() {
    const [user, setUser] = useState<User | null>(null);
    const auth = getAuth();

    const login = (email: string, password: string) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
            })
            .catch((error: FirebaseError) => {
                console.log(error.code);
                console.log(error.message);
            });
    };

    const signup = (email: string, password: string) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
            })
            .catch((error: FirebaseError) => {
                console.log(error.code);
                console.log(error.message);
            });
    };

    const logout = () => {
        signOut(auth).then(() => {
            setUser(null);
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
    });

    return { user, login, signup, logout };
};
