import React, { useState } from 'react';
import useProfile from '../useProfile.js';
import {
  HomeIcon,
  ChartPieIcon,
  LibraryIcon,
  AcademicCapIcon,
  UsersIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@heroicons/react/outline';

const Sidebar = () => {
  const userName = useProfile();
  const [isCampaignsOpen, setIsCampaignsOpen] = useState(false);
  const [isDonationsOpen, setIsDonationsOpen] = useState(false);

  const toggleCampaigns = () => setIsCampaignsOpen(!isCampaignsOpen);
  const toggleDonations = () => setIsDonationsOpen(!isDonationsOpen);

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white flex flex-col justify-between">
      <div className="p-4 overflow-y-auto">
        <h2 className="text-xl font-bold">EduAssist</h2>
        <ul className="mt-4">
          <li className="p-3 hover:bg-gray-700 cursor-pointer flex items-center">
            <HomeIcon className="w-6 h-6 mr-2" />
            <a href="/user">Dashboard</a>
          </li>
          <li className="p-3 hover:bg-gray-700 cursor-pointer flex items-center">
            <ChartPieIcon className="w-6 h-6 mr-2" />
            Analytics
          </li>
          <li className="p-3 hover:bg-gray-700 cursor-pointer flex items-center justify-between" onClick={toggleCampaigns}>
            <div className="flex items-center">
              <LibraryIcon className="w-6 h-6 mr-2" />
              Campaigns
            </div>
            {isCampaignsOpen ? (
              <ChevronDownIcon className="w-6 h-6" />
            ) : (
              <ChevronRightIcon className="w-6 h-6" />
            )}
          </li>
          {isCampaignsOpen && (
            <ul className="ml-8 mt-2">
              <li className="p-3 hover:bg-gray-700 cursor-pointer flex items-center">
                <a href="/user/bookscampaign">Book Campaign</a>
              </li>
              <li className="p-3 hover:bg-gray-700 cursor-pointer flex items-center">
                <a href="/user/schoolbuildingform">Create Buildings Campaign</a>
              </li>
              <li className="p-3 hover:bg-gray-700 cursor-pointer flex items-center">
                <a href="/user/schoolbuildingtable">Buildings Campaign</a>
              </li>
              <li className="p-3 hover:bg-gray-700 cursor-pointer flex items-center">
                <a href="/user/fundscampaign">Funds Campaign</a>
              </li>
              <li className="p-3 hover:bg-gray-700 cursor-pointer flex items-center">
                <a href="/user/campaigns">All Campaigns</a>
              </li>
              <li className="p-3 hover:bg-gray-700 cursor-pointer flex items-center">
                <a href="/user/campaignsdonated">Campaigns Donated</a>
              </li>
              <li className="p-3 hover:bg-gray-700 cursor-pointer flex items-center">
                <a href="/user/campaignsreceived">Campaigns Received</a>
              </li>
              <li className="p-3 hover:bg-gray-700 cursor-pointer flex items-center">
                <a href="/user/campaignsactive">Active Campaigns</a>
              </li>
              <li className="p-3 hover:bg-gray-700 cursor-pointer flex items-center">
                <a href="/user/campaignscompleted">Completed Campaigns</a>
              </li>
            </ul>
          )}
          <li className="p-3 hover:bg-gray-700 cursor-pointer flex items-center justify-between" onClick={toggleDonations}>
            <div className="flex items-center">
              <AcademicCapIcon className="w-6 h-6 mr-2" />
              Donations
            </div>
            {isDonationsOpen ? (
              <ChevronDownIcon className="w-6 h-6" />
            ) : (
              <ChevronRightIcon className="w-6 h-6" />
            )}
          </li>
          {isDonationsOpen && (
            <ul className="ml-8 mt-2">
              <li className="p-3 hover:bg-gray-700 cursor-pointer flex items-center">
                <a href="/user/booksdonated">Books Donated</a>
              </li>
              <li className="p-3 hover:bg-gray-700 cursor-pointer flex items-center">
                <a href="/user/fundsdonated">Funds Donated</a>
              </li>
            </ul>
          )}
          <li className="p-3 hover:bg-gray-700 cursor-pointer flex items-center">
            <UsersIcon className="w-6 h-6 mr-2" />
            <a href="/user/users">Users</a>
          </li>
        </ul>
      </div>
      <div className="p-4">
        <p className="text-md">Logged in as {userName}</p>
      </div>
    </div>
  );
};

export default Sidebar;
