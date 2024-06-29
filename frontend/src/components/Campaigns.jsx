import React, { useState, useEffect } from 'react';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const bookCampaigns = async (page) => {
    try {
      const response = await fetch(`http://localhost:5000/api/campaign/getbookcampaigns?page=${page}&limit=4`);
      const data = await response.json();
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

  return (
    <>
      <div className="flex flex-wrap -mx-4 p-5">
        {campaigns.map((campaign) => (
          <div key={campaign._id} className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
            <div className="max-w-sm bg-white rounded-lg">
              <a href="/">
                <img className="rounded-t-lg" src={campaign.imageUrl} alt={campaign.name} />
              </a>
              <div className="p-5 dark:bg-gray-800 dark:border-gray-700">
                <a href="/">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">
                    {campaign.name}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-white">{campaign.description}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-white">Target: {campaign.quantity}</p>
                <span className='mb-3 font-normal text-white dark:text-white'>By: {campaign.userId.firstName}</span>
                <br/>
                <br/>
                <a
                  href="/"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read more
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
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2">
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
