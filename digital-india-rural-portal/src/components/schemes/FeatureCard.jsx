import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const FeatureCard = ({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-100 flex items-center hover:border-blue-300 hover:bg-blue-50 transition-colors group cursor-default"
    >
      <div className="bg-yellow-100 p-2 rounded-full text-yellow-600 mr-4 group-hover:scale-110 transition-transform">
        <Star className="w-5 h-5 fill-current" />
      </div>
      <span className="font-semibold text-gray-700 group-hover:text-[#0F4C81] transition-colors">
        {feature}
      </span>
    </motion.div>
  );
};

export default FeatureCard;
