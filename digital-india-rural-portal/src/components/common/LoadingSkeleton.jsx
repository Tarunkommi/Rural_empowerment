import React from 'react';
import { motion } from 'framer-motion';

const LoadingSkeleton = ({ type = 'card', count = 1 }) => {
  const renderCardSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 h-96 animate-pulse overflow-hidden">
          <div className="h-32 bg-gray-200 w-full"></div>
          <div className="p-6 flex-grow flex flex-col">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
            <div className="mt-auto border-t border-gray-100 pt-4">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderDetailSkeleton = () => (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <div className="h-[400px] bg-gray-200 animate-pulse"></div>
      <div className="container mx-auto px-4 py-12 flex-grow">
        <div className="h-64 bg-gray-200 animate-pulse rounded-2xl mb-10"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="h-48 bg-gray-200 animate-pulse rounded-2xl"></div>
            <div className="h-96 bg-gray-200 animate-pulse rounded-2xl"></div>
          </div>
          <div className="space-y-8">
            <div className="h-64 bg-gray-200 animate-pulse rounded-2xl"></div>
            <div className="h-64 bg-gray-200 animate-pulse rounded-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return type === 'detail' ? renderDetailSkeleton() : renderCardSkeleton();
};

export default LoadingSkeleton;
