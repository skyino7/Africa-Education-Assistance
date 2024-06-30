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
        <Campaigns />
        <Footer />

    </div>
  )
}

export default Home
