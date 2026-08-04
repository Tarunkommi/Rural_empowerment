import React, { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import authService from '../../services/authService';
import PasswordInput from './PasswordInput';
import PasswordStrength from './PasswordStrength';

export default function ResetPasswordForm() {
  const { token } = useParams();
  const navigate = useNavigate();
  
  const { register, handleSubmit, control, formState: { errors, isValid } } = useForm({
    mode: 'onChange'
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const password = useWatch({
    control,
    name: 'password',
    defaultValue: ''
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await authService.resetPassword(token, data.password);
      if (response.success) {
        toast.success('Password successfully reset! Please sign in with your new password.');
        setTimeout(() => {
          navigate('/login');
        }, 2500);
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to reset password. The link may have expired.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-md">
      
      <div className="w-full">
        <PasswordInput
          label="New Password"
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
        label="Confirm New Password"
        id="confirmPassword"
        placeholder="••••••••"
        error={errors.confirmPassword}
        register={register('confirmPassword', { 
          required: 'Please confirm your password',
          validate: value => value === password || 'Passwords do not match'
        })}
      />

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
            Resetting...
          </>
        ) : (
          'Reset Password'
        )}
      </button>
    </form>
  );
}
