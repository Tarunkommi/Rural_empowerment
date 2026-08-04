import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQAccordion = ({ faqs }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  if (!faqs || faqs.length === 0) return null;

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#D9E2EC] p-8 mb-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-purple-50 p-2 rounded-lg text-purple-600">
          <HelpCircle className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-[#1F2937]">Frequently Asked Questions</h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isActive = activeIndex === index;
          return (
            <div 
              key={index} 
              className={`border rounded-xl transition-colors duration-300 overflow-hidden ${
                isActive ? 'border-[#0F4C81] bg-blue-50/30' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                onClick={() => toggleAccordion(index)}
              >
                <span className={`font-semibold text-lg ${isActive ? 'text-[#0F4C81]' : 'text-gray-700'}`}>
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                    isActive ? 'rotate-180 text-[#0F4C81]' : ''
                  }`} 
                />
              </button>
              
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="p-5 pt-0 text-gray-600 border-t border-gray-100">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQAccordion;
