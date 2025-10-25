import {useState} from "react";
import {Link} from "react-router-dom";

import {Form} from "../components/Form.jsx";
import {useSignup} from "../hooks/useSignup.js";
import {signup as inputData} from "../data/inputData.json"


import "../style/Index.css";

export const Signup = () => {
    const [formData, setFormData] = useState({fullName: "", email: "", password: ""});
    const {handleSignup, errorMessage, isLoading} = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleSignup(formData);
    };

    return (
        <div className="auth signup-page">
            <Form
                title="Sign up"
                inputs={inputData}
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
