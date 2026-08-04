import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Send, Map } from 'lucide-react';

const Contact = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  const onSubmit = async (data) => {
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Show success notification
    toast.success('Message sent successfully! Our team will contact you soon.', {
      position: "bottom-right",
      theme: "colored",
      style: { backgroundColor: '#2E8B57', color: 'white' }
    });
    
    // Reset form fields
    reset();
  };

  return (
    <div className="w-full overflow-x-hidden pt-12 pb-24 bg-bg min-h-screen">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-6">Contact Us</h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
          Have a question about our rural empowerment programs? We're here to help. Reach out to us through the form or visit our regional offices.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left Column - Contact Info & Map */}
          <div className="w-full lg:w-2/5 bg-primary p-10 lg:p-14 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-accent opacity-20 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-extrabold mb-8">Get in Touch</h2>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-xl">
                    <MapPin size={24} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Head Office</h4>
                    <p className="text-white/80 leading-relaxed text-sm">Ministry of Electronics & IT,<br/>Electronics Niketan, 6, CGO Complex,<br/>Lodhi Road, New Delhi - 110003</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-xl">
                    <Phone size={24} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Helpline</h4>
                    <p className="text-white/80 font-medium tracking-wide">1800-111-2222</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-xl">
                    <Mail size={24} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Email Support</h4>
                    <p className="text-white/80 font-medium">support@digitalrural.gov.in</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="w-full h-48 bg-white/5 border border-white/10 rounded-2xl relative overflow-hidden flex items-center justify-center mb-12 group hover:bg-white/10 transition-colors cursor-pointer">
                 <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>
                 <div className="relative z-10 flex flex-col items-center">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg text-white group-hover:scale-110 transition-transform mb-3">
                       <Map size={24} />
                    </div>
                    <span className="text-xs font-bold text-white bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm tracking-wider uppercase">Interactive Map Loading...</span>
                 </div>
              </div>

            </div>

            {/* Social Links */}
            <div className="relative z-10 flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="w-full lg:w-3/5 p-10 lg:p-14">
            <h3 className="text-2xl font-bold text-text mb-2">Send us a Message</h3>
            <p className="text-gray-500 mb-8 font-medium">Fill out the form below and we'll get back to you as soon as possible.</p>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="fullName" className="block text-sm font-bold text-gray-700">Full Name <span className="text-red-500">*</span></label>
                  <input 
                    id="fullName"
                    type="text" 
                    placeholder="John Doe"
                    {...register("fullName", { required: "Full name is required" })}
                    className={`w-full px-4 py-3 rounded-xl bg-bg border ${errors.fullName ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-primary focus:ring-primary/20'} outline-none transition-all focus:ring-2 font-medium text-text`}
                  />
                  {errors.fullName && <p className="text-red-500 text-xs font-bold mt-1">{errors.fullName.message}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-bold text-gray-700">Email Address <span className="text-red-500">*</span></label>
                  <input 
                    id="email"
                    type="email" 
                    placeholder="john@example.com"
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    className={`w-full px-4 py-3 rounded-xl bg-bg border ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-primary focus:ring-primary/20'} outline-none transition-all focus:ring-2 font-medium text-text`}
                  />
                  {errors.email && <p className="text-red-500 text-xs font-bold mt-1">{errors.email.message}</p>}
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-bold text-gray-700">Subject <span className="text-red-500">*</span></label>
                <input 
                  id="subject"
                  type="text" 
                  placeholder="How can we help you?"
                  {...register("subject", { required: "Subject is required" })}
                  className={`w-full px-4 py-3 rounded-xl bg-bg border ${errors.subject ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-primary focus:ring-primary/20'} outline-none transition-all focus:ring-2 font-medium text-text`}
                />
                {errors.subject && <p className="text-red-500 text-xs font-bold mt-1">{errors.subject.message}</p>}
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-bold text-gray-700">Message <span className="text-red-500">*</span></label>
                <textarea 
                  id="message"
                  rows="5"
                  placeholder="Write your message here..."
                  {...register("message", { 
                    required: "Message is required",
                    minLength: { value: 20, message: "Message must be at least 20 characters" }
                  })}
                  className={`w-full px-4 py-3 rounded-xl bg-bg border ${errors.message ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-primary focus:ring-primary/20'} outline-none transition-all focus:ring-2 font-medium text-text resize-none`}
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs font-bold mt-1">{errors.message.message}</p>}
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-[#0c3d6a] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <>
                    Send Message <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
