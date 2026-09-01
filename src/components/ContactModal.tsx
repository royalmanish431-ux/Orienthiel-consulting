import React, { useState, useEffect } from 'react';
import { X, Mail, Phone, MessageSquare, Building2, CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: 'Facility Staffing Need (Urgent / Contract Placement)',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        onClose();
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', reason: 'Facility Staffing Need (Urgent / Contract Placement)', message: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [submitted, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const payload = {
      formType: "contact",
      fullName: formData.name,
      email: formData.email,
      phone: formData.phone,
      reason: formData.reason,
      message: formData.message
    };

      try {
        await fetch("https://script.google.com/macros/s/AKfycbwnV7-HfbvEVUKM7H_lgh4UHIYC0-ZMip9ImiizKZzhRP32XjVZX-4X6VYIWMa4sRMs/exec", {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          },
          body: JSON.stringify(payload)
        });
      alert("Message sent successfully!");
      onClose();
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto animate-fadeIn" onClick={onClose}>
      <div
        className="bg-white text-[#131B2E] w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col my-auto max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8 pb-4 sm:pb-6 border-b border-gray-100 relative bg-white">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-[10px] font-bold uppercase tracking-widest mb-3">
            <MessageSquare className="w-3 h-3" />
            Direct Inquiry
          </div>
          <h2 className="text-2xl font-display font-bold text-[#131B2E]">Send Us a Message</h2>
          <p className="text-sm text-gray-500 mt-1">Please provide your contact information and requirement reason below.</p>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Message Received</h3>
              <p className="text-gray-600">Thank you for reaching out. We will respond shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">FULL NAME *</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm" placeholder="Enter your full name" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">EMAIL ADDRESS *</label>
                  <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm" placeholder="name@example.com" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">PHONE NUMBER *</label>
                  <input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm" placeholder="(555) 000-0000" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">REASON FOR CONTACT *</label>
                <select value={formData.reason} onChange={(e) => setFormData({...formData, reason: e.target.value})} className="w-full px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 cursor-pointer">
                  <option>Facility Staffing Need (Urgent / Contract Placement)</option>
                  <option>Career Opportunity</option>
                  <option>General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">MESSAGE / ADDITIONAL DETAILS (OPTIONAL)</label>
                <textarea rows={4} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm" placeholder="Tell us about your staffing requirements, timeline, specialty, or any questions you have..." />
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500 pt-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Data protected under HIPAA standards.</span>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full bg-[#131B2E] text-white py-3 rounded-xl font-semibold text-sm hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                {isSubmitting ? 'Sending...' : (
                  <>
                    <Mail className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
