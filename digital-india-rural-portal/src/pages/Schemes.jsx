import React from 'react';
import SchemesList from '../components/schemes/SchemesList';

const Schemes = () => {
  return (
    <div className="w-full overflow-x-hidden pt-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-6">Government Schemes</h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
          Discover and access essential government initiatives designed to empower rural India digitally and economically. Find what you are eligible for below.
        </p>
      </div>
      
      <SchemesList />
    </div>
  );
};

export default Schemes;
