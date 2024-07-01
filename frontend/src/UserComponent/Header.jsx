import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/AuthSlice';
import useProfile from '../useProfile.js';

const Header = () => {

  const userName = useProfile();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-end">
        <ul className="flex items-center space-x-4">
          <p className="text-white">{userName}</p>
          <li onClick={handleLogout} className="text-white cursor-pointer">Logout</li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
