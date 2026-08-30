import React, { useState } from 'react';
import { PROCESS_STEPS } from '../data/portalData';
import { Check, Clock, ChevronRight, Sparkles } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="py-20 md:py-28 bg-[#F2F3EF] border-b border-[#131B2E]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-[2px] bg-[#8F6529]"></span>
            <span className="font-mono text-xs uppercase tracking-widest text-[#8F6529] font-semibold">
              How Hiring Works
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#131B2E] tracking-tight">
            From application to placement.
          </h2>
          <p className="text-[#3B4560] text-base sm:text-lg mt-3 leading-relaxed">
            The exact path can vary by position, client, and employment type &mdash; here&apos;s the general 10-step sequence.
          </p>
        </div>

        {/* 10-Step Horizontal Scrollable Track */}
        <div className="overflow-x-auto pb-4 pt-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 scrollbar-thin">
          <div className="flex min-w-max pb-2">
            {PROCESS_STEPS.map((step, idx) => (
              <button
                key={step.number}
                id={`process-step-btn-${step.number}`}
                className={`w-48 sm:w-52 px-4 text-left flex flex-col group ${
                  idx !== PROCESS_STEPS.length - 1 ? 'border-r border-dashed border-[#D1C7B7]' : ''
                }`}
              >
                <span className="font-mono text-2xl font-bold text-[#A58249] block">
                  {step.number}
                </span>
                <h4 className="font-display font-bold text-base text-[#0E1B2E] mt-2 leading-snug">
                  {step.title}
                </h4>
                <p className="text-xs text-[#556987] leading-relaxed mt-2 line-clamp-2">
                  {step.shortDesc}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Process Footnote */}
        <div className="mt-6 flex items-center gap-2 text-xs sm:text-sm text-[#3B4560] italic">
          <Sparkles className="w-4 h-4 text-[#8F6529] shrink-0" />
          <span>Timelines vary by position, credentialing speed, and client requirements. Recruiters keep you informed at every stage.</span>
        </div>

      </div>
    </section>
  );
};
