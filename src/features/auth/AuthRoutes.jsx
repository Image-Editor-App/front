import {Navigate} from "react-router-dom";
import {useAuth} from "./useAuth.js";

export const AuthRoutes = ({children}) => {
    return useAuth().isAuthenticated
        ? children
        : <Navigate to="/login" replace/>;
}
