import React from 'react';
import { NavLink } from 'react-router-dom';
import '../style/components/Navbar.scss';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="nav-content">
                <div className="nav-group left">
                    <NavLink to="/recipes" className="nav-link">Recipes</NavLink>
                    <NavLink to="/search" className="nav-link">Search</NavLink>
                </div>

                <div className="nav-cutout">
                    <img src="https://i.gyazo.com/a9d749777403637393b09f9abe596aca.png" alt="gazpacho logo" className="logo" />
                </div>

                <div className="nav-group right">
                    <NavLink to="/profile" className="nav-link">Profile</NavLink>
                    <NavLink to="/about" className="nav-link">About</NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;