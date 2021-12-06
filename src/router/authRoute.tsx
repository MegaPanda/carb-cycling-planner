import { format } from "date-fns";
import { Fragment, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import Nav from "../components/nav";
import { useFood } from "../custom-hooks/useFood";

const AuthRoute = ({ uid }: { uid: string }) => {
    const location = useLocation();
    const food = useFood();
    const date = format(new Date(), "dd/MMM/yyyy");

    useEffect(() => {
        food.setDate(date);
    }, []);

    if (uid) {
        return (
            <Fragment>
                <Outlet />
                {location.pathname !== "/user/foodSearch" && 
                location.pathname !== "/user/foodDetails" &&
                location.pathname !== "/user/createFood" &&
                location.pathname !== "/user/setup" &&
                    <Nav />
                }
            </Fragment>
        )
    } else {
        return (
            <Navigate to="/" />
        )
    }
};

export default AuthRoute;