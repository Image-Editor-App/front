import {useEffect} from "react";
import {useDispatch} from "react-redux";

import {AppRoutes} from "./routes/AppRoutes.jsx";
import {loadUserFromStorage} from "./features/auth/authSlice.js";

import "./App.css"

export const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUserFromStorage());
    }, [dispatch])
    return (
        <>
            <AppRoutes/>
        </>
    )
}
