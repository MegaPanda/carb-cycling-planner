import { Navigate } from "react-router";
import { useAuth } from "../custom-hooks/useAuth"

const PublicRoute = ({ children }: { children: JSX.Element }) => {
    const auth = useAuth();

    if (auth.user) {
        return <Navigate to="/user/dashboard" />
    }

    return children;
};

export default PublicRoute;