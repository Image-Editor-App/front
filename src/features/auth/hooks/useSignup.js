import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useSignupUserMutation} from "../../../app/api/authApi.js";
import {setCredentials} from "../store/authSlice.js";

export const useSignup = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [signupUser, {isLoading}] = useSignupUserMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignup = async (formData) => {
        try {
            setErrorMessage("");
            const response = await signupUser(formData).unwrap();
            dispatch(setCredentials(response));
            navigate("/login");
        } catch (error) {
            setErrorMessage(error?.data?.error?.message || error?.error);
        }
    }

    return {
        handleSignup,
        errorMessage,
        isLoading
    }
}
