import React from 'react';
import { PolicyModal } from './PolicyModal';

export const TermsAndConditions: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <PolicyModal isOpen={isOpen} onClose={onClose} title="Terms and Conditions">
      <p>By accessing or using the Orienthiel Consulting Inc. website, you agree to these Terms and Conditions.</p>

      <h3 className="font-bold">Website Use</h3>
      <p>The website is provided for informational, recruitment, staffing, and employment-related purposes. Users agree to use the website lawfully and responsibly.</p>

      <h3 className="font-bold">Job Opportunities</h3>
      <p>Job postings and employment opportunities may change, be modified, or become unavailable without notice. Posting a position does not guarantee employment, placement, or selection.</p>

      <h3 className="font-bold">Candidate Information</h3>
      <p>Candidates are responsible for providing accurate, complete, and current information. Misrepresentation of qualifications, credentials, employment history, or other information may affect eligibility for opportunities.</p>

      <h3 className="font-bold">Client Information</h3>
      <p>Organizations engaging with Orienthiel Consulting Inc. are responsible for providing accurate information regarding their staffing requirements, employment conditions, qualifications, and other relevant job details.</p>

      <h3 className="font-bold">Intellectual Property</h3>
      <p>Website content, branding, logos, graphics, text, and other materials belonging to Orienthiel Consulting Inc. may not be reproduced, distributed, modified, or used without prior written permission.</p>

      <h3 className="font-bold">Third-Party Links</h3>
      <p>Our website may contain links to third-party websites. We do not control or guarantee the accuracy, availability, security, or content of external websites.</p>

      <h3 className="font-bold">Limitation of Liability</h3>
      <p>To the extent permitted by applicable law, Orienthiel Consulting Inc. shall not be responsible for losses arising from reliance on website information, job postings, third-party content, website interruptions, or unauthorized access beyond our reasonable control.</p>

      <h3 className="font-bold">Changes to These Terms</h3>
      <p>We may update these Terms and Conditions from time to time. Updated terms will become effective when posted on this website.</p>

      <h3 className="font-bold">Equal Opportunity Statement</h3>
      <p>Orienthiel Consulting Inc. is committed to providing equal employment and staffing opportunities. We support a professional environment where individuals are considered based on their qualifications, skills, experience, and business requirements. We do not tolerate unlawful discrimination or harassment and encourage qualified professionals from diverse backgrounds to explore opportunities with us.</p>
    </PolicyModal>
  );
};
