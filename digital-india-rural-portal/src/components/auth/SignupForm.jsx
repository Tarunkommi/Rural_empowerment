import React, { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import authService from '../../services/authService';
import PasswordInput from './PasswordInput';
import PasswordStrength from './PasswordStrength';

export default function SignupForm() {
  const { register, handleSubmit, control, formState: { errors, isValid } } = useForm({
    mode: 'onChange'
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  // Watch password field to feed into strength indicator
  const password = useWatch({
    control,
    name: 'password',
    defaultValue: ''
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await authService.register(data.name, data.email, data.phone, data.password);
      
      if (response.success) {
        toast.success(response.message || 'Registration Successful! Please login.');
        
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-md">
      
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="name" className="text-sm font-medium text-text">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="John Doe"
          className={`w-full px-4 py-2 border rounded-md outline-none transition-colors ${
            errors.name
              ? 'border-error focus:ring-1 focus:ring-error focus:border-error'
              : 'border-border focus:ring-1 focus:ring-primary focus:border-primary'
          } bg-white text-text`}
          {...register('name', { required: 'Full Name is required' })}
        />
        {errors.name && <span className="text-sm text-error mt-1">{errors.name.message}</span>}
      </div>

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

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="phone" className="text-sm font-medium text-text">
          Mobile Number
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="9876543210"
          className={`w-full px-4 py-2 border rounded-md outline-none transition-colors ${
            errors.phone
              ? 'border-error focus:ring-1 focus:ring-error focus:border-error'
              : 'border-border focus:ring-1 focus:ring-primary focus:border-primary'
          } bg-white text-text`}
          {...register('phone', { 
            required: 'Mobile Number is required',
            pattern: {
              value: /^[0-9]{10}$/,
              message: 'Please enter a valid 10-digit mobile number'
            }
          })}
        />
        {errors.phone && <span className="text-sm text-error mt-1">{errors.phone.message}</span>}
      </div>

      <div className="w-full">
        <PasswordInput
          label="Password"
          id="password"
          placeholder="••••••••"
          error={errors.password}
          register={register('password', { 
            required: 'Password is required',
            validate: {
              length: v => v.length >= 8 || 'Minimum 8 characters',
              upper: v => /[A-Z]/.test(v) || 'Requires uppercase letter',
              lower: v => /[a-z]/.test(v) || 'Requires lowercase letter',
              number: v => /[0-9]/.test(v) || 'Requires number',
              special: v => /[^A-Za-z0-9]/.test(v) || 'Requires special character'
            }
          })}
        />
        <PasswordStrength password={password} />
      </div>

      <PasswordInput
        label="Confirm Password"
        id="confirmPassword"
        placeholder="••••••••"
        error={errors.confirmPassword}
        register={register('confirmPassword', { 
          required: 'Please confirm your password',
          validate: value => value === password || 'Passwords do not match'
        })}
      />

      <label className="flex items-start gap-2 cursor-pointer mt-2">
        <input 
          type="checkbox" 
          className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary border-border"
          {...register('acceptTerms', { required: 'You must accept the Terms & Conditions' })}
        />
        <span className="text-sm text-gray-600">
          I accept the <Link to="/terms" className="text-primary hover:underline">Terms & Conditions</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
        </span>
      </label>
      {errors.acceptTerms && <span className="text-sm text-error">{errors.acceptTerms.message}</span>}

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
            Creating Account...
          </>
        ) : (
          'Create Account'
        )}
      </button>

      <div className="text-center mt-2 text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-primary hover:underline font-medium">
          Sign In
        </Link>
      </div>
    </form>
  );
}
