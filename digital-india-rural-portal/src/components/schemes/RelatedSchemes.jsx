import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Bookmark } from 'lucide-react';

const RelatedSchemes = ({ schemes }) => {
  if (!schemes || schemes.length === 0) return null;

  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gray-100 p-2 rounded-lg text-gray-600">
          <Bookmark className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-[#1F2937]">Related Schemes</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {schemes.map((scheme, index) => (
          <motion.div
            key={scheme._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 overflow-hidden group transition-all"
          >
            <div className="p-5">
              <h3 className="font-bold text-lg text-[#1F2937] mb-2 group-hover:text-[#0F4C81] transition-colors line-clamp-1">
                {scheme.title}
              </h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                {scheme.overview || scheme.shortDescription || "Discover the benefits of this government initiative."}
              </p>
              <Link 
                to={`/government-schemes/${scheme.slug}`}
                className="inline-flex items-center text-sm font-semibold text-[#0F4C81] hover:text-[#1E3A8A]"
              >
                Read More <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RelatedSchemes;
