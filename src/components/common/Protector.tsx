import React from "react";
import { CommonPropsType } from "../../lib/types";
import { useAppSelector } from "../../redux/hooks";
import { useLocation, Navigate } from "react-router-dom";

const Protector: React.FC<CommonPropsType> = ({ children }) => {

    const location = useLocation();

    const userProtectedRoutes = ["/login", "/", "/signup"];
    const nonUserProtectedRoutes = ["/dashboard"];

    const { profile , token} = useAppSelector(state => state.user);

    if (profile && token) {
        if (userProtectedRoutes.includes(location.pathname)) {
            return <Navigate to='/dashboard' />;
        } else {
            return (
                <>{children}</>
            );
        }
    } else {
        if (nonUserProtectedRoutes.includes(location.pathname)) {
            return <Navigate to='/login' />;
        } else {
            return (
                <>{children}</>
            );
        }
    }

};

export default Protector;
