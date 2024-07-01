import React from 'react';
import useProfile from '../useProfile.js';

const MainContent = () => {

    const userName = useProfile();

    const cards = [
        {
          title: 'Books Campaign',
          description: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
        },
        {
          title: 'Books Donated',
          description: 'Discover the most innovative tech solutions transforming industries worldwide.',
        },
        {
          title: 'School Buildings Campaign',
          description: 'Explore the advancements and future trends in artificial intelligence and machine learning.',
        },
        {
          title: 'Monies Raised',
          description: 'Learn about the essential practices to secure your digital infrastructure from threats.',
        },
      ];

  return (
    <div className="flex-1 p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
      <div className="bg-white p-4 shadow-md rounded-md">
        <p>Welcome to your dashboard <b>{userName}</b>.</p>
      </div>

      <div className="container py-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {cards.map((card, index) => (
            <a
                key={index}
                href="#"
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {card.title}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                {card.description}
                </p>
            </a>
            ))}
        </div>
      </div>

    </div>
  );
};

export default MainContent;
