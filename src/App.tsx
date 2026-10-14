/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NavigationScreen, StudentProfile, Internship, Application } from './types';
import { DEMO_STUDENT_PROFILES, MOCK_INTERNSHIPS, INITIAL_APPLICATIONS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { LoginScreen } from './components/LoginScreen';
import { HomeScreen } from './components/HomeScreen';
import { SearchScreen } from './components/SearchScreen';
import { InternshipDetailsScreen } from './components/InternshipDetailsScreen';
import { ApplyScreen } from './components/ApplyScreen';
import { ApplicationStatusScreen } from './components/ApplicationStatusScreen';
import { ProfileScreen } from './components/ProfileScreen';

export default function App() {
  // State for authenticated student profile
  const [student, setStudent] = useState<StudentProfile | null>(DEMO_STUDENT_PROFILES[0]);
  const [demoProfiles, setDemoProfiles] = useState<StudentProfile[]>(DEMO_STUDENT_PROFILES);

  // Navigation screen
  const [currentScreen, setCurrentScreen] = useState<NavigationScreen>('home');

  // Application data
  const [internships, setInternships] = useState<Internship[]>(MOCK_INTERNSHIPS);
  const [applications, setApplications] = useState<Application[]>(INITIAL_APPLICATIONS);

  // Selected internship for Details and Apply screens
  const [selectedInternship, setSelectedInternship] = useState<Internship>(MOCK_INTERNSHIPS[0]);

  // Search parameters when navigated from Home
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  // Logout handler
  const handleLogout = () => {
    setStudent(null);
    setCurrentScreen('login');
  };

  // Login handler
  const handleLoginSuccess = (authenticatedStudent: StudentProfile) => {
    setStudent(authenticatedStudent);
    setCurrentScreen('home');
  };

  // Switch demo student profile (Alex Chen <-> Maya Patel)
  const handleSelectStudentProfile = (studentId: string) => {
    const found = demoProfiles.find(p => p.id === studentId);
    if (found) {
      setStudent(found);
    }
  };

  // Update student profile
  const handleUpdateStudentProfile = (updated: StudentProfile) => {
    setStudent(updated);
    setDemoProfiles(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  // Navigate to Search with query from Home
  const handleStartSearchFromHome = (query: string, location?: string) => {
    setSearchQuery(query);
    setSearchLocation(location || '');
    setCurrentScreen('search');
  };

  // Select internship to view details
  const handleSelectInternship = (internship: Internship) => {
    setSelectedInternship(internship);
    setCurrentScreen('details');
  };

  // Apply directly to internship
  const handleApplyDirect = (internship: Internship) => {
    setSelectedInternship(internship);
    setCurrentScreen('apply');
  };

  // Submit application
  const handleSubmitApplication = (newApp: Application) => {
    setApplications(prev => [newApp, ...prev]);
    setCurrentScreen('status');
  };

  // Withdraw application
  const handleWithdrawApplication = (appId: string) => {
    setApplications(prev => prev.filter(a => a.id !== appId));
  };

  return (
    <div className="min-h-screen bg-[#180306] text-rose-50 flex flex-col font-sans selection:bg-red-800 selection:text-white">
      
      {/* Top Bar Navigation */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={(screen) => setCurrentScreen(screen)}
        activeApplicationsCount={applications.length}
        student={student}
        onLogout={handleLogout}
        onSelectStudentProfile={handleSelectStudentProfile}
        demoProfiles={demoProfiles}
      />

      {/* Main Content Viewport */}
      <main className="flex-1">
        {currentScreen === 'login' || !student ? (
          <LoginScreen
            onLoginSuccess={handleLoginSuccess}
            demoProfiles={demoProfiles}
          />
        ) : currentScreen === 'home' ? (
          <HomeScreen
            student={student}
            internships={internships}
            onNavigate={(screen) => setCurrentScreen(screen)}
            onSelectInternship={handleSelectInternship}
            onStartSearch={handleStartSearchFromHome}
            activeApplicationsCount={applications.length}
          />
        ) : currentScreen === 'search' ? (
          <SearchScreen
            student={student}
            internships={internships}
            onSelectInternship={handleSelectInternship}
            onApplyDirect={handleApplyDirect}
            initialQuery={searchQuery}
            initialLocation={searchLocation}
          />
        ) : currentScreen === 'details' ? (
          <InternshipDetailsScreen
            internship={selectedInternship}
            student={student}
            onBack={() => setCurrentScreen('search')}
            onApply={(internship) => {
              setSelectedInternship(internship);
              setCurrentScreen('apply');
            }}
          />
        ) : currentScreen === 'apply' ? (
          <ApplyScreen
            internship={selectedInternship}
            student={student}
            onBack={() => setCurrentScreen('details')}
            onSubmitApplication={handleSubmitApplication}
            onUpdateStudentResume={(fileName, parsedSkills) => {
              const updated = {
                ...student,
                resumeFileName: fileName,
                resumeUploadedAt: 'Just now',
                resumeParsedSkills: parsedSkills
              };
              handleUpdateStudentProfile(updated);
            }}
          />
        ) : currentScreen === 'status' ? (
          <ApplicationStatusScreen
            applications={applications}
            onNavigate={(screen) => setCurrentScreen(screen)}
            onWithdrawApplication={handleWithdrawApplication}
          />
        ) : currentScreen === 'profile' ? (
          <ProfileScreen
            student={student}
            onUpdateProfile={handleUpdateStudentProfile}
            onNavigateToSearch={() => setCurrentScreen('search')}
          />
        ) : null}
      </main>

      {/* Clean, quiet student-friendly footer adhering to anti-slop guidelines */}
      <footer className="bg-[#200508] border-t border-[#4a0d16] mt-12 py-8 text-xs text-rose-300/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-rose-50">MatchPoint</span>
            <span aria-hidden="true" className="text-red-900">·</span>
            <span>Student Verified Internship Network</span>
            <span aria-hidden="true" className="text-red-900">·</span>
            <span>Zero Ghosting Guarantee</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => student ? setCurrentScreen('search') : setCurrentScreen('login')}
              className="hover:text-rose-200 transition-colors"
            >
              Browse Openings
            </button>
            <button
              onClick={() => student ? setCurrentScreen('profile') : setCurrentScreen('login')}
              className="hover:text-rose-200 transition-colors"
            >
              Resume Parser
            </button>
            <button
              onClick={() => student ? setCurrentScreen('status') : setCurrentScreen('login')}
              className="hover:text-rose-200 transition-colors"
            >
              Application SLA Tracker
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
