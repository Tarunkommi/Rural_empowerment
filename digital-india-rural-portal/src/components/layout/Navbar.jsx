import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, AlertTriangle, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import ProfileDropdown from '../navbar/ProfileDropdown';
import NotificationBell from '../navbar/NotificationBell';
import UserAvatar from '../navbar/UserAvatar';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Digital Literacy', path: '/digital-literacy' },
  { name: 'Internet Access', path: '/internet-access' },
  { name: 'Government Schemes', path: '/government-schemes' },
  { name: 'Training', path: '/training' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  // Handle scroll effect for sticky nav
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock body scroll when mobile menu or modal is open
  useEffect(() => {
    if (isOpen || showLogoutConfirm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, showLogoutConfirm]);

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    setIsOpen(false);
    logout();
    navigate('/login');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 backdrop-blur-sm py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logos Section */}
            <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
              <img src="/logo.png" alt="Digital India Logo" className="h-10 w-10 object-contain" />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-primary leading-tight">Digital India</span>
                <span className="text-xs text-secondary font-medium tracking-wide">for Rural Empowerment</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-1 2xl:gap-3" aria-label="Main Navigation">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative px-3 py-2 rounded-md text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      isActive ? 'text-primary' : 'text-text hover:text-primary'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.name}
                      {isActive && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                          initial={false}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Auth Section (Desktop) */}
            <div className="hidden xl:flex items-center gap-4 pl-4">
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <NotificationBell count={3} />
                  <div className="h-6 w-px bg-gray-200"></div>
                  <ProfileDropdown onLogout={() => setShowLogoutConfirm(true)} />
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="text-primary hover:text-secondary font-bold text-sm transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-accent text-white px-5 py-2 rounded-md font-bold text-sm shadow-sm hover:bg-[#c97519] transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex xl:hidden items-center gap-4">
              {isAuthenticated && (
                <NotificationBell count={3} />
              )}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-primary hover:text-secondary focus:outline-none focus:ring-2 focus:ring-primary rounded-md p-1 transition-colors"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: '100vh' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="xl:hidden bg-white border-t border-gray-100 overflow-y-auto fixed top-[72px] left-0 right-0 bottom-0"
            >
              <div className="px-4 pt-4 pb-20 space-y-2">
                {/* Mobile User Profile Summary */}
                {isAuthenticated && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <UserAvatar user={user} size="md" />
                      <div>
                        <p className="font-bold text-gray-900">{user?.name}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                    <Link to="/profile" onClick={() => setIsOpen(false)} className="text-primary text-sm font-medium">
                      View
                    </Link>
                  </div>
                )}

                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                        isActive
                          ? 'bg-primary/10 text-primary border-l-4 border-primary'
                          : 'text-text hover:bg-gray-50 hover:text-primary border-l-4 border-transparent'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
                
                <div className="pt-6 px-4 mt-6 border-t border-gray-100">
                  {isAuthenticated ? (
                    <div className="flex flex-col gap-4">
                      <button 
                        onClick={() => setShowLogoutConfirm(true)}
                        className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-error px-4 py-4 rounded-lg font-bold transition-colors text-lg"
                      >
                        <LogOut size={20} /> Logout
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Link 
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="w-full bg-primary/10 text-primary hover:bg-primary/20 flex items-center justify-center px-4 py-4 rounded-lg font-bold transition-colors text-lg"
                      >
                        Sign In
                      </Link>
                      <Link 
                        to="/register"
                        onClick={() => setIsOpen(false)}
                        className="w-full bg-accent text-white flex items-center justify-center px-4 py-4 rounded-lg font-bold shadow-md hover:bg-[#c97519] transition-colors text-lg"
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowLogoutConfirm(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden"
            >
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LogOut className="w-8 h-8 text-error" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to leave?</h3>
                <p className="text-gray-500 text-sm">
                  You are about to log out of your account. You will need to enter your credentials to log back in.
                </p>
              </div>
              <div className="flex border-t border-gray-100">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 px-4 py-4 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <div className="w-px bg-gray-100"></div>
                <button
                  onClick={confirmLogout}
                  className="flex-1 px-4 py-4 text-error font-bold hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
