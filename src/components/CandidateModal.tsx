import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Lock,
  Eye,
  EyeOff,
  Linkedin,
  Upload,
  CheckCircle2,
  Stethoscope,
  ShieldCheck,
  FileText,
  Trash2,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { JobRole } from '../types';
import { ConsentModal } from './ConsentModal';

interface CandidateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewChange: (view: 'home' | 'jobs' | 'contact' | 'privacy' | 'terms') => void;
  preselectedJob?: JobRole | null;
}

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming'
];

export const CandidateModal: React.FC<CandidateModalProps> = ({
  isOpen,
  onClose,
  onViewChange,
  preselectedJob
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [ssn, setSsn] = useState('');
  const [showSsn, setShowSsn] = useState(false);
  const [linkedIn, setLinkedIn] = useState('');
  const [preference, setPreference] = useState('');
  
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string } | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  // Initialize preference text based on preselectedJob
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    if (preselectedJob) {
      setPreference(
        `Applying for ${preselectedJob.code}: ${preselectedJob.title} (${preselectedJob.location}). Preferred shift: Day / Full-time direct placement.`
      );
    } else {
      setPreference(
        'Applying for: General Placement across Healthcare / IT / Education opportunities. Preferred shift: Flexible.'
      );
    }
  }, [preselectedJob, isOpen]);

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        onClose();
        setSubmitted(false);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setStreetAddress('');
        setCity('');
        setState('');
        setZipCode('');
        setLinkedIn('');
        setUploadedFile(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [submitted, onClose]);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setUploadedFile({
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`
      });
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile({
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFinalSubmit();
  };

  const handleFinalSubmit = () => {
    setIsConsentModalOpen(false);
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 850);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setStreetAddress('');
    setCity('');
    setState('');
    setZipCode('');
    setSsn('');
    setLinkedIn('');
    setUploadedFile(null);
    onClose();
  };

  const formTitle = preselectedJob
    ? `Apply For: ${preselectedJob.title}`
    : 'Apply For: Nursing Director, Emergency Services';

  const badgeCategory = preselectedJob?.vertical
    ? `${preselectedJob.vertical.toUpperCase()} APPLICATION FORM`
    : 'CLINICIAN APPLICATION FORM';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto animate-fadeIn" onClick={onClose}>
      <motion.div
        className="bg-white text-[#131B2E] w-full max-w-3xl rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col my-auto max-h-[94vh]"
        id="candidate-application-modal"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.1}
        onDragEnd={(_, info) => {
          if (info.offset.y > 100) onClose();
        }}
      >
        {/* Top Header Bar */}
        <div className="p-6 sm:p-8 pb-4 sm:pb-6 border-b border-gray-100 relative bg-white">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Close form"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col gap-3 pr-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Form Category Badge - Removed */}
              <div className="hidden" />

              {/* Rapid Placement Tag - Removed */}
              <div className="hidden" />
            </div>

            {/* Header Main Title */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight font-display leading-tight">
                {formTitle}
              </h2>
              <p className="text-sm text-gray-500 mt-1.5">
                Fill in your details below to get connected with top {preselectedJob ? preselectedJob.vertical.toLowerCase() : 'healthcare'} facilities nationwide.
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Form Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {submitted ? (
            <div className="py-12 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#111827]">
                  Application Submitted Successfully
                </h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{firstName} {lastName}</strong>. Your candidate dossier has been prioritized and routed to our specialized recruitment board.
                </p>
              </div>

              <div className="p-5 bg-[#F9FAFB] rounded-xl border border-gray-200 text-xs text-gray-600 max-w-md mx-auto text-left space-y-2">
                <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>HIPAA &amp; Zero-Candidate-Fee Guarantee Verified</span>
                </div>
                <div>&bull; <strong>Status:</strong> Assigned to Dedicated Talent Partner</div>
                <div>&bull; <strong>Next Step:</strong> Direct phone/video briefing within 24 hours</div>
                {uploadedFile && (
                  <div>&bull; <strong>Attached:</strong> {uploadedFile.name} ({uploadedFile.size})</div>
                )}
              </div>

              <button
                onClick={handleReset}
                className="mt-4 bg-[#111827] hover:bg-[#8F6529] text-white text-sm font-semibold px-6 py-3 rounded-lg transition-all shadow-sm cursor-pointer"
              >
                Close &amp; Return to Openings
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Row 1: First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    First Name <span className="text-teal-600">*</span>
                  </label>
                  <div className="relative rounded-lg shadow-xs">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="e.g. Sarah"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50/70 focus:bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Last Name <span className="text-teal-600">*</span>
                  </label>
                  <div className="relative rounded-lg shadow-xs">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="e.g. Jenkins"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50/70 focus:bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Email <span className="text-teal-600">*</span>
                  </label>
                  <div className="relative rounded-lg shadow-xs">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sarah.jenkins@example.com"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50/70 focus:bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Number <span className="text-teal-600">*</span>
                  </label>
                  <div className="relative rounded-lg shadow-xs">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 019-2834"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50/70 focus:bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Street Address */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Street Address <span className="text-teal-600">*</span>
                </label>
                <div className="relative rounded-lg shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    placeholder="e.g. 742 Evergreen Terrace, Apt 4B"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50/70 focus:bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  />
                </div>
              </div>

              {/* Row 4: City, State, Zip Code */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    City <span className="text-teal-600">*</span>
                  </label>
                  <div className="relative rounded-lg shadow-xs">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Houston"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50/70 focus:bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    State <span className="text-teal-600">*</span>
                  </label>
                  <select
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50/70 focus:bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all cursor-pointer"
                  >
                    <option value="">Select State</option>
                    {US_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Zip Code <span className="text-teal-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="e.g. 77002"
                    className="w-full px-3.5 py-2.5 bg-gray-50/70 focus:bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  />
                </div>
              </div>

              {/* Row 5: SSN (Encrypted) & LinkedIn Id */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-gray-700">
                      SSN: <span className="text-teal-600">*</span>
                    </label>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      <Lock className="w-3 h-3" />
                      HIPAA Encrypted
                    </span>
                  </div>
                  <div className="relative rounded-lg shadow-xs">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showSsn ? 'text' : 'password'}
                      required
                      value={ssn}
                      onChange={(e) => setSsn(e.target.value)}
                      placeholder="XXX-XX-XXXX"
                      maxLength={11}
                      className="w-full pl-10 pr-10 py-2.5 bg-gray-50/70 focus:bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 font-mono focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSsn(!showSsn)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      {showSsn ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    LinkedIn Id:
                  </label>
                  <div className="relative rounded-lg shadow-xs">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={linkedIn}
                      onChange={(e) => setLinkedIn(e.target.value)}
                      placeholder="e.g. linkedin.com/in/username or @username"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50/70 focus:bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Row 6: Upload Resume Dropzone */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Upload Resume:
                </label>
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer relative ${
                    dragActive
                      ? 'border-teal-500 bg-teal-50/50'
                      : uploadedFile
                      ? 'border-teal-300 bg-teal-50/20'
                      : 'border-teal-300/80 bg-[#FAFCFB] hover:border-teal-500 hover:bg-teal-50/30'
                  }`}
                >
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc,.rtf"
                    onChange={handleFileInput}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />

                  {uploadedFile ? (
                    <div className="flex items-center justify-center gap-3">
                      <FileText className="w-7 h-7 text-teal-600 shrink-0" />
                      <div className="text-left">
                        <p className="text-sm font-semibold text-gray-900">{uploadedFile.name}</p>
                        <p className="text-xs text-gray-500">{uploadedFile.size} &bull; Attached</p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadedFile(null);
                        }}
                        className="ml-2 p-1.5 text-gray-400 hover:text-red-500 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2.5">
                      <div className="w-12 h-12 rounded-full bg-teal-100/70 text-teal-700 flex items-center justify-center">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-sm font-semibold text-gray-900">
                          Click to upload your resume / credentials
                        </p>
                        <p className="text-xs text-gray-500 font-mono">
                          Supports PDF, DOCX, RTF (Max 10MB)
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Row 7: Write your preference */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Write your preference
                </label>
                <textarea
                  rows={3}
                  value={preference}
                  onChange={(e) => setPreference(e.target.value)}
                  placeholder="Applying for Job #1: Nursing Director, Emergency Services (Sunnyvale, TX). Preferred shift: Day, Fulltime."
                  className="w-full px-3.5 py-2.5 bg-gray-50/70 focus:bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all leading-relaxed resize-none"
                />
              </div>

              {/* Consent Section */}
              <div className="border-2 border-teal-200 bg-teal-50/40 rounded-xl p-4 my-4 space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                  />
                  <span className="text-sm text-gray-700">
                    I have read and agree to the <button type="button" onClick={() => onViewChange('terms')} className="font-bold underline text-teal-700">Candidate Placement & Employment Terms & Conditions *</button>
                    <p className="text-xs text-gray-500 mt-0.5">(Licensure eligibility, AHA BLS certification, background verification authorization & compensation commitments)</p>
                  </span>
                </label>
                
                <hr className="border-teal-200" />
                
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    checked={privacyAccepted}
                    onChange={(e) => setPrivacyAccepted(e.target.checked)}
                  />
                  <span className="text-sm text-gray-700">
                    I have read and agree to the <button type="button" onClick={() => onViewChange('privacy')} className="font-bold underline text-teal-700">HIPAA Compliance & Privacy Policy *</button>
                    <p className="text-xs text-gray-500 mt-0.5">(Authorized handling and encrypted processing of candidate SSN and credentials with partner healthcare facilities)</p>
                  </span>
                </label>
              </div>

              {/* Submit Button & Security Note */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Your data & SSN are encrypted under Joint Commission & HIPAA standards.</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !termsAccepted || !privacyAccepted}
                  className="w-full sm:w-auto bg-[#111827] hover:bg-[#8F6529] text-white text-sm font-semibold px-8 py-3 rounded-lg transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting Application...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <ArrowRight className="w-4 h-4 text-[#B4813C]" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
