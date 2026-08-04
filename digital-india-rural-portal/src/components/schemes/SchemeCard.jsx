import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

const SchemeCard = ({ scheme }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-2xl shadow-sm border ${scheme.borderColor} p-6 flex flex-col h-full hover:shadow-xl transition-all focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent`}
    >
      <div className="flex justify-between items-start mb-5 gap-2">
        <h3 className="text-xl font-bold text-text leading-tight">{scheme.title}</h3>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${scheme.bg} ${scheme.color} whitespace-nowrap`}>
          {scheme.category}
        </span>
      </div>
      
      <p className="text-gray-600 text-sm mb-6 flex-1 leading-relaxed font-medium">
        {scheme.description}
      </p>

      <div className="mb-8">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Eligibility</h4>
        <div className="flex flex-wrap gap-2">
          {scheme.eligibility.map((item, idx) => (
            <span key={idx} className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 bg-gray-50 border border-gray-100 px-2.5 py-1.5 rounded-lg shadow-sm">
              <CheckCircle size={14} className="text-secondary" />
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-gray-100">
        <button 
          className="w-full bg-bg hover:bg-primary/5 text-primary border border-transparent hover:border-primary/20 font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 group outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label={`Learn more about ${scheme.title}`}
        >
          Learn More 
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

export default SchemeCard;
