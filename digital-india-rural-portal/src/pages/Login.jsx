import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import LoginForm from '../components/auth/LoginForm';

export default function Login() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-bg flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl bg-card rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-border"
      >
        {/* Left Section - Illustration & Welcome */}
        <div className="w-full md:w-1/2 bg-primary p-8 md:p-12 text-white flex flex-col justify-center relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-5"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-secondary opacity-20"></div>
          
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm"
            >
              <ShieldCheck size={32} className="text-accent" />
            </motion.div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Welcome back to <span className="text-accent">Digital India</span>
            </h1>
            <p className="text-white/80 text-lg leading-relaxed max-w-md">
              Securely access your government schemes, digital literacy programs, and training modules designed to empower rural communities.
            </p>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-text">Sign In</h2>
              <p className="text-gray-500 mt-2">Please enter your credentials to access your account.</p>
            </div>
            
            <LoginForm />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
