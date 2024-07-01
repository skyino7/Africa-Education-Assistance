import React, { useState, useEffect } from 'react';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const bookCampaigns = async (page) => {
    try {
      const response = await fetch(`http://localhost:5000/api/campaign/getbookcampaigns?page=${page}&limit=4`);
      const data = await response.json();
      console.log("Campaigns: ", data);
      if (data.success) {
        setCampaigns(data.data);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
      } else {
        console.error('Failed to fetch campaigns');
      }
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };

  useEffect(() => {
    bookCampaigns(currentPage);
  }, [currentPage]);

  const truncateText = (text, maxWords) => {
    const words = text.split(' ');
    return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '...' : text;
  };

  return (
    <>
      <div className="max-w-7xl mx-auto mt-10">
      <h1 className="text-5xl font-bold mb-5">Book Campaigns</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {campaigns.map((campaign) => (
            <div key={campaign._id} className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
              <a href="/">
                <img
                  className="w-full h-48 object-cover"
                  src={`http://localhost:5000/${campaign.picture}`}
                  alt={campaign.name}
                  loading="lazy"
                />
              </a>
              <div className="p-4">
                <a href="/">
                  <h5 className="text-xl font-bold mb-2">
                    {campaign.name}
                  </h5>
                </a>
                <p className="text-gray-700 mb-2">{truncateText(campaign.description, 50)}</p>
                <p className="text-gray-700 mb-2">Target: {campaign.quantity}</p>
                <span className="text-gray-700 mb-2">By: {campaign.userId.firstname}</span>
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
          ))}
        </div>
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 py-5">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-4 py-2 text-white bg-blue-600 rounded disabled:bg-gray-400"
          >
            Previous
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-4 py-2 text-white bg-blue-600 rounded disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Campaigns;
