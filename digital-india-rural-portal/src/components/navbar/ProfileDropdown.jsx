import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  GraduationCap, 
  Bookmark, 
  Award, 
  Bell, 
  Settings, 
  KeyRound, 
  LogOut,
  ChevronDown
} from 'lucide-react';
import UserAvatar from './UserAvatar';
import { useAuth } from '../../hooks/useAuth';

const ProfileDropdown = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useAuth();

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    // Keyboard navigation (Escape to close)
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const menuItems = [
    { icon: User, label: 'My Profile', path: '/profile' },
    { icon: GraduationCap, label: 'My Training Programs', path: '/profile' },
    { icon: Bookmark, label: 'Saved Government Schemes', path: '/profile' },
    { icon: Award, label: 'Certificates', path: '/profile' },
    { icon: Bell, label: 'Notifications', path: '/profile' },
    { divider: true },
    { icon: Settings, label: 'Account Settings', path: '/profile' },
    { icon: KeyRound, label: 'Change Password', path: '/profile' },
  ];

  const getRoleBadge = (role) => {
    if (role === 'admin') return <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Admin</span>;
    if (role === 'trainer') return <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Trainer</span>;
    return null;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <UserAvatar user={user} size="sm" />
        <span className="text-sm font-medium text-gray-700 hidden sm:block max-w-[120px] truncate">
          {user?.name?.split(' ')[0]}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 hidden sm:block ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 py-2 z-50 origin-top-right"
          >
            {/* Header / User Info */}
            <div className="px-4 py-3 border-b border-gray-100 mb-2">
              <div className="flex items-center gap-3">
                <UserAvatar user={user} size="md" />
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 truncate">{user?.name}</span>
                    {getRoleBadge(user?.role)}
                  </div>
                  <span className="text-sm text-gray-500 truncate">{user?.email}</span>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="px-2">
              {menuItems.map((item, index) => (
                item.divider ? (
                  <div key={`divider-${index}`} className="h-px bg-gray-100 my-2 mx-2" />
                ) : (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={closeDropdown}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 hover:text-primary transition-colors w-full text-left"
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )
              ))}

              <div className="h-px bg-gray-100 my-2 mx-2" />
              
              <button
                onClick={() => {
                  closeDropdown();
                  onLogout();
                }}
                className="flex items-center gap-3 px-3 py-2 text-sm text-error rounded-lg hover:bg-error/5 transition-colors w-full text-left font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropdown;
