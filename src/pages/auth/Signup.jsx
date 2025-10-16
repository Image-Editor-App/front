import {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import {useDispatch} from "react-redux";

import {useSignupUserMutation} from "../../app/api/authApi.js";
import {setCredentials} from "../../features/auth/authSlice.js";
import {Form} from "../../components/form/Form.jsx";

import "./Index.css"

export const Signup = () => {
    const [formData, setFormData] = useState({fullName: "", email: "", password: ""});
    const [signupUser, {isLoading}] = useSignupUserMutation();
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setErrorMessage("");
            const userData = await signupUser(formData).unwrap();
            dispatch(setCredentials(userData));
            navigate("/login");
        } catch (error) {
            setErrorMessage(error?.data?.error?.message)
        }
    };

    const inputs = [
        {name: "fullName", type: "text", placeholder: "Full Name"},
        {name: "email", type: "email", placeholder: "Email"},
        {name: "password", type: "password", placeholder: "Password"}
    ];

    return (
        <div className="signup-page">
            <Form
                title="Sign up"
                inputs={inputs}
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                errorMessage={errorMessage}
                submitLabel="Sign up"
                extraLink={<>Don't have an account? <Link to="/login">Log in</Link></>}
            />
        </div>
    );
};
