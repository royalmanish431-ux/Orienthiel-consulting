import React from 'react';
import { X } from 'lucide-react';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white text-[#131B2E] w-full max-w-xl w-[92vw] max-h-[80vh] rounded-2xl shadow-2xl p-6 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold font-display">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="overflow-y-auto max-h-[60vh] text-left text-sm text-slate-700 space-y-3 leading-relaxed pr-2">
          {children}
        </div>

        <div className="mt-6 pt-4 border-t text-right">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg bg-[#131B2E] text-white font-semibold text-sm hover:bg-[#8F6529] transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
