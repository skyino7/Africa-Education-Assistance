import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Banner from '../components/Banner';

const Home = () => {
  return (
    <div>
        <Navbar />
        <Banner />
        <h1 className="p-4">Home</h1>
        <Footer />
    </div>
  )
}

export default Home
