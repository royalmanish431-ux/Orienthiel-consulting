import React, { useState, useRef } from 'react';
import { Home, Briefcase, Mail, X } from 'lucide-react';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: 'home' | 'apply' | 'contact') => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'apply' | 'contact'>('home');
  const touchStartX = useRef(0);

  if (!isOpen) return null;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchEndX - touchStartX.current > 50) {
      onClose();
    }
  };

  const menuItems = [
    { id: 'home' as const, label: 'HOME', icon: Home },
    { id: 'apply' as const, label: 'APPLY FOR JOB', icon: Briefcase },
    { id: 'contact' as const, label: 'CONTACT US', icon: Mail },
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex justify-end pointer-events-auto">
      {/* Background Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Main Drawer Container */}
      <div 
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-[85vw] max-w-[340px] h-screen flex flex-col p-6 z-10 select-none bg-[#f4f0ea]"
        style={{
          borderRadius: '20px 0 0 20px',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-8">
          <div className="flex items-center space-x-3">
            {/* 'O' Badge */}
            <div 
              className="w-12 h-12 flex items-center justify-center font-bold text-xl"
              style={{
                backgroundColor: '#f4f0ea',
                borderRadius: '15px',
                color: '#c0996c',
                boxShadow: '6px 6px 14px rgba(0, 0, 0, 0.08), -6px -6px 14px rgba(255, 255, 255, 0.9)',
              }}
            >
              O
            </div>
            <div>
              <h2 
                className="font-extrabold text-sm tracking-wider uppercase"
                style={{ color: '#1d1f39' }}
              >
                ORIENTHIEL
              </h2>
              <p 
                className="text-[10px] font-bold tracking-widest uppercase"
                style={{ color: '#c0996c' }}
              >
                CONSULTING INC
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center active:scale-95 transition-transform"
            style={{
              backgroundColor: '#f4f0ea',
              borderRadius: '15px',
              color: '#1d1f39',
              boxShadow: '6px 6px 14px rgba(0, 0, 0, 0.08), -6px -6px 14px rgba(255, 255, 255, 0.9)',
            }}
          >
            <X className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col space-y-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  onNavigate(item.id);
                  onClose();
                }}
                className="w-full flex items-center justify-between px-4 transition-all duration-200 cursor-pointer"
                style={{
                  height: '60px',
                  backgroundColor: '#f4f0ea',
                  borderRadius: '16px',
                  padding: '0 20px',
                  boxShadow: isActive 
                    ? 'inset 4px 4px 8px rgba(0, 0, 0, 0.1), inset -4px -4px 8px rgba(255, 255, 255, 0.85)'
                    : '6px 6px 14px rgba(0, 0, 0, 0.08), -6px -6px 14px rgba(255, 255, 255, 0.9)',
                }}
              >
                <div className="flex items-center space-x-3.5">
                  <Icon 
                    className="w-5 h-5 stroke-[2]"
                    style={{ color: isActive ? '#c0996c' : '#333333' }} 
                  />
                  <span
                    className="text-xs font-bold tracking-wider uppercase"
                    style={{ color: isActive ? '#c0996c' : '#1d1f39' }}
                  >
                    {item.label}
                  </span>
                </div>

                {/* Active Indicator Dot */}
                {isActive && (
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#c0996c',
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
