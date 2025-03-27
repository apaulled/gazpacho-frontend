import React from 'react';
import { NavLink } from 'react-router-dom';
import '../style/components/Navbar.scss';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <NavLink to="/recipes" className="active">
                        Recipes
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/search" className="active">
                        Search
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/profile" className="active">
                        Profile
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;