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
        <nav className="bg-gray-800 text-white w-full fixed top-0 z-10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    {/* <a href="/home" className="text-white text-lg font-bold">Home</a> */}
                    <ul className="flex items-center space-x-4">
                        <li onClick={handleLogout} className="cursor-pointer">Logout</li>
                        <li className="cursor-pointer">Settings</li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
