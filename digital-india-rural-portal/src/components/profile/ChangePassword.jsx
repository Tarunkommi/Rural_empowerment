import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, KeyRound } from 'lucide-react';
import { toast } from 'react-toastify';
import userService from '../../services/userService';

export default function ChangePassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const response = await userService.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      if (response.success) {
        toast.success('Password changed successfully');
        reset();
      }
    } catch (error) {
      toast.error(error.message || 'Failed to change password');
    } finally {
      setIsSubmitting(false);
    }
  };

  const InputField = ({ label, id, type = 'password', register, validation, error }) => (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>
      <input
        id={id}
        type={type}
        className={`w-full px-4 py-2.5 rounded-xl border ${error ? 'border-error bg-error/5 focus:ring-error' : 'border-gray-300 focus:border-primary focus:ring-primary'} outline-none focus:ring-2 focus:ring-opacity-20 transition-all duration-200`}
        {...register(id, validation)}
      />
      {error && <p className="text-xs text-error font-medium">{error.message}</p>}
    </div>
  );

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <KeyRound className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Change Password</h2>
          <p className="text-gray-500 mt-1">Ensure your account is using a long, random password to stay secure.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        <InputField 
          label="Current Password" 
          id="currentPassword" 
          register={register} 
          error={errors.currentPassword}
          validation={{ required: 'Current password is required' }}
        />
        
        <InputField 
          label="New Password" 
          id="newPassword" 
          register={register} 
          error={errors.newPassword}
          validation={{ 
            required: 'New password is required',
            minLength: { value: 8, message: 'Password must be at least 8 characters long' },
            pattern: { 
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
              message: 'Must include uppercase, lowercase, number and special character' 
            }
          }}
        />

        <InputField 
          label="Confirm New Password" 
          id="confirmPassword" 
          register={register} 
          error={errors.confirmPassword}
          validation={{ 
            required: 'Please confirm your new password',
            validate: (value) => value === watch('newPassword') || 'Passwords do not match'
          }}
        />

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-blue-800 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
}
