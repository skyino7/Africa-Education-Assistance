import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
    try {
        const response = await fetch('/api/auth/logout', {
            method: 'GET',
            credentials: 'include',
        });
        if (response.ok) {
            console.log('User Logout Successfully');
            navigate('/login');
        } else {
            console.error('Failed to logout');
        }
    } catch (error) {
        console.error("There was an error logging out!", error);
    }
};

    return (
        <nav className="bg-gray-800 p-4">
            <ul className="flex items-center space-x-4">
                <li><a href="/home" className="text-white">Home</a></li>
                <li onClick={handleLogout} className="text-white">Logout</li>
            </ul>
        </nav>
    );
};

export default NavBar;
