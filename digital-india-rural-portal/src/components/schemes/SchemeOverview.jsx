import React from 'react';
import { Info } from 'lucide-react';

const SchemeOverview = ({ overview }) => {
  if (!overview) return null;
  
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#D9E2EC] p-8 mb-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-50 p-2 rounded-lg text-[#0F4C81]">
          <Info className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-[#1F2937]">What is this scheme?</h2>
      </div>
      
      <div className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
        {overview}
      </div>
    </div>
  );
};

export default SchemeOverview;
