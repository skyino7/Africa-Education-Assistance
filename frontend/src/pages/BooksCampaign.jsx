import React, { useEffect, useState } from 'react';

const BookCampaigns = () => {
  const [bookCampaigns, setBookCampaigns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBookCampaigns = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/campaign/nrbookcampaigns?page=${currentPage}&limit=10`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setBookCampaigns(data.data);
          setCurrentPage(data.currentPage);
          setTotalPages(data.totalPages);
        } else {
          console.error('Failed to fetch book campaigns');
        }
      } catch (error) {
        console.error('Error fetching book campaigns', error);
      }
    };

    fetchBookCampaigns();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const truncateText = (text, maxWords) => {
    const words = text.split(' ');
    return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '...' : text;
  };

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <button className="mb-4 bg-green-500 text-white px-4 py-2 rounded ml-auto">Create New Campaign</button>
      <h1 className="text-2xl font-bold mb-5">Book Campaigns</h1>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-6 text-left">User</th>
            <th className="py-3 px-6 text-left">Image</th>
            <th className="py-3 px-6 text-left">Title</th>
            <th className="py-3 px-6 text-left">Description</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {bookCampaigns.map((campaign) => (
            <tr key={campaign._id} className="bg-white">
              <td className="py-4 px-6">{campaign.userId.firstname}</td>
              <td className="py-4 px-6"><img src={`http://localhost:5000/${campaign.picture}`} width={100} alt="Campaign" /></td>
              <td className="py-4 px-6">{campaign.name}</td>
              <td className="py-4 px-6">{truncateText(campaign.description, 30)}</td>
              <td className="py-4 px-6 space-x-2">
                <button className="bg-green-500 text-white px-4 py-2 rounded">View</button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between my-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="bg-gray-500 text-white px-4 py-2 rounded"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="bg-gray-500 text-white px-4 py-2 rounded"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookCampaigns;
