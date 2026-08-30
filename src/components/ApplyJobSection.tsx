import React, { useState } from 'react';
import {
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

interface ApplyJobSectionProps {
  preselectedJob?: JobRole | null;
  onClearPreselected?: () => void;
}


export const ApplyJobSection: React.FC<ApplyJobSectionProps> = ({
  preselectedJob,
  onClearPreselected
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [preference, setPreference] = useState(
    'Applying for Job #1: Nursing Director, Emergency Services (Sunnyvale, TX). Preferred shift: Day, Fulltime.'
  );

  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string } | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setLinkedIn('');
    setUploadedFile(null);
    if (onClearPreselected) onClearPreselected();
  };

  const targetTitle = preselectedJob
    ? `Apply For: ${preselectedJob.title}`
    : 'Apply For: Nursing Director, Emergency Services';

  const badgeCategory = preselectedJob?.vertical
    ? `${preselectedJob.vertical.toUpperCase()} APPLICATION FORM`
    : 'CLINICIAN APPLICATION FORM';

  return (
    <section className="py-16 sm:py-24 bg-[#F2F3EF] border-t border-[#131B2E]/10" id="apply-job">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Main Application Container matching the exact card design */}
        <div
          className="bg-white rounded-3xl shadow-xl border border-gray-200/80 p-6 sm:p-10 lg:p-12 text-[#131B2E]"
          id="apply-job-card"
        >
          {/* Header section of card */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              {/* Category Badge */}
              <div className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider text-teal-800 bg-teal-50 border border-teal-200">
                {badgeCategory}
              </div>

              {/* Rapid 24h Placement Tag */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200">
                <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
                <span>Rapid 24h Placement</span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111827] tracking-tight font-display">
              {targetTitle}
            </h2>
            <p className="text-sm sm:text-base text-gray-500 mt-2">
              Fill in your details below to get connected with top healthcare facilities nationwide.
            </p>
          </div>

          {/* Form Content / Success State */}
          {submitted ? (
            <div className="py-10 text-center space-y-5 bg-teal-50/30 rounded-2xl p-8 border border-teal-100">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-2xl font-bold text-[#111827]">
                  Application Dispatched to Talent Team
                </h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{firstName} {lastName}</strong>. Your candidate dossier and encrypted credentials have been recorded.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-gray-200 text-xs text-gray-600 max-w-md mx-auto text-left space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>HIPAA Compliant &bull; 100% Free for Candidates</span>
                </div>
                <div>&bull; <strong>Recruiter Review:</strong> Assigned for 24-hour expedited placement.</div>
                <div>&bull; <strong>Direct Contact:</strong> We will reach you via {phone || email}.</div>
                {uploadedFile && (
                  <div>&bull; <strong>Resume Received:</strong> {uploadedFile.name}</div>
                )}
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="bg-[#111827] hover:bg-[#8F6529] text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-lg transition-all cursor-pointer shadow-sm"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    First Name <span className="text-teal-600">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="e.g. Sarah"
                      className="w-full pl-10 pr-3.5 py-3 bg-gray-50/70 focus:bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Last Name <span className="text-teal-600">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="e.g. Jenkins"
                      className="w-full pl-10 pr-3.5 py-3 bg-gray-50/70 focus:bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Email & Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Email <span className="text-teal-600">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sarah.jenkins@example.com"
                      className="w-full pl-10 pr-3.5 py-3 bg-gray-50/70 focus:bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Number <span className="text-teal-600">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 019-2834"
                      className="w-full pl-10 pr-3.5 py-3 bg-gray-50/70 focus:bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* LinkedIn Id */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  LinkedIn Id:
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={linkedIn}
                    onChange={(e) => setLinkedIn(e.target.value)}
                    placeholder="e.g. linkedin.com/in/username or @username"
                    className="w-full pl-10 pr-3.5 py-3 bg-gray-50/70 focus:bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  />
                </div>
              </div>

              {/* Upload Resume */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Upload Resume:
                </label>
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer relative ${
                    dragActive
                      ? 'border-teal-500 bg-teal-50/60'
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
                      <FileText className="w-8 h-8 text-teal-600 shrink-0" />
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
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-teal-100/80 text-teal-700 flex items-center justify-center">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
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

              {/* Write your preference */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Write your preference
                </label>
                <textarea
                  rows={3}
                  value={preference}
                  onChange={(e) => setPreference(e.target.value)}
                  placeholder="Applying for Job #1: Nursing Director, Emergency Services (Sunnyvale, TX). Preferred shift: Day, Fulltime."
                  className="w-full px-4 py-3 bg-gray-50/70 focus:bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all leading-relaxed resize-none"
                />
              </div>

              {/* Submit Button & Security Note */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Orienthiel Consulting guarantees zero candidate placement fees.</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-[#111827] hover:bg-[#8F6529] text-white text-sm font-semibold px-8 py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
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

      </div>
    </section>
  );
};
