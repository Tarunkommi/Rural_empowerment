import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';

const SchemeHero = ({ scheme }) => {
  const navigate = useNavigate();
  
  return (
    <section className="relative bg-gradient-to-r from-[#0F4C81] to-[#1E3A8A] text-white py-16 lg:py-24 overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
        <svg width="600" height="600" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#FFFFFF" d="M47.7,-57.2C59.4,-44.9,64.8,-27.1,67.6,-8.7C70.4,9.6,70.5,28.6,60.8,42.7C51,56.8,31.4,66,10.6,68.9C-10.2,71.8,-32.2,68.4,-49.2,56.1C-66.2,43.7,-78.2,22.4,-77.7,2.2C-77.1,-18,-63.9,-37,-48,-49.5C-32,-61.9,-16,-67.7,1.1,-69C18.2,-70.3,36,-69.4,47.7,-57.2Z" transform="translate(100 100) scale(1.1)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10 -mt-10 mb-8">
        <Breadcrumb items={[
          { label: 'Government Schemes', path: '/government-schemes' },
          { label: scheme.title }
        ]} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.button 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/government-schemes')}
          className="flex items-center text-gray-200 hover:text-white mb-8 transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Schemes
        </motion.button>

        <div className="max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-4 flex-wrap"
          >
            <span className="bg-white/20 text-white text-sm font-semibold px-3 py-1 rounded-full backdrop-blur-sm border border-white/30">
              {scheme.category}
            </span>
            <span className={`text-sm font-semibold px-3 py-1 rounded-full flex items-center border ${
              scheme.status === 'Active' ? 'bg-[#16A34A]/20 text-[#4ADE80] border-[#16A34A]/50' : 
              scheme.status === 'Upcoming' ? 'bg-[#FACC15]/20 text-[#FDE047] border-[#FACC15]/50' : 
              'bg-gray-500/20 text-gray-300 border-gray-500/50'
            }`}>
              {scheme.status}
            </span>
            <span className="text-sm text-gray-300 flex items-center">
              <ShieldCheck className="w-4 h-4 mr-1 text-green-400" />
              Verified Govt. Scheme
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
          >
            {scheme.title}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-100 font-medium mb-6"
          >
            By {scheme.ministry}
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-100 mb-10 max-w-3xl leading-relaxed"
          >
            {scheme.description}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            {scheme.applyLink && (
              <a 
                href={scheme.applyLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#F4A300] hover:bg-[#D99100] text-white px-8 py-3.5 rounded-lg font-bold text-lg transition-transform transform hover:-translate-y-1 shadow-lg flex items-center"
              >
                Apply Now
              </a>
            )}
            {scheme.officialWebsite && (
              <a 
                href={scheme.officialWebsite} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-3.5 rounded-lg font-semibold text-lg transition-colors flex items-center backdrop-blur-sm"
              >
                Official Website
                <ExternalLink className="w-5 h-5 ml-2" />
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SchemeHero;
