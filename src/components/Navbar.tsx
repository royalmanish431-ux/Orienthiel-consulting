import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NavigationDrawer } from './NavigationDrawer';

interface NavbarProps {
  onOpenContactModal: () => void;
  onViewChange: (view: 'home' | 'jobs' | 'contact') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenContactModal,
  onViewChange
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { name: string; view?: 'home' | 'jobs' | 'contact'; href?: string; onClick?: () => void }[] = [
    { name: 'Home', view: 'home' },
    { name: 'Apply for job', view: 'jobs' },
    { name: 'Contact us', onClick: onOpenContactModal },
  ];

  return (
    <header 
      id="main-header"
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled 
          ? 'bg-[#F2F3EF]/95 backdrop-blur-md shadow-sm border-b border-[#131B2E]/10 py-3' 
          : 'bg-[#F2F3EF]/85 backdrop-blur-sm border-b border-[#131B2E]/08 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="nav-logo"
          onClick={() => onViewChange('home')}
          className="flex items-center gap-2.5 font-display font-bold text-xl tracking-tight text-[#131B2E] group"
        >
          <span className="w-3 h-3 bg-[#B4813C] transform rotate-45 transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110"></span>
          <div className="flex flex-col items-start leading-none">
            <span className="tracking-wide">ORIENTHIEL</span>
            <span className="text-[8px] uppercase tracking-[0.2em] text-[#c49a5b] mt-0.5">COUNSELTING INC</span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#3B4560]" id="desktop-nav">
          {navLinks.map((link) => (
            link.view ? (
              <button
                key={link.name}
                onClick={() => onViewChange(link.view!)}
                className="hover:text-[#131B2E] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#B4813C] hover:after:w-full after:transition-all after:duration-200 cursor-pointer font-medium"
              >
                {link.name}
              </button>
            ) : link.href ? (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[#131B2E] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#B4813C] hover:after:w-full after:transition-all after:duration-200 cursor-pointer"
              >
                {link.name}
              </a>
            ) : (
              <button
                key={link.name}
                onClick={link.onClick}
                className="hover:text-[#131B2E] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#B4813C] hover:after:w-full after:transition-all after:duration-200 cursor-pointer font-medium"
              >
                {link.name}
              </button>
            )
          ))}
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-3">
        </div>

        {/* Mobile menu toggle */}
        <button
          id="btn-mobile-nav-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="lg:hidden p-2 text-[#131B2E] hover:bg-black/5 rounded-md focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <NavigationDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onNavigate={(view) => {
          if (view === 'apply') onViewChange('jobs');
          else if (view === 'contact') onOpenContactModal();
          else onViewChange(view);
        }}
      />
    </header>
  );
};
