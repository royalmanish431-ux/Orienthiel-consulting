import React from 'react';

export const Footer: React.FC<{ 
  onOpenContactModal: () => void;
  onViewChange: (view: 'home' | 'jobs' | 'contact' | 'privacy' | 'terms') => void;
}> = ({ onOpenContactModal, onViewChange }) => {
  return (
    <footer className="bg-[#131B2E] text-white/70 pt-8 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5 font-display font-bold text-xl text-white tracking-tight">
              <span className="w-3 h-3 bg-[#B4813C] transform rotate-45"></span>
              <span>ORIENTHIEL</span>
            </div>
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
              IT, Education &amp; Healthcare staffing &mdash; connecting exceptional talent with the right opportunities.
            </p>
          </div>

          {/* Col: Company */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/40 font-bold">
              Company
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><button onClick={() => { onViewChange('home'); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-[#B4813C] transition-colors cursor-pointer">About Us</button></li>
              <li><button onClick={() => { onViewChange('home'); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-[#B4813C] transition-colors cursor-pointer">Our Mission</button></li>
              <li><button onClick={() => onViewChange('jobs')} className="hover:text-[#B4813C] transition-colors cursor-pointer">Careers</button></li>
              <li>
                <button onClick={onOpenContactModal} className="hover:text-[#B4813C] transition-colors cursor-pointer">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Col: Services */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/40 font-bold">
              Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><button onClick={() => { onViewChange('home'); setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-[#B4813C] transition-colors cursor-pointer">IT Staffing</button></li>
              <li><button onClick={() => { onViewChange('home'); setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-[#B4813C] transition-colors cursor-pointer">Healthcare Staffing</button></li>
              <li><button onClick={() => { onViewChange('home'); setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-[#B4813C] transition-colors cursor-pointer">Education Staffing</button></li>
            </ul>
          </div>

          {/* Col: Resources */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/40 font-bold">
              Resources
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><button onClick={() => onViewChange('jobs')} className="hover:text-[#B4813C] transition-colors cursor-pointer">Job Opportunities</button></li>
              <li><button onClick={() => { onViewChange('home'); setTimeout(() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-[#B4813C] transition-colors cursor-pointer">FAQs</button></li>
            </ul>
          </div>

          {/* Col: Legal */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/40 font-bold">
              Legal
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><button onClick={() => onViewChange('privacy')} className="hover:text-[#B4813C] transition-colors cursor-pointer">Privacy Policy</button></li>
              <li><button onClick={() => onViewChange('terms')} className="hover:text-[#B4813C] transition-colors cursor-pointer">Terms &amp; Conditions</button></li>
            </ul>
          </div>

        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-white/10 text-center">
        <p className="text-xs text-white/40">
          &copy; 2026 Orienthiel Consulting Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
