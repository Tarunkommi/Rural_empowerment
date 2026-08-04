import React from 'react';
import LiteracyPrograms from '../components/literacy/LiteracyPrograms';

const DigitalLiteracy = () => {
  return (
    <div className="w-full overflow-x-hidden pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-6">Digital Literacy Portal</h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium">
          Access free, easy-to-understand modules to enhance your everyday digital skills and stay connected.
        </p>
      </div>
      
      {/* Interactive Literacy Cards Section */}
      <LiteracyPrograms />
      
      {/* Other components like LiteracyResources can go here */}
    </div>
  );
};

export default DigitalLiteracy;
