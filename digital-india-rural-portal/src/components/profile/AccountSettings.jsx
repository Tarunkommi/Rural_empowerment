import React, { useState } from 'react';
import { Settings, Bell, Globe, Moon, ShieldAlert, Trash2, AlertTriangle, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import userService from '../../services/userService';

export default function AccountSettings({ onLogout }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      const response = await userService.deleteAccount();
      if (response.success) {
        toast.success("Account deleted successfully");
        onLogout();
      }
    } catch (error) {
      toast.error(error.message || "Failed to delete account");
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  const SettingRow = ({ icon: Icon, title, description, action }) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-5 border-b border-border gap-4">
      <div className="flex gap-4">
        <div className="mt-1">
          <Icon className="w-5 h-5 text-gray-500" />
        </div>
        <div>
          <h4 className="text-base font-semibold text-gray-900">{title}</h4>
          <p className="text-sm text-gray-500 mt-0.5">{description}</p>
        </div>
      </div>
      <div>{action}</div>
    </div>
  );

  const ToggleSwitch = ({ defaultChecked }) => (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" defaultChecked={defaultChecked} className="sr-only peer" />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
    </label>
  );

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Settings className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
          <p className="text-gray-500 mt-1">Manage your preferences and account security.</p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Preferences</h3>
        <div className="bg-white rounded-xl border border-border px-5">
          <SettingRow 
            icon={Bell} 
            title="Email Notifications" 
            description="Receive updates about schemes and training."
            action={<ToggleSwitch defaultChecked={true} />}
          />
          <SettingRow 
            icon={Moon} 
            title="Dark Mode" 
            description="Switch to dark theme (Coming soon)."
            action={<ToggleSwitch defaultChecked={false} />}
          />
          <SettingRow 
            icon={Globe} 
            title="Language" 
            description="Select your preferred language."
            action={
              <select className="px-3 py-1.5 border border-border rounded-lg text-sm bg-bg outline-none focus:border-primary">
                <option value="en">English</option>
                <option value="hi">Hindi (हिंदी)</option>
                <option value="te">Telugu (తెలుగు)</option>
              </select>
            }
          />
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-bold text-error mb-2 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5" /> Danger Zone
        </h3>
        <div className="bg-error/5 rounded-xl border border-error/20 p-5">
          <h4 className="text-base font-semibold text-gray-900">Delete Account</h4>
          <p className="text-sm text-gray-600 mt-1 mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          
          {showConfirm ? (
            <div className="bg-white p-4 rounded-lg border border-error/20">
              <div className="flex items-start gap-3 mb-4">
                <AlertTriangle className="w-5 h-5 text-error mt-0.5" />
                <p className="text-sm text-gray-700 font-medium">Are you absolutely sure you want to permanently delete your account and all associated data?</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-error hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2 disabled:opacity-70"
                >
                  {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  Yes, Delete My Account
                </button>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => setShowConfirm(true)}
              className="px-4 py-2 border-2 border-error/20 text-error hover:bg-error hover:text-white text-sm font-medium rounded-lg transition-all duration-200"
            >
              Delete Account
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
