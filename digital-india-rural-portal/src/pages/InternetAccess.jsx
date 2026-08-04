import React from 'react';
import InternetAccessPoints from '../components/internet/InternetAccessPoints';

const InternetAccess = () => {
  return (
    <div className="w-full overflow-x-hidden pt-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-6">Rural Internet Connectivity</h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
          Tracking the progress of bridging the digital divide through nationwide high-speed broadband infrastructure, ensuring every rural citizen is connected.
        </p>
      </div>
      
      <InternetAccessPoints />
    </div>
  );
};

export default InternetAccess;
