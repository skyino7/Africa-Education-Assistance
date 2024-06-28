import React from 'react';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import Campaigns from '../components/Campaigns';

const Home = () => {
  return (
    <div>
        <Navbar />
        <Banner />
        <h1 className="p-4">Home</h1>
        <Campaigns />
        <Footer />

    </div>
  )
}

export default Home
