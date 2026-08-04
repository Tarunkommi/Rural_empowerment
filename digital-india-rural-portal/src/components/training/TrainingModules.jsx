import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, User, BarChart, CheckCircle2, PlayCircle, Award, BookOpen, Search } from 'lucide-react';

const coursesData = [
  { id: 1, title: 'Digital Transactions Basics', description: 'Learn how to safely use UPI, net banking, and mobile wallets.', category: 'Finance', duration: '4 Hours', level: 'Beginner', trainer: 'Rahul Sharma', progress: 100, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20', barColor: 'bg-primary' },
  { id: 2, title: 'E-Governance Portals', description: 'Master the use of DigiLocker, UMANG, and state service portals for documents.', category: 'E-Governance', duration: '6 Hours', level: 'Intermediate', trainer: 'Anita Desai', progress: 45, color: 'text-secondary', bg: 'bg-secondary/10', border: 'border-secondary/20', barColor: 'bg-secondary' },
  { id: 3, title: 'Cyber Security Essentials', description: 'Protect yourself from online fraud, phishing, and secure your personal data.', category: 'Security', duration: '3 Hours', level: 'Beginner', trainer: 'Vikram Singh', progress: 0, color: 'text-accent', bg: 'bg-accent/10', border: 'border-accent/20', barColor: 'bg-accent' },
  { id: 4, title: 'Online Business Setup', description: 'Learn how to sell local handicrafts and products on e-commerce platforms.', category: 'Entrepreneurship', duration: '10 Hours', level: 'Advanced', trainer: 'Priya Patel', progress: 0, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20', barColor: 'bg-primary' },
  { id: 5, title: 'Smartphone Mastery', description: 'Complete guide to managing apps, storage, and device settings effectively.', category: 'Basics', duration: '2 Hours', level: 'Beginner', trainer: 'Rahul Sharma', progress: 0, color: 'text-secondary', bg: 'bg-secondary/10', border: 'border-secondary/20', barColor: 'bg-secondary' },
  { id: 6, title: 'Online Education Platforms', description: 'How to access free educational resources and tutorials for students.', category: 'Education', duration: '5 Hours', level: 'Intermediate', trainer: 'Anita Desai', progress: 10, color: 'text-accent', bg: 'bg-accent/10', border: 'border-accent/20', barColor: 'bg-accent' },
];

const categories = ['All', 'Basics', 'Finance', 'E-Governance', 'Security', 'Entrepreneurship', 'Education'];

const CourseCard = React.forwardRef(({ course }, ref) => {
  const isCompleted = course.progress === 100;
  const inProgress = course.progress > 0 && course.progress < 100;

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-2xl shadow-sm border ${course.border} p-6 flex flex-col h-full hover:shadow-xl transition-all focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent`}
    >
      <div className="flex justify-between items-start mb-4 gap-2">
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${course.bg} ${course.color} whitespace-nowrap`}>
          {course.category}
        </span>
        {isCompleted && (
          <span className="flex items-center gap-1 text-xs font-bold text-secondary bg-secondary/10 px-2 py-1 rounded-md">
            <CheckCircle2 size={14} /> Completed
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold text-text leading-tight mb-3">{course.title}</h3>
      <p className="text-gray-600 text-sm mb-6 flex-1 leading-relaxed font-medium">
        {course.description}
      </p>

      {/* Meta Info */}
      <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-500 font-medium bg-gray-50 border border-gray-100 p-4 rounded-xl">
        <div className="flex items-center gap-2">
          <Clock size={16} className={course.color} />
          {course.duration}
        </div>
        <div className="flex items-center gap-2">
          <BarChart size={16} className={course.color} />
          {course.level}
        </div>
        <div className="flex items-center gap-2 col-span-2">
          <User size={16} className={course.color} />
          <span>Trainer: <span className="text-text">{course.trainer}</span></span>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Course Progress</span>
          <span className="text-sm font-black text-text">{course.progress}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden shadow-inner" aria-hidden="true">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: `${course.progress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className={`h-full rounded-full ${course.progress > 0 ? course.barColor : 'bg-transparent'}`}
          />
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-auto">
        {isCompleted ? (
          <button className="w-full bg-secondary/10 hover:bg-secondary/20 text-secondary border border-transparent font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-secondary">
            <Award size={18} /> View Certificate
          </button>
        ) : inProgress ? (
          <button className="w-full bg-accent/10 hover:bg-accent/20 text-accent border border-transparent font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-accent">
            <PlayCircle size={18} /> Resume Learning
          </button>
        ) : (
          <button className="w-full bg-primary hover:bg-[#0c3d6a] text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
            <BookOpen size={18} /> Enroll Now
          </button>
        )}
      </div>
    </motion.div>
  );
});

const TrainingModules = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredCourses = useMemo(() => {
    return coursesData.filter(course => activeCategory === 'All' || course.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="py-8 bg-bg min-h-[600px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                activeCategory === cat 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="col-span-full py-24 text-center"
              >
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-gray-400 border border-gray-200 shadow-sm">
                  <Search size={32} />
                </div>
                <h3 className="text-2xl font-extrabold text-text mb-2">No courses found</h3>
                <p className="text-gray-500 font-medium text-lg">There are currently no courses under this category.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default TrainingModules;
