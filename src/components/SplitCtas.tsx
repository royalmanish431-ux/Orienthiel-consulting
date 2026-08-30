import React from 'react';
import { Users, Briefcase, ArrowRight, Building2, UserCheck } from 'lucide-react';

interface SplitCtasProps {
  onOpenCandidateModal: () => void;
  onOpenContactModal: () => void;
  onViewChange: (view: 'home' | 'jobs' | 'contact') => void;
}

export const SplitCtas: React.FC<SplitCtasProps> = ({
  onOpenCandidateModal,
  onOpenContactModal,
  onViewChange
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 border-y border-[#131B2E]/10" id="split-portals">
      
      {/* Employers Panel */}
      <div className="bg-[#FCFCFA] p-8 sm:p-14 lg:p-16 border-b lg:border-b-0 lg:border-r border-[#131B2E]/10 flex flex-col justify-between space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-5 h-[2px] bg-[#8F6529]"></span>
            <span className="font-mono text-xs uppercase tracking-widest text-[#8F6529] font-bold">
              For Employers &amp; Hiring Managers
            </span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#131B2E] tracking-tight mb-4 max-w-md">
            Streamline hiring across IT, Education, and Healthcare.
          </h3>

          <p className="text-[#3B4560] text-sm sm:text-base leading-relaxed max-w-lg mb-6">
            Whether you need one specialized professional or ongoing workforce support, our team builds staffing solutions tailored to your compliance, scheduling, and budget requirements.
          </p>

          <div className="space-y-2 mb-8 text-xs text-[#3B4560]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8F6529]"></span>
              <span>Pre-screened and credentialed candidates ready for fast onboarding</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8F6529]"></span>
              <span>Flexible rate structures for contract, locum, PRN, and direct placement</span>
            </div>
          </div>
        </div>

        <div>
          <button
            id="split-btn-employers"
            onClick={onOpenContactModal}
            className="bg-[#131B2E] hover:bg-[#8F6529] text-[#F2F3EF] font-semibold text-sm sm:text-base px-6 py-3.5 rounded-sm transition-all duration-200 hover:-translate-y-0.5 shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Building2 className="w-4 h-4 text-[#B4813C]" />
            <span>Let&apos;s talk hiring</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>

      {/* Candidates Panel */}
      <div className="bg-[#131B2E] text-[#F2F3EF] p-8 sm:p-14 lg:p-16 flex flex-col justify-between space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-5 h-[2px] bg-[#B4813C]"></span>
            <span className="font-mono text-xs uppercase tracking-widest text-[#B4813C] font-bold">
              For Candidates &amp; Jobseekers
            </span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4 max-w-md">
            Find a role that fits where you&apos;re headed.
          </h3>

          <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-lg mb-6">
            We connect professionals with permanent, contract, PRN, per-diem, temporary, and locum opportunities across three high-impact industries.
          </p>

          <div className="space-y-2 mb-8 text-xs text-white/60">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B4813C]"></span>
              <span>100% free placement services &mdash; no hidden fees or payroll cuts</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B4813C]"></span>
              <span>Dedicated recruiter advocacy and interview coaching</span>
            </div>
          </div>
        </div>

        <div>
          <button
            id="split-btn-candidates"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onViewChange('jobs'); }}
            className="bg-transparent hover:bg-white/10 text-[#F2F3EF] border border-white/40 hover:border-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-sm transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
          >
            <UserCheck className="w-4 h-4 text-[#B4813C]" />
            <span>Explore opportunities &amp; Submit resume</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>

    </div>
  );
};
