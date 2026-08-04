import React, { useRef, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Users, Wifi, CreditCard, Building2, TrendingUp } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AnimatedCounter = ({ from = 0, to, duration = 2.5, suffix = '' }) => {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && nodeRef.current) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(value).toLocaleString('en-IN') + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, duration, isInView, suffix]);

  return <span ref={nodeRef}>{from}{suffix}</span>;
};

const kpis = [
  { id: 1, title: 'Villages Connected', to: 210000, suffix: '+', icon: Wifi, color: 'text-primary', bg: 'bg-primary/10' },
  { id: 2, title: 'Citizens Trained', to: 60, suffix: 'M+', icon: Users, color: 'text-secondary', bg: 'bg-secondary/10' },
  { id: 3, title: 'Digital Payments', to: 12, suffix: 'B+', icon: CreditCard, color: 'text-accent', bg: 'bg-accent/10' },
  { id: 4, title: 'Scheme Beneficiaries', to: 45, suffix: 'M+', icon: Building2, color: 'text-primary', bg: 'bg-primary/10' },
];

const barChartData = {
  labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
  datasets: [
    {
      label: 'Digital Payments (in Billions)',
      data: [2.5, 5.8, 11.2, 22.4, 45.6, 75.8],
      backgroundColor: '#0F4C81',
      borderRadius: 6,
    },
  ],
};

const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top', labels: { font: { family: "'Inter', sans-serif", weight: 'bold' } } },
    title: { display: false },
    tooltip: { backgroundColor: '#1F2937', padding: 12, titleFont: { size: 14 }, bodyFont: { size: 14 } }
  },
  scales: {
    y: { beginAtZero: true, grid: { color: '#f3f4f6' }, border: { display: false } },
    x: { grid: { display: false }, border: { display: false } }
  }
};

const doughnutData = {
  labels: ['Urban', 'Semi-Urban', 'Rural'],
  datasets: [
    {
      label: 'Internet Penetration %',
      data: [65, 45, 35],
      backgroundColor: ['#0F4C81', '#F4A300', '#2E8B57'],
      borderWidth: 0,
      hoverOffset: 4
    },
  ],
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom', labels: { padding: 20, font: { family: "'Inter', sans-serif", weight: 'bold' } } },
    tooltip: { backgroundColor: '#1F2937', padding: 12 }
  },
  cutout: '72%',
};

const Statistics = () => {
  return (
    <section className="py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold text-text mb-4"
          >
            Empowering Through <span className="text-secondary">Numbers</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 font-medium"
          >
            Track the massive scale and impact of digital initiatives transforming rural India today.
          </motion.p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
          {kpis.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <motion.div
                key={kpi.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group"
              >
                <div className={`w-14 h-14 rounded-2xl ${kpi.bg} ${kpi.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  <Icon size={28} />
                </div>
                <div className="text-4xl font-black text-text mb-2 tracking-tight">
                  <AnimatedCounter to={kpi.to} suffix={kpi.suffix} />
                </div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  {kpi.title}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bar Chart */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-primary/10 rounded-lg">
                 <TrendingUp className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold text-text">Digital Payment Adoption (YoY)</h3>
            </div>
            <div className="h-80 w-full">
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          </motion.div>

          {/* Doughnut Chart */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-secondary/10 rounded-lg">
                 <Wifi className="text-secondary" size={24} />
              </div>
              <h3 className="text-xl font-bold text-text">Internet Penetration</h3>
            </div>
            <div className="flex-1 relative flex items-center justify-center min-h-[250px]">
              <div className="absolute inset-0 pb-10">
                 <Doughnut data={doughnutData} options={doughnutOptions} />
              </div>
              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-12">
                 <span className="text-4xl font-black text-text">48%</span>
                 <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">Avg</span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Statistics;
