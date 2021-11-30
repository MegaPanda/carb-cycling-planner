import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { useEffect } from "react";
import { Navigate } from "react-router";
import useAppDispatch from "../custom-hooks/useAppDispatch";
import useAppSelector from "../custom-hooks/useAppSelector";
import { fetchUserData, setUser } from "../redux/reducers/userSlice";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
    const dispatch = useAppDispatch();
    const auth = getAuth();
    const uid = useAppSelector(state => state.user.uid);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setUser({ uid: user.uid, username: user.displayName }));
                dispatch(fetchUserData({ uid: user.uid }));
            }
        });

        return () => unsubscribe();
    }, []);

    if (uid) {
        return <Navigate to="/user/dashboard" />
    }

    return children;
};

export default PublicRoute;