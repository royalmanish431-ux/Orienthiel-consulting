import React from 'react';
import { PolicyModal } from './PolicyModal';

export const PrivacyPolicy: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <PolicyModal isOpen={isOpen} onClose={onClose} title="Privacy Policy">
      <p>Effective Date: August 2026</p>
      <p>Orienthiel Consulting Inc. respects your privacy and is committed to protecting the personal information you provide through our website and services.</p>

      <h3 className="font-bold">Information We Collect</h3>
      <p>We may collect information such as:</p>
      <ul className="list-disc pl-5">
        <li>Name and contact information</li>
        <li>Resume/CV and professional qualifications</li>
        <li>Employment and education history</li>
        <li>Licensing and certification information</li>
        <li>Information submitted through job applications or contact forms</li>
        <li>Information required to provide staffing and recruitment services</li>
        <li>Website usage and technical information</li>
      </ul>

      <h3 className="font-bold">How We Use Information</h3>
      <p>We may use collected information to:</p>
      <ul className="list-disc pl-5">
        <li>Evaluate candidates for employment opportunities</li>
        <li>Match candidates with suitable positions</li>
        <li>Communicate regarding job opportunities and staffing services</li>
        <li>Respond to inquiries</li>
        <li>Provide recruitment and workforce solutions</li>
        <li>Verify qualifications and credentials where applicable</li>
        <li>Improve our website and services</li>
        <li>Meet applicable legal and regulatory requirements</li>
      </ul>

      <h3 className="font-bold">Information Sharing</h3>
      <p>We may share information with clients, prospective employers, service providers, or other parties when reasonably necessary to provide staffing services, process applications, perform background or credential verification, or comply with legal obligations.</p>
      <p>We do not sell personal information for unrelated commercial purposes.</p>

      <h3 className="font-bold">Data Security</h3>
      <p>We take reasonable administrative, technical, and organizational measures to protect personal information against unauthorized access, disclosure, alteration, or misuse.</p>

      <h3 className="font-bold">Third-Party Websites</h3>
      <p>Our website may contain links to third-party websites. Orienthiel Consulting Inc. is not responsible for the privacy practices or content of external websites.</p>

      <h3 className="font-bold">Your Choices</h3>
      <p>You may contact us to request information about the personal data we maintain about you or to request correction or deletion where permitted by applicable law.</p>
    </PolicyModal>
  );
};
