import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle } from 'lucide-react';

const SchemeCTA = ({ applyLink, officialWebsite }) => {
  if (!applyLink && !officialWebsite) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-lg border-2 border-[#16A34A]/20 p-8 md:p-12 text-center"
    >
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-[#16A34A]">
        <CheckCircle className="w-8 h-8" />
      </div>
      <h2 className="text-3xl font-bold text-[#1F2937] mb-4">Ready to take the next step?</h2>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Join millions of beneficiaries and transform your digital journey today. Ensure you have all the required documents before applying.
      </p>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        {applyLink && (
          <a 
            href={applyLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-[#16A34A] hover:bg-[#15803D] text-white px-8 py-4 rounded-xl font-bold text-lg transition-transform transform hover:-translate-y-1 shadow-lg"
          >
            Apply Now
          </a>
        )}
        {officialWebsite && (
          <a 
            href={officialWebsite} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-gray-50 hover:bg-gray-100 text-[#0F4C81] border-2 border-[#0F4C81] px-8 py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center"
          >
            Visit Official Website
            <ExternalLink className="w-5 h-5 ml-2" />
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default SchemeCTA;
