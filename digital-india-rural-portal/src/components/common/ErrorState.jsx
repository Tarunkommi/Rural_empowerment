import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ErrorState = ({ error, onRetry, backLink }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full border border-[#D9E2EC]">
        <AlertCircle className="w-16 h-16 text-[#DC2626] mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-[#1F2937] mb-2">Something went wrong</h2>
        <p className="text-gray-600 mb-8">
          {error || "We couldn't fetch the requested data. Please try again later."}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {onRetry && (
            <button 
              onClick={onRetry}
              className="flex items-center justify-center bg-[#0F4C81] hover:bg-[#1E3A8A] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </button>
          )}
          {backLink && (
            <button 
              onClick={() => navigate(backLink)}
              className="bg-gray-100 hover:bg-gray-200 text-[#1F2937] px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Go Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorState;
