import React from 'react';
import useProfile from '../useProfile.js';

const MainContent = () => {

    const userName = useProfile();

  return (
    <div className="flex-1 p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
      <div className="bg-white p-4 shadow-md rounded-md">
        <p>Welcome to your dashboard <b>{userName}</b>.</p>
      </div>
    </div>
  );
};

export default MainContent;
