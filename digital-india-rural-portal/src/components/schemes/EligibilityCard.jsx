import React from 'react';
import { Users, CheckCircle2 } from 'lucide-react';

const EligibilityCard = ({ eligibility }) => {
  if (!eligibility || eligibility.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#D9E2EC] p-8 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-green-50 p-2 rounded-lg text-[#16A34A]">
          <Users className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-[#1F2937]">Eligibility Criteria</h2>
      </div>
      
      <p className="text-gray-600 mb-6">
        You are eligible to apply for this scheme if you meet the following criteria:
      </p>

      <ul className="space-y-4">
        {eligibility.map((item, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle2 className="w-5 h-5 text-[#16A34A] mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 font-medium">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EligibilityCard;
