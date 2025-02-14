import React from 'react';
import CarouselComponent from '../utils/components/Home/carousel';

const Home = () => {
  return (
    <div className="home-container">

      <CarouselComponent />
      <h1>Welcome to Our Platform</h1>
      <div className="home-content">
        <p>This is the home page of our educational platform.</p>
        {/* Add more content for your home page here */}
      </div>
    </div>
  );
};

export default Home;