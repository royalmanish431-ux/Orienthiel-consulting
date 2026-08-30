import React from 'react';
import { WHY_PILLARS } from '../data/portalData';

export const WhySection: React.FC = () => {
  return (
    <section id="why" className="py-20 md:py-28 bg-[#131B2E] text-[#F2F3EF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-[2px] bg-[#B4813C]"></span>
            <span className="font-mono text-xs uppercase tracking-widest text-[#B4813C] font-semibold">
              Why Orienthiel
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#F2F3EF] tracking-tight">
            What clients and candidates get, consistently.
          </h2>
          <p className="text-white/70 text-base sm:text-lg mt-3 leading-relaxed">
            Staffing is more than filling a seat. It&apos;s the right connection between people, organizations, skills, and opportunity.
          </p>
        </div>

        {/* 6-Grid Pillars with 1px border grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/15 border border-white/15 rounded overflow-hidden">
          {WHY_PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              id={`why-pillar-${pillar.number}`}
              className="bg-[#131B2E] p-8 hover:bg-[#1A243D] transition-colors duration-200 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-sm text-[#B4813C] font-bold block mb-4">
                  {pillar.number}
                </span>

                <h3 className="font-display font-bold text-xl text-white mb-3 tracking-tight">
                  {pillar.title}
                </h3>

                <p className="text-white/65 text-sm sm:text-[14.5px] leading-relaxed mb-4">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 text-xs font-mono text-[#B4813C]/90">
                {pillar.title !== "Industry Expertise" && 
                 pillar.title !== "Quality Talent" && 
                 pillar.title !== "Flexible Models" &&
                 pillar.title !== "Candidate-Focused" &&
                 pillar.title !== "Client-Focused" && (
                  <span>&rarr; {pillar.highlight}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
