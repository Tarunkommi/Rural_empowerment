import React from 'react';
import { motion } from 'framer-motion';
import { DynamicIcon } from '../../utils/IconMapper';

const BenefitCard = ({ icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-[#D9E2EC] hover:shadow-md transition-shadow group h-full flex flex-col"
    >
      <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-[#0F4C81] mb-5 group-hover:scale-110 group-hover:bg-[#0F4C81] group-hover:text-white transition-all duration-300">
        <DynamicIcon name={icon || 'CheckCircle'} size={28} />
      </div>
      <h3 className="text-lg font-bold text-[#1F2937] mb-3">{title}</h3>
      <p className="text-gray-600 flex-grow">{description}</p>
    </motion.div>
  );
};

export default BenefitCard;
