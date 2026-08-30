import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, DollarSign, Clock, Briefcase, CheckCircle2, ShieldCheck, ArrowRight, Share2 } from 'lucide-react';
import { JobRole } from '../types';

interface JobDetailModalProps {
  role: JobRole | null;
  onClose: () => void;
  onApply: (role: JobRole) => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({ role, onClose, onApply }) => {
  if (!role) return null;

  const verticalStyles = {
    it: 'bg-[#2E6F6E]/15 text-[#2E6F6E] border-[#2E6F6E]/30',
    health: 'bg-[#B14B4B]/15 text-[#B14B4B] border-[#B14B4B]/30',
    edu: 'bg-[#B4813C]/20 text-[#8F6529] border-[#B4813C]/40'
  }[role.label];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.1}
        onDragEnd={(_, info) => {
          if (info.offset.y > 100) onClose();
        }}
        className="bg-[#FCFCFA] text-[#131B2E] w-full max-w-2xl rounded-lg shadow-2xl border border-[#131B2E]/15 overflow-hidden flex flex-col max-h-[90vh]"
      >
        
        {/* Header */}
        <div className="bg-[#131B2E] text-white px-6 py-5 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold text-white/70 bg-white/10 px-2 py-0.5 rounded">
                {role.code}
              </span>
              <span className={`font-mono text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-sm border font-semibold ${verticalStyles}`}>
                {role.vertical}
              </span>
              <span className="text-[11px] font-mono text-white/60">
                &bull; {role.model}
              </span>
            </div>

            <h3 className="font-display font-bold text-xl sm:text-2xl text-white leading-tight">
              {role.title}
            </h3>
            <p className="text-xs font-mono text-[#B4813C] mt-1">
              {role.department}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Key Facts strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-[#F2F3EF] rounded-lg border border-[#131B2E]/10 text-xs">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#8F6529] shrink-0" />
              <div>
                <span className="text-[#3B4560] block font-mono text-[10px] uppercase">Location</span>
                <span className="font-semibold text-[#131B2E]">{role.location}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#2E6F6E] shrink-0" />
              <div>
                <span className="text-[#3B4560] block font-mono text-[10px] uppercase">Compensation</span>
                <span className="font-semibold text-[#131B2E]">{role.compensation}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#8F6529] shrink-0" />
              <div>
                <span className="text-[#3B4560] block font-mono text-[10px] uppercase">Status</span>
                <span className="font-semibold text-[#131B2E]">{role.status} (Active)</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#8F6529] font-bold mb-2">
              Position Overview
            </h4>
            <div className="text-sm text-[#3B4560] leading-relaxed">
              {role.description}
              {role.bonus && role.bonus !== '-' && role.bonus.toLowerCase() !== 'n/a' && (
                <div className="mt-4 font-semibold text-emerald-600">
                  • Sign-on Bonus: {role.bonus} eligible upon onboarding.
                </div>
              )}
            </div>
          </div>

          {/* Responsibilities */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#8F6529] font-bold mb-2.5">
              Core Responsibilities &amp; Deliverables
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#3B4560]">
              {role.responsibilities.map((resp, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2E6F6E] shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#8F6529] font-bold mb-2.5">
              Candidate Qualifications &amp; Licensure
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#3B4560]">
              {role.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8F6529] shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Anti-Fraud Disclaimer Mini-card */}
          <div className="p-3 bg-[#F2F3EF] rounded border border-[#131B2E]/08 text-[11.5px] text-[#3B4560] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#2E6F6E] shrink-0" />
            <span>Orienthiel Consulting never charges candidate fees. Direct placement &amp; contract representation.</span>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-[#F2F3EF] px-6 py-4 border-t border-[#131B2E]/10 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-[#3B4560] hover:text-[#131B2E] cursor-pointer"
          >
            Close Window
          </button>

          <button
            onClick={() => onApply(role)}
            className="bg-[#131B2E] hover:bg-[#8F6529] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded transition-all flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <span>Apply For This Position</span>
            <ArrowRight className="w-4 h-4 text-[#B4813C]" />
          </button>
        </div>

      </motion.div>
    </div>
  );
};
