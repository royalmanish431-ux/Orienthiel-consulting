import React from 'react';
import { Quote } from 'lucide-react';

export const CommitmentSection: React.FC = () => {
  return (
    <section className="py-20 md:py-24 bg-[#E6E7E0] border-t border-b border-[#131B2E]/10 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        <Quote className="w-10 h-10 text-[#8F6529]/40 mx-auto transform -scale-x-100" />

        <blockquote className="font-display text-2xl sm:text-3xl lg:text-[32px] text-[#131B2E] font-medium leading-snug tracking-tight">
          &ldquo;Successful staffing is about more than filling positions &mdash; it&apos;s the right connection between{' '}
          <span className="text-[#8F6529] font-bold underline decoration-[#B4813C]/40 underline-offset-4">
            people, organizations, skills, and opportunities.
          </span>&rdquo;
        </blockquote>

        <cite className="block font-mono text-xs uppercase tracking-widest text-[#3B4560] not-italic font-semibold">
          Our Commitment &mdash; Orienthiel Consulting Inc.
        </cite>

      </div>
    </section>
  );
};
