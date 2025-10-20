import {Input} from "../UI/input/Input.jsx";
import {Button} from "../UI/button/Button.jsx";

import "./Form.css"

export const Form = ({
    title,
    inputs,
    formData,
    setFormData,
    onSubmit,
    isLoading,
    errorMessage,
    submitLabel,
    extraLink
}) => {
    const handleChange = event => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    return (
        <form className="form" onSubmit={onSubmit}>
            <h1>{title}</h1>
            {errorMessage && <p>{errorMessage}</p>}

            {inputs.map(({name, type, placeholder}) => (
                <Input
                    key={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={formData[name] || ""}
                    onChange={handleChange}
                />
            ))}

            <Button tyoe="submit" disabled={isLoading}>{submitLabel}</Button>
            {extraLink && <p>{extraLink}</p>}
        </form>
    );
};
