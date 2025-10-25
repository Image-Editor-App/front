import {Link} from "react-router-dom";

import "./Header.css"

const navData = [
    {
        id: 1,
        label: "Profile",
        path: "/profile"
    },
    {
        id: 2,
        label: "Editor",
        path: "/editor"
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
