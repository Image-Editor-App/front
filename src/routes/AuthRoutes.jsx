import {Navigate} from "react-router-dom";
import {useAuth} from "../features/auth/hooks/useAuth.js";

export const AuthRoutes = ({children}) => {
    return useAuth().isAuthenticated
        ? children
        : <Navigate to="/login" replace/>;
}
