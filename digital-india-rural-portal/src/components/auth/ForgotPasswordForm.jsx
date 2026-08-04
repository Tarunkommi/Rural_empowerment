import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import authService from '../../services/authService';

export default function ForgotPasswordForm() {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: 'onChange'
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await authService.forgotPassword(data.email);
      if (response.success) {
        setIsSent(true);
        toast.success('Password reset email sent successfully!');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to send reset email.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <div className="flex flex-col items-center text-center w-full max-w-md">
        <div className="w-16 h-16 bg-green-100 text-success rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-text mb-2">Check your email</h3>
        <p className="text-gray-500 mb-6">We've sent a password reset link to your email address. It will expire in 10 minutes.</p>
        <Link to="/login" className="text-primary font-medium hover:underline">
          Return to login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-md">
      
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="email" className="text-sm font-medium text-text">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          className={`w-full px-4 py-2 border rounded-md outline-none transition-colors ${
            errors.email
              ? 'border-error focus:ring-1 focus:ring-error focus:border-error'
              : 'border-border focus:ring-1 focus:ring-primary focus:border-primary'
          } bg-white text-text`}
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: 'Please enter a valid email address'
            }
          })}
        />
        {errors.email && <span className="text-sm text-error mt-1">{errors.email.message}</span>}
      </div>

      <button
        type="submit"
        disabled={!isValid || isLoading}
        className={`mt-4 w-full py-2.5 rounded-md text-white font-semibold shadow-sm transition-all flex justify-center items-center gap-2
          ${!isValid || isLoading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-primary hover:bg-[#0c3c66] hover:shadow-md'
          }`}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </>
        ) : (
          'Send Reset Link'
        )}
      </button>

      <div className="text-center mt-2 text-sm text-gray-600">
        Remember your password?{' '}
        <Link to="/login" className="text-primary hover:underline font-medium">
          Sign In
        </Link>
      </div>
    </form>
  );
}
