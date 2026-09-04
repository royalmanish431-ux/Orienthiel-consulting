import React, { useState, useEffect } from 'react';
import { SPLIT_FLAP_SEEDS, LIVE_JOB_ROSTER } from '../data/portalData';
import { JobRole } from '../types';
import { Sparkles, ArrowUpRight, Play, Pause } from 'lucide-react';

interface LiveRosterBoardProps {
  onSelectRole: (role: JobRole) => void;
}

export const LiveRosterBoard: React.FC<LiveRosterBoardProps> = ({ onSelectRole }) => {
  const [cycleIndex, setCycleIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Split-flap cycling effect
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setIsFlipping(true);
      setTimeout(() => {
        setCycleIndex((prev) => (prev + 1) % 4);
        setIsFlipping(false);
      }, 300);
    }, 3200);

    return () => clearInterval(interval);
  }, [isPaused]);

  const getStatusBadge = (index: number) => {
    const statuses = ['Screening', 'Matching', 'Interviewing', 'Active Offer', 'Urgent'];
    const s = statuses[(index + cycleIndex) % statuses.length];
    return s;
  };

  const getMatchingJob = (code: string): JobRole => {
    const found = LIVE_JOB_ROSTER.find(j => j.code === code);
    if (found) return found;
    return LIVE_JOB_ROSTER[0];
  };

  return (
    <div 
      id="live-split-flap-board"
      className="bg-[#131B2E] text-[#F2F3EF] rounded-lg p-3 sm:p-4 shadow-2xl border border-white/10 relative overflow-hidden group"
    >
      {/* Subtle top ambient sheen */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      
      {/* Board Header */}
      <div className="flex items-center justify-between border-b border-white/15 pb-2 mb-2 relative z-10">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] tracking-wider uppercase text-white/60">
            Open Roles — Live Roster
          </span>
          <span className="text-[10px] font-mono bg-white/10 text-white/80 px-1.5 py-0.5 rounded">
            v2.6
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? "Resume Live Roster" : "Pause Live Roster"}
            className="p-1 rounded bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle ticker animation"
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>

          <div className="flex items-center gap-2 font-mono text-xs text-[#B4813C] font-medium">
            <span className="w-2 h-2 rounded-full bg-[#B4813C] animate-pulse-slow"></span>
            <span>Matching now</span>
          </div>
        </div>
      </div>

      {/* Board Ticker Rows */}
      <div className="space-y-0.5 relative z-10" id="board-rows-container">
        {SPLIT_FLAP_SEEDS.map((item, idx) => {
          const activeTitle = item.titles[cycleIndex % item.titles.length];
          const matchedJob = getMatchingJob(item.code);
          const currentStatus = getStatusBadge(idx);

          const verticalStyles = {
            it: 'bg-[#2E6F6E] text-[#EAF5F4] border-[#3B8E8D]',
            health: 'bg-[#B14B4B] text-[#FBEBEA] border-[#D16464]',
            edu: 'bg-[#B4813C] text-[#2A1C08] font-bold border-[#D19B53]'
          }[item.label];

          return (
            <div
              key={item.code}
              id={`board-row-${item.code}`}
              className="grid grid-cols-[38px_70px_1fr_80px] sm:grid-cols-[44px_88px_1fr_95px] items-start gap-2 sm:gap-3 py-1.5 px-2 rounded border border-transparent transition-all duration-150 cursor-default group/row"
            >
              {/* Code */}
              <span className="font-mono text-[10px] text-white/45 transition-colors">
                {item.code}
              </span>

              {/* Vertical Badge */}
              <div>
                <span className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm inline-block text-center border ${verticalStyles}`}>
                  {item.vertical === 'Healthcare' ? 'HEALTH' : item.vertical === 'Education' ? 'EDU' : 'IT'}
                </span>
              </div>

              {/* Split Flap Animated Title */}
              <div className="flex items-center pr-1">
                <span 
                  className={`font-mono text-[11px] sm:text-[12px] text-[#F2F3EF] break-words transition-all ${
                    isFlipping ? 'animate-flip-down text-[#B4813C]' : ''
                  }`}
                >
                  {activeTitle}
                </span>
              </div>

              {/* Status */}
              <div className="text-right flex items-center justify-end gap-1.5 font-mono text-[10px] text-white/55">
                <span className="hidden sm:inline">{currentStatus}</span>
              </div>
            </div>
          );
        })}
      </div>


    </div>
  );
};
