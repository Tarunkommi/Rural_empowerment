import React from 'react';
import { User, Edit3, GraduationCap, Bookmark, Activity, Lock, Settings, LogOut } from 'lucide-react';

export default function ProfileSidebar({ activeTab, setActiveTab, onLogout }) {
  const menuItems = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'edit', label: 'Edit Profile', icon: Edit3 },
    { id: 'trainings', label: 'My Training Programs', icon: GraduationCap },
    { id: 'schemes', label: 'Saved Government Schemes', icon: Bookmark },
    { id: 'activity', label: 'Activity History', icon: Activity },
    { id: 'password', label: 'Change Password', icon: Lock },
    { id: 'settings', label: 'Account Settings', icon: Settings },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-border p-4 sticky top-24">
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors duration-200 ${
                isActive
                  ? 'bg-primary text-white shadow-md'
                  : 'text-text hover:bg-bg hover:text-primary'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
              {item.label}
            </button>
          );
        })}

        <div className="pt-4 mt-4 border-t border-border">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-error hover:bg-error/10 transition-colors duration-200"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}
