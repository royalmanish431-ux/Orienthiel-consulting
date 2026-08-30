import React from 'react';
import { LiveRosterBoard } from './LiveRosterBoard';
import { JobRole } from '../types';
import { Users, Briefcase, ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenCandidateModal: () => void;
  onOpenContactModal: () => void;
  onSelectRole: (role: JobRole) => void;
  onViewChange: (view: 'home' | 'jobs' | 'contact') => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenCandidateModal,
  onOpenContactModal,
  onSelectRole,
  onViewChange
}) => {
  return (
    <section 
      id="hero-section"
      className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-[#131B2E]/10 bg-gradient-to-b from-[#F2F3EF] via-[#F2F3EF] to-[#EAECE6] overflow-hidden"
    >
      {/* Subtle background radial glow */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#B4813C]/10 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#2E6F6E]/05 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded bg-white/70 border border-[#131B2E]/10 shadow-xs">
              <span className="w-5 h-[2px] bg-[#8F6529]"></span>
              <span className="font-mono text-xs uppercase tracking-widest text-[#8F6529] font-semibold">
                IT &middot; Education &middot; Healthcare Staffing
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[54px] font-bold text-[#131B2E] tracking-tight leading-[1.08]">
              Connecting exceptional talent with <em className="not-italic text-[#8F6529] underline decoration-[#B4813C]/40 decoration-4 underline-offset-4">the right</em> opportunities.
            </h1>

            {/* Lead Narrative */}
            <p className="text-base sm:text-lg text-[#3B4560] leading-relaxed max-w-xl font-normal">
              <strong>Orienthiel Consulting Inc.</strong> is a workforce solutions partner placing skilled professionals into permanent, contract, PRN, locum tenens, temporary, and per-diem roles &mdash; meticulously matched to what each organization and each career actually needs.
            </p>

            {/* Primary & Secondary Call to Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                id="hero-cta-employers"
                onClick={() => onViewChange('jobs')}
                className="bg-[#131B2E] hover:bg-[#8F6529] text-[#F2F3EF] font-semibold text-sm sm:text-base px-6 py-3.5 rounded-sm transition-all duration-200 hover:-translate-y-0.5 shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Users className="w-4 h-4 text-[#B4813C]" />
                <span>Apply for job</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                type="button"
                id="hero-cta-candidates"
                onClick={onOpenContactModal}
                className="bg-transparent hover:bg-white/80 text-[#131B2E] border border-[#131B2E]/30 hover:border-[#131B2E] font-semibold text-sm sm:text-base px-6 py-3.5 rounded-sm transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
              >
                <Briefcase className="w-4 h-4 text-[#8F6529]" />
                <span>Contact us</span>
              </button>
            </div>

          </div>


          {/* Right Column: Signature Split-Flap Live Roster */}
          <div className="lg:col-span-6">
            <LiveRosterBoard onSelectRole={onSelectRole} />
          </div>

        </div>
      </div>
    </section>
  );
};
