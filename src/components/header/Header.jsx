import {Link} from "react-router-dom";

import "./Header.css"

const navData = [
    {
        id: 1,
        label: "Home",
        path: "/home"
    },
    {
        id: 2,
        label: "Profile",
        path: "/profile"
    }
]

export const Header = () => {
    return (
        <header className="header">
            <nav className='nav'>
                {navData.map(({id, label, path}) => (
                    <Link key={id} to={path} className="nav-link">{label}</Link>
                ))}
            </nav>
        </header>
    );
};
