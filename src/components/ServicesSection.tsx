import React, { useState } from 'react';
import { SERVICES_DATA, STAFFING_MODELS_LIST } from '../data/portalData';
import { ArrowRight, CheckCircle, Layers, Sparkles } from 'lucide-react';

interface ServicesSectionProps {
  onOpenCandidateModal: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenCandidateModal
}) => {
  const [activeIndustryId, setActiveIndustryId] = useState<'it' | 'health' | 'edu'>('it');
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const selectedIndustry = SERVICES_DATA.find(s => s.id === activeIndustryId) || SERVICES_DATA[0];

  return (
    <section id="services" className="py-12 md:py-16 bg-[#F2F3EF] border-b border-[#131B2E]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-[2px] bg-[#8F6529]"></span>
            <span className="font-mono text-xs uppercase tracking-widest text-[#8F6529] font-semibold">
              What We Do
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#131B2E] tracking-tight">
            Three industries. One standard of fit.
          </h2>
          <p className="text-[#3B4560] text-base sm:text-lg mt-3 leading-relaxed">
            Every placement is matched against the specific requirements of the role, the organization, and the professional &mdash; not a generic candidate pool.
          </p>
        </div>

        {/* 3 Industry Cards - Vertical Stack */}
        <div className="grid grid-cols-1 gap-6 mb-12">
          {SERVICES_DATA.map((service) => {
            const isSelected = activeIndustryId === service.id;

            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                onClick={() => setActiveIndustryId(service.id)}
                className="bg-[#FCFCFA] border border-[#131B2E]/12 rounded-md p-6 sm:p-7 transition-all duration-200 cursor-pointer flex flex-col hover:border-[#131B2E]/40 hover:shadow-md"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="w-10 h-10 rounded flex items-center justify-center font-mono font-bold text-xs shrink-0"
                    style={{ backgroundColor: service.bgColor, color: service.textColor }}
                  >
                    {service.badge}
                  </div>
                  <h3 className="font-display font-bold text-xl text-[#131B2E]">
                    <span>{service.title}</span>
                  </h3>
                </div>

                <p className="text-sm text-[#3B4560] leading-relaxed mb-6">
                  {service.shortDesc}
                </p>
              </div>
            );
          })}
        </div>


        {/* Staffing Models Strip */}
        <div className="border-t border-[#131B2E]/10 pt-10">
          <div className="flex flex-wrap gap-2.5">
            {STAFFING_MODELS_LIST.map((model) => {
              const isSelected = selectedModel === model.title;
              return (
                <button
                  key={model.title}
                  onClick={() => setSelectedModel(isSelected ? null : model.title)}
                  className="font-mono text-xs tracking-wide px-4 py-2 rounded-full border transition-all duration-150 cursor-pointer bg-transparent text-[#3B4560] border-[#131B2E]/20 hover:border-[#131B2E] hover:text-[#131B2E]"
                >
                  {model.title}
                </button>
              );
            })}
          </div>


        </div>

      </div>
    </section>
  );
};
