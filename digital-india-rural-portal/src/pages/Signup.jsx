import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import SignupForm from '../components/auth/SignupForm';

export default function Signup() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-bg flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl bg-card rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row-reverse border border-border"
      >
        {/* Right Section - Illustration & Welcome (Reversed) */}
        <div className="w-full md:w-5/12 bg-secondary p-8 md:p-12 text-white flex flex-col justify-center relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 left-0 -ml-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-10"></div>
          <div className="absolute bottom-0 right-0 -mr-20 -mb-20 w-80 h-80 rounded-full bg-primary opacity-20"></div>
          
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm"
            >
              <Users size={32} className="text-white" />
            </motion.div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Join the Movement
            </h1>
            <p className="text-white/90 text-lg leading-relaxed max-w-sm">
              Create an account to access exclusive rural training programs, submit government scheme applications, and connect with local digital initiatives.
            </p>
          </div>
        </div>

        {/* Left Section - Signup Form */}
        <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center bg-white">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-text">Create an Account</h2>
              <p className="text-gray-500 mt-2">Fill in your details to get started.</p>
            </div>
            
            <SignupForm />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
