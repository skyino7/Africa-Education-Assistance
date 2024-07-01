import React, { useEffect, useState } from 'react';

const SchoolBuildingTable = () => {
  const [schoolBuildings, setSchoolBuildings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSchoolBuildings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/school-building');
        const data = await response.json();
        if (response.ok) {
          setSchoolBuildings(data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Failed to fetch school buildings');
      }
    };

    fetchSchoolBuildings();
  }, []);

  const truncateText = (text, maxWords) => {
    const words = text.split(' ');
    return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '...' : text;
  };

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">School Buildings</h1>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <div className="shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Address</th>
              <th className="py-3 px-6 text-left">City</th>
              <th className="py-3 px-6 text-left">Region</th>
              <th className="py-3 px-6 text-left">Country</th>
              <th className="py-3 px-6 text-left">Amount Needed</th>
              <th className="py-3 px-6 text-left">Amount Raised</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {schoolBuildings.map((building) => (
              <tr key={building._id} className="bg-white">
                <td className="py-4 px-6">{building.name}</td>
                <td className="py-4 px-6">{truncateText(building.description, 20)}</td>
                <td className="py-4 px-6">{building.address}</td>
                <td className="py-4 px-6">{building.city}</td>
                <td className="py-4 px-6">{building.region}</td>
                <td className="py-4 px-6">{building.country}</td>
                <td className="py-4 px-6">GH¢{building.AmountNeeded}</td>
                <td className="py-4 px-6">GH¢{building.AmountRaised}</td>
                <td className="py-4 px-6 space-x-2">
                <button className="bg-green-500 text-white px-4 py-2 rounded">View</button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SchoolBuildingTable;
