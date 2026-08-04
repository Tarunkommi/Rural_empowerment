import React, { useState, useRef } from 'react';
import { Camera, CheckCircle2, Loader2, X } from 'lucide-react';
import { toast } from 'react-toastify';
import userService from '../../services/userService';

export default function ProfileHeader({ user, onUploadSuccess }) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://ui-avatars.com/api/?name=User&background=0F4C81&color=fff';
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:5000${imagePath}`;
  };

  const calculateCompletion = () => {
    if (!user) return 0;
    const requiredFields = ['name', 'email', 'phone', 'gender', 'dateOfBirth', 'address', 'state'];
    let filled = 0;
    requiredFields.forEach(field => {
      if (user[field]) filled++;
    });
    return Math.round((filled / requiredFields.length) * 100);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      toast.error("File size should not exceed 2MB");
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('image', file);

      const response = await userService.uploadProfileImage(formData);
      if (response.success) {
        toast.success("Profile picture updated!");
        onUploadSuccess();
      }
    } catch (error) {
      toast.error(error.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
      // Reset input
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  if (!user) return null;

  const completion = calculateCompletion();

  return (
    <div className="bg-white border-b border-border">
      {/* Banner */}
      <div className="h-48 sm:h-64 bg-gradient-to-r from-primary to-blue-800 w-full relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 sm:-mt-24 gap-6 sm:gap-8">
          
          {/* Avatar container */}
          <div className="relative z-20 group">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white shadow-xl bg-white overflow-hidden relative">
              {isUploading ? (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                </div>
              ) : null}
              <img 
                src={getImageUrl(user.profileImage)} 
                alt={user.name} 
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name) + '&background=0F4C81&color=fff'; }}
              />
              
              {/* Hover Overlay for Upload */}
              <div 
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="w-8 h-8 text-white mb-1" />
                <span className="text-white text-xs font-medium">Update</span>
              </div>
            </div>
            
            {/* Hidden file input */}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleFileChange} 
            />
          </div>

          {/* User Info */}
          <div className="flex-1 text-center sm:text-left mb-2 z-20 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900 flex items-center justify-center sm:justify-start gap-2">
                  {user.name}
                  {user.isEmailVerified && (
                    <CheckCircle2 className="w-6 h-6 text-success fill-success/20" />
                  )}
                </h1>
                <p className="text-gray-600 mt-1 font-medium">{user.role === 'admin' ? 'Administrator' : 'Citizen'}</p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-6 mt-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5"><span className="text-gray-400">📧</span> {user.email}</span>
                  <span className="flex items-center gap-1.5"><span className="text-gray-400">📱</span> +91 {user.phone}</span>
                </div>
              </div>

              {/* Completion Widget */}
              <div className="bg-bg rounded-xl p-4 border border-border sm:max-w-[200px] w-full mx-auto sm:mx-0">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Profile Setup</span>
                  <span className="text-sm font-bold text-primary">{completion}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-1000" 
                    style={{ width: `${completion}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
