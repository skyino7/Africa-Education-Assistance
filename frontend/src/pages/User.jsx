import React from 'react';
// import BookCampaign from '../components/BookCampaign';
import Sidebar from '../UserComponent/Sidebar';
import Main from '../UserComponent/Main';
import Navbar from '../UserComponent/Navbar';

const User = () => {


  return (
    <div className='flex'>
      {/* <Navbar /> */}
      <Sidebar />
      <Main />
    </div>
  )
};

export default User
