import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube, Send, ShieldCheck, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0a3153] text-white pt-20 pb-8 border-t-[8px] border-secondary relative overflow-hidden">
      
      {/* Decorative Background Graphics */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[500px] h-[500px] bg-white opacity-[0.02] rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-accent opacity-[0.03] rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16 border-b border-white/10 pb-16">
          
          {/* Portal Overview (Col Span 4) */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-2 mb-2 outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg w-max">
              <ShieldCheck size={36} className="text-accent" />
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight leading-none text-white">Rural<span className="text-accent">Connect</span></span>
                <span className="text-[10px] font-bold tracking-widest text-white/50 uppercase mt-1">Government of India</span>
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed font-medium">
              Empowering rural India through digital literacy, high-speed broadband connectivity, and transparent, accessible e-governance services. Join the digital revolution today.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-accent hover:text-white transition-all outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-accent hover:text-white transition-all outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-accent hover:text-white transition-all outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-accent hover:text-white transition-all outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-label="YouTube">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links (Col Span 2) */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-secondary"></div> Quick Links
            </h4>
            <ul className="space-y-4">
              <li><Link to="/digital-literacy" className="text-white/70 hover:text-white hover:translate-x-1 transition-all inline-block text-sm font-medium outline-none focus-visible:text-accent">Digital Literacy</Link></li>
              <li><Link to="/internet-access" className="text-white/70 hover:text-white hover:translate-x-1 transition-all inline-block text-sm font-medium outline-none focus-visible:text-accent">Connectivity</Link></li>
              <li><Link to="/schemes" className="text-white/70 hover:text-white hover:translate-x-1 transition-all inline-block text-sm font-medium outline-none focus-visible:text-accent">Schemes</Link></li>
              <li><Link to="/training" className="text-white/70 hover:text-white hover:translate-x-1 transition-all inline-block text-sm font-medium outline-none focus-visible:text-accent">Training</Link></li>
              <li><Link to="/blogs" className="text-white/70 hover:text-white hover:translate-x-1 transition-all inline-block text-sm font-medium outline-none focus-visible:text-accent">News & Blogs</Link></li>
            </ul>
          </div>

          {/* Government Resources (Col Span 3) */}
          <div className="lg:col-span-3">
            <h4 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent"></div> Govt Resources
            </h4>
            <ul className="space-y-4">
              <li><a href="#" className="group flex items-center gap-2 text-white/70 hover:text-accent transition-colors text-sm font-medium outline-none focus-visible:text-accent"><ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Digital India Portal</a></li>
              <li><a href="#" className="group flex items-center gap-2 text-white/70 hover:text-accent transition-colors text-sm font-medium outline-none focus-visible:text-accent"><ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> MyGov.in</a></li>
              <li><a href="#" className="group flex items-center gap-2 text-white/70 hover:text-accent transition-colors text-sm font-medium outline-none focus-visible:text-accent"><ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> National Informatics Centre</a></li>
              <li><a href="#" className="group flex items-center gap-2 text-white/70 hover:text-accent transition-colors text-sm font-medium outline-none focus-visible:text-accent"><ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> CSC Network</a></li>
              <li><a href="#" className="group flex items-center gap-2 text-white/70 hover:text-accent transition-colors text-sm font-medium outline-none focus-visible:text-accent"><ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> DigiLocker Web</a></li>
              <li><a href="#" className="group flex items-center gap-2 text-white/70 hover:text-accent transition-colors text-sm font-medium outline-none focus-visible:text-accent"><ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> UMANG Services</a></li>
            </ul>
          </div>

          {/* Contact Details & Newsletter (Col Span 3) */}
          <div className="lg:col-span-3">
            <h4 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div> Contact & Updates
            </h4>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm font-medium leading-relaxed">Ministry of IT, CGO Complex,<br/>New Delhi - 110003</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-secondary flex-shrink-0" />
                <span className="text-white/70 text-sm font-medium">1800-111-2222</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-secondary flex-shrink-0" />
                <span className="text-white/70 text-sm font-medium">support@digitalrural.gov.in</span>
              </li>
            </ul>

            <form className="relative group" onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); }}>
              <input 
                type="email" 
                placeholder="Email for Newsletter..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-accent focus:bg-white/10 transition-all outline-none focus-visible:ring-2 focus-visible:ring-accent"
                required
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-accent/20 text-accent hover:bg-accent hover:text-white rounded-lg transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Subscribe to newsletter"
              >
                <Send size={16} />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-white/40">
          <p>&copy; {new Date().getFullYear()} Digital India for Rural Empowerment. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link to="/privacy" className="hover:text-white transition-colors outline-none focus-visible:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors outline-none focus-visible:text-white">Terms & Conditions</Link>
            <Link to="/accessibility" className="hover:text-white transition-colors outline-none focus-visible:text-white">Accessibility Statement</Link>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
