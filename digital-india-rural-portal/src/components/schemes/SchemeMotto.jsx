import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

const SchemeMotto = ({ motto }) => {
  if (!motto) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-indigo-50 to-blue-100 rounded-2xl p-8 md:p-12 mb-10 text-center relative overflow-hidden shadow-sm border border-blue-200"
    >
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Lightbulb className="w-48 h-48" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto">
        <Lightbulb className="w-10 h-10 mx-auto text-[#0F4C81] mb-6" />
        <h3 className="text-2xl md:text-3xl font-bold text-[#1F2937] leading-tight italic">
          "{motto}"
        </h3>
      </div>
    </motion.div>
  );
};

export default SchemeMotto;
