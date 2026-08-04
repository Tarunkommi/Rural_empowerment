import React, { useState, useEffect } from 'react';
import { Bookmark, Loader2, ArrowRight, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import userService from '../../services/userService';
import { toast } from 'react-toastify';

export default function SavedSchemes() {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await userService.getBookmarks();
        if (response.success) {
          setSchemes(response.data);
        }
      } catch (err) {
        setError(err.message || 'Failed to load bookmarked schemes');
      } finally {
        setLoading(false);
      }
    };
    fetchBookmarks();
  }, []);

  const handleRemove = (id) => {
    setSchemes(schemes.filter(s => s.id !== id));
    toast.success('Scheme removed from saved list');
  };

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>;
  }

  if (error) {
    return <div className="text-error p-4 bg-error/10 rounded-xl">{error}</div>;
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Bookmark className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Saved Schemes</h2>
          <p className="text-gray-500 mt-1">Government schemes you have bookmarked for later.</p>
        </div>
      </div>

      {schemes.length === 0 ? (
        <div className="text-center py-12 bg-bg rounded-2xl border border-dashed border-gray-300">
          <Bookmark className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900">No saved schemes</h3>
          <p className="text-gray-500 mt-1">Explore government schemes and save them to view here.</p>
          <Link to="/government-schemes" className="inline-block mt-4 text-primary font-medium hover:underline">
            Browse Schemes
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {schemes.map((scheme) => (
            <div key={scheme.id} className="border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-sm transition-all bg-white relative group">
              <button 
                onClick={() => handleRemove(scheme.id)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-error hover:bg-error/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                title="Remove Bookmark"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              
              <div className="w-12 h-12 rounded-full bg-bg border border-border p-2 mb-4 flex items-center justify-center">
                <img src={scheme.logo} alt={scheme.name} className="w-full h-full object-contain" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 line-clamp-1 pr-8">{scheme.name}</h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[40px]">{scheme.description}</p>
              
              <Link 
                to={`/government-schemes/${scheme.id}`}
                className="flex items-center text-sm font-medium text-primary hover:text-blue-800 transition-colors"
              >
                View Details <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
