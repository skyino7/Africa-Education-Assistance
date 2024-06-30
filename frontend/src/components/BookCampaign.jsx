import React, { useState } from 'react';

const CreateBookCampaign = () => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    description: '',
    // received: false,
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('quantity', formData.quantity);
    formDataToSend.append('description', formData.description);
    // formDataToSend.append('received', formData.received);
    if (file) {
      formDataToSend.append('file', file);
    }

    try {
      const response = await fetch('http://localhost:5000/api/campaign/create', {
        method: 'POST',
        body: formDataToSend,
        credentials: 'include'
      });

      const data = await response.json();
      console.log("Book Campaign: ", data);

      if (response.ok) {
        setMessage(data.message);
        // Clear the form after successful submission
        setFormData({
          name: '',
          quantity: '',
          description: '',
          // received: false,
        });
        setFile(null);
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage('Error occurred while creating the campaign.');
    }
  };

  return (
    <div className="max-w-lg mx-auto my-10">
      <h2 className="text-2xl font-bold mb-4">Create Book Campaign</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          ></textarea>
        </div>
        <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">Picture</label>
          <input
            type="file"
            name="file"
            id="file"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md"
          />
        </div>
        {/* <div className="flex items-center">
          <input
            type="checkbox"
            name="received"
            id="received"
            checked={formData.received}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
          <label htmlFor="received" className="ml-2 block text-sm text-gray-900">Received</label>
        </div> */}
        {message && <p className="mb-4 text-red-500">{message}</p>}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700"
        >
          Create Campaign
        </button>
      </form>
    </div>
  );
};

export default CreateBookCampaign;
