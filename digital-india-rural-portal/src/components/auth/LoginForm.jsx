import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import authService from '../../services/authService';
import { useAuth } from '../../hooks/useAuth';
import PasswordInput from './PasswordInput';

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: 'onChange'
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const { loginContext } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await authService.login(data.email, data.password);
      
      if (response.success) {
        toast.success(response.message || 'Login Successful!');
        loginContext(response.user, response.token);
        
        // Wait a tiny bit for the toast to show and context to settle before redirecting
        setTimeout(() => {
          navigate('/');
        }, 500);
      }
    } catch (error) {
      // Axios error handling
      const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full max-w-md">
      
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

      <PasswordInput
        label="Password"
        id="password"
        placeholder="••••••••"
        error={errors.password}
        register={register('password', { 
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters'
          }
        })}
      />

      <div className="flex items-center justify-between mt-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="checkbox" 
            className="w-4 h-4 rounded text-primary focus:ring-primary border-border"
            {...register('rememberMe')}
          />
          <span className="text-sm text-gray-600">Remember me</span>
        </label>
        <Link to="/forgot-password" className="text-sm text-primary hover:underline font-medium">
          Forgot Password?
        </Link>
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
            Signing In...
          </>
        ) : (
          'Sign In'
        )}
      </button>

      <div className="text-center mt-4 text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to="/register" className="text-primary hover:underline font-medium">
          Create an account
        </Link>
      </div>
    </form>
  );
}
