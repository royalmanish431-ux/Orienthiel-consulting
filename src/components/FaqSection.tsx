import React, { useState, useMemo } from 'react';
import { FAQ_DATA } from '../data/portalData';
import { ChevronDown, Search, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'General', 'Process', 'Requirements', 'Candidate Safety'];

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter(faq => {
      const matchesSearch = 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const toggleFaq = (id: number) => {
    setOpenIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#FCFCFA] border-b border-[#131B2E]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 text-left">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-[2px] bg-[#8F6529]"></span>
            <span className="font-mono text-xs uppercase tracking-widest text-[#8F6529] font-semibold">
              Questions &amp; Clarity
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#131B2E] tracking-tight">
            Frequently asked questions.
          </h2>
          <p className="text-[#3B4560] text-base sm:text-lg mt-3 leading-relaxed">
            The essentials on applying, screening, credentials, and what to expect during the recruitment process.
          </p>
        </div>

        {/* Filter & Search */}
        <div className="mb-8 space-y-3.5">
          <div className="relative">
            <Search className="w-4 h-4 text-[#8F6529] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search frequently asked questions (e.g. fees, authorization, timeline)..."
              className="w-full bg-[#F2F3EF] text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded border border-[#131B2E]/15 focus:outline-none focus:ring-1 focus:ring-[#131B2E] text-[#131B2E]"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full font-mono text-xs transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#131B2E] text-white font-medium'
                    : 'bg-[#F2F3EF] text-[#3B4560] hover:bg-[#E6E7E0]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3" id="faq-accordion-list">
          {filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);

            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className="border border-[#131B2E]/10 rounded bg-[#F2F3EF] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-[#EAECE6] transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs font-bold text-[#8F6529] mt-0.5">
                      {String(faq.id).padStart(2, '0')}
                    </span>
                    <span className="font-display font-semibold text-base sm:text-lg text-[#131B2E] leading-snug">
                      {faq.question}
                    </span>
                  </div>

                  <span className="shrink-0 p-1 rounded bg-[#131B2E]/05 text-[#131B2E] mt-0.5 transition-transform duration-200">
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-[#131B2E]/08 bg-white text-xs sm:text-sm text-[#3B4560] leading-relaxed">
                    <p className="pl-6 sm:pl-7">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Candidate Anti-Fraud Safety Disclaimer Card */}
        <div className="mt-12 p-5 sm:p-6 bg-white border border-[#B14B4B]/30 border-l-4 border-l-[#B14B4B] rounded-r-md shadow-xs">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-[#B14B4B] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-display font-bold text-sm text-[#131B2E] mb-1">
                Official Candidate Protection Advisory
              </h4>
              <p className="text-xs text-[#3B4560] leading-relaxed">
                <strong>Orienthiel Consulting Inc. does not charge candidates a fee to apply for employment opportunities.</strong> Be cautious of anyone requesting money, gift cards, or banking credentials in exchange for a job offer &mdash; always verify any suspicious communication directly through our official corporate contact channels before sharing personal information.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
