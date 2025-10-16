import {Link, useNavigate} from "react-router-dom"
import {useState} from "react";
import {useDispatch} from "react-redux";

import {useLoginUserMutation} from "../../app/api/authApi.js";
import {setCredentials} from "../../features/auth/authSlice.js";
import {Form} from "../../components/form/Form.jsx";

import "./Index.css";

export const Login = () => {
    const [formData, setFormData] = useState({email: "", password: ""});
    const [errorMessage, setErrorMessage] = useState("");
    const [loginUser, {isLoading}] = useLoginUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setErrorMessage("");
            const response = await loginUser(formData).unwrap();
            const {accessToken, user} = response.data;
            dispatch(setCredentials({
                user,
                token: accessToken
            }));

            navigate("/profile")
        } catch (error) {
            setErrorMessage(error?.data?.error?.message || error?.error)
        }
    }

    const inputs = [
        {name: "email", type: "email", placeholder: "Email"},
        {name: "password", type: "password", placeholder: "Password"}
    ];

    return (
        <div className="login-page">
            <Form
                title="Login"
                inputs={inputs}
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                errorMessage={errorMessage}
                submitLabel="Log in"
                extraLink={<>Don't have an account? <Link to="/signup">Sign up</Link></>}
            />
        </div>
    );
};
