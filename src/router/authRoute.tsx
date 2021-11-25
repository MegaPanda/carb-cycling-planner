import { format } from "date-fns";
import { Fragment, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import Nav from "../components/nav";
import { useAuth } from "../custom-hooks/useAuth";
import { useFood } from "../custom-hooks/useFood";

const AuthRoute = () => {
    const location = useLocation();
    const user = useAuth().user;
    const food = useFood();
    const date = format(new Date(), "dd MMM");

    useEffect(() => {
        food.setDate(date);
    }, []);

    if (user) {
        return (
            <Fragment>
                <Outlet />
                {location.pathname !== "/user/foodSearch" && 
                location.pathname !== "/user/foodDetails" &&
                location.pathname !== "/user/setup" &&
                    <Nav />
                }
            </Fragment>
        )
    } else {
        return (
            <Navigate to="/login" />
        )
    }
};

export default AuthRoute;