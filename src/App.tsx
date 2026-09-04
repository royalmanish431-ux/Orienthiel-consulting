import React, { useState, useRef, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { JobSearchSection } from './components/JobSearchSection';
import { WhySection } from './components/WhySection';
import { ProcessSection } from './components/ProcessSection';
import { TestimonialSection } from './components/TestimonialSection';
import { SplitCtas } from './components/SplitCtas';
import { CommitmentSection } from './components/CommitmentSection';
import { FaqSection } from './components/FaqSection';
import { ContactModal } from './components/ContactModal';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsAndConditions } from './components/TermsAndConditions';
import { Footer } from './components/Footer';
import { ShareModal } from './components/ShareModal';
import { CandidateModal } from './components/CandidateModal';
import { JobDetailModal } from './components/JobDetailModal';
import { JobRole } from './types';

export default function App() {
  // Initialize from hash (ignore localStorage on fresh visit)
  const getInitialView = () => {
    const hash = window.location.hash.replace('#', '');
    
    // Explicitly check for valid hashes
    if (hash === 'jobs' || hash === 'contact') return hash;
    
    // Default to home if no hash or empty hash
    return 'home';
  };

  const [currentView, setCurrentView] = useState<'home' | 'jobs' | 'contact'>(getInitialView() as 'home' | 'jobs' | 'contact');

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    
    // Only restore/set if explicit hash is present
    if (hash === 'jobs' || hash === 'contact') {
      setCurrentView(hash as 'jobs' | 'contact');
    } else if (hash === 'home') {
      setCurrentView('home');
    } else {
      // Default to home on new session/no hash
      setCurrentView('home');
      window.location.hash = '#home';
    }

    const handleHashChange = () => {
      const newHash = window.location.hash.replace('#', '');
      if (newHash === 'jobs' || newHash === 'contact' || newHash === 'home') {
        setCurrentView(newHash as 'home' | 'jobs' | 'contact');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const [isCandidateModalOpen, setIsCandidateModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedRoleForDetail, setSelectedRoleForDetail] = useState<JobRole | null>(null);
  const [preselectedJobForShare, setPreselectedJobForShare] = useState<JobRole | null>(null);
  const [preselectedJobForApply, setPreselectedJobForApply] = useState<JobRole | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const diffX = touchEndX - touchStartX.current;
    const diffY = touchEndY - touchStartY.current;
    
    // Only trigger swipe if horizontal movement is significant and greater than vertical movement
    if (Math.abs(diffX) > 100 && Math.abs(diffX) > Math.abs(diffY)) {
      // Allow only Right swipe (Back navigation/close)
      if (diffX > 0) {
        if (isCandidateModalOpen) {
          setIsCandidateModalOpen(false);
          setPreselectedJobForApply(null);
        } else if (currentView === 'jobs') {
          setCurrentView('home');
          window.location.hash = '#home';
        }
      }
    }
  };

  const handleViewChange = (view: 'home' | 'jobs' | 'contact' | 'privacy' | 'terms') => {
    if (view === 'privacy') {
      setIsPrivacyModalOpen(true);
    } else if (view === 'terms') {
      setIsTermsModalOpen(true);
    } else {
      setCurrentView(view as 'home' | 'jobs' | 'contact');
      window.location.hash = `#${view}`;
    }
  };


  const handleOpenCandidateModal = (job?: JobRole | null) => {
    setPreselectedJobForApply(job || null);
    setIsCandidateModalOpen(true);
  };

  const handleOpenShareModal = (job: JobRole) => {
    setPreselectedJobForShare(job);
    setIsShareModalOpen(true);
  };

  const handleOpenContactModal = () => {
    setIsContactModalOpen(true);
  };

  const handleSelectRoleForDetail = (role: JobRole) => {
    setSelectedRoleForDetail(role);
  };

  const handleApplyFromDetail = (role: JobRole) => {
    setSelectedRoleForDetail(null);
    handleOpenCandidateModal(role);
  };

  return (
    <div 
      className="min-h-screen bg-[#F2F3EF] text-[#131B2E] flex flex-col font-sans selection:bg-[#B4813C]/20 selection:text-[#131B2E]" 
      id="top"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Navigation Header */}
      <Navbar
        onOpenContactModal={handleOpenContactModal}
        onViewChange={handleViewChange}
      />

      {/* Main Content Sections */}
      <main className="flex-1 pb-6">
        <div className={currentView !== 'home' ? 'hidden' : ''}>
            {/* Hero with Interactive Split-Flap Live Board */}
            <Hero
              onOpenCandidateModal={() => handleOpenCandidateModal(null)}
              onOpenContactModal={handleOpenContactModal}
              onSelectRole={handleSelectRoleForDetail}
              onViewChange={handleViewChange}
            />

            {/* About Section */}
            <AboutSection />

            {/* Services & Vertical Capabilities Section */}
            <ServicesSection
              onOpenCandidateModal={() => handleOpenCandidateModal(null)}
            />

            {/* Why Orienthiel Section */}
            <WhySection />

            {/* 10-Step Interactive Hiring Process */}
            <ProcessSection />


            {/* Split CTA Panels for Employers & Candidates */}
            <SplitCtas
              onOpenCandidateModal={() => handleOpenCandidateModal(null)}
              onOpenContactModal={handleOpenContactModal}
              onViewChange={handleViewChange}
            />

            {/* Commitment Quote */}
            <CommitmentSection />

            {/* Comprehensive FAQ Section with Anti-Fraud Disclaimer */}
            <FaqSection />

            {/* Testimonials */}
            <TestimonialSection />
        </div>

        <div className={currentView !== 'jobs' ? 'hidden' : ''}>
          <div className="py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Active Openings & Job Search Section */}
              <JobSearchSection
                onSelectRole={handleOpenShareModal}
                onApplyForRole={handleOpenCandidateModal}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <Footer onOpenContactModal={handleOpenContactModal} onViewChange={handleViewChange} />

      {/* Modals */}
      <CandidateModal
        isOpen={isCandidateModalOpen}
        onClose={() => {
          setIsCandidateModalOpen(false);
          setPreselectedJobForApply(null);
        }}
        onViewChange={handleViewChange}
        preselectedJob={preselectedJobForApply}
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      {isShareModalOpen && preselectedJobForShare && (
        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          job={preselectedJobForShare}
        />
      )}

      <PrivacyPolicy isOpen={isPrivacyModalOpen} onClose={() => setIsPrivacyModalOpen(false)} />
      <TermsAndConditions isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} />

      <JobDetailModal
        role={selectedRoleForDetail}
        onClose={() => setSelectedRoleForDetail(null)}
        onApply={handleApplyFromDetail}
      />
    </div>
  );
}
