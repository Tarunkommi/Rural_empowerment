import React from 'react';
import { motion } from 'framer-motion';
import { KeyRound } from 'lucide-react';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';

export default function ForgotPassword() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-bg flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-card rounded-2xl shadow-xl overflow-hidden border border-border"
      >
        <div className="p-8 flex flex-col items-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <KeyRound size={32} className="text-primary" />
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-text">Forgot Password?</h2>
            <p className="text-gray-500 mt-2">No worries, we'll send you reset instructions.</p>
          </div>
          
          <ForgotPasswordForm />
        </div>
      </motion.div>
    </div>
  );
}
