import React from 'react';
import { Internship, StudentProfile } from '../types';
import { calculateSkillMatch } from '../data/mockData';
import { 
  ArrowLeft, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Award, 
  Building2, 
  Briefcase,
  ExternalLink,
  Share2,
  Bookmark
} from 'lucide-react';

interface InternshipDetailsScreenProps {
  internship: Internship;
  student: StudentProfile;
  onBack: () => void;
  onApply: (internship: Internship) => void;
}

export const InternshipDetailsScreen: React.FC<InternshipDetailsScreenProps> = ({
  internship,
  student,
  onBack,
  onApply
}) => {
  const match = calculateSkillMatch(student.skills, internship);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-300/80 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Search Results</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-rose-400/60">
          <span>Search</span>
          <span aria-hidden="true">/</span>
          <span>{internship.company}</span>
          <span aria-hidden="true">/</span>
          <span className="text-rose-100 font-medium truncate max-w-xs">{internship.title}</span>
        </div>
      </div>

      {/* Header Banner Card with Office Image */}
      <div className="bg-[#24060a] border border-[#4d0d17] rounded-2xl overflow-hidden shadow-sm">
        
        {/* Visual Office Atrium Header */}
        <div className="relative h-44 sm:h-56 bg-slate-950 overflow-hidden">
          <img
            src="/src/assets/images/company_office_campus_1790761785933.jpg"
            alt={internship.company}
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#180306] via-[#180306]/50 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between flex-wrap gap-4 text-white">
            <div className="flex items-center gap-3.5">
              <div className={`w-14 h-14 rounded-xl ${internship.companyLogoBg} text-white font-extrabold text-xl flex items-center justify-center shadow-md`}>
                {internship.companyLogoText}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-rose-200">{internship.company}</span>
                  {internship.reliability.isVerifiedEmployer && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800/80">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Verified Employer
                    </span>
                  )}
                </div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                  {internship.title}
                </h1>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <div className="text-right">
                <span className="text-xs text-rose-300/80 block">Monthly Stipend</span>
                <span className="text-xl font-bold text-white tabular-nums">
                  ${internship.stipend.amount.toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => onApply(internship)}
                className="px-5 py-2.5 bg-red-700 hover:bg-red-600 text-white font-bold text-xs rounded-lg transition-colors shadow-md"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>

        {/* Quick Metadata Bar */}
        <div className="px-6 py-3.5 bg-[#1c0407] border-t border-[#400c15] flex flex-wrap items-center justify-between gap-4 text-xs text-rose-300/80">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 font-medium text-rose-100">
              <MapPin className="w-4 h-4 text-rose-400" />
              {internship.location} ({internship.workMode})
            </span>
            <span aria-hidden="true" className="text-red-900">·</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-rose-400" />
              {internship.duration} · Starts {internship.startDate}
            </span>
            <span aria-hidden="true" className="text-red-900">·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-rose-400" />
              Deadline: {internship.deadline}
            </span>
            <span aria-hidden="true" className="text-red-900">·</span>
            <span>{internship.openings} Openings ({internship.applicantsCount} applicants)</span>
          </div>

          <div className="sm:hidden w-full pt-2">
            <button
              onClick={() => onApply(internship)}
              className="w-full py-2 bg-red-700 text-white font-bold text-xs rounded-lg shadow-md"
            >
              Apply for ${internship.stipend.amount.toLocaleString()}/mo
            </button>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Job Description & Details */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Section: Overview */}
          <div className="bg-[#24060a] border border-[#4d0d17] rounded-xl p-6 shadow-sm space-y-3">
            <h2 className="text-base font-bold text-rose-50 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-red-400" />
              <span>Role Overview</span>
            </h2>
            <p className="text-sm text-rose-200/80 leading-relaxed">
              {internship.description}
            </p>
          </div>

          {/* Section: Responsibilities */}
          <div className="bg-[#24060a] border border-[#4d0d17] rounded-xl p-6 shadow-sm space-y-3">
            <h2 className="text-base font-bold text-rose-50">Key Responsibilities</h2>
            <ul className="space-y-2 text-sm text-rose-200/80">
              {internship.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold mt-0.5">•</span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Mentorship & Learning Outcomes */}
          <div className="bg-[#24060a] border border-[#4d0d17] rounded-xl p-6 shadow-sm space-y-3">
            <h2 className="text-base font-bold text-rose-50 flex items-center gap-2">
              <Award className="w-4 h-4 text-red-400" />
              <span>Mentorship & Learning Outcomes</span>
            </h2>
            <p className="text-xs text-rose-300/70">
              What you will actually take away from this internship:
            </p>
            <ul className="space-y-2 text-sm text-rose-200/80">
              {internship.learningOutcomes.map((outcome, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Stipend & Compensation Package */}
          <div className="bg-[#24060a] border border-[#4d0d17] rounded-xl p-6 shadow-sm space-y-3">
            <h2 className="text-base font-bold text-rose-50 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>Compensation & Benefits</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {internship.benefits.map((benefit, idx) => (
                <div key={idx} className="p-3 bg-[#1e0407] border border-[#400c15] rounded-lg text-xs text-rose-200 font-medium">
                  {benefit}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Skill Fit Engine & Reliability Audit */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Skill Fit Breakdown for Student */}
          <div className="bg-[#24060a] border border-[#4d0d17] rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-semibold text-red-400 uppercase tracking-wider">
                  Personalized Fit
                </span>
                <h3 className="text-base font-bold text-rose-50">Skill Compatibility</h3>
              </div>
              <div className="px-2.5 py-1 bg-red-950/80 border border-red-800/80 text-rose-200 font-bold text-sm rounded-md tabular-nums">
                {match.percentage}%
              </div>
            </div>

            <p className="text-xs text-rose-200/80">
              Evaluated against <strong>{student.fullName}</strong>'s profile and uploaded resume ({student.resumeFileName}).
            </p>

            {/* Matched skills */}
            <div className="space-y-1.5 pt-1">
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Matched Required Skills ({match.matchedRequired.length}):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {match.matchedRequired.map((s) => (
                  <span key={s} className="px-2 py-0.5 bg-emerald-950/70 text-emerald-300 border border-emerald-800/70 rounded text-xs font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing or preferred skills */}
            {match.missingRequired.length > 0 && (
              <div className="space-y-1.5 pt-1 border-t border-[#400c15]">
                <span className="text-xs font-semibold text-amber-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Skills to Highlight or Learn ({match.missingRequired.length}):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {match.missingRequired.map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-amber-950/70 text-amber-300 border border-amber-800/70 rounded text-xs">
                      {s}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-rose-300/70 pt-1">
                  Tip: You can mention related coursework or passion projects in your cover note!
                </p>
              </div>
            )}

            <button
              onClick={() => onApply(internship)}
              className="w-full py-2.5 px-4 bg-red-700 hover:bg-red-600 text-white font-bold text-xs rounded-lg transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <span>Apply with This Profile</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Reliability Audit Details */}
          <div className="bg-[#24060a] border border-[#4d0d17] rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#400c15]">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-rose-50">Reliability & Trust Audit</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-start justify-between">
                <span className="text-rose-400/70">Corporate Entity:</span>
                <span className="font-semibold text-rose-100 text-right">
                  Verified ({internship.reliability.corporateRegistrationId})
                </span>
              </div>

              <div className="flex items-start justify-between">
                <span className="text-rose-400/70">Stipend Guarantee:</span>
                <span className="font-semibold text-emerald-400 text-right flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Direct Payroll
                </span>
              </div>

              <div className="flex items-start justify-between">
                <span className="text-rose-400/70">Anti-Ghosting SLA:</span>
                <span className="font-semibold text-red-400 text-right">
                  {internship.reliability.antiGhostingSlaDays} Business Days Review
                </span>
              </div>

              <div className="flex items-start justify-between">
                <span className="text-rose-400/70">Past Intern Satisfaction:</span>
                <span className="font-semibold text-rose-50 text-right tabular-nums">
                  {internship.reliability.pastInternRating} / 5.0 ({internship.reliability.internReviewsCount} reviews)
                </span>
              </div>

              <div className="flex items-start justify-between">
                <span className="text-rose-400/70">Full-time Return Rate:</span>
                <span className="font-semibold text-rose-50 text-right tabular-nums">
                  {internship.reliability.conversionToFullTimeRate}%
                </span>
              </div>
            </div>

            {/* Assigned Mentor Card */}
            <div className="p-3 bg-[#1e0407] border border-[#400c15] rounded-lg">
              <div className="flex items-center gap-2 mb-1.5">
                <Users className="w-3.5 h-3.5 text-red-400" />
                <span className="text-[11px] font-bold text-rose-300 uppercase">Assigned 1:1 Mentor</span>
              </div>
              <p className="text-xs font-bold text-rose-100">{internship.reliability.assignedMentor.name}</p>
              <p className="text-[11px] text-rose-300/70">{internship.reliability.assignedMentor.title}</p>
              <p className="text-[11px] text-rose-400/60 mt-1">
                {internship.reliability.assignedMentor.experienceYears} years engineering experience
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
