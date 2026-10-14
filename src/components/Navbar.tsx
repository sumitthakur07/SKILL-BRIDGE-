import React from 'react';
import { NavigationScreen, StudentProfile } from '../types';
import { Briefcase, Search, FileText, User, LogOut, CheckCircle2, ChevronDown } from 'lucide-react';

interface NavbarProps {
  currentScreen: NavigationScreen;
  onNavigate: (screen: NavigationScreen) => void;
  activeApplicationsCount: number;
  student: StudentProfile | null;
  onLogout: () => void;
  onSelectStudentProfile: (studentId: string) => void;
  demoProfiles: StudentProfile[];
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  activeApplicationsCount,
  student,
  onLogout,
  onSelectStudentProfile,
  demoProfiles
}) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#24060a] border-b border-[#4d0d17] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate(student ? 'home' : 'login')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-red-700 flex items-center justify-center text-white font-bold text-lg shadow-xs group-hover:bg-red-600 transition-colors">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-rose-50 group-hover:text-red-300 transition-colors">
                  MatchPoint
                </span>
                <span className="hidden sm:inline-block ml-2 text-xs text-red-400 font-medium">
                  Verified Internships
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Clean text navigation links */}
          {student && (
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              <button
                onClick={() => onNavigate('home')}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  currentScreen === 'home'
                    ? 'text-red-400 border-b-2 border-red-500 font-semibold'
                    : 'text-rose-200/70 hover:text-white'
                }`}
              >
                Home
              </button>

              <button
                onClick={() => onNavigate('search')}
                className={`px-3 py-1.5 text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  currentScreen === 'search' || currentScreen === 'details'
                    ? 'text-red-400 border-b-2 border-red-500 font-semibold'
                    : 'text-rose-200/70 hover:text-white'
                }`}
              >
                <Search className="w-4 h-4 text-rose-300/60" />
                <span>Search Internships</span>
              </button>

              <button
                onClick={() => onNavigate('status')}
                className={`px-3 py-1.5 text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  currentScreen === 'status'
                    ? 'text-red-400 border-b-2 border-red-500 font-semibold'
                    : 'text-rose-200/70 hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4 text-rose-300/60" />
                <span>Applications</span>
                {activeApplicationsCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 text-xs font-semibold bg-red-900/80 text-rose-200 border border-red-700/60 rounded-sm">
                    {activeApplicationsCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => onNavigate('profile')}
                className={`px-3 py-1.5 text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  currentScreen === 'profile'
                    ? 'text-red-400 border-b-2 border-red-500 font-semibold'
                    : 'text-rose-200/70 hover:text-white'
                }`}
              >
                <User className="w-4 h-4 text-rose-300/60" />
                <span>My Profile & Resume</span>
              </button>
            </nav>
          )}

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            {student ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-[#340a10] border border-transparent hover:border-[#520f1a] transition-colors text-left"
                >
                  <img
                    src={student.avatarUrl}
                    alt={student.fullName}
                    className="w-8 h-8 rounded-full object-cover border border-red-500/50"
                    referrerPolicy="no-referrer"
                  />
                  <div className="hidden sm:block text-left">
                    <p className="text-xs font-semibold text-rose-100 leading-tight">
                      {student.fullName}
                    </p>
                    <p className="text-[11px] text-rose-300/70 leading-tight">
                      {student.major.split('&')[0].trim()}
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-rose-300/60" />
                </button>

                {profileDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-64 bg-[#28070b] border border-[#520f1a] rounded-lg shadow-2xl py-2 z-50 text-rose-100"
                    onMouseLeave={() => setProfileDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-[#400c15]">
                      <p className="text-xs font-semibold text-rose-50">{student.fullName}</p>
                      <p className="text-xs text-rose-300/70 truncate">{student.university}</p>
                      <div className="mt-1.5 flex items-center gap-1 text-[11px] text-emerald-400">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>Verified Student ID</span>
                      </div>
                    </div>

                    <div className="px-3 py-2 text-[11px] font-semibold text-rose-400/80 uppercase tracking-wider">
                      Switch Student Demo
                    </div>
                    {demoProfiles.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          onSelectStudentProfile(p.id);
                          setProfileDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-1.5 text-xs hover:bg-[#3b0c13] transition-colors flex items-center justify-between ${
                          p.id === student.id ? 'text-red-400 font-semibold bg-[#3b0c13]/70' : 'text-rose-200'
                        }`}
                      >
                        <span className="truncate">{p.fullName} ({p.major.split(' ')[0]})</span>
                        {p.id === student.id && <CheckCircle2 className="w-3.5 h-3.5 text-red-400" />}
                      </button>
                    ))}

                    <div className="border-t border-[#400c15] my-1" />

                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onNavigate('profile');
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-rose-200 hover:bg-[#3b0c13] transition-colors flex items-center gap-2"
                    >
                      <User className="w-3.5 h-3.5 text-rose-400" />
                      Manage Profile & Resume
                    </button>

                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-rose-400 hover:bg-rose-950/60 transition-colors flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5 text-rose-400" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-700 rounded-lg hover:bg-red-600 transition-colors whitespace-nowrap shadow-xs"
              >
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation bar for smaller screens */}
        {student && (
          <div className="md:hidden flex items-center justify-between border-t border-[#4d0d17] py-2 overflow-x-auto gap-2">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-1 text-xs font-medium whitespace-nowrap ${
                currentScreen === 'home' ? 'text-red-400 font-bold' : 'text-rose-200/70'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('search')}
              className={`px-3 py-1 text-xs font-medium whitespace-nowrap ${
                currentScreen === 'search' || currentScreen === 'details' ? 'text-red-400 font-bold' : 'text-rose-200/70'
              }`}
            >
              Search Internships
            </button>
            <button
              onClick={() => onNavigate('status')}
              className={`px-3 py-1 text-xs font-medium whitespace-nowrap flex items-center gap-1 ${
                currentScreen === 'status' ? 'text-red-400 font-bold' : 'text-rose-200/70'
              }`}
            >
              Applications ({activeApplicationsCount})
            </button>
            <button
              onClick={() => onNavigate('profile')}
              className={`px-3 py-1 text-xs font-medium whitespace-nowrap ${
                currentScreen === 'profile' ? 'text-red-400 font-bold' : 'text-rose-200/70'
              }`}
            >
              Profile
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
