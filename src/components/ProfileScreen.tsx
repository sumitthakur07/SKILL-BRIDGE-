import React, { useState } from 'react';
import { StudentProfile, WorkMode } from '../types';
import { SAMPLE_RESUMES, AVAILABLE_SKILLS_LIST, AVAILABLE_LOCATIONS_LIST } from '../data/mockData';
import { 
  User, 
  FileText, 
  Upload, 
  CheckCircle2, 
  Plus, 
  X, 
  Sparkles, 
  Save, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Globe, 
  Github, 
  Linkedin,
  FileCheck,
  RefreshCw,
  Camera,
  Image as ImageIcon
} from 'lucide-react';

interface ProfileScreenProps {
  student: StudentProfile;
  onUpdateProfile: (updated: StudentProfile) => void;
  onNavigateToSearch: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  student,
  onUpdateProfile,
  onNavigateToSearch
}) => {
  const [formData, setFormData] = useState<StudentProfile>({ ...student });
  const [newSkillInput, setNewSkillInput] = useState('');
  const [isSavedToast, setIsSavedToast] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'resume' | 'preferences'>('profile');
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  // Add a skill
  const handleAddSkill = (skillToAdd: string) => {
    const trimmed = skillToAdd.trim();
    if (!trimmed) return;
    if (!formData.skills.includes(trimmed)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, trimmed]
      }));
    }
    setNewSkillInput('');
  };

  // Remove a skill
  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
  };

  // Handle work mode toggle
  const handleToggleWorkMode = (mode: WorkMode) => {
    setFormData(prev => {
      const current = prev.preferredWorkMode;
      const next = current.includes(mode)
        ? current.filter(m => m !== mode)
        : [...current, mode];
      return { ...prev, preferredWorkMode: next };
    });
  };

  // Handle photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          const newAvatar = uploadEvent.target.result as string;
          const updated = { ...formData, avatarUrl: newAvatar };
          setFormData(updated);
          onUpdateProfile(updated);
          showSavedToast();
          setShowPhotoModal(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle custom file upload simulation
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const parsedMockSkills = ['React', 'TypeScript', 'Node.js', 'SQL', 'Git', 'Tailwind CSS'];
      
      const updated: StudentProfile = {
        ...formData,
        resumeFileName: file.name,
        resumeUploadedAt: 'Just now',
        resumeParsedSkills: parsedMockSkills,
        resumeSummary: 'Extracted academic coursework in Software Engineering, Data Structures, and Cloud Computing. Validated contact information.'
      };

      setFormData(updated);
      onUpdateProfile(updated);
      showSavedToast();
    }
  };

  // Load a pre-configured sample student resume
  const handleLoadSampleResume = (sample: typeof SAMPLE_RESUMES[0]) => {
    const updated: StudentProfile = {
      ...formData,
      resumeFileName: sample.fileName,
      resumeUploadedAt: 'Just now',
      resumeParsedSkills: sample.skills,
      resumeSummary: sample.summary,
      // optionally add newly found skills
      skills: Array.from(new Set([...formData.skills, ...sample.skills]))
    };

    setFormData(updated);
    onUpdateProfile(updated);
    showSavedToast();
  };

  const showSavedToast = () => {
    setIsSavedToast(true);
    setTimeout(() => setIsSavedToast(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    showSavedToast();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Toast Notification */}
      {isSavedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-800 text-white px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 text-xs font-semibold animate-fade-in border border-emerald-600">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>Profile & Resume updated successfully! Match scores refreshed.</span>
        </div>
      )}

      {/* Header Profile Card */}
      <div className="bg-[#24060a] border border-[#4d0d17] rounded-xl p-6 shadow-sm flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          <div className="relative group">
            <img
              src={formData.avatarUrl}
              alt={formData.fullName}
              className="w-20 h-20 rounded-full object-cover border-2 border-red-600 shadow-md"
              referrerPolicy="no-referrer"
            />
            <button
              type="button"
              onClick={() => setShowPhotoModal(true)}
              className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-[10px] text-white font-medium"
              title="Change photograph"
            >
              <Camera className="w-4 h-4 mb-0.5 text-rose-300" />
              <span>Change</span>
            </button>
            <div className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1 rounded-full border-2 border-[#24060a]" title="Verified Student">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <h1 className="text-xl font-bold text-rose-100">{formData.fullName}</h1>
              <span className="text-[11px] font-semibold text-rose-200 bg-red-950/80 border border-red-800/80 px-2 py-0.5 rounded">
                Verified Student
              </span>
              <button
                type="button"
                onClick={() => setShowPhotoModal(true)}
                className="text-xs text-red-400 hover:text-red-300 underline font-medium flex items-center gap-1 ml-1"
              >
                <Camera className="w-3 h-3" /> Change Photo
              </button>
            </div>
            <p className="text-xs text-rose-200/90">{formData.degree} · {formData.major}</p>
            <p className="text-xs text-rose-300/70">{formData.university} · Class of {formData.graduationYear} · GPA {formData.gpa}</p>
            <div className="flex items-center gap-2 pt-1 text-xs text-rose-300/70 justify-center sm:justify-start">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>{formData.location}</span>
              <span aria-hidden="true">·</span>
              <span>Available {formData.availableFrom}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 shrink-0">
          <button
            onClick={onNavigateToSearch}
            className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white font-semibold text-xs rounded-lg transition-colors shadow-sm flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Search Internships for My Skills</span>
          </button>
        </div>
      </div>

      {/* Photo Change Modal */}
      {showPhotoModal && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <div className="bg-[#24060a] border border-[#4d0d17] rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#400c15]">
              <div className="flex items-center gap-2 text-rose-100 font-bold text-sm">
                <Camera className="w-4 h-4 text-red-400" />
                <span>Update Student Photograph</span>
              </div>
              <button
                onClick={() => setShowPhotoModal(false)}
                className="text-rose-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-center py-2">
              <img
                src={formData.avatarUrl}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-red-600 shadow-md"
              />
            </div>

            <div className="space-y-3">
              <label className="block cursor-pointer px-4 py-3 bg-[#1c0407] border border-dashed border-[#540f1a] hover:border-red-500 rounded-lg text-center transition-colors">
                <Upload className="w-5 h-5 text-red-400 mx-auto mb-1" />
                <span className="text-xs font-semibold text-rose-200 block">Upload New Photo from Device</span>
                <span className="text-[11px] text-rose-400/60 block mt-0.5">JPG, PNG, WebP up to 5MB</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>

              <div className="pt-2">
                <span className="text-xs font-semibold text-rose-300 block mb-2">Or choose from photo presets:</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const updated = { ...formData, avatarUrl: '/src/assets/images/student_profile_photo_1790762669172.jpg' };
                      setFormData(updated);
                      onUpdateProfile(updated);
                      showSavedToast();
                      setShowPhotoModal(false);
                    }}
                    className="p-2 bg-[#1c0407] hover:bg-[#34090f] border border-[#4d0d17] rounded-lg text-left text-xs text-rose-200 transition-colors flex items-center gap-2"
                  >
                    <img src="/src/assets/images/student_profile_photo_1790762669172.jpg" alt="" className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-[11px]">Portrait Studio</p>
                      <p className="text-[10px] text-rose-400/70">Sumit T</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const updated = { ...formData, avatarUrl: '/src/assets/images/student_avatar_profile_1790761773754.jpg' };
                      setFormData(updated);
                      onUpdateProfile(updated);
                      showSavedToast();
                      setShowPhotoModal(false);
                    }}
                    className="p-2 bg-[#1c0407] hover:bg-[#34090f] border border-[#4d0d17] rounded-lg text-left text-xs text-rose-200 transition-colors flex items-center gap-2"
                  >
                    <img src="/src/assets/images/student_avatar_profile_1790761773754.jpg" alt="" className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-[11px]">Campus Headshot</p>
                      <p className="text-[10px] text-rose-400/70">Verified ID</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#400c15] flex justify-end">
              <button
                type="button"
                onClick={() => setShowPhotoModal(false)}
                className="px-4 py-2 bg-[#2c060b] text-rose-200 text-xs font-semibold rounded-lg hover:bg-[#38090f]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-[#4d0d17]">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'profile'
              ? 'border-red-600 text-rose-100 font-bold'
              : 'border-transparent text-rose-300/70 hover:text-white'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile Information</span>
        </button>

        <button
          onClick={() => setActiveTab('resume')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'resume'
              ? 'border-red-600 text-rose-100 font-bold'
              : 'border-transparent text-rose-300/70 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Resume Upload & Skill Extractor</span>
        </button>

        <button
          onClick={() => setActiveTab('preferences')}
          className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'preferences'
              ? 'border-red-600 text-rose-100 font-bold'
              : 'border-transparent text-rose-300/70 hover:text-white'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Target Roles & Locations</span>
        </button>
      </div>

      {/* Tab 1: Profile Form */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-[#24060a] border border-[#4d0d17] rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-rose-100 pb-2 border-b border-[#400c15] flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-red-400" />
              <span>Academic & Contact Information</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-rose-300/80 font-semibold mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-2 bg-[#1c0407] border border-[#4d0d17] rounded-lg text-rose-100 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                />
              </div>

              <div>
                <label className="block text-rose-300/80 font-semibold mb-1">Student Email (.edu)</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-[#1c0407] border border-[#4d0d17] rounded-lg text-rose-100 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                />
              </div>

              <div>
                <label className="block text-rose-300/80 font-semibold mb-1">University / College</label>
                <input
                  type="text"
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  className="w-full px-3 py-2 bg-[#1c0407] border border-[#4d0d17] rounded-lg text-rose-100 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                />
              </div>

              <div>
                <label className="block text-rose-300/80 font-semibold mb-1">Degree Program</label>
                <input
                  type="text"
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  className="w-full px-3 py-2 bg-[#1c0407] border border-[#4d0d17] rounded-lg text-rose-100 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                />
              </div>

              <div>
                <label className="block text-rose-300/80 font-semibold mb-1">Major Specialization</label>
                <input
                  type="text"
                  value={formData.major}
                  onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                  className="w-full px-3 py-2 bg-[#1c0407] border border-[#4d0d17] rounded-lg text-rose-100 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                />
              </div>

              <div>
                <label className="block text-rose-300/80 font-semibold mb-1">Graduation Year</label>
                <input
                  type="text"
                  value={formData.graduationYear}
                  onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                  className="w-full px-3 py-2 bg-[#1c0407] border border-[#4d0d17] rounded-lg text-rose-100 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                />
              </div>

              <div>
                <label className="block text-rose-300/80 font-semibold mb-1">GPA / Academic Standing</label>
                <input
                  type="text"
                  value={formData.gpa}
                  onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                  className="w-full px-3 py-2 bg-[#1c0407] border border-[#4d0d17] rounded-lg text-rose-100 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                />
              </div>

              <div>
                <label className="block text-rose-300/80 font-semibold mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-[#1c0407] border border-[#4d0d17] rounded-lg text-rose-100 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-rose-300/80 font-semibold mb-1 text-xs">Bio & Career Objective</label>
              <textarea
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full p-3 text-xs bg-[#1c0407] border border-[#4d0d17] rounded-lg text-rose-100 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 leading-relaxed placeholder:text-rose-400/50"
              />
            </div>
          </div>

          {/* Skills Management Section */}
          <div className="bg-[#24060a] border border-[#4d0d17] rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#400c15]">
              <div>
                <h2 className="text-sm font-bold text-rose-100">Your Technical & Coursework Skills</h2>
                <p className="text-xs text-rose-300/70">
                  These skills directly feed the MatchPoint compatibility engine.
                </p>
              </div>
              <span className="text-xs font-bold text-rose-200 bg-red-950/80 border border-red-800/80 px-2 py-0.5 rounded">
                {formData.skills.length} Skills Listed
              </span>
            </div>

            {/* Current Skills list */}
            <div className="flex flex-wrap gap-2 pt-1">
              {formData.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-950/80 text-rose-200 border border-red-800/80 rounded-lg text-xs font-medium"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-rose-400 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Add skill input and presets */}
            <div className="pt-3 border-t border-[#400c15] space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type new skill (e.g. Next.js, Docker, PyTorch)..."
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSkill(newSkillInput);
                    }
                  }}
                  className="flex-1 px-3 py-2 text-xs bg-[#1c0407] border border-[#4d0d17] rounded-lg text-rose-100 placeholder:text-rose-400/50 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                />
                <button
                  type="button"
                  onClick={() => handleAddSkill(newSkillInput)}
                  className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>

              {/* Suggestions */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-rose-300/70 pt-1">
                <span>Quick add:</span>
                {AVAILABLE_SKILLS_LIST.filter(s => !formData.skills.includes(s)).slice(0, 6).map((suggested) => (
                  <button
                    key={suggested}
                    type="button"
                    onClick={() => handleAddSkill(suggested)}
                    className="px-2 py-0.5 bg-[#1c0407] hover:bg-red-950/80 border border-[#4d0d17] text-rose-200 rounded text-[11px] transition-colors"
                  >
                    + {suggested}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Social & Portfolio Links */}
          <div className="bg-[#24060a] border border-[#4d0d17] rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-rose-100 pb-2 border-b border-[#400c15] flex items-center gap-2">
              <Globe className="w-4 h-4 text-red-400" />
              <span>Portfolio & Project Profiles</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-rose-300/80 font-semibold mb-1 flex items-center gap-1">
                  <Github className="w-3.5 h-3.5 text-rose-300" /> GitHub Profile
                </label>
                <input
                  type="url"
                  value={formData.githubUrl || ''}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full px-3 py-2 bg-[#1c0407] border border-[#4d0d17] rounded-lg text-rose-100 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                />
              </div>

              <div>
                <label className="block text-rose-300/80 font-semibold mb-1 flex items-center gap-1">
                  <Linkedin className="w-3.5 h-3.5 text-rose-300" /> LinkedIn URL
                </label>
                <input
                  type="url"
                  value={formData.linkedinUrl || ''}
                  onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full px-3 py-2 bg-[#1c0407] border border-[#4d0d17] rounded-lg text-rose-100 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                />
              </div>

              <div>
                <label className="block text-rose-300/80 font-semibold mb-1 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-rose-300" /> Personal Portfolio
                </label>
                <input
                  type="url"
                  value={formData.portfolioUrl || ''}
                  onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                  placeholder="https://myportfolio.dev"
                  className="w-full px-3 py-2 bg-[#1c0407] border border-[#4d0d17] rounded-lg text-rose-100 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-red-700 hover:bg-red-600 text-white font-semibold text-xs rounded-lg transition-colors shadow-sm flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Student Profile</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: Resume Upload & Parser */}
      {activeTab === 'resume' && (
        <div className="space-y-6">
          <div className="bg-[#24060a] border border-[#4d0d17] rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#400c15]">
              <div>
                <h2 className="text-sm font-bold text-rose-100">Resume Upload & Automatic Skill Parser</h2>
                <p className="text-xs text-rose-300/70">
                  Upload your PDF or Word resume. Our parser extracts technical keywords to calculate instant match scores against live internships.
                </p>
              </div>
              <FileCheck className="w-5 h-5 text-emerald-400" />
            </div>

            {/* Current Active Resume Card */}
            <div className="p-4 bg-[#1c0407] border border-[#4d0d17] rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-red-700 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-rose-100">
                    {formData.resumeFileName || 'No resume uploaded yet'}
                  </h3>
                  <p className="text-xs text-rose-300/70">
                    Uploaded {formData.resumeUploadedAt || 'Never'} · Parsed {formData.resumeParsedSkills?.length || formData.skills.length} Technical Skills
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <label className="cursor-pointer px-4 py-2 bg-[#2c060b] border border-[#540f1a] hover:bg-[#390810] rounded-lg text-xs font-semibold text-rose-200 flex items-center gap-2 transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload New Resume (.pdf)</span>
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Drag and Drop Box */}
            <div className="border-2 border-dashed border-[#540f1a] hover:border-red-500 rounded-xl p-8 text-center transition-colors bg-[#1c0407]/60">
              <Upload className="w-8 h-8 text-red-400 mx-auto mb-2" />
              <p className="text-xs font-bold text-rose-100">
                Drag and drop your resume file here
              </p>
              <p className="text-[11px] text-rose-400/60 mt-1">
                Supports PDF, DOCX, and TXT up to 10MB
              </p>
              <label className="mt-3 inline-block cursor-pointer px-4 py-2 bg-red-700 hover:bg-red-600 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm">
                Browse Files
                <input
                  type="file"
                  accept=".pdf,.docx,.doc"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Sample Resumes to test instant parsing */}
            <div className="pt-4 border-t border-[#400c15] space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-100">
                <Sparkles className="w-3.5 h-3.5 text-red-400" />
                <span>Test with Pre-Configured Student Resumes (1-Click Parse)</span>
              </div>
              <p className="text-[11px] text-rose-300/70">
                Select a sample resume to immediately see how our parser extracts skills and syncs them with your match engine:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {SAMPLE_RESUMES.map((sample) => (
                  <button
                    key={sample.name}
                    type="button"
                    onClick={() => handleLoadSampleResume(sample)}
                    className="p-3 bg-[#1c0407] border border-[#4d0d17] hover:border-red-600 hover:bg-[#2c060b] rounded-lg text-left transition-all group shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-rose-100 group-hover:text-red-300">
                        {sample.name.split('(')[0]}
                      </span>
                      <RefreshCw className="w-3 h-3 text-rose-400/60 group-hover:text-red-400" />
                    </div>
                    <p className="text-[11px] text-rose-300/70 line-clamp-2">
                      {sample.summary}
                    </p>
                    <div className="mt-2 text-[10px] text-red-400 font-medium">
                      {sample.skills.length} skills included →
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Extracted Skills Preview */}
            {formData.resumeParsedSkills && formData.resumeParsedSkills.length > 0 && (
              <div className="pt-4 border-t border-[#400c15] space-y-2">
                <h3 className="text-xs font-bold text-rose-100">
                  Skills Extracted from {formData.resumeFileName}:
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {formData.resumeParsedSkills.map((sk) => (
                    <span
                      key={sk}
                      className="px-2.5 py-1 bg-emerald-950/80 text-emerald-300 border border-emerald-800 rounded text-xs font-medium"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Preferences (Location & Roles) */}
      {activeTab === 'preferences' && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-[#24060a] border border-[#4d0d17] rounded-xl p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-rose-100 pb-2 border-b border-[#400c15]">
              Internship Location & Work Mode Preferences
            </h2>

            <div>
              <label className="block text-xs font-semibold text-rose-300/80 mb-1">
                Primary Residence / Campus Location
              </label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#1c0407] border border-[#4d0d17] text-rose-100 rounded-lg focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 cursor-pointer font-medium"
              >
                {AVAILABLE_LOCATIONS_LIST.filter(l => l !== 'All Locations').map((loc) => (
                  <option key={loc} value={loc} className="bg-[#24060a] text-rose-100">{loc}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-rose-300/80 mb-2">
                Preferred Work Modes (Select all that apply)
              </label>
              <div className="flex flex-wrap gap-2">
                {(['Remote', 'Hybrid', 'On-site'] as WorkMode[]).map((mode) => {
                  const isChecked = formData.preferredWorkMode.includes(mode);
                  return (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => handleToggleWorkMode(mode)}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                        isChecked
                          ? 'bg-red-700 text-white shadow-sm'
                          : 'bg-[#1c0407] border border-[#4d0d17] text-rose-200 hover:bg-[#2c060b]'
                      }`}
                    >
                      <span>{mode}</span>
                      {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-xs font-semibold text-rose-300/80 mb-1">
                Target Roles (Comma-separated)
              </label>
              <input
                type="text"
                value={formData.targetRoles.join(', ')}
                onChange={(e) => setFormData({
                  ...formData,
                  targetRoles: e.target.value.split(',').map(r => r.trim()).filter(Boolean)
                })}
                placeholder="Frontend Engineer Intern, Full Stack Intern, Data Analyst..."
                className="w-full px-3 py-2 text-xs bg-[#1c0407] border border-[#4d0d17] text-rose-100 rounded-lg focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-rose-300/80 mb-1">
                Earliest Availability Date
              </label>
              <input
                type="text"
                value={formData.availableFrom}
                onChange={(e) => setFormData({ ...formData, availableFrom: e.target.value })}
                placeholder="June 2026"
                className="w-full px-3 py-2 text-xs bg-[#1c0407] border border-[#4d0d17] text-rose-100 rounded-lg focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-red-700 hover:bg-red-600 text-white font-semibold text-xs rounded-lg transition-colors shadow-sm flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Preferences</span>
            </button>
          </div>
        </form>
      )}

    </div>
  );
};
