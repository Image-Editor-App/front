import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

import {Button} from "../../../shared/components/UI/button/Button.jsx";
import {logout} from "../../auth/store/authSlice.js";
import {useLogoutUserMutation} from "../../../app/api/authApi.js";

import "../style/Index.css"

export const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);
    const [logoutUser, {isLoading}] = useLogoutUserMutation();

    if (!user) return null;

    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();
        } catch (err) {
            console.error("Server logout failed:", err);
        }

        dispatch(logout());
        navigate("/login");
    };

    return (
        <div className="profile-page">
            <div className="user-info">
                <p>{user.fullName}</p>
                <p>{user.email}</p>
            </div>

            <Button onClick={handleLogout} disabled={isLoading}>Log out</Button>
        </div>
    );
};
