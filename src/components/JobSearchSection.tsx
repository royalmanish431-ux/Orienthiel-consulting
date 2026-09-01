import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LIVE_JOB_ROSTER } from '../data/portalData';
import { JobRole, IndustryVertical } from '../types';
import { Search, MapPin, DollarSign, Clock, ArrowUpRight, Check, Filter, Loader2, CheckCircle2, ChevronDown, ChevronUp, Share2 } from 'lucide-react';

interface JobSearchSectionProps {
  onSelectRole: (role: JobRole) => void;
  onApplyForRole: (role: JobRole) => void;
}

const CSV_URL = 'https://docs.google.com/spreadsheets/d/1gsVc03oVTLwTqoZfzD170ZbBcbTIVeBGE0gI1tniR8o/export?format=csv';

export const JobSearchSection: React.FC<JobSearchSectionProps> = ({
  onSelectRole,
  onApplyForRole
}) => {
  const [jobs, setJobs] = useState<JobRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState({ query: '', location: '' });
  const [selectedVertical, setSelectedVertical] = useState<'ALL' | IndustryVertical>('ALL');
  const [selectedModel, setSelectedModel] = useState<string>('ALL');
  const [expandedJobs, setExpandedJobs] = useState<Set<string>>(new Set());

  const toggleJobExpansion = (jobId: string) => {
    const newExpanded = new Set(expandedJobs);
    if (newExpanded.has(jobId)) {
      newExpanded.delete(jobId);
    } else {
      newExpanded.add(jobId);
    }
    setExpandedJobs(newExpanded);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      try {
        const response = await fetch(CSV_URL, { signal: controller.signal });
        if (!response.ok) throw new Error('Failed to fetch');
        const csvData = await response.text();
        const parsedJobs = parseGoogleSheetCSV(csvData);
        
        if (parsedJobs.length > 0) {
          setJobs(parsedJobs as JobRole[]);
        } else {
          setJobs(LIVE_JOB_ROSTER);
        }
      } catch (err) {
        console.error('Failed to fetch jobs or timeout, using fallback:', err);
        setJobs(LIVE_JOB_ROSTER);
      } finally {
        clearTimeout(timeoutId);
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const parseGoogleSheetCSV = (csvText: string) => {
    const rows: string[][] = [];
    let currentRow: string[] = [];
    let currentCell = '';
    let insideQuotes = false;

    for (let i = 0; i < csvText.length; i++) {
      const char = csvText[i];
      const nextChar = csvText[i + 1];

      if (char === '"') {
        if (insideQuotes && nextChar === '"') {
          currentCell += '"';
          i++;
        } else {
          insideQuotes = !insideQuotes;
        }
      } else if (char === ',' && !insideQuotes) {
        currentRow.push(currentCell.trim());
        currentCell = '';
      } else if ((char === '\r' || char === '\n') && !insideQuotes) {
        if (char === '\r' && nextChar === '\n') i++;
        currentRow.push(currentCell.trim());
        if (currentRow.some(cell => cell.length > 0)) {
          rows.push(currentRow);
        }
        currentRow = [];
        currentCell = '';
      } else {
        currentCell += char;
      }
    }
    if (currentCell || currentRow.length > 0) {
      currentRow.push(currentCell.trim());
      if (currentRow.some(cell => cell.length > 0)) rows.push(currentRow);
    }

    if (rows.length < 2) return [];

    const headers = rows[0].map(h => h.toLowerCase().replace(/[^a-z0-9]/g, ''));
    const dataRows = rows.slice(1);

    return dataRows
      .map((row, index) => {
        // Safe access
        const getVal = (possibleKeys: string[]) => {
          const colIndex = headers.findIndex(h => possibleKeys.some(k => h.includes(k)));
          return colIndex !== -1 && row[colIndex] ? row[colIndex].replace(/^"|"$/g, '').trim() : '';
        };

        const title = getVal(['title', 'role', 'position']) || (row[0] ? row[0] : '');
        if (!title || title.length < 2) return null;

        const vertical = getVal(['category', 'industry', 'dept']) || 'General';
        
        // Location mapping
        const city = getVal(['city']);
        const state = getVal(['state', 'st']);
        const zip = getVal(['zip', 'zipcode', 'postalcode']);
        const locationParts = [city, state, zip].filter(Boolean);
        const location = locationParts.length > 0 ? locationParts.join(', ').replace(/, \d+$/, (match) => match.replace(',', '')) : 'Remote / On-site';

        const workModel = getVal(['model', 'work model', 'type']) || 'Permanent';
        const rawStatus = getVal(['status']);
        const normalizedStatus = rawStatus.toLowerCase().trim();
        let status: RoleStatus = 'Open';
        if (normalizedStatus === 'closed') {
          status = 'Closed';
        } else if (normalizedStatus === 'hold' || normalizedStatus === 'on hold') {
          status = 'Hold';
        } else {
          status = 'Open';
        }
        
        const bonus = getVal(['bonus', 'sign-on', 'signon']);
        
        const shift = getVal(['shift']);
        const schedule = getVal(['schedule']);
        const workArrangement = getVal(['workarrangement']);
        const minPay = getVal(['minimumbasicpay']);
        const maxPay = getVal(['maximumbasicpay']);
        
        const compensation = (minPay && maxPay) ? `${minPay} - ${maxPay} / yr` : (minPay || maxPay || 'Competitive');
        const description = getVal(['desc', 'summary', 'responsibilities']) || '';

        return {
          id: `JOB-${index + 1}`,
          code: `J-${index + 1}`,
          title: title,
          vertical: vertical as IndustryVertical,
          label: vertical.toLowerCase().includes('it') ? 'it' : (vertical.toLowerCase().includes('health') ? 'health' : 'edu'),
          model: workModel as any,
          location: location,
          compensation: compensation,
          bonus: (bonus && bonus !== '-' && bonus.toLowerCase() !== 'n/a') ? bonus : '',
          shift: shift,
          schedule: schedule,
          workArrangement: workArrangement,
          department: vertical,
          description: description,
          status: status,
          postedDaysAgo: 0,
          requirements: [],
          responsibilities: []
        };
      })
      .filter(Boolean);
  };

  // ... (rest of the component)

  const handleSearch = () => {
    setActiveSearch({ query: searchQuery, location: locationQuery });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const q = activeSearch.query.toLowerCase().trim();
      const l = activeSearch.location.toLowerCase().trim();
      const matchesSearch = 
        job.title.toLowerCase().includes(q) ||
        job.code.toLowerCase().includes(q) ||
        job.description.toLowerCase().includes(q) ||
        job.department.toLowerCase().includes(q);
      const matchesLocation = job.location.toLowerCase().includes(l);

      const matchesVertical = selectedVertical === 'ALL' || job.vertical.toLowerCase().trim() === selectedVertical.toLowerCase().trim();
      
      return matchesSearch && matchesLocation && matchesVertical;
    });
  }, [jobs, activeSearch, selectedVertical]);

  const uniqueModels = Array.from(new Set(jobs.map(j => j.model)));

  if (loading) return (
    <div className="py-28 text-center flex flex-col items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-[#8F6529] mb-4" />
      <p className="font-display text-lg text-[#131B2E]">Loading live opportunities...</p>
    </div>
  );

  return (
    <section id="openings" className="py-20 md:py-28 bg-[#FCFCFA] border-b border-[#131B2E]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-[2px] bg-[#8F6529]"></span>
              <span className="font-mono text-xs uppercase tracking-widest text-[#8F6529] font-semibold">
                Active Requisitions
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#131B2E] tracking-tight">
              Explore Live Openings &amp; Placements
            </h2>
            <p className="text-[#3B4560] text-base mt-2 max-w-2xl">
              Browse actively recruiting roles across IT, Healthcare, and Education. All positions backed by direct hiring manager relationships.
            </p>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#F2F3EF] p-4 sm:p-5 rounded-lg border border-[#131B2E]/12 mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
            
            {/* Search Input */}
            <div className="sm:col-span-12 relative">
              <Search className="w-4 h-4 text-[#8F6529] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="job-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search by role title or skill..."
                className="w-full bg-white text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded border border-[#131B2E]/15 focus:outline-none focus:ring-1 focus:ring-[#131B2E] focus:border-[#131B2E]"
              />
            </div>

            {/* Location Input */}
            <div className="sm:col-span-12 relative">
              <MapPin className="w-4 h-4 text-[#8F6529] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="job-location-input"
                type="text"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search by City, State, or Location (e.g. Sunnyvale, Remote)..."
                className="w-full bg-white text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded border border-[#131B2E]/15 focus:outline-none focus:ring-1 focus:ring-[#131B2E] focus:border-[#131B2E]"
              />
            </div>
            
            {/* Search Button */}
            <div className="sm:col-span-12">
              <button
                onClick={handleSearch}
                className="w-full bg-[#1d1f39] text-white font-bold py-2.5 rounded-xl hover:opacity-90 transition-all text-sm sm:text-base"
              >
                Search Jobs
              </button>
            </div>
          </div>

          {/* Quick Vertical Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <button
              onClick={() => { setSearchQuery(''); setLocationQuery(''); setSelectedVertical('ALL'); }}
              className="px-3 py-1 rounded-full font-mono text-[11.5px] transition-colors cursor-pointer bg-[#8F6529]/10 text-[#8F6529] border border-[#8F6529]/20 hover:bg-[#8F6529]/20"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length === 0 ? (
          <div className="text-center py-16 bg-[#F2F3EF] rounded border border-dashed border-[#131B2E]/20">
            <p className="font-display text-lg font-bold text-[#131B2E] mb-1">No matching requisitions found</p>
            <p className="text-xs text-[#3B4560] mb-4">Try clearing filters or search terms.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedVertical('ALL'); setSelectedModel('ALL'); }}
              className="text-xs font-mono text-[#8F6529] underline hover:text-[#131B2E]"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredJobs.map((job) => {
              const verticalBadgeStyle = {
                it: 'bg-[#2E6F6E]/15 text-[#2E6F6E] border-[#2E6F6E]/30',
                health: 'bg-[#B14B4B]/15 text-[#B14B4B] border-[#B14B4B]/30',
                edu: 'bg-[#B4813C]/20 text-[#8F6529] border-[#B4813C]/40'
              }[job.label];

              return (
                <div
                  key={job.id}
                  id={`job-card-${job.code}`}
                  className="bg-[#FCFCFA] border border-[#131B2E]/12 hover:border-[#131B2E]/40 rounded-lg p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
                >
                  <div>
                    {/* Card Top Metadata */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#131B2E]/70 bg-[#131B2E]/05 px-2 py-0.5 rounded">
                          {job.code}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-[#3B4560] flex items-center gap-1">
                      </span>
                    </div>

                    {/* Bonus Badge */}
                    {job.bonus && (
                      <div className="mb-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FDF6E3] text-[#8F6529] rounded-full text-xs font-bold border border-[#FDE3A7]">
                          <span>🎁</span> {job.bonus} SIGN-ON BONUS
                        </span>
                      </div>
                    )}
                    
                    {/* Status Badge */}
                    <div className="mb-3">
                      {job.status === 'Closed' && <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-[10px] font-bold">🔴 CLOSED</span>}
                      {job.status === 'Hold' && <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-[10px] font-bold">🟡 HOLD</span>}
                      {job.status === 'Open' && <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold">🟢 OPEN</span>}
                    </div>

                    {/* Title */}
                    <h3 
                      className="font-display font-bold text-lg text-[#131B2E] transition-colors mb-2"
                    >
                      {job.title}
                    </h3>

                    {/* Key Attributes List */}
                    <div className="space-y-2.5 text-sm text-[#3B4560] mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#8F6529]" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-[#2E6F6E]" />
                        <span className="font-semibold text-[#131B2E]">{job.compensation}</span>
                      </div>
                      {(job.shift || job.schedule) && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#131B2E]" />
                          <span>{job.shift ? `${job.shift} Shift` : ''}{job.shift && job.schedule ? ' • ' : ''}{job.schedule || ''}</span>
                        </div>
                      )}
                      {job.workArrangement && (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4">🏢</div>
                          <span>{job.workArrangement}</span>
                        </div>
                      )}
                    </div>

                    {/* Excerpt */}
                    <p className="text-xs text-[#3B4560] line-clamp-2 leading-relaxed mb-4">
                      {job.description}
                    </p>

                    {/* Accordion Content */}
                    <AnimatePresence>
                      {expandedJobs.has(job.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-4 py-4 border-t border-[#131B2E]/10 text-xs text-[#3B4560]">
                            <div>
                              <h4 className="font-mono text-[10px] uppercase tracking-wider text-[#8F6529] font-bold mb-1.5">Position Overview</h4>
                              <p className="leading-relaxed">{job.description}</p>
                              {job.bonus && (
                                <p className="mt-2 font-semibold text-emerald-600">• Sign-on Bonus: {job.bonus}</p>
                              )}
                            </div>
                            {job.responsibilities.length > 0 && (
                              <div>
                                <h4 className="font-mono text-[10px] uppercase tracking-wider text-[#8F6529] font-bold mb-1.5">Responsibilities</h4>
                                <ul className="space-y-1">
                                  {job.responsibilities.map((resp, i) => (
                                    <li key={i} className="flex items-start gap-1.5">
                                      <CheckCircle2 className="w-3 h-3 text-[#2E6F6E] shrink-0 mt-0.5" />
                                      {resp}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {job.requirements.length > 0 && (
                              <div>
                                <h4 className="font-mono text-[10px] uppercase tracking-wider text-[#8F6529] font-bold mb-1.5">Qualifications</h4>
                                <ul className="space-y-1">
                                  {job.requirements.map((req, i) => (
                                    <li key={i} className="flex items-start gap-1.5">
                                      <CheckCircle2 className="w-3 h-3 text-[#8F6529] shrink-0 mt-0.5" />
                                      {req}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-3 border-t border-[#131B2E]/08 flex items-center justify-between gap-3">
                    <button
                      onClick={() => toggleJobExpansion(job.id)}
                      className="text-xs font-semibold text-[#131B2E] hover:text-[#8F6529] flex items-center gap-1 cursor-pointer"
                    >
                      <span>{expandedJobs.has(job.id) ? 'Hide Specs' : 'Role Specs'}</span>
                      {expandedJobs.has(job.id) ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                    
                    <button
                      onClick={() => onSelectRole(job)} // Open ShareModal
                      className="text-xs font-semibold text-[#131B2E] hover:text-[#8F6529] flex items-center gap-1 cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </button>

                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onApplyForRole(job); }}
                      disabled={job.status !== 'Open'}
                      className={`${job.status !== 'Open' ? 'bg-gray-400 cursor-not-allowed opacity-50' : 'bg-[#131B2E] hover:bg-[#8F6529]'} text-white text-xs font-semibold px-3.5 py-1.5 rounded transition-colors flex items-center gap-1.5`}
                    >
                      {job.status === 'Open' && <Check className="w-3 h-3 text-[#B4813C]" />}
                      <span>
                        {job.status === 'Open' ? 'Apply Now' : job.status === 'Closed' ? 'Position Closed' : 'On Hold'}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
