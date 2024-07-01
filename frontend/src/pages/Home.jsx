import React from 'react';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import Campaigns from '../components/Campaigns';
import SchoolBuildings from '../components/SchoolBuildings';

const Home = () => {
  return (
    <div>
        <Navbar />
        <Banner />
        <Campaigns />
        <SchoolBuildings />
        <Footer />
    </div>
  )
}

export default Home
