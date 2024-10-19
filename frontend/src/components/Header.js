import React from 'react';
import './Header.css';
import logo from '../icons/logo.svg';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { user, logout } = useAuthContext();
    const navigate  = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <header className="header">
            <div className="logo">
                <img src={logo} alt="Cuvette Logo" width="100" height="20" />
            </div>
            <nav>
                <a href="#contact" className="contact-link">Contact</a>
                {user && <button onClick={handleLogout}>Logout</button>}
            </nav>
        </header>
    );
};

export default Header;
