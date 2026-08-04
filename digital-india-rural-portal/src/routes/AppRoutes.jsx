import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Home from '../pages/Home';
import DigitalLiteracy from '../pages/DigitalLiteracy';
import InternetAccess from '../pages/InternetAccess';
import Schemes from '../pages/Schemes';
import GovernmentSchemes from '../pages/GovernmentSchemes';
import SchemeDetails from '../pages/SchemeDetails';
import Training from '../pages/Training';
import Blogs from '../pages/Blogs';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Profile from '../pages/Profile';
import ProtectedRoute from '../components/auth/ProtectedRoute';

export default function AppRoutes() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Navbar />
      
      <main className="pt-16 min-h-screen bg-bg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/digital-literacy" element={<DigitalLiteracy />} />
          <Route path="/internet-access" element={<InternetAccess />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/government-schemes" element={<GovernmentSchemes />} />
          <Route path="/government-schemes/:slug" element={<SchemeDetails />} />
          <Route path="/training" element={<Training />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Protected Routes */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center min-h-[60vh] flex flex-col justify-center">
              <h1 className="text-4xl font-extrabold text-primary mb-4">404 - Page Not Found</h1>
              <p className="text-gray-600 font-medium text-lg">The page you are looking for is currently under construction or doesn't exist.</p>
            </div>
          } />
        </Routes>
      </main>

      <Footer />
      
      {/* Global Toast Notifications */}
      <ToastContainer />
    </BrowserRouter>
  );
}
