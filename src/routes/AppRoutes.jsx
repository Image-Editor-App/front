import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";

import {Login} from "../pages/auth/login.jsx";
import {Signup} from "../pages/auth/Signup.jsx";
import {Profile} from "../pages/profile/Profile.jsx";
import {Home} from "../pages/home/Home.jsx";
import {ProtectedLayout} from "./ProtectedLayout.jsx";
import {Editor} from "../pages/editor/Editor.jsx";

export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/signup" replace/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="*" element={<h1>Page Not Found</h1>}/>
                <Route element={<ProtectedLayout/>}>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/editor" element={<Editor />}/>
                </Route>
            </Routes>
        </Router>
    );
};
