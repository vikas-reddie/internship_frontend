import React from "react";
import { useSelector } from "react-redux";
import { Navigate} from "react-router-dom";

const PrivateRoute = ({ element:Component, ...rest }) => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    
    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/" />;
};

export default PrivateRoute;