import {Outlet} from "react-router-dom"
import {AuthRoutes} from "../features/auth/AuthRoutes.jsx";
import {Header} from "../components/header/Header.jsx";

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
