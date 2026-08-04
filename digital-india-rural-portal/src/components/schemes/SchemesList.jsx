import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import SchemeCard from './SchemeCard';

const schemesData = [
  { id: 1, title: 'PMGDISHA', description: 'Pradhan Mantri Gramin Digital Saksharta Abhiyaan aims to make 6 crore rural households digitally literate.', category: 'Digital Literacy', eligibility: ['Rural Citizens', 'Age 14-60'], color: 'text-primary', bg: 'bg-primary/10', borderColor: 'border-primary/20' },
  { id: 2, title: 'Digital India', description: 'A flagship programme with a vision to transform India into a digitally empowered society and knowledge economy.', category: 'E-Governance', eligibility: ['All Citizens', 'Startups', 'Rural India'], color: 'text-secondary', bg: 'bg-secondary/10', borderColor: 'border-secondary/20' },
  { id: 3, title: 'Common Service Centres', description: 'Access points for delivery of essential public utility services, social welfare schemes, and healthcare.', category: 'E-Governance', eligibility: ['Village Entrepreneurs', 'Rural Citizens'], color: 'text-accent', bg: 'bg-accent/10', borderColor: 'border-accent/20' },
  { id: 4, title: 'BharatNet', description: 'Connecting all Gram Panchayats with high-speed broadband to bridge the rural-urban digital divide.', category: 'Infrastructure', eligibility: ['Gram Panchayats', 'Public Institutions'], color: 'text-primary', bg: 'bg-primary/10', borderColor: 'border-primary/20' },
  { id: 5, title: 'PM-WANI', description: 'Prime Minister Wi-Fi Access Network Interface to elevate wireless internet connectivity across the country.', category: 'Infrastructure', eligibility: ['PDOs', 'General Public'], color: 'text-secondary', bg: 'bg-secondary/10', borderColor: 'border-secondary/20' },
  { id: 6, title: 'DigiLocker', description: 'A platform for issuance and verification of documents & certificates digitally, eliminating the use of physical documents.', category: 'Digital Services', eligibility: ['Indian Citizens', 'Aadhaar Holders'], color: 'text-accent', bg: 'bg-accent/10', borderColor: 'border-accent/20' },
  { id: 7, title: 'UMANG', description: 'Unified Mobile Application for New-age Governance provides a single platform for all Indian Citizens to access pan India e-Gov services.', category: 'Digital Services', eligibility: ['All Citizens'], color: 'text-primary', bg: 'bg-primary/10', borderColor: 'border-primary/20' },
  { id: 8, title: 'eGramSwaraj', description: 'A simplified work-based accounting application for Panchayati Raj, streamlining decentralized planning and progress reporting.', category: 'E-Governance', eligibility: ['Panchayat Officials', 'Rural Citizens'], color: 'text-secondary', bg: 'bg-secondary/10', borderColor: 'border-secondary/20' }
];

const categories = ['All', 'Digital Literacy', 'E-Governance', 'Infrastructure', 'Digital Services'];

const SchemesList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredSchemes = useMemo(() => {
    return schemesData.filter((scheme) => {
      const matchesSearch = scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || scheme.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  return (
    <section className="py-8 bg-white min-h-[600px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12 bg-bg p-6 rounded-3xl border border-gray-100 shadow-sm">
          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 w-full lg:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  activeCategory === cat 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-96">
            <input
              type="text"
              placeholder="Search schemes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-text font-medium shadow-sm"
              aria-label="Search schemes"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors bg-gray-100 p-1 rounded-full"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Results Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredSchemes.length > 0 ? (
              filteredSchemes.map((scheme) => (
                <SchemeCard key={scheme.id} scheme={scheme} />
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="col-span-full py-24 text-center"
              >
                <div className="w-20 h-20 bg-bg rounded-2xl flex items-center justify-center mx-auto mb-6 text-gray-400 border border-gray-200">
                  <Search size={32} />
                </div>
                <h3 className="text-2xl font-extrabold text-text mb-2">No schemes found</h3>
                <p className="text-gray-500 font-medium text-lg">We couldn't find anything matching your search for "{searchTerm}".</p>
                <button 
                  onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                  className="mt-6 text-primary font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default SchemesList;
