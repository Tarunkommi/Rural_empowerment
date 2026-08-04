import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TrendingUp } from 'lucide-react';

const AnimatedNumber = ({ value }) => {
  // Extract number and text parts (e.g. "1.5M+" -> num: 1.5, suffix: "M+")
  const match = String(value).match(/([\d.]+)(.*)/);
  const targetNum = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : String(value);

  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = targetNum;
      const duration = 2000;
      let startTimestamp = null;

      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCount(progress * end);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(end);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, targetNum]);

  // Format to 1 decimal place if it has decimals, else integer
  const displayNum = targetNum % 1 !== 0 ? count.toFixed(1) : Math.floor(count);

  return (
    <span ref={ref}>
      {targetNum > 0 ? displayNum : ''}{suffix}
    </span>
  );
};

const StatisticsSection = ({ statistics }) => {
  if (!statistics || Object.keys(statistics).length === 0) return null;

  const standardStats = [
    { label: 'Beneficiaries', value: statistics.beneficiaries },
    { label: 'Villages Covered', value: statistics.villagesCovered },
    { label: 'States Covered', value: statistics.statesCovered },
    { label: 'Training Centers', value: statistics.trainingCenters },
  ].filter(stat => stat.value);

  const customStats = statistics.customStats || [];
  const allStats = [...standardStats, ...customStats];

  if (allStats.length === 0) return null;

  return (
    <div className="bg-[#0F4C81] text-white rounded-2xl shadow-lg p-10 mb-10 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute -right-20 -top-20 opacity-10">
        <TrendingUp className="w-64 h-64" />
      </div>

      <div className="relative z-10 text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Scheme Impact</h2>
        <p className="text-blue-200">Real numbers making a real difference</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
        {allStats.map((stat, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
          >
            <div className="text-3xl md:text-4xl font-extrabold text-[#F4A300] mb-2 drop-shadow-md">
              <AnimatedNumber value={stat.value} />
            </div>
            <div className="text-sm font-semibold text-blue-100 uppercase tracking-wide">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StatisticsSection;
