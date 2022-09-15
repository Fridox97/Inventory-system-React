import React from "react";
import Navegador from "../navbar";
import { useLocation, Outlet, Navigate } from "react-router-dom";

const AuthWrapper = () => {
    const location = useLocation();
    const token = JSON.parse(sessionStorage.getItem("token"));

    return token ? (
        <>
            <Navegador />
            <Outlet />
        </>
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    );
};

export { AuthWrapper }