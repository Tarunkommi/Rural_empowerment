import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, ArrowLeft, Save } from 'lucide-react';
import { toast } from 'react-toastify';
import userService from '../../services/userService';

export default function EditProfileForm({ user, onSuccess, onCancel }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Format date for the input field (YYYY-MM-DD)
  const formattedDate = user?.dateOfBirth 
    ? new Date(user.dateOfBirth).toISOString().split('T')[0] 
    : '';

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: user?.name || '',
      phone: user?.phone || '',
      gender: user?.gender || '',
      dateOfBirth: formattedDate,
      occupation: user?.occupation || '',
      educationLevel: user?.educationLevel || '',
      address: user?.address || '',
      village: user?.village || '',
      district: user?.district || '',
      state: user?.state || '',
      pincode: user?.pincode || '',
    }
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      // Clean up empty strings to avoid validation issues on backend
      const cleanData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== ''));
      
      const response = await userService.updateProfile(cleanData);
      if (response.success) {
        toast.success('Profile updated successfully');
        onSuccess();
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const InputField = ({ label, id, type = 'text', register, validation, error, placeholder }) => (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 rounded-xl border ${error ? 'border-error bg-error/5 focus:ring-error' : 'border-gray-300 focus:border-primary focus:ring-primary'} outline-none focus:ring-2 focus:ring-opacity-20 transition-all duration-200`}
        {...register(id, validation)}
      />
      {error && <p className="text-xs text-error font-medium">{error.message}</p>}
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
          <p className="text-gray-500 mt-1">Update your personal and contact details.</p>
        </div>
        <button
          onClick={onCancel}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* Basic Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900 border-b border-border pb-2">Basic Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField 
              label="Full Name" 
              id="name" 
              register={register} 
              error={errors.name}
              validation={{ required: 'Name is required' }}
            />
            <InputField 
              label="Mobile Number" 
              id="phone" 
              register={register} 
              error={errors.phone}
              validation={{ 
                required: 'Phone number is required',
                pattern: { value: /^[6-9]\d{9}$/, message: 'Valid 10-digit phone required' }
              }}
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Gender</label>
              <select 
                {...register('gender')}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 outline-none transition-all duration-200 bg-white"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
            <InputField 
              label="Date of Birth" 
              id="dateOfBirth" 
              type="date"
              register={register} 
              error={errors.dateOfBirth}
            />
            <InputField 
              label="Occupation" 
              id="occupation" 
              register={register} 
              error={errors.occupation}
              placeholder="e.g. Farmer, Student, Teacher"
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Education Level</label>
              <select 
                {...register('educationLevel')}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 outline-none transition-all duration-200 bg-white"
              >
                <option value="">Select Education</option>
                <option value="Primary">Primary Education</option>
                <option value="Secondary">Secondary Education (10th)</option>
                <option value="Higher Secondary">Higher Secondary (12th)</option>
                <option value="Graduate">Graduate</option>
                <option value="Post Graduate">Post Graduate</option>
                <option value="None">None</option>
              </select>
            </div>
          </div>
        </div>

        {/* Address Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900 border-b border-border pb-2">Address Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <InputField 
                label="Full Address (House No, Street)" 
                id="address" 
                register={register} 
                error={errors.address}
                placeholder="e.g. 123 Main Street"
              />
            </div>
            <InputField 
              label="Village / City" 
              id="village" 
              register={register} 
              error={errors.village}
            />
            <InputField 
              label="District" 
              id="district" 
              register={register} 
              error={errors.district}
            />
            <InputField 
              label="State" 
              id="state" 
              register={register} 
              error={errors.state}
            />
            <InputField 
              label="PIN Code" 
              id="pincode" 
              register={register} 
              error={errors.pincode}
              validation={{
                pattern: { value: /^[1-9][0-9]{5}$/, message: 'Valid 6-digit PIN required' }
              }}
            />
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-border gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 rounded-xl text-gray-700 font-medium hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-blue-800 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
