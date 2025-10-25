import {Outlet} from "react-router-dom"
import {AuthRoutes} from "./AuthRoutes.jsx";
import {Header} from "../shared/components/header/Header.jsx";

export const ProtectedLayout = () => {
    return (
        <AuthRoutes>
            <Header/>

            <main>
                <Outlet/>
            </main>
        </AuthRoutes>
    );
};
