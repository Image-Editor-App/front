import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

import {setCredentials} from "../store/authSlice.js";
import {useLoginUserMutation} from "../../../app/api/authApi.js";

export const useLogin = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [loginUser, {isLoading}] = useLoginUserMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (formData) => {
        try {
            setErrorMessage("");
            const response = await loginUser(formData).unwrap();
            const {accessToken, user} = response.data;

            dispatch(
                setCredentials({
                    user,
                    token: accessToken
                })
            );

            navigate("/profile");
        } catch (error) {
            setErrorMessage(error?.data?.error?.message || error?.error);
        }
    }

    return {
        handleLogin,
        errorMessage,
        isLoading
    }
}
