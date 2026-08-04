import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit } from 'lucide-react';
import { DynamicIcon } from '../../utils/IconMapper';

const ApplicationTimeline = ({ steps }) => {
  if (!steps || steps.length === 0) return null;

  // Sort steps by stepNumber just in case
  const sortedSteps = [...steps].sort((a, b) => a.stepNumber - b.stepNumber);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#D9E2EC] p-8 mb-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-blue-50 p-2 rounded-lg text-[#0F4C81]">
          <GitCommit className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-[#1F2937]">Step-by-Step Application Process</h2>
      </div>

      <div className="relative border-l-2 border-blue-100 ml-4 md:ml-6 space-y-12 pb-4">
        {sortedSteps.map((step, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.15 }}
            className="relative pl-8 md:pl-12"
          >
            {/* Timeline Dot with Icon */}
            <div className="absolute -left-[21px] top-0 bg-white border-4 border-blue-100 rounded-full w-10 h-10 flex items-center justify-center text-[#0F4C81] shadow-sm z-10">
              <DynamicIcon name={step.icon || 'Check'} size={18} />
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 relative shadow-sm hover:shadow-md transition-shadow">
              {/* Optional Step Number Badge */}
              <span className="absolute -top-3 -right-3 bg-[#0F4C81] text-white text-xs font-bold w-8 h-8 flex items-center justify-center rounded-full shadow-md">
                {step.stepNumber}
              </span>
              
              <h3 className="text-xl font-bold text-[#1F2937] mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationTimeline;
