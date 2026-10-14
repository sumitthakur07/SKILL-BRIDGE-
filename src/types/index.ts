export type WorkMode = 'Remote' | 'Hybrid' | 'On-site';
export type InternshipDuration = '1-3 Months' | '3-6 Months' | 'Summer 2026' | 'Fall 2026';
export type ApplicationStage = 'Submitted' | 'Under Review' | 'Interview Scheduled' | 'Offer Received' | 'Archived';

export interface StudentProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  university: string;
  degree: string;
  major: string;
  graduationYear: string;
  gpa: string;
  location: string;
  preferredLocations: string[];
  preferredWorkMode: WorkMode[];
  targetRoles: string[];
  bio: string;
  skills: string[];
  resumeUrl?: string;
  resumeFileName?: string;
  resumeUploadedAt?: string;
  resumeParsedSkills?: string[];
  resumeSummary?: string;
  avatarUrl: string;
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  availableFrom: string;
}

export interface ReliabilityAudit {
  isVerifiedEmployer: boolean;
  corporateRegistrationId: string;
  stipendGuaranteed: boolean;
  assignedMentor: {
    name: string;
    title: string;
    experienceYears: number;
    linkedin?: string;
  };
  antiGhostingSlaDays: number;
  pastInternRating: number; // e.g. 4.9 out of 5
  internReviewsCount: number;
  conversionToFullTimeRate: number; // e.g. 72%
}

export interface Internship {
  id: string;
  title: string;
  company: string;
  companyLogoText: string;
  companyLogoBg: string;
  location: string;
  workMode: WorkMode;
  stipend: {
    amount: number;
    period: 'month' | 'hour' | 'lump-sum';
    currency: string;
  };
  duration: InternshipDuration;
  startDate: string;
  deadline: string;
  skillsRequired: string[];
  skillsPreferred: string[];
  description: string;
  responsibilities: string[];
  learningOutcomes: string[];
  benefits: string[];
  reliability: ReliabilityAudit;
  applicantsCount: number;
  openings: number;
  department: string;
  featured?: boolean;
}

export interface Application {
  id: string;
  internshipId: string;
  internshipTitle: string;
  company: string;
  location: string;
  workMode: WorkMode;
  stipendAmount: number;
  submittedAt: string;
  stage: ApplicationStage;
  resumeUsed: string;
  coverNote?: string;
  slaDeadline: string;
  timeline: {
    stage: ApplicationStage;
    date: string;
    note: string;
  }[];
  interviewDetails?: {
    date: string;
    time: string;
    interviewer: string;
    meetingLink: string;
  };
}

export interface FilterState {
  searchQuery: string;
  selectedLocation: string;
  workModes: WorkMode[];
  selectedSkills: string[];
  minStipend: number;
  verifiedOnly: boolean;
  duration: string;
  sortBy: 'match' | 'stipend_high' | 'newest' | 'rating';
}

export type NavigationScreen = 
  | 'login' 
  | 'home' 
  | 'search' 
  | 'details' 
  | 'apply' 
  | 'status' 
  | 'profile';
