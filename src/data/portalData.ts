import { JobRole, ProcessStep, FaqItem, WhyPillar, ServiceDetail } from '../types';

export const SPLIT_FLAP_SEEDS = [
  { 
    code: "IT-014", 
    vertical: "IT" as const, 
    label: "it" as const, 
    titles: [
      "Senior Cloud Infrastructure Engineer",
      "Cybersecurity Solutions Architect",
      "Lead DevOps / SRE Specialist",
      "Enterprise IT Systems Director"
    ]
  },
  { 
    code: "HC-227", 
    vertical: "Healthcare" as const, 
    label: "health" as const, 
    titles: [
      "ICU Registered Nurse — Locum Tenens",
      "Emergency Dept Staff RN — Contract",
      "Cardiovascular Nurse Specialist",
      "Travel Nurse — Critical Care"
    ]
  },
  { 
    code: "ED-091", 
    vertical: "Education" as const, 
    label: "edu" as const, 
    titles: [
      "Special Education Instructor",
      "Middle School Math & STEM Educator",
      "District Speech-Language Pathologist",
      "Director of Student Services"
    ]
  },
  { 
    code: "IT-052", 
    vertical: "IT" as const, 
    label: "it" as const, 
    titles: [
      "Business Systems Analyst",
      "Data Warehouse & ETL Architect",
      "Senior Full-Stack Software Engineer",
      "Network Infrastructure Manager"
    ]
  },
  { 
    code: "HC-118", 
    vertical: "Healthcare" as const, 
    label: "health" as const, 
    titles: [
      "Family Nurse Practitioner — PRN",
      "Hospitalist Physician — Locum Tenens",
      "Clinical Laboratory Scientist",
      "Physical Therapist — Per-Diem"
    ]
  }
];

export const LIVE_JOB_ROSTER: JobRole[] = [
  {
    id: "job-it-014",
    code: "IT-014",
    vertical: "IT",
    label: "it",
    title: "Senior Cloud Infrastructure Engineer",
    model: "Contract Staffing",
    location: "Remote / Hybrid (New York, NY)",
    compensation: "$85 – $110 / hr",
    status: "Closed",
    department: "Cloud & Infrastructure Operations",
    description: "Seeking an experienced Cloud Architect & Infrastructure Engineer to lead hybrid AWS/GCP migration, Kubernetes container orchestration, and CI/CD pipeline automation for a high-availability fintech ecosystem.",
    requirements: [
      "5+ years of hands-on Terraform and multi-cloud infrastructure automation",
      "Extensive experience with Kubernetes (EKS/GKE) and microservice architecture",
      "Proficiency in Python, Bash, or Go scripting for infrastructure as code",
      "AWS Certified Solutions Architect or GCP Professional Cloud Architect preferred"
    ],
    responsibilities: [
      "Architect and implement zero-downtime deployment pipelines",
      "Ensure SOC2 and HIPAA compliant infrastructure telemetry and IAM policies",
      "Collaborate with security and software engineering teams on infrastructure reliability"
    ],
    postedDaysAgo: 1
  },
  {
    id: "job-hc-227",
    code: "HC-227",
    vertical: "Healthcare",
    label: "health",
    title: "ICU Registered Nurse — Locum Tenens",
    model: "Locum Tenens",
    location: "Boston, MA (Level I Trauma Center)",
    compensation: "$68 – $84 / hr + Stipend",
    status: "Interviewing",
    department: "Intensive Care Unit / Critical Care",
    description: "Provide dedicated direct patient care in a fast-paced Level I trauma ICU setting. Full travel stipend, lodging support, and comprehensive malpractice coverage included.",
    requirements: [
      "Active Massachusetts RN License (or compact state license in good standing)",
      "Current BLS, ACLS, and NIHSS certifications",
      "Minimum 2 years recent Level I or Level II ICU bedside clinical experience",
      "Familiarity with Epic EMR charting"
    ],
    responsibilities: [
      "Manage ventilators, hemodynamic monitoring, and acute medication titrations",
      "Deliver compassionate, high-vigilance clinical care to critically ill patients",
      "Coordinate with interdisciplinary physician and respiratory therapy teams"
    ],
    postedDaysAgo: 2
  },
  {
    id: "job-ed-091",
    code: "ED-091",
    vertical: "Education",
    label: "edu",
    title: "Special Education Instructor (K-12)",
    model: "Permanent Placement",
    location: "Austin, TX (Public School District)",
    compensation: "$62,000 – $78,000 / yr + Full District Benefits",
    status: "Open",
    department: "Special Services & Inclusive Learning",
    description: "Lead inclusive and resource-classroom education for elementary and middle school students with diverse learning needs, tailoring individualized IEP strategies and classroom accommodations.",
    requirements: [
      "State of Texas Special Education Certification (EC-12 or 4-8)",
      "Bachelor's or Master's in Special Education or related pedagogical field",
      "Strong track record with IEP goal design, ARD committee meetings, and differentiated instruction",
      "Clean background check and fingerprint clearance"
    ],
    responsibilities: [
      "Develop, monitor, and execute individualized educational programs (IEPs)",
      "Partner with general education educators, speech therapists, and parents",
      "Foster an engaging, supportive, and emotionally safe classroom climate"
    ],
    postedDaysAgo: 3
  },
  {
    id: "job-it-052",
    code: "IT-052",
    vertical: "IT",
    label: "it",
    title: "Business Systems Analyst — ERP Systems",
    model: "Permanent Placement",
    location: "Chicago, IL / Hybrid",
    compensation: "$115,000 – $135,000 / yr",
    status: "Hold",
    department: "Enterprise Applications",
    description: "Translate complex business and financial workflows into scalable ERP configurations (SAP / NetSuite / Salesforce) with robust stakeholder alignment and data auditing.",
    requirements: [
      "4+ years experience analyzing business process workflows in enterprise environments",
      "Solid SQL querying and system integration mapping proficiency",
      "Proven ability to bridge communication between executive leadership and dev teams",
      "CBAP or PMI-PBA certification is a strong plus"
    ],
    responsibilities: [
      "Document current and future state workflows and functional specification docs",
      "Conduct user acceptance testing (UAT) and post-release support",
      "Design KPI dashboards and system efficiency reports"
    ],
    postedDaysAgo: 4
  },
  {
    id: "job-hc-118",
    code: "HC-118",
    vertical: "Healthcare",
    label: "health",
    title: "Family Nurse Practitioner (FNP) — PRN",
    model: "PRN & Per-Diem",
    location: "Atlanta, GA (Outpatient Community Health)",
    compensation: "$72 – $88 / hr (Flexible Shifts)",
    status: "Open",
    department: "Ambulatory & Primary Care",
    description: "Provide high-quality primary care diagnostics, wellness checkups, and chronic condition management across diverse patient populations with flexible weekly shift scheduling.",
    requirements: [
      "Master's Degree in Nursing (MSN) and active APRN / FNP licensure in Georgia",
      "Current DEA registration and board certification (AANP or ANCC)",
      "At least 1 year independent practice experience in outpatient or urgent care",
      "Bilingual (English/Spanish) is highly desirable"
    ],
    responsibilities: [
      "Examine, diagnose, and treat acute illnesses and routine patient consultations",
      "Prescribe medications and formulate individualized wellness treatment plans",
      "Ensure prompt electronic health record (EHR) completion per clinical standards"
    ],
    postedDaysAgo: 1
  },
  {
    id: "job-it-089",
    code: "IT-089",
    vertical: "IT",
    label: "it",
    title: "Cybersecurity Threat Analyst",
    model: "Contract Staffing",
    location: "Remote (US Eastern Time)",
    compensation: "$75 – $95 / hr",
    status: "Screening",
    department: "Security Operations Center (SOC)",
    description: "Monitor, analyze, and remediate advanced security events across SIEM, EDR, and cloud perimeter endpoints for a nationwide healthcare network.",
    requirements: [
      "3+ years active SOC or incident response experience",
      "Hands-on experience with Splunk, CrowdStrike Falcon, and Sentinel",
      "CISSP, CySA+, or CEH certifications preferred",
      "Clear understanding of NIST and MITRE ATT&CK frameworks"
    ],
    responsibilities: [
      "Investigate security anomalies and execute containment playbooks",
      "Perform root cause analysis and post-incident forensic write-ups",
      "Assist in automated alert tuning and threat hunting exercises"
    ],
    postedDaysAgo: 2
  },
  {
    id: "job-ed-104",
    code: "ED-104",
    vertical: "Education",
    label: "edu",
    title: "School Psychologist / Counselor",
    model: "Contract Staffing",
    location: "Denver, CO",
    compensation: "$55 – $70 / hr",
    status: "Interviewing",
    department: "Student Psychological & Behavioral Services",
    description: "Conduct psycho-educational evaluations, behavioral support assessments, and individual crisis counseling for K-12 students within public charter networks.",
    requirements: [
      "Master's or Specialist degree in School Psychology and State License / NCSP",
      "Experience conducting standardized cognitive, behavioral, and academic testing",
      "Skilled in crisis intervention, RTI tiers, and positive behavioral interventions",
      "Effective communication with multidisciplinary school teams"
    ],
    responsibilities: [
      "Administer and interpret diagnostic psychological evaluations",
      "Lead 504 and IEP multidisciplinary evaluation team conferences",
      "Provide short-term solution-focused counseling to at-risk students"
    ],
    postedDaysAgo: 5
  },
  {
    id: "job-hc-305",
    code: "HC-305",
    vertical: "Healthcare",
    label: "health",
    title: "Radiologic Technologist (ARRT)",
    model: "Temporary Staffing",
    location: "Seattle, WA (Regional Medical Center)",
    compensation: "$48 – $62 / hr",
    status: "Open",
    department: "Diagnostic Imaging",
    description: "Operate stationary and mobile diagnostic radiographic equipment to obtain high-resolution diagnostic images for orthopedic and trauma clinical teams.",
    requirements: [
      "ARRT (R) Certification and Washington State Radiologic Technologist license",
      "Current BLS CPR certification through AHA",
      "Proficiency with digital radiography (DR) and fluoroscopy equipment",
      "Strong patient positioning skills and radiation safety protocol compliance"
    ],
    responsibilities: [
      "Execute routine and trauma diagnostic X-ray procedures accurately",
      "Maintain sterile imaging field in operating room and emergency room settings",
      "Coordinate seamlessly with radiologists and attending physicians"
    ],
    postedDaysAgo: 3
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Application",
    shortDesc: "Submit your resume through our site or apply to a live opening directly.",
    details: "Your profile enters our candidate database with automated matching against our current open requisitions across IT, Healthcare, and Education.",
    keyAction: "Resume Intake & Initial Match",
    estimatedTimeline: "Day 1"
  },
  {
    number: "02",
    title: "Resume Review",
    shortDesc: "Our recruiting team reviews your qualifications, experience, and availability.",
    details: "Dedicated industry-specific recruiters thoroughly assess your skillsets, past achievements, career trajectory, and scheduling availability.",
    keyAction: "Deep Background Analysis",
    estimatedTimeline: "1–2 Business Days"
  },
  {
    number: "03",
    title: "Recruiter Screening",
    shortDesc: "A conversation on experience, expectations, location, and interest in the role.",
    details: "We connect 1-on-1 to discuss your target compensation, shift/work preferences, workplace culture fit, and long-term career aspirations.",
    keyAction: "1-on-1 Alignment Interview",
    estimatedTimeline: "20–30 Minute Call"
  },
  {
    number: "04",
    title: "Qualification Verification",
    shortDesc: "Credentials, licensing, and experience are confirmed against role requirements.",
    details: "We verify active state licensures, certifications, educational transcripts, professional licenses, and reference checks with total compliance.",
    keyAction: "Compliance & Credential Audit",
    estimatedTimeline: "2–3 Business Days"
  },
  {
    number: "05",
    title: "Client Submission",
    shortDesc: "Your profile is presented to the hiring organization for consideration.",
    details: "We highlight your key technical proficiencies and unique value directly to hiring managers and clinical directors with priority advocacy.",
    keyAction: "Direct Hiring Manager Briefing",
    estimatedTimeline: "24–48 Hours"
  },
  {
    number: "06",
    title: "Interview",
    shortDesc: "The next stage of the client's own interview process, coordinated with you.",
    details: "We schedule interviews, provide comprehensive role briefings, company culture insights, and preparation support before you speak with the team.",
    keyAction: "Client Interviews & Debriefing",
    estimatedTimeline: "Scheduled per client"
  },
  {
    number: "07",
    title: "Selection",
    shortDesc: "The client confirms the candidate they'd like to move forward with.",
    details: "Once the client extends an offer, our team assists in negotiating optimal compensation, per-diem allowances, and contract terms on your behalf.",
    keyAction: "Offer Presentation & Negotiation",
    estimatedTimeline: "1–2 Days"
  },
  {
    number: "08",
    title: "Credentialing & Checks",
    shortDesc: "Background checks and, where applicable, additional credentialing.",
    details: "Comprehensive criminal background checks, drug screenings, medical immunization records, and facility-specific compliance packages are completed.",
    keyAction: "Full Security & Medical Clearance",
    estimatedTimeline: "3–7 Business Days"
  },
  {
    number: "09",
    title: "Onboarding",
    shortDesc: "Paperwork, documentation, and preparation ahead of the start date.",
    details: "Streamlined digital paperwork, tax forms, direct deposit setup, badge requests, and orientation schedules are coordinated smoothly.",
    keyAction: "Digital Onboarding Package",
    estimatedTimeline: "Prior to Start Date"
  },
  {
    number: "10",
    title: "Placement",
    shortDesc: "You start the role — with our team available throughout the assignment.",
    details: "You begin your placement! Our dedicated workforce support team remains your ongoing partner for timesheet support, extensions, or transitions.",
    keyAction: "Day 1 Kickoff & Continuous Support",
    estimatedTimeline: "Assignment Duration"
  }
];

export const WHY_PILLARS: WhyPillar[] = [
  {
    number: "01",
    title: "Industry Expertise",
    description: "Solutions designed around the specific requirements of IT, Education, and Healthcare organizations.",
    highlight: "Specialized knowledge in clinical compliance, technical architectures, and academic credentialing."
  },
  {
    number: "02",
    title: "Quality Talent",
    description: "We identify professionals whose skills, experience, and goals genuinely align with client requirements.",
    highlight: "Multi-stage vetting and rigorous reference checks to ensure reliable long-term capability."
  },
  {
    number: "03",
    title: "Flexible Models",
    description: "Permanent, contract, PRN, per-diem, temporary, and locum — whatever the workforce need calls for.",
    highlight: "Agile staffing agility capable of scaling from single emergency shifts to whole department deployments."
  },
  {
    number: "04",
    title: "Candidate-Focused",
    description: "We help professionals find opportunities that fit their qualifications and career goals, not just any opening.",
    highlight: "Personalized career advocacy, competitive compensation transparency, and dedicated recruiter touchpoints."
  },
  {
    number: "05",
    title: "Client-Focused",
    description: "We take the time to understand each organization's workforce requirements before we recruit against them.",
    highlight: "Tailored candidate matching that respects organizational culture, technical standards, and budget."
  },
  {
    number: "06",
    title: "Reliable Service",
    description: "Communication, responsiveness, and transparency, aimed at long-term relationships over one-off placements."
  }
];

export const FAQ_DATA: FaqItem[] = [
  {
    id: 1,
    category: "General",
    question: "How do I apply for a job with Orienthiel Consulting Inc.?",
    answer: "Submit your resume through our website or apply directly to an available opening. Our recruiting team reviews your qualifications, experience, availability, and other position-specific requirements promptly to match you with top opportunities."
  },
  {
    id: 2,
    category: "General",
    question: "What types of positions does Orienthiel Consulting Inc. recruit for?",
    answer: "We recruit across Healthcare, IT, and Education — including permanent placements, contract staffing, temporary roles, PRN, per-diem shifts, locum tenens, and other flexible staffing arrangements tailored to client and candidate needs."
  },
  {
    id: 3,
    category: "Process",
    question: "What happens after I submit my application?",
    answer: "Generally, the sequence follows: Application → Resume Review → Recruiter Screening → Qualification Verification → Client Submission → Interview → Selection → Credentialing/Background Checks → Onboarding → Placement. The exact process may vary slightly based on position, client, and industry requirements."
  },
  {
    id: 4,
    category: "Process",
    question: "Will I have an interview with Orienthiel Consulting Inc.?",
    answer: "For many roles, a recruiter conducts an initial screening covering your experience, qualifications, availability, compensation expectations, and preferred work environment. If your profile fits, we present it to the hiring organization for the next stage."
  },
  {
    id: 5,
    category: "Requirements",
    question: "What documents may be required during the hiring process?",
    answer: "Requirements vary by role — typically an updated resume, professional references, education records, state licenses, board certifications, and government ID / work authorization documents. Healthcare and education positions may require additional credentialing such as immunization records, TB tests, or fingerprinting."
  },
  {
    id: 6,
    category: "Requirements",
    question: "Do I need to be authorized to work in the United States?",
    answer: "Candidates must meet applicable employment eligibility requirements for the role and employer. Sponsorship or visa requirements depend on the specific employer and position — please check the job description or consult your recruiter."
  },
  {
    id: 7,
    category: "Requirements",
    question: "Are background checks and drug screenings required?",
    answer: "They may be required depending on the position, employer, industry, and state regulations. Healthcare, education, and certain regulated IT or government-adjacent roles routinely carry comprehensive screening and background clearance requirements."
  },
  {
    id: 8,
    category: "General",
    question: "Can I apply for more than one position?",
    answer: "Yes! You are welcome to apply to multiple positions that align with your background and qualifications. Our recruiters will also actively scan our roster to surface additional matching opportunities that fit your experience and location preferences."
  },
  {
    id: 9,
    category: "Process",
    question: "How long does the hiring process take?",
    answer: "Timelines vary depending on position urgency, employer interview scheduling, credentialing speed, and background check turnaround. Some urgent contract and PRN roles place within days, while permanent executive placements may take a few weeks. Recruiters keep you updated at every milestone."
  },
  {
    id: 10,
    category: "Candidate Safety",
    question: "Do I have to pay a fee to apply for a job?",
    answer: "No. Orienthiel Consulting Inc. never charges candidates any fee to apply or interview for job opportunities. Be cautious of anyone requesting money, gift cards, or wire transfers in exchange for a job offer — verify any suspicious communication through our official contact channels."
  }
];

export const SERVICES_DATA: ServiceDetail[] = [
  {
    id: 'it',
    badge: 'IT',
    title: 'IT Staffing',
    shortDesc: 'Technology professionals for a broad range of IT and technology-related positions, supporting both specialized and scalable staffing requirements.',
    longDesc: 'From mission-critical cloud migrations and enterprise cybersecurity to agile software engineering and IT service desk management, we deliver vetted technical talent ready to hit the ground running.',
    specialties: [
      'Cloud Architecture & DevOps (AWS, GCP, Azure)',
      'Enterprise Cybersecurity & Threat Intelligence',
      'Full-Stack & Mobile Software Engineering',
      'Data Analytics, Data Engineering & AI/ML Pipelines',
      'IT Project Management, Scrum Masters & Agile Leads',
      'ERP / CRM Specialists (Salesforce, SAP, NetSuite, Workday)'
    ],
    modelsSupported: [
      'Contract & Project-Based Staffing',
      'Contract-to-Hire (Temp-to-Perm)',
      'Specialized Surge Teams'
    ],
    accentColor: '#2E6F6E',
    textColor: '#194948',
    bgColor: 'rgba(46,111,110,0.12)'
  },
  {
    id: 'health',
    badge: 'HC',
    title: 'Healthcare Staffing',
    shortDesc: 'Qualified healthcare professionals across specialties and staffing models — permanent, contract, PRN, locum tenens, and temporary assignments.',
    longDesc: 'Supplying hospitals, health systems, clinics, and long-term care facilities with credentialed, compassionate clinical personnel to maintain peak care standards without burnout.',
    specialties: [
      'Registered Nurses (RN) — ICU, ER, Med/Surg, Telemetry, OR, PACU',
      'Locum Tenens Physicians & Hospitalists',
      'Nurse Practitioners (NP) & Physician Assistants (PA)',
      'Allied Health: Physical & Occupational Therapists (PT/OT)',
      'Diagnostic Imaging: Radiologic, CT, MRI, Ultrasound Technologists',
      'Clinical Laboratory Scientists & Phlebotomists'
    ],
    modelsSupported: [
      'Locum Tenens Physician Placement',
      'Travel & Local Contract Nursing',
      'PRN & Per-Diem Shift Coverage',
      'Permanent Clinical Leadership Placements'
    ],
    accentColor: '#B14B4B',
    textColor: '#7E2D2D',
    bgColor: 'rgba(177,75,75,0.12)'
  },
  {
    id: 'edu',
    badge: 'ED',
    title: 'Education Staffing',
    shortDesc: 'Qualified professionals for schools and education-focused organizations across teaching, administrative, special education, and support roles.',
    longDesc: 'Empowering K-12 public districts, private academies, charter networks, and higher education institutions with certified educators and vital student support specialists.',
    specialties: [
      'Special Education Instructors & Resource Specialists (K-12)',
      'STEM & Core Subject Teachers (Math, Science, Language Arts)',
      'School Psychologists, Counselors & Social Workers',
      'Speech-Language Pathologists (SLP) & Audiologists',
      'School Administrators, Principals & Department Heads',
      'Paraprofessionals, Instructional Aides & Substitute Teachers'
    ],
    modelsSupported: [
      'Full Academic Year Contracts',
      'Permanent Faculty & Admin Hiring',
      'Maternity & Sabbatical Coverage',
      'Part-Time Specialist Allocations'
    ],
    accentColor: '#B4813C',
    textColor: '#8F6529',
    bgColor: 'rgba(180,129,60,0.14)'
  }
];

export const STAFFING_MODELS_LIST = [
  {
    title: "Permanent Placement",
    description: "Direct-hire recruitment matching career-oriented talent with organizational leadership and culture for long-term growth.",
    badge: "Direct Hire"
  },
  {
    title: "Contract Staffing",
    description: "Targeted professionals for defined milestones, seasonal peaks, software implementations, and temporary surge needs.",
    badge: "Fixed-Term"
  },
  {
    title: "PRN & Per-Diem",
    description: "As-needed flexible scheduling that maintains clinical ratios and operational continuity during unforeseen absences.",
    badge: "Flexible Shifts"
  },
  {
    title: "Locum Tenens",
    description: "Temporary physician, provider, and practitioner coverage ensuring uninterrupted clinical service and patient care.",
    badge: "Provider Coverage"
  },
  {
    title: "Temporary Staffing",
    description: "Rapid-deployment workforce for interim backfills, project spikes, and fast-paced operational continuity.",
    badge: "Rapid Response"
  }
];
