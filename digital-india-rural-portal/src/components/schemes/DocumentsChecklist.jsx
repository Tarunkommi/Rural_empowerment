import React from 'react';
import { FileText, FileCheck } from 'lucide-react';

const DocumentsChecklist = ({ documents }) => {
  if (!documents || documents.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#D9E2EC] p-8 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-orange-50 p-2 rounded-lg text-[#F4A300]">
          <FileText className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-[#1F2937]">Required Documents</h2>
      </div>
      
      <p className="text-gray-600 mb-6">
        Please keep the following documents ready before applying:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {documents.map((doc, index) => (
          <div key={index} className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
            <FileCheck className="w-5 h-5 text-[#0F4C81] mr-3 flex-shrink-0" />
            <span className="text-gray-700 font-medium">{doc}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentsChecklist;
