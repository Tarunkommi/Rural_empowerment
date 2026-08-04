import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Globe, Mail, FileText, IndianRupee, FileKey, Fingerprint, ShieldAlert, ArrowRight } from 'lucide-react';

const literacyModules = [
  { id: 1, title: 'Smartphone Basics', desc: 'Learn how to operate an Android/iOS smartphone, manage settings, and install apps.', icon: Smartphone, progress: 100, color: 'text-primary', bg: 'bg-primary/10', bar: 'bg-primary' },
  { id: 2, title: 'Internet Browsing', desc: 'Search the web safely, identify reliable information, and bookmark important pages.', icon: Globe, progress: 75, color: 'text-secondary', bg: 'bg-secondary/10', bar: 'bg-secondary' },
  { id: 3, title: 'Email Usage', desc: 'Create an email ID, send messages, attach files, and manage your communications.', icon: Mail, progress: 40, color: 'text-accent', bg: 'bg-accent/10', bar: 'bg-accent' },
  { id: 4, title: 'Online Forms', desc: 'Learn to confidently fill out and submit government and private forms online.', icon: FileText, progress: 10, color: 'text-primary', bg: 'bg-primary/10', bar: 'bg-primary' },
  { id: 5, title: 'UPI Payments', desc: 'Send and receive money securely using UPI apps like BHIM, PhonePe, or GPay.', icon: IndianRupee, progress: 0, color: 'text-secondary', bg: 'bg-secondary/10', bar: 'bg-secondary' },
  { id: 6, title: 'DigiLocker', desc: 'Store, access, and verify your official documents digitally in one secure place.', icon: FileKey, progress: 0, color: 'text-accent', bg: 'bg-accent/10', bar: 'bg-accent' },
  { id: 7, title: 'Aadhaar Services', desc: 'Update demographic details and download your Aadhaar card online effortlessly.', icon: Fingerprint, progress: 0, color: 'text-primary', bg: 'bg-primary/10', bar: 'bg-primary' },
  { id: 8, title: 'Cyber Safety', desc: 'Protect yourself from online frauds, phishing, and keep your data private.', icon: ShieldAlert, progress: 0, color: 'text-secondary', bg: 'bg-secondary/10', bar: 'bg-secondary' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const LiteracyPrograms = () => {
  return (
    <section className="py-20 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold text-text mb-4"
          >
            Essential <span className="text-primary">Digital Literacy</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 font-medium"
          >
            Master the fundamental skills needed to navigate the digital world confidently and securely. Pick a module to begin.
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {literacyModules.map((module) => {
            const Icon = module.icon;
            return (
              <motion.div
                key={module.id}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col h-full focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 transition-all hover:shadow-xl group"
              >
                <div className="p-6 flex-1 flex flex-col">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl ${module.bg} ${module.color} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={28} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-text mb-3">{module.title}</h3>
                  <p className="text-gray-600 mb-8 flex-1 text-sm leading-relaxed">{module.desc}</p>
                  
                  {/* Progress Indicator */}
                  <div className="mt-auto pt-5 border-t border-gray-50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Progress</span>
                      <span className="text-sm font-black text-text">{module.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5 mb-5 overflow-hidden shadow-inner" aria-hidden="true">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${module.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                        className={`h-full rounded-full ${module.bar}`}
                      />
                    </div>

                    {/* Learn More Button */}
                    <a 
                      href={`#module-${module.id}`}
                      className={`inline-flex items-center gap-2 text-sm font-bold ${module.color} hover:opacity-80 transition-opacity outline-none focus-visible:underline`}
                      aria-label={`Learn more about ${module.title}`}
                    >
                      Start Learning <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default LiteracyPrograms;
