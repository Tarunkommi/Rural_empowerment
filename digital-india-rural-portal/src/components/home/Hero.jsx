import React from 'react';
import { motion } from 'framer-motion';
import { Search, Wifi, BookOpen, Laptop, ShieldCheck, Landmark } from 'lucide-react';

const FloatingIcon = ({ icon: Icon, delay, className, size = 48 }) => (
  <motion.div
    animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay }}
    className={`absolute opacity-10 text-primary ${className}`}
  >
    <Icon size={size} />
  </motion.div>
);

const Hero = () => {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden bg-bg">
      {/* Background Gradients & Floating Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-24 w-[30rem] h-[30rem] bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
        
        <FloatingIcon icon={Wifi} delay={0} className="top-20 left-10" />
        <FloatingIcon icon={BookOpen} delay={1.5} className="bottom-40 left-1/4" />
        <FloatingIcon icon={Laptop} delay={3} className="top-40 right-1/4" size={64} />
        <FloatingIcon icon={Landmark} delay={2} className="bottom-20 right-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-16 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary font-bold text-sm shadow-sm border border-secondary/20">
                <ShieldCheck size={18} />
                <span>An Initiative of Government of India</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-text leading-[1.15]">
                Empowering Rural India Through <span className="text-primary block mt-2">Digital Inclusion</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed font-medium">
                Bridging the digital divide with internet access, essential tech skills, and targeted government schemes for rural empowerment.
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full max-w-lg bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-2 flex items-center focus-within:ring-2 focus-within:ring-primary/50 transition-all"
            >
              <input
                type="text"
                placeholder="Search resources, schemes, courses..."
                className="w-full px-5 py-3 outline-none text-text bg-transparent placeholder-gray-400 font-medium text-lg"
                aria-label="Search portal"
              />
              <button 
                className="bg-primary text-white p-4 rounded-xl hover:bg-[#0c3d6a] transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary flex items-center justify-center"
                aria-label="Submit search"
              >
                <Search size={24} />
              </button>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-accent text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent text-lg"
              >
                Explore Programs
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white text-primary border-2 border-primary/20 px-8 py-4 rounded-xl font-bold shadow-md hover:border-primary hover:bg-primary/5 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary text-lg"
              >
                Learn Digital Skills
              </motion.button>
            </motion.div>
          </div>

          {/* Right Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:flex justify-center items-center w-full h-[600px]"
          >
            {/* Composition of UI elements mimicking a modern illustration */}
            <div className="relative w-full h-full max-w-lg">
              {/* Main Image/Card Placeholder */}
              <motion.div 
                animate={{ y: [-15, 15, -15] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 m-auto w-80 h-96 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col z-20"
              >
                <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center text-primary relative overflow-hidden">
                  <Laptop size={80} strokeWidth={1.5} className="relative z-10" />
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
                </div>
                <div className="p-8 space-y-5 flex-1 bg-white flex flex-col">
                  <div className="h-5 w-3/4 bg-gray-100 rounded-full"></div>
                  <div className="h-5 w-1/2 bg-gray-100 rounded-full"></div>
                  <div className="mt-auto h-12 w-full bg-secondary/10 text-secondary rounded-xl flex items-center justify-center font-extrabold text-base border border-secondary/20">
                    Access Granted
                  </div>
                </div>
              </motion.div>

              {/* Floating Stat Card 1 */}
              <motion.div 
                animate={{ y: [12, -12, 12] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-20 -left-16 w-56 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 z-30 flex items-center gap-4"
              >
                <div className="w-14 h-14 bg-accent/20 rounded-full flex items-center justify-center text-accent shrink-0">
                  <BookOpen size={28} />
                </div>
                <div>
                  <div className="text-2xl font-black text-text">500+</div>
                  <div className="text-sm text-gray-500 font-semibold">Free Courses</div>
                </div>
              </motion.div>

              {/* Floating Stat Card 2 */}
              <motion.div 
                animate={{ y: [-18, 18, -18] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute bottom-24 -right-12 w-64 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 z-30 flex items-center gap-4"
              >
                <div className="w-14 h-14 bg-secondary/20 rounded-full flex items-center justify-center text-secondary shrink-0">
                  <Wifi size={28} />
                </div>
                <div>
                  <div className="text-2xl font-black text-text">10,000+</div>
                  <div className="text-sm text-gray-500 font-semibold">Villages Connected</div>
                </div>
              </motion.div>
              
              {/* Background accent ring */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border-[3px] border-dashed border-primary/20 rounded-full animate-[spin_100s_linear_infinite] z-10"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border-[2px] border-dashed border-accent/20 rounded-full animate-[spin_80s_linear_infinite_reverse] z-10"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
