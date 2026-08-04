import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex text-sm text-gray-300 font-medium mb-6 mt-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link to="/" className="inline-flex items-center hover:text-white transition-colors">
            <Home className="w-4 h-4 mr-2" />
            Home
          </Link>
        </li>
        
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index}>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
                {isLast ? (
                  <span className="text-white ml-1 md:ml-2 font-semibold">
                    {item.label}
                  </span>
                ) : (
                  <Link 
                    to={item.path} 
                    className="ml-1 md:ml-2 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
