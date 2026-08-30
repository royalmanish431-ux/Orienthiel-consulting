import React from 'react';
import { Target, Compass, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-12 md:py-16 bg-[#FCFCFA] border-b border-[#131B2E]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Story & Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2">
              <span className="w-5 h-[2px] bg-[#8F6529]"></span>
              <span className="font-mono text-xs uppercase tracking-widest text-[#8F6529] font-semibold">
                About Orienthiel
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#131B2E] tracking-tight leading-tight">
              Staffing built around people, not just positions.
            </h2>

            <div className="space-y-4 text-[#3B4560] text-base sm:text-[16.5px] leading-relaxed">
              <p>
                We connect qualified professionals with organizations seeking reliable, skilled, and adaptable talent across <strong>IT</strong>, <strong>Education</strong>, and <strong>Healthcare</strong>. Our recruitment solutions support permanent placements, contract positions, PRN, locum tenens, temporary, per-diem, and other flexible staffing models.
              </p>
              <p>
                Our team focuses on understanding the unique needs of both clients and candidates to deliver efficient, compliant, results-driven staffing &mdash; whether that&apos;s one specialized professional for a critical role, or a scalable workforce solution for ongoing organizational hiring.
              </p>
            </div>

            
          </div>

          {/* Right Column: Mission & Vision Cards */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Mission Card */}
            <div className="bg-[#F2F3EF] border border-[#131B2E]/12 border-l-4 border-l-[#B4813C] rounded-r-md p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2.5 mb-3">
                <Target className="w-5 h-5 text-[#8F6529]" />
                <h3 className="font-mono text-sm uppercase tracking-wider text-[#8F6529] font-bold">
                  Our Mission
                </h3>
              </div>
              <p className="text-[#3B4560] text-base leading-relaxed">
                To connect organizations with exceptional talent through reliable, efficient, people-focused staffing &mdash; while creating meaningful career opportunities for professionals.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-[#F2F3EF] border border-[#131B2E]/12 border-l-4 border-l-[#2E6F6E] rounded-r-md p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2.5 mb-3">
                <Compass className="w-5 h-5 text-[#2E6F6E]" />
                <h3 className="font-mono text-sm uppercase tracking-wider text-[#2E6F6E] font-bold">
                  Our Vision
                </h3>
              </div>
              <p className="text-[#3B4560] text-base leading-relaxed">
                To become a trusted global workforce solutions partner, recognized for excellence in talent acquisition, industry expertise, innovation, and integrity.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
