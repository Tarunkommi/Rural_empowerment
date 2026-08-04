import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Search, Filter } from 'lucide-react';
import { useSchemes } from '../hooks/useScheme';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import ErrorState from '../components/common/ErrorState';

const SchemeCard = ({ scheme, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className="bg-white rounded-2xl shadow-sm border border-[#D9E2EC] overflow-hidden hover:shadow-xl transition-shadow flex flex-col h-full group"
  >
    {/* Card Header Pattern/Gradient */}
    <div className="h-32 bg-gradient-to-r from-[#0F4C81] to-[#1E3A8A] relative overflow-hidden p-6 flex flex-col justify-end">
      <div className="absolute top-0 right-0 opacity-10 pointer-events-none transform translate-x-4 -translate-y-4">
        <ShieldCheck className="w-32 h-32 text-white" />
      </div>
      <div className="relative z-10 flex justify-between items-end">
        <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm border border-white/30">
          {scheme.category}
        </span>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
          scheme.status === 'Active' ? 'bg-[#16A34A] text-white' : 
          scheme.status === 'Upcoming' ? 'bg-[#F4A300] text-white' : 
          'bg-gray-500 text-white'
        }`}>
          {scheme.status || 'Active'}
        </span>
      </div>
    </div>

    {/* Card Body */}
    <div className="p-6 flex-grow flex flex-col">
      <h3 className="text-xl font-bold text-[#1F2937] mb-2 group-hover:text-[#0F4C81] transition-colors line-clamp-2">
        {scheme.title}
      </h3>
      <p className="text-sm font-medium text-[#F4A300] mb-3">{scheme.ministry}</p>
      <p className="text-gray-600 mb-6 flex-grow line-clamp-3">
        {scheme.description}
      </p>

      {/* Card Footer */}
      <div className="pt-4 border-t border-gray-100 mt-auto flex justify-between items-center">
        <Link 
          to={`/government-schemes/${scheme.slug}`}
          className="text-[#0F4C81] font-bold text-sm flex items-center hover:text-[#1E3A8A] transition-colors"
        >
          View Details
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  </motion.div>
);

const GovernmentSchemes = () => {
  const { schemes, loading, error, fetchSchemes } = useSchemes();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMinistry, setSelectedMinistry] = useState('All');

  // Filter Logic (Client-side for now, can be moved to server-side if needed)
  const filteredSchemes = useMemo(() => {
    return schemes.filter((scheme) => {
      const matchesSearch = scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || scheme.category === selectedCategory;
      const matchesMinistry = selectedMinistry === 'All' || scheme.ministry === selectedMinistry;
      
      return matchesSearch && matchesCategory && matchesMinistry;
    });
  }, [schemes, searchTerm, selectedCategory, selectedMinistry]);

  // Extract unique categories and ministries for filter dropdowns
  const categories = ['All', ...new Set(schemes.map(s => s.category))];
  const ministries = ['All', ...new Set(schemes.map(s => s.ministry))];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <div className="bg-[#0F4C81] h-[300px]"></div>
        <div className="container mx-auto px-4 py-12 -mt-20">
           <LoadingSkeleton type="card" count={6} />
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorState error={error} onRetry={() => fetchSchemes()} backLink="/" />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Header */}
      <div className="bg-[#0F4C81] text-white py-16 pb-24">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Government Schemes & Initiatives
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-blue-100 max-w-2xl mx-auto mb-8"
          >
            Explore and apply for central and state government programs designed to empower rural citizens.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-20 mb-12">
        {/* Filters Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-4 border border-[#D9E2EC]"
        >
          <div className="flex-grow relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text"
              placeholder="Search schemes by name or keyword..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0F4C81] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4 md:w-1/2">
            <select 
              className="w-1/2 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0F4C81] text-gray-700 bg-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All" disabled className="text-gray-400">Category</option>
              {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
            </select>
            <select 
              className="w-1/2 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0F4C81] text-gray-700 bg-white"
              value={selectedMinistry}
              onChange={(e) => setSelectedMinistry(e.target.value)}
            >
              <option value="All" disabled className="text-gray-400">Ministry</option>
              {ministries.map((min, i) => <option key={i} value={min}>{min}</option>)}
            </select>
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        {/* Empty State */}
        {filteredSchemes.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="inline-block bg-blue-100 p-4 rounded-full text-[#0F4C81] mb-4">
              <Search className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Schemes Found</h2>
            <p className="text-gray-600">Try adjusting your search or filters to find what you're looking for.</p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setSelectedMinistry('All'); }}
              className="mt-6 text-[#0F4C81] font-semibold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Grid Display */}
        {filteredSchemes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSchemes.map((scheme, index) => (
              <SchemeCard key={scheme._id} scheme={scheme} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GovernmentSchemes;
