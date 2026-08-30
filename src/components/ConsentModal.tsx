import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface ConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onViewPrivacy: () => void;
  onViewTerms: () => void;
}

export const ConsentModal: React.FC<ConsentModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  onViewPrivacy,
  onViewTerms
}) => {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  if (!isOpen) return null;

  const isFormValid = agreeTerms && agreePrivacy;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white text-[#131B2E] w-full max-w-md rounded-2xl shadow-2xl border border-gray-200 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold font-display">Agreement & Confirmation</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${agreeTerms ? 'bg-[#131B2E] border-[#131B2E]' : 'border-gray-300 group-hover:border-[#131B2E]'}`}>
              {agreeTerms && <Check className="w-3.5 h-3.5 text-white" />}
            </div>
            <input type="checkbox" className="hidden" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} />
            <span className="text-sm">I agree to the <button type="button" onClick={onViewTerms} className="text-[#B4813C] hover:underline font-semibold">Terms & Conditions</button></span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group">
            <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${agreePrivacy ? 'bg-[#131B2E] border-[#131B2E]' : 'border-gray-300 group-hover:border-[#131B2E]'}`}>
              {agreePrivacy && <Check className="w-3.5 h-3.5 text-white" />}
            </div>
            <input type="checkbox" className="hidden" checked={agreePrivacy} onChange={(e) => setAgreePrivacy(e.target.checked)} />
            <span className="text-sm">I agree to the <button type="button" onClick={onViewPrivacy} className="text-[#B4813C] hover:underline font-semibold">Privacy Policy</button></span>
          </label>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-medium text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={!isFormValid}
            className={`flex-1 px-4 py-2.5 rounded-lg text-white font-semibold text-sm transition-all ${
              isFormValid 
                ? 'bg-[#131B2E] hover:bg-[#8F6529] cursor-pointer' 
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Confirm & Send
          </button>
        </div>
      </div>
    </div>
  );
};
