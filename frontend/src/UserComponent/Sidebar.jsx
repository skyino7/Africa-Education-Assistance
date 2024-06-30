import React from 'react';
import useProfile from '../useProfile.js';

const Sidebar = () => {

    const userName = useProfile();

  return (
    <div className="bg-gray-800 text-white h-screen w-1/8 flex flex-col justify-between">
      <div className="p-4">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <ul className="mt-4">
          <li className="py-2 hover:bg-gray-700 cursor-pointer">Dashboard</li>
          <li className="py-2 hover:bg-gray-700 cursor-pointer">Analytics</li>
          <li className="py-2 hover:bg-gray-700 cursor-pointer">Settings</li>
        </ul>
      </div>
      <div className="p-4">
        <p className="text-sm">Logged in as {userName}</p>
      </div>
    </div>
  );
};

export default Sidebar;
