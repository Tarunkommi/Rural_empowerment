import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, Signal, MonitorSmartphone, MapPin, Globe2, Activity } from 'lucide-react';

const accessTypes = [
  { id: 1, title: 'BharatNet Overview', desc: 'Connecting all 2.5 lakh Gram Panchayats in India through a high-speed optical fibre network backbone.', icon: Globe2, color: 'text-primary', bg: 'bg-primary/10' },
  { id: 2, title: 'Wi-Fi Hotspots', desc: 'Public Wi-Fi networks established in village hubs, allowing citizens affordable and reliable access to the web.', icon: Wifi, color: 'text-secondary', bg: 'bg-secondary/10' },
  { id: 3, title: 'Mobile Broadband', desc: '4G and upcoming 5G cellular network expansion to the most remote areas ensuring mobility and speed.', icon: Signal, color: 'text-accent', bg: 'bg-accent/10' },
  { id: 4, title: 'Public Internet Centers', desc: 'Common Service Centers (CSCs) providing digital e-governance services and assisted internet access.', icon: MonitorSmartphone, color: 'text-primary', bg: 'bg-primary/10' },
];

const stats = [
  { label: 'Optical Fibre Laid', value: '6.5L+', unit: 'km', color: 'text-primary' },
  { label: 'Active Wi-Fi Hotspots', value: '1.2L+', unit: 'Villages', color: 'text-secondary' },
  { label: 'Gram Panchayats Ready', value: '2.1L+', unit: 'Connected', color: 'text-accent' },
];

const MapNode = ({ x, y, delay, label }) => (
  <motion.div
    className="absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2"
    style={{ left: x, top: y }}
    initial={{ scale: 0, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay, type: "spring" }}
  >
    <div className="relative flex h-8 w-8 cursor-pointer group">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
      <span className="relative inline-flex rounded-full h-8 w-8 bg-secondary border-2 border-white text-white items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
        <MapPin size={16} />
      </span>
      {/* Tooltip */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-bold py-1 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none">
        {label}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-solid border-b-gray-900 border-b-4 border-x-transparent border-x-4 border-t-0"></div>
      </div>
    </div>
  </motion.div>
);

const InternetAccessPoints = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Coverage Statistics Section */}
        <div className="mb-24">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-text text-center mb-10 flex items-center justify-center gap-2"
          >
            <Activity size={28} className="text-primary" /> 
            Live Coverage Statistics
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="bg-bg p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow"
              >
                <div className={`text-5xl font-black ${stat.color} mb-2`}>{stat.value}</div>
                <div className="text-gray-500 font-bold uppercase tracking-wider text-sm mb-1">{stat.label}</div>
                <div className="text-gray-400 font-semibold text-xs">{stat.unit}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Connectivity Types */}
          <div className="space-y-6">
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-extrabold text-text mb-8"
            >
              How We Are Connecting <span className="text-secondary">Rural India</span>
            </motion.h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {accessTypes.map((type, idx) => {
                const Icon = type.icon;
                return (
                  <motion.div 
                    key={type.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-bg p-6 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-md transition-all group"
                  >
                    <div className={`w-12 h-12 rounded-xl ${type.bg} ${type.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon size={24} />
                    </div>
                    <h4 className="text-lg font-bold text-text mb-2">{type.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed font-medium">{type.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Right Column - Interactive India Map Infographic */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <div className="relative w-full h-[500px] bg-gradient-to-br from-bg to-gray-100 rounded-[2rem] border border-gray-200 shadow-inner overflow-hidden flex items-center justify-center">
              {/* Decorative grid background representing digital network */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(var(--color-primary) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              
              <div className="relative w-full max-w-sm h-full mx-auto">
                {/* Abstract shape representing a map container */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 bg-white/50 backdrop-blur-md border border-white/60 rounded-[3rem] shadow-2xl"></div>
                
                {/* SVG Connecting Lines */}
                <svg className="absolute inset-0 w-full h-full z-10 opacity-40">
                  <motion.path 
                    d="M150,150 L250,220 L200,350 L100,280 Z" 
                    fill="none" 
                    stroke="#2E8B57" 
                    strokeWidth="2" 
                    strokeDasharray="5,5" 
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                  <motion.path 
                    d="M250,220 L300,300" 
                    fill="none" 
                    stroke="#F4A300" 
                    strokeWidth="2" 
                    strokeDasharray="4,4" 
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 1 }}
                  />
                  <motion.path 
                    d="M150,150 L80,200" 
                    fill="none" 
                    stroke="#0F4C81" 
                    strokeWidth="2" 
                    strokeDasharray="4,4" 
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </svg>

                {/* Animated Map Nodes */}
                <MapNode x="150px" y="150px" delay={0.2} label="Northern Hub (Active)" />
                <MapNode x="250px" y="220px" delay={0.6} label="Central Hub (Active)" />
                <MapNode x="200px" y="350px" delay={1.0} label="Southern Hub (Active)" />
                <MapNode x="100px" y="280px" delay={1.4} label="Western Hub (Active)" />
                <MapNode x="300px" y="300px" delay={1.8} label="Eastern Hub (Deploying)" />
                <MapNode x="80px" y="200px" delay={2.2} label="NW Node (Active)" />

              </div>
              
              <div className="absolute bottom-6 left-0 right-0 text-center">
                <span className="inline-block px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-xs font-bold text-gray-500 border border-gray-200 shadow-sm">
                  Interactive Node Map • Hover points for details
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default InternetAccessPoints;
