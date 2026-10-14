import React, { useState } from 'react';
import { StudentProfile, Internship, NavigationScreen } from '../types';
import { calculateSkillMatch } from '../data/mockData';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  DollarSign, 
  Calendar, 
  FileText, 
  Sparkles,
  Users,
  Clock,
  ExternalLink
} from 'lucide-react';

interface HomeScreenProps {
  student: StudentProfile;
  internships: Internship[];
  onNavigate: (screen: NavigationScreen) => void;
  onSelectInternship: (internship: Internship) => void;
  onStartSearch: (query: string, location?: string) => void;
  activeApplicationsCount: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  student,
  internships,
  onNavigate,
  onSelectInternship,
  onStartSearch,
  activeApplicationsCount
}) => {
  const [heroSearch, setHeroSearch] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');

  // Compute matched internships sorted by highest skill match
  const matchedInternships = internships.map(internship => {
    const match = calculateSkillMatch(student.skills, internship);
    return {
      internship,
      match
    };
  }).sort((a, b) => b.match.percentage - a.match.percentage);

  const topMatches = matchedInternships.slice(0, 3);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartSearch(heroSearch, selectedLocation === 'All' ? '' : selectedLocation);
  };

  return (
    <div className="space-y-10 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#3f0a12] via-[#2c060b] to-[#180306] text-white rounded-2xl mx-4 sm:mx-6 lg:mx-8 mt-6 border border-[#540f1a]">
        <div className="absolute inset-0 opacity-20 mix-blend-overlay">
          <img
            src="/src/assets/images/hero_student_workspace_1790761760438.jpg"
            alt="University workspace"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 py-12 sm:py-16 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/70 border border-red-800/80 text-rose-200 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            <span>Welcome back, {student.fullName} · {student.degree}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight max-w-3xl mx-auto">
            Reliable internships matched to your skills and location.
          </h1>

          <p className="text-rose-100/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Eliminate ghosted applications and scam postings. Every opportunity on MatchPoint includes a verified employer, guaranteed stipend, and an anti-ghosting review SLA.
          </p>

          {/* Interactive Search Bar on Hero */}
          <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto bg-[#24060a] border border-[#540f1a] p-2 rounded-xl shadow-2xl flex flex-col sm:flex-row items-center gap-2">
            <div className="flex-1 flex items-center gap-2 px-3 w-full">
              <Search className="w-5 h-5 text-rose-400/60 shrink-0" />
              <input
                type="text"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                placeholder="Role, skill (e.g. React, Python), or company..."
                className="w-full py-2 text-sm text-rose-50 placeholder-rose-300/40 bg-transparent focus:outline-none"
              />
            </div>

            <div className="h-6 w-[1px] bg-[#4d0d17] hidden sm:block" />

            <div className="flex items-center gap-2 px-3 w-full sm:w-auto shrink-0 border-t sm:border-t-0 border-[#4d0d17] pt-2 sm:pt-0">
              <MapPin className="w-4 h-4 text-rose-400/60" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="text-xs text-rose-200 bg-[#24060a] focus:outline-none cursor-pointer pr-4 font-medium"
              >
                <option value="All" className="bg-[#24060a] text-rose-100">All Locations</option>
                <option value="San Francisco, CA" className="bg-[#24060a] text-rose-100">San Francisco, CA</option>
                <option value="New York, NY" className="bg-[#24060a] text-rose-100">New York, NY</option>
                <option value="Seattle, WA" className="bg-[#24060a] text-rose-100">Seattle, WA</option>
                <option value="Austin, TX" className="bg-[#24060a] text-rose-100">Austin, TX</option>
                <option value="Boston, MA" className="bg-[#24060a] text-rose-100">Boston, MA</option>
                <option value="Remote" className="bg-[#24060a] text-rose-100">Remote Only</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-red-700 hover:bg-red-600 text-white font-semibold text-xs rounded-lg transition-colors whitespace-nowrap shadow-md flex items-center justify-center gap-1.5"
            >
              <span>Find Matches</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Skill Tags from student profile */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-rose-200">
            <span className="text-rose-300/80">Your profile skills:</span>
            {student.skills.slice(0, 5).map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => onStartSearch(skill)}
                className="px-2.5 py-1 bg-red-950/60 hover:bg-red-900 border border-red-800/50 rounded-md transition-colors text-rose-100 font-medium text-[11px]"
              >
                {skill}
              </button>
            ))}
            {student.skills.length > 5 && (
              <button
                type="button"
                onClick={() => onNavigate('profile')}
                className="text-red-400 hover:text-white underline text-[11px]"
              >
                +{student.skills.length - 5} more in Profile
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Student Readiness & Quick Status Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Card 1: Resume & Profile Readiness */}
          <div className="bg-[#24060a] border border-[#4d0d17] rounded-xl p-5 shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-rose-400/80 uppercase tracking-wider">
                  Resume & Skill Status
                </span>
                <h3 className="text-base font-bold text-rose-50 mt-1">
                  {student.resumeFileName ? student.resumeFileName : 'No Resume Uploaded'}
                </h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>

            <p className="text-xs text-rose-200/80 mt-2">
              Parsed {student.skills.length} skills. Match engine is actively indexing listings against your profile.
            </p>

            <div className="mt-4 pt-3 border-t border-[#400c15] flex items-center justify-between">
              <span className="text-xs text-rose-400/70">Updated {student.resumeUploadedAt}</span>
              <button
                onClick={() => onNavigate('profile')}
                className="text-xs font-semibold text-red-400 hover:text-red-300"
              >
                Update Resume →
              </button>
            </div>
          </div>

          {/* Card 2: Applications Tracker */}
          <div className="bg-[#24060a] border border-[#4d0d17] rounded-xl p-5 shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-rose-400/80 uppercase tracking-wider">
                  Active Applications
                </span>
                <h3 className="text-2xl font-bold text-rose-50 mt-1 tabular-nums">
                  {activeApplicationsCount} Active
                </h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-red-950/80 border border-red-800/80 text-rose-200 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
            </div>

            <p className="text-xs text-rose-200/80 mt-2">
              1 technical interview scheduled, 1 application under review within anti-ghosting SLA.
            </p>

            <div className="mt-4 pt-3 border-t border-[#400c15] flex items-center justify-between">
              <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Next interview Oct 3
              </span>
              <button
                onClick={() => onNavigate('status')}
                className="text-xs font-semibold text-red-400 hover:text-red-300"
              >
                View Pipeline →
              </button>
            </div>
          </div>

          {/* Card 3: Preferred Location & Work Modes */}
          <div className="bg-[#24060a] border border-[#4d0d17] rounded-xl p-5 shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-rose-400/80 uppercase tracking-wider">
                  Target Locations
                </span>
                <h3 className="text-base font-bold text-rose-50 mt-1">
                  {student.location}
                </h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-red-950/80 border border-red-800/80 text-rose-200 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
            </div>

            <p className="text-xs text-rose-200/80 mt-2">
              Showing hybrid openings in {student.location} plus fully remote international opportunities.
            </p>

            <div className="mt-4 pt-3 border-t border-[#400c15] flex items-center justify-between">
              <span className="text-xs text-rose-400/70">
                {student.preferredWorkMode.join(' · ')}
              </span>
              <button
                onClick={() => onNavigate('search')}
                className="text-xs font-semibold text-red-400 hover:text-red-300"
              >
                Filter by Location →
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Top Matched Internships for Current Student */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#4d0d17] pb-3">
          <div>
            <h2 className="text-xl font-bold text-rose-50">
              Top Matches for Your Skills & Location
            </h2>
            <p className="text-xs text-rose-300/70 mt-0.5">
              Ranked by compatibility with your course projects and skills: {student.skills.slice(0, 4).join(', ')}
            </p>
          </div>
          <button
            onClick={() => onNavigate('search')}
            className="text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-1"
          >
            <span>Browse all {internships.length} verified listings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {topMatches.map(({ internship, match }) => (
            <div
              key={internship.id}
              className="bg-[#24060a] border border-[#4d0d17] rounded-xl p-5 shadow-sm hover:border-red-600 hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header: Company & Verified reliability badge */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-lg ${internship.companyLogoBg} text-white font-bold text-xs flex items-center justify-center shadow-xs`}>
                      {internship.companyLogoText}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-rose-100 group-hover:text-red-400 transition-colors">
                        {internship.company}
                      </h4>
                      <div className="flex items-center gap-1 text-[11px] text-rose-300/70">
                        <MapPin className="w-3 h-3 text-rose-400" />
                        <span>{internship.location}</span>
                        <span aria-hidden="true">·</span>
                        <span>{internship.workMode}</span>
                      </div>
                    </div>
                  </div>

                  {internship.reliability.isVerifiedEmployer && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-950/70 border border-emerald-800/70 px-2 py-0.5 rounded">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      Verified
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-rose-50 leading-snug line-clamp-2 mb-2">
                  {internship.title}
                </h3>

                {/* Skill Match Score Bar */}
                <div className="bg-[#1c0407] border border-[#440c15] rounded-lg p-2.5 my-3">
                  <div className="flex items-center justify-between text-xs font-semibold mb-1">
                    <span className="text-rose-200 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-red-400" />
                      {match.scoreLabel}
                    </span>
                    <span className="text-red-400 font-bold tabular-nums">
                      {match.percentage}% Fit
                    </span>
                  </div>
                  <div className="w-full bg-[#34090e] h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        match.percentage >= 80 ? 'bg-red-600' : match.percentage >= 60 ? 'bg-rose-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${match.percentage}%` }}
                    />
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-[11px] text-rose-300/80 truncate">
                    <span className="text-emerald-400 font-medium">Matched:</span>
                    <span>{match.matchedRequired.join(', ') || 'General qualifications'}</span>
                  </div>
                </div>

                {/* Compensation & SLA */}
                <div className="text-xs text-rose-200/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-rose-400/70">Stipend:</span>
                    <span className="font-semibold text-rose-50 tabular-nums">
                      ${internship.stipend.amount.toLocaleString()} / {internship.stipend.period}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-rose-400/70">Duration:</span>
                    <span>{internship.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-rose-400/70">Anti-Ghosting:</span>
                    <span className="text-red-400 font-medium">
                      {internship.reliability.antiGhostingSlaDays}-day response SLA
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 mt-4 border-t border-[#400c15] flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onSelectInternship(internship)}
                  className="flex-1 py-2 px-3 text-xs font-semibold text-rose-200 bg-[#340a10] hover:bg-[#430d15] border border-[#520f1a] rounded-lg transition-colors text-center"
                >
                  View Details
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSelectInternship(internship);
                    onNavigate('apply');
                  }}
                  className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-red-700 hover:bg-red-600 rounded-lg transition-colors text-center shadow-md"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Solving the Student Internship Struggle */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1f0407] border border-[#4a0d16] rounded-2xl p-6 sm:p-8">
          <div className="max-w-2xl">
            <h2 className="text-lg sm:text-xl font-bold text-rose-50">
              Why MatchPoint Solves the Student Internship Struggle
            </h2>
            <p className="text-xs text-rose-300/70 mt-1">
              Traditional job boards are flooded with ghost listings, unpaid gigs disguised as internships, and zero feedback. Here is how MatchPoint protects students:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="bg-[#28070b] border border-[#4d0d17] rounded-xl p-4">
              <div className="w-8 h-8 rounded-lg bg-red-950/80 border border-red-800/80 text-red-400 flex items-center justify-center mb-3">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-rose-100">Verified Corporate Entity</h4>
              <p className="text-[11px] text-rose-300/70 mt-1 leading-relaxed">
                Every employer is manually vetted with state corporate registrations and genuine domain validation.
              </p>
            </div>

            <div className="bg-[#28070b] border border-[#4d0d17] rounded-xl p-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 flex items-center justify-center mb-3">
                <DollarSign className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-rose-100">Guaranteed Paid Stipend</h4>
              <p className="text-[11px] text-rose-300/70 mt-1 leading-relaxed">
                Zero unpaid gigs. Stipends are verified in advance with official bi-weekly payroll or scheduled stipends.
              </p>
            </div>

            <div className="bg-[#28070b] border border-[#4d0d17] rounded-xl p-4">
              <div className="w-8 h-8 rounded-lg bg-[#3d0b13] border border-[#5c131f] text-rose-300 flex items-center justify-center mb-3">
                <Users className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-rose-100">Named 1:1 Industry Mentor</h4>
              <p className="text-[11px] text-rose-300/70 mt-1 leading-relaxed">
                You never get left alone. Each position designates an experienced lead engineer or designer to guide your growth.
              </p>
            </div>

            <div className="bg-[#28070b] border border-[#4d0d17] rounded-xl p-4">
              <div className="w-8 h-8 rounded-lg bg-amber-950/80 border border-amber-800/80 text-amber-400 flex items-center justify-center mb-3">
                <Clock className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-rose-100">Strict Anti-Ghosting SLA</h4>
              <p className="text-[11px] text-rose-300/70 mt-1 leading-relaxed">
                Hiring teams are contractually bound to provide a status update or interview decision within 3–5 business days.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
