import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import userService from '../services/userService';
import { toast } from 'react-toastify';

import ProfileSidebar from '../components/profile/ProfileSidebar';
import ProfileHeader from '../components/profile/ProfileHeader';
import PersonalInformation from '../components/profile/PersonalInformation';
import EditProfileForm from '../components/profile/EditProfileForm';
import ChangePassword from '../components/profile/ChangePassword';
import TrainingPrograms from '../components/profile/TrainingPrograms';
import SavedSchemes from '../components/profile/SavedSchemes';
import ActivityTimeline from '../components/profile/ActivityTimeline';
import AccountSettings from '../components/profile/AccountSettings';

export default function Profile() {
  const { user, updateUserContext, logoutContext } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await userService.getProfile();
      if (response.success) {
        setProfileData(response.data);
        // Ensure global context is up to date
        updateUserContext(response.data);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      );
    }

    switch (activeTab) {
      case 'profile':
        return <PersonalInformation user={profileData} onEdit={() => setActiveTab('edit')} />;
      case 'edit':
        return <EditProfileForm user={profileData} onSuccess={() => { fetchProfile(); setActiveTab('profile'); }} onCancel={() => setActiveTab('profile')} />;
      case 'trainings':
        return <TrainingPrograms />;
      case 'schemes':
        return <SavedSchemes />;
      case 'activity':
        return <ActivityTimeline />;
      case 'password':
        return <ChangePassword />;
      case 'settings':
        return <AccountSettings onLogout={logoutContext} />;
      default:
        return <PersonalInformation user={profileData} onEdit={() => setActiveTab('edit')} />;
    }
  };

  return (
    <div className="bg-bg min-h-screen pb-12">
      {/* Cover and Header */}
      <ProfileHeader 
        user={profileData || user} 
        onUploadSuccess={fetchProfile}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-24 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={logoutContext} />
          </div>

          {/* Main Content Area */}
          <div className="lg:w-3/4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl shadow-sm border border-border p-6 sm:p-8"
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
