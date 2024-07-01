import React from 'react';

const SchoolBuildingCard = ({ building }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
      <img
        src={`http://localhost:5000/${building.image}`}
        alt={building.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{building.name}</h2>
        <p className="text-gray-700 mb-2">{building.description}</p>
        <p className="text-gray-700 mb-2"><strong>Address:</strong> {building.address}, {building.city}, {building.region}</p>
        <p className="text-gray-700 mb-2"><strong>Country:</strong> {building.country}</p>
        <p className="text-gray-700 mb-2"><strong>Amount Needed:</strong> GH¢{building.AmountNeeded}</p>
        <p className="text-gray-700 mb-2"><strong>Amount Raised:</strong> GH¢{building.AmountRaised}</p>
      <br />
      <br />
      <a
        href="/"
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Donate
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default SchoolBuildingCard;
