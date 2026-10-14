import React, { useState, useMemo } from 'react';
import { Internship, StudentProfile, WorkMode } from '../types';
import { calculateSkillMatch, AVAILABLE_SKILLS_LIST, AVAILABLE_LOCATIONS_LIST } from '../data/mockData';
import { 
  Search, 
  MapPin, 
  DollarSign, 
  ShieldCheck, 
  Filter, 
  SlidersHorizontal, 
  Sparkles, 
  Bookmark, 
  BookmarkCheck,
  Check,
  X,
  Clock,
  ArrowRight,
  Briefcase
} from 'lucide-react';

interface SearchScreenProps {
  student: StudentProfile;
  internships: Internship[];
  onSelectInternship: (internship: Internship) => void;
  onApplyDirect: (internship: Internship) => void;
  initialQuery?: string;
  initialLocation?: string;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({
  student,
  internships,
  onSelectInternship,
  onApplyDirect,
  initialQuery = '',
  initialLocation = ''
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation || 'All Locations');
  const [selectedWorkModes, setSelectedWorkModes] = useState<WorkMode[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [minStipend, setMinStipend] = useState<number>(0);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'match' | 'stipend' | 'rating' | 'newest'>('match');
  const [savedInternshipIds, setSavedInternshipIds] = useState<Set<string>>(new Set());
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  // Toggle skill selection
  const handleToggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  // Toggle work mode
  const handleToggleWorkMode = (mode: WorkMode) => {
    setSelectedWorkModes(prev =>
      prev.includes(mode) ? prev.filter(m => m !== mode) : [...prev, mode]
    );
  };

  // Toggle bookmark
  const handleToggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedInternshipIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedLocation('All Locations');
    setSelectedWorkModes([]);
    setSelectedSkills([]);
    setMinStipend(0);
    setVerifiedOnly(false);
    setSortBy('match');
  };

  // Filter and rank internships
  const filteredAndSorted = useMemo(() => {
    return internships
      .map(internship => {
        const match = calculateSkillMatch(student.skills, internship);
        return {
          internship,
          match
        };
      })
      .filter(({ internship, match }) => {
        // Query match
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const titleMatch = internship.title.toLowerCase().includes(q);
          const compMatch = internship.company.toLowerCase().includes(q);
          const descMatch = internship.description.toLowerCase().includes(q);
          const skillMatch = internship.skillsRequired.some(s => s.toLowerCase().includes(q)) ||
                             internship.skillsPreferred.some(s => s.toLowerCase().includes(q));
          if (!titleMatch && !compMatch && !descMatch && !skillMatch) return false;
        }

        // Location filter
        if (selectedLocation && selectedLocation !== 'All Locations') {
          if (selectedLocation === 'Remote') {
            if (internship.workMode !== 'Remote') return false;
          } else if (internship.location !== selectedLocation && internship.workMode !== 'Remote') {
            return false;
          }
        }

        // Work mode filter
        if (selectedWorkModes.length > 0) {
          if (!selectedWorkModes.includes(internship.workMode)) return false;
        }

        // Skill requirements filter
        if (selectedSkills.length > 0) {
          const allSkills = [...internship.skillsRequired, ...internship.skillsPreferred].map(s => s.toLowerCase());
          const hasAtLeastOne = selectedSkills.some(s => allSkills.includes(s.toLowerCase()));
          if (!hasAtLeastOne) return false;
        }

        // Min stipend
        if (minStipend > 0 && internship.stipend.amount < minStipend) {
          return false;
        }

        // Verified only
        if (verifiedOnly && !internship.reliability.isVerifiedEmployer) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'match') {
          return b.match.percentage - a.match.percentage;
        }
        if (sortBy === 'stipend') {
          return b.internship.stipend.amount - a.internship.stipend.amount;
        }
        if (sortBy === 'rating') {
          return b.internship.reliability.pastInternRating - a.internship.reliability.pastInternRating;
        }
        return 0; // default order
      });
  }, [internships, student.skills, searchQuery, selectedLocation, selectedWorkModes, selectedSkills, minStipend, verifiedOnly, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Search Controls Bar */}
      <div className="bg-[#24060a] border border-[#4d0d17] rounded-xl p-4 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          
          {/* Main search bar */}
          <div className="flex-1 relative flex items-center">
            <Search className="w-5 h-5 text-rose-400/60 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role title, technology (e.g. React, Python), or company..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#340a10] border border-[#5c131f] rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-[#3d0b13] text-rose-50 placeholder-rose-300/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-rose-400 hover:text-rose-200 text-xs"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Location Dropdown */}
          <div className="w-full md:w-56 relative">
            <MapPin className="w-4 h-4 text-rose-400/60 absolute left-3 top-3.5 pointer-events-none" />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 text-sm bg-[#340a10] border border-[#5c131f] rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-rose-100 font-medium cursor-pointer"
            >
              {AVAILABLE_LOCATIONS_LIST.map((loc) => (
                <option key={loc} value={loc} className="bg-[#24060a] text-rose-100">{loc}</option>
              ))}
            </select>
          </div>

          {/* Mobile Filter toggle button */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="md:hidden flex items-center justify-center gap-2 py-2 px-4 border border-[#5c131f] rounded-lg text-sm font-medium text-rose-200 bg-[#340a10]"
          >
            <SlidersHorizontal className="w-4 h-4 text-rose-400" />
            <span>Filters & Match Options</span>
          </button>
        </div>

        {/* Quick active filter indicator & sort */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#400c15] text-xs text-rose-300/80">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-rose-100">
              {filteredAndSorted.length} Verified {filteredAndSorted.length === 1 ? 'Internship' : 'Internships'} Found
            </span>
            <span aria-hidden="true" className="text-red-900">·</span>
            <span>Matched against {student.fullName}'s profile ({student.skills.length} skills)</span>
            
            {(selectedSkills.length > 0 || selectedWorkModes.length > 0 || minStipend > 0 || verifiedOnly) && (
              <button
                onClick={handleResetFilters}
                className="ml-2 text-red-400 font-semibold hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-rose-400/70">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="py-1 px-2.5 bg-[#340a10] border border-[#5c131f] rounded-md text-xs font-semibold text-rose-100 focus:outline-none focus:ring-1 focus:ring-red-500 cursor-pointer"
            >
              <option value="match" className="bg-[#24060a] text-rose-100">Highest Skill Match</option>
              <option value="stipend" className="bg-[#24060a] text-rose-100">Highest Monthly Stipend</option>
              <option value="rating" className="bg-[#24060a] text-rose-100">Intern Satisfaction Rating</option>
              <option value="newest" className="bg-[#24060a] text-rose-100">Featured Openings</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Filters Sidebar + Right Internship Listings */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Filter Sidebar (Desktop & Mobile Drawer) */}
        <aside className={`md:col-span-4 lg:col-span-3 space-y-5 bg-[#24060a] p-5 border border-[#4d0d17] rounded-xl shadow-sm ${showMobileFilters ? 'block' : 'hidden md:block'}`}>
          
          <div className="flex items-center justify-between pb-3 border-b border-[#400c15]">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-red-400" />
              <h3 className="text-sm font-bold text-rose-50">Filter Listings</h3>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-xs text-rose-400 hover:text-rose-200"
            >
              Reset
            </button>
          </div>

          {/* Work Mode Filter (Segmented control) */}
          <div>
            <label className="block text-xs font-semibold text-rose-200 mb-2">
              Work Mode
            </label>
            <div className="space-y-1.5">
              {(['Remote', 'Hybrid', 'On-site'] as WorkMode[]).map((mode) => {
                const isSelected = selectedWorkModes.includes(mode);
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => handleToggleWorkMode(mode)}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      isSelected
                        ? 'bg-red-950/90 text-rose-100 border border-red-700/80 shadow-xs'
                        : 'bg-[#1b0407] text-rose-300/80 hover:bg-[#340a10] border border-[#400c15]'
                    }`}
                  >
                    <span>{mode}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-red-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Verified Reliability Toggle */}
          <div className="pt-3 border-t border-[#400c15]">
            <div className="flex items-center justify-between">
              <label htmlFor="verified-toggle" className="text-xs font-semibold text-rose-200 cursor-pointer">
                Verified & Guaranteed Pay
              </label>
              <input
                id="verified-toggle"
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="w-4 h-4 text-red-600 bg-[#340a10] border-[#5c131f] rounded focus:ring-red-500 cursor-pointer"
              />
            </div>
            <p className="text-[11px] text-rose-300/70 mt-1">
              Shows only employers with verified state corporate registrations and 1:1 mentors.
            </p>
          </div>

          {/* Min Monthly Stipend Slider */}
          <div className="pt-3 border-t border-[#400c15] space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-rose-200">
                Min. Monthly Stipend
              </label>
              <span className="text-xs font-bold text-red-400 tabular-nums">
                {minStipend === 0 ? 'Any' : `$${minStipend.toLocaleString()}/mo`}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="5000"
              step="500"
              value={minStipend}
              onChange={(e) => setMinStipend(Number(e.target.value))}
              className="w-full accent-red-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-rose-400/60">
              <span>$0</span>
              <span>$2,500</span>
              <span>$5,000+</span>
            </div>
          </div>

          {/* Skills Filter */}
          <div className="pt-3 border-t border-[#400c15] space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-rose-200">
                Required Technical Skills
              </label>
              {selectedSkills.length > 0 && (
                <button
                  onClick={() => setSelectedSkills([])}
                  className="text-[11px] text-red-400 hover:underline"
                >
                  Clear ({selectedSkills.length})
                </button>
              )}
            </div>

            {/* Quick button to select student's current skills */}
            <button
              type="button"
              onClick={() => setSelectedSkills([...student.skills])}
              className="w-full py-1.5 px-2 bg-red-950/70 hover:bg-red-900 border border-red-800/80 text-rose-200 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span>Select All My Profile Skills</span>
            </button>

            <div className="max-h-48 overflow-y-auto space-y-1 pr-1 pt-1">
              {AVAILABLE_SKILLS_LIST.map((skill) => {
                const isSelected = selectedSkills.includes(skill);
                const isStudentSkill = student.skills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleToggleSkill(skill)}
                    className={`w-full text-left px-2.5 py-1.5 rounded text-xs flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-red-700 text-white font-semibold'
                        : 'bg-[#1b0407] hover:bg-[#340a10] border border-[#400c15] text-rose-200'
                    }`}
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      {skill}
                      {isStudentSkill && (
                        <span className={`text-[10px] ${isSelected ? 'text-red-100' : 'text-red-400'}`}>
                          (in profile)
                        </span>
                      )}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

        </aside>

        {/* Right Column: Internship Cards List */}
        <main className="md:col-span-8 lg:col-span-9 space-y-4">
          
          {filteredAndSorted.length === 0 ? (
            <div className="bg-[#24060a] border border-[#4d0d17] rounded-xl p-12 text-center space-y-3">
              <Briefcase className="w-10 h-10 text-rose-400/40 mx-auto" />
              <h3 className="text-base font-bold text-rose-50">No matching internships found</h3>
              <p className="text-xs text-rose-300/70 max-w-md mx-auto">
                Try widening your location preferences, adjusting the minimum stipend slider, or clearing some skill filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-3 px-4 py-2 bg-red-700 text-white text-xs font-semibold rounded-lg hover:bg-red-600 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredAndSorted.map(({ internship, match }) => {
              const isSaved = savedInternshipIds.has(internship.id);

              return (
                <div
                  key={internship.id}
                  onClick={() => onSelectInternship(internship)}
                  className="bg-[#24060a] border border-[#4d0d17] rounded-xl p-5 shadow-sm hover:border-red-600 hover:shadow-xl transition-all cursor-pointer group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    
                    {/* Company logo & basic header info */}
                    <div className="flex items-start gap-3.5 flex-1">
                      <div className={`w-11 h-11 rounded-lg ${internship.companyLogoBg} text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs`}>
                        {internship.companyLogoText}
                      </div>

                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-rose-200">
                            {internship.company}
                          </span>
                          <span aria-hidden="true" className="text-red-900">·</span>
                          <span className="text-xs text-rose-300/70 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-rose-400" />
                            {internship.location}
                          </span>
                          <span aria-hidden="true" className="text-red-900">·</span>
                          <span className="text-xs text-rose-300/70">
                            {internship.workMode}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-rose-50 group-hover:text-red-400 transition-colors leading-snug">
                          {internship.title}
                        </h3>

                        <p className="text-xs text-rose-200/80 line-clamp-2 leading-relaxed pt-1">
                          {internship.description}
                        </p>
                      </div>
                    </div>

                    {/* Bookmark and Match Score */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0">
                      <div className="flex items-center gap-2">
                        {/* Skill Match Indicator */}
                        <div className="text-right">
                          <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-950/80 border border-red-800/80 text-rose-200 rounded-md text-xs font-bold tabular-nums">
                            <Sparkles className="w-3 h-3 text-red-400" />
                            <span>{match.percentage}% Fit</span>
                          </div>
                          <p className="text-[10px] text-rose-400/60 mt-0.5 hidden sm:block">
                            {match.matchedRequired.length} of {internship.skillsRequired.length} skills matched
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => handleToggleBookmark(internship.id, e)}
                          title={isSaved ? "Saved" : "Save for later"}
                          className="p-1.5 rounded-md hover:bg-[#340a10] text-rose-400 hover:text-white transition-colors"
                        >
                          {isSaved ? (
                            <BookmarkCheck className="w-5 h-5 text-red-400 fill-red-400" />
                          ) : (
                            <Bookmark className="w-5 h-5" />
                          )}
                        </button>
                      </div>

                      {internship.reliability.isVerifiedEmployer && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-950/70 border border-emerald-800/70 px-2 py-0.5 rounded">
                          <ShieldCheck className="w-3 h-3 text-emerald-400" />
                          Verified Employer
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Skills match tags strip */}
                  <div className="mt-4 pt-3 border-t border-[#400c15] flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-rose-400/70 text-[11px] font-medium">Required Skills:</span>
                    {internship.skillsRequired.map((skill) => {
                      const isMatched = student.skills.some(s => s.toLowerCase() === skill.toLowerCase());
                      return (
                        <span
                          key={skill}
                          className={`text-xs px-2 py-0.5 rounded ${
                            isMatched
                              ? 'bg-emerald-950/70 text-emerald-300 font-semibold border border-emerald-800/70'
                              : 'bg-[#1e0407] text-rose-300/80 border border-[#400c15]'
                          }`}
                        >
                          {skill} {isMatched && '✓'}
                        </span>
                      );
                    })}
                  </div>

                  {/* Bottom bar: Compensation, SLA, Actions */}
                  <div className="mt-3 pt-3 border-t border-[#400c15] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3 text-xs text-rose-300/80 flex-wrap">
                      <span className="font-bold text-rose-50 tabular-nums">
                        ${internship.stipend.amount.toLocaleString()} / {internship.stipend.period}
                      </span>
                      <span aria-hidden="true" className="text-red-900">·</span>
                      <span>{internship.duration}</span>
                      <span aria-hidden="true" className="text-red-900">·</span>
                      <span className="text-red-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-red-400" />
                        {internship.reliability.antiGhostingSlaDays}-day response SLA
                      </span>
                      <span aria-hidden="true" className="text-red-900">·</span>
                      <span className="text-rose-400/70">
                        Mentor: {internship.reliability.assignedMentor.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectInternship(internship);
                        }}
                        className="px-3 py-1.5 text-xs font-semibold text-rose-200 hover:bg-[#340a10] border border-[#520f1a] rounded-lg transition-colors"
                      >
                        View Details
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onApplyDirect(internship);
                        }}
                        className="px-3.5 py-1.5 text-xs font-semibold text-white bg-red-700 hover:bg-red-600 rounded-lg transition-colors shadow-md flex items-center gap-1"
                      >
                        <span>Apply</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })
          )}

        </main>
      </div>

    </div>
  );
};
