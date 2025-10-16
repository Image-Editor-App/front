import "./Button.css";

export const Button = ({children, ...props}) => {
    return (
        <button className="button" {...props}>
            {children}
        </button>
    );
};
