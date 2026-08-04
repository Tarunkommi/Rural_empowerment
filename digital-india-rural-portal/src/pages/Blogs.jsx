import React from 'react';
import BlogSection from '../components/blogs/BlogSection';

const Blogs = () => {
  return (
    <div className="w-full overflow-x-hidden pt-12 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-6">News & Updates</h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
          Stay informed with the latest policy announcements, technological trends, and inspiring success stories from rural India.
        </p>
      </div>
      
      <BlogSection />
    </div>
  );
};

export default Blogs;
