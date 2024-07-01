import React, { useState, useEffect } from 'react';
import SchoolBuildingCard from './SchoolBuildingCard';

const SchoolBuildings = () => {
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

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <h1 className="text-5xl font-bold mb-5">School Buildings</h1>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {schoolBuildings.map((building) => (
          <SchoolBuildingCard key={building._id} building={building} />
        ))}
      </div>
    </div>
  );
};

export default SchoolBuildings