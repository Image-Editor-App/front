import {useState} from "react";
import {Link} from "react-router-dom"

import {Form} from "../components/Form.jsx";
import {useLogin} from "../hooks/useLogin.js";
import {login as inputData} from "../data/inputData.json";

import "../style/Index.css";

export const Login = () => {
    const [formData, setFormData] = useState({email: "", password: ""});
    const {handleLogin, errorMessage, isLoading} = useLogin();

    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin(formData);
    }

    return (
        <div className="auth login-page">
            <Form
                title="Login"
                inputs={inputData}
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
