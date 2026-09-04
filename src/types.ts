export type IndustryVertical = 'IT' | 'Healthcare' | 'Education';

export type StaffingModel = 
  | 'Permanent Placement' 
  | 'Contract Staffing' 
  | 'PRN & Per-Diem' 
  | 'Locum Tenens' 
  | 'Temporary Staffing';

export type RoleStatus = 'Screening' | 'Submitted' | 'Open' | 'Interviewing' | 'Urgent' | 'Active' | 'Closed' | 'Hold';

export interface JobRole {
  id: string;
  code: string;
  vertical: IndustryVertical;
  label: 'it' | 'health' | 'edu';
  title: string;
  model: StaffingModel;
  location: string;
  compensation: string;
  salary?: string;
  bonus?: string;
  status: RoleStatus;
  department: string;
  filter?: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  postedDaysAgo: number;
  shift?: string;
  schedule?: string;
  workArrangement?: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  shortDesc: string;
  details: string;
  keyAction: string;
  estimatedTimeline: string;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: 'General' | 'Process' | 'Requirements' | 'Candidate Safety';
}

export interface WhyPillar {
  number: string;
  title: string;
  description: string;
  highlight?: string;
}

export interface ServiceDetail {
  id: 'it' | 'health' | 'edu';
  badge: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  specialties: string[];
  modelsSupported: string[];
  accentColor: string;
  textColor: string;
  bgColor: string;
}
