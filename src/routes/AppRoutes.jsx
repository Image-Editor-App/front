import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";

import {Login} from "../features/auth/pages/Login.jsx";
import {Signup} from "../features/auth/pages/Signup.jsx";
import {Profile} from "../features/profile/pages/Profile.jsx";
import {ProtectedLayout} from "./ProtectedLayout.jsx";
import {Editor} from "../features/editor/pages/Editor.jsx";

export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/signup" replace/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="*" element={<h1>Page Not Found</h1>}/>
                <Route element={<ProtectedLayout/>}>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/editor" element={<Editor />}/>
                </Route>
            </Routes>
        </Router>
    );
};
