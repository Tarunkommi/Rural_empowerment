import React from 'react';
import Hero from '../components/home/Hero';
import Statistics from '../components/home/Statistics';

const Home = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <Hero />
      <Statistics />
    </div>
  );
};

export default Home;
