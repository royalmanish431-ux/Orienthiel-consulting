import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, MapPin, DollarSign, Share2, Mail, Linkedin, Twitter, Facebook, MessageCircle, Instagram, Smartphone } from 'lucide-react';
import { JobRole } from '../types';

interface ShareModalProps {
  job?: JobRole;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ job, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  
  if (!job) return null;
  
  const BASE_URL = "https://orienth.netlify.app";
  const shareUrl = `${BASE_URL}/?job=${job.id}`;
  const shareText = `🔥 Job Opportunity: ${job.title} at Orienthiel Consulting
📍 Location: ${job.location}
💰 Compensation: ${job.salary || job.compensation}

Apply or learn more here: ${shareUrl}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialButtons = [
    { name: 'WhatsApp', icon: MessageCircle, color: 'bg-green-500', action: () => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`) },
    { name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-600', action: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`) },
    { name: 'Twitter', icon: Twitter, color: 'bg-black', action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`) },
    { name: 'Facebook', icon: Facebook, color: 'bg-blue-800', action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`) },
    { name: 'Snapchat', icon: Smartphone, color: 'bg-yellow-400 text-black', action: () => { copyToClipboard(shareUrl); alert('Link copied! Share it on Snapchat.'); } },
    { name: 'Instagram', icon: Instagram, color: 'bg-gradient-to-tr from-yellow-500 to-pink-600', action: () => { copyToClipboard(shareUrl); alert('Link copied! Share it on Instagram Story.'); } },
    { name: 'Email', icon: Mail, color: 'bg-[#5D4037]', action: () => window.open(`mailto:?subject=${encodeURIComponent('Job Opening: ' + job.title)}&body=${encodeURIComponent(shareText + '\n\nApply here: ' + shareUrl)}`) },
  ];

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: job.title, url: shareUrl });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-md bg-[#FFFDF9] rounded-2xl shadow-2xl overflow-hidden border border-[#E7E1D7]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-[#E7E1D7] flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#131B2E]">Share Job Opportunity</h2>
                <p className="text-sm text-[#3B4560] mt-1">Recommend this role to your professional network</p>
              </div>
              <button onClick={onClose} className="p-1 hover:bg-[#E7E1D7] rounded-full transition-colors">
                <X className="w-5 h-5 text-[#131B2E]" />
              </button>
            </div>

            {/* Preview Box */}
            <div className="px-6 pt-6">
              <div className="bg-[#F9F6F0] p-4 rounded-xl border border-[#E7E1D7]">
                <p className="text-[10px] font-bold tracking-widest text-[#8F6529] uppercase">OrientHiel Career Requisition</p>
                <h3 className="font-bold text-[#131B2E] mt-1">{job.title}</h3>
                <div className="flex items-center gap-4 mt-3 text-xs text-[#3B4560]">
                  <div className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</div>
                  <div className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> {job.compensation}</div>
                </div>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="p-6 grid grid-cols-4 gap-3">
              {socialButtons.map((btn) => (
                <button
                  key={btn.name}
                  onClick={btn.action}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl ${btn.color} text-white transition-transform hover:scale-105`}
                >
                  <btn.icon className="w-5 h-5" />
                  <span className="text-[9px] mt-1 font-semibold">{btn.name}</span>
                </button>
              ))}
            </div>

            {/* Link Section */}
            <div className="px-6 pb-6">
              <div className="flex items-center gap-2 p-2 bg-[#F9F6F0] rounded-lg border border-[#E7E1D7]">
                <input readOnly value={shareUrl} className="flex-1 bg-transparent text-xs text-[#3B4560] px-2 outline-none" />
                <button
                  onClick={() => copyToClipboard(shareUrl)}
                  className="flex items-center gap-1 bg-[#131B2E] text-white text-xs px-3 py-1.5 rounded-md hover:bg-[#8F6529] transition-colors"
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>

              {navigator.share && (
                <button
                  onClick={handleNativeShare}
                  className="w-full mt-3 flex items-center justify-center gap-2 text-xs font-semibold text-[#131B2E] border border-[#131B2E] py-2.5 rounded-lg hover:bg-[#131B2E] hover:text-white transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  More Share Options
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
