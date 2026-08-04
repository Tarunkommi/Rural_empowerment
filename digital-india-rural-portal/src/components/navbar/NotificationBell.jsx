import React from 'react';
import { Bell } from 'lucide-react';
import { motion } from 'framer-motion';

const NotificationBell = ({ count = 0 }) => {
  return (
    <button className="relative p-2 text-gray-500 hover:text-primary transition-colors focus:outline-none rounded-full hover:bg-gray-50">
      <Bell className="w-6 h-6" />
      {count > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-1 right-1.5 w-4 h-4 bg-error text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white"
        >
          {count > 99 ? '99+' : count}
        </motion.span>
      )}
    </button>
  );
};

export default NotificationBell;
