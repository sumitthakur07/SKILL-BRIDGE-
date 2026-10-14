import React, { useState } from 'react';
import { Internship, StudentProfile, Application } from '../types';
import { calculateSkillMatch } from '../data/mockData';
import { 
  ArrowLeft, 
  CheckCircle2, 
  FileText, 
  Upload, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Send, 
  User, 
  Mail, 
  Phone, 
  GraduationCap,
  MapPin,
  Check
} from 'lucide-react';

interface ApplyScreenProps {
  internship: Internship;
  student: StudentProfile;
  onBack: () => void;
  onSubmitApplication: (application: Application) => void;
  onUpdateStudentResume?: (fileName: string, skills: string[]) => void;
}

export const ApplyScreen: React.FC<ApplyScreenProps> = ({
  internship,
  student,
  onBack,
  onSubmitApplication,
  onUpdateStudentResume
}) => {
  const match = calculateSkillMatch(student.skills, internship);

  const [selectedResume, setSelectedResume] = useState(student.resumeFileName || 'Alex_Chen_Software_Resume_2026.pdf');
  const [coverNote, setCoverNote] = useState(
    `Hello ${internship.company} team, I am an enthusiastic student at ${student.university} majoring in ${student.major}. With strong experience in ${match.matchedRequired.join(', ')}, I am excited to contribute to the ${internship.department} team this summer.`
  );
  const [workAuthConfirmed, setWorkAuthConfirmed] = useState(true);
  const [availabilityConfirmed, setAvailabilityConfirmed] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<Application | null>(null);

  const handleApplySuggestion = (suggestion: string) => {
    setCoverNote(prev => prev + ' ' + suggestion);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedResume(file.name);
      if (onUpdateStudentResume) {
        onUpdateStudentResume(file.name, student.skills);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Calculate SLA deadline (e.g. 5 days from today)
    const now = new Date();
    const slaDate = new Date(now.getTime() + (internship.reliability.antiGhostingSlaDays || 4) * 24 * 60 * 60 * 1000);

    const newApplication: Application = {
      id: `app-${Date.now()}`,
      internshipId: internship.id,
      internshipTitle: internship.title,
      company: internship.company,
      location: internship.location,
      workMode: internship.workMode,
      stipendAmount: internship.stipend.amount,
      submittedAt: now.toISOString(),
      stage: 'Submitted',
      resumeUsed: selectedResume,
      coverNote,
      slaDeadline: slaDate.toISOString(),
      timeline: [
        {
          stage: 'Submitted',
          date: 'Today',
          note: `Application submitted to ${internship.company}. Verified profile credentials attached.`
        }
      ]
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedApp(newApplication);
      setIsSuccess(true);
    }, 600);
  };

  if (isSuccess && submittedApp) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-950/80 border border-emerald-800 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-rose-50">
            Application Successfully Submitted!
          </h1>
          <p className="text-sm text-rose-200/80">
            Your application for <strong className="text-rose-100">{internship.title}</strong> at <strong className="text-rose-100">{internship.company}</strong> has been logged with your verified credentials.
          </p>
        </div>

        <div className="bg-[#24060a] border border-[#4d0d17] rounded-xl p-5 text-left space-y-3 max-w-md mx-auto text-xs shadow-md">
          <div className="flex justify-between">
            <span className="text-rose-300/70">Resume Attached:</span>
            <span className="font-semibold text-rose-100">{selectedResume}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-rose-300/70">Stipend:</span>
            <span className="font-semibold text-rose-100">${internship.stipend.amount.toLocaleString()} / mo</span>
          </div>
          <div className="flex justify-between">
            <span className="text-rose-300/70">Anti-Ghosting SLA:</span>
            <span className="font-semibold text-red-300">
              Response guaranteed within {internship.reliability.antiGhostingSlaDays} days
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-rose-300/70">Assigned Mentor:</span>
            <span className="font-semibold text-rose-100">{internship.reliability.assignedMentor.name}</span>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => onSubmitApplication(submittedApp)}
            className="w-full sm:w-auto px-6 py-2.5 bg-red-700 hover:bg-red-600 text-white font-semibold text-xs rounded-lg transition-colors shadow-sm"
          >
            Track in Application Status Pipeline →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-300 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Cancel & Back</span>
      </button>

      {/* Target Internship Header */}
      <div className="bg-[#24060a] border border-[#4d0d17] rounded-xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-lg ${internship.companyLogoBg} text-white font-extrabold text-base flex items-center justify-center shrink-0`}>
            {internship.companyLogoText}
          </div>
          <div>
            <span className="text-xs text-rose-300/80 font-medium">{internship.company}</span>
            <h1 className="text-lg font-bold text-rose-100">{internship.title}</h1>
            <div className="flex items-center gap-2 text-xs text-rose-300/70 mt-0.5">
              <span>{internship.location}</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-rose-200">${internship.stipend.amount.toLocaleString()} / mo</span>
              <span aria-hidden="true">·</span>
              <span>{internship.duration}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="px-3 py-1.5 bg-red-950/80 border border-red-800 rounded-lg text-right">
            <span className="text-[10px] text-red-300 block font-semibold uppercase">Skill Fit</span>
            <span className="text-sm font-extrabold text-rose-100 tabular-nums">{match.percentage}% Compatibility</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Step 1: Candidate Verification */}
        <div className="bg-[#24060a] border border-[#4d0d17] rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#400c15]">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-red-400" />
              <h2 className="text-sm font-bold text-rose-100">1. Student Profile Verification</h2>
            </div>
            <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Verified Student ID
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-rose-300/70 mb-1">Full Legal Name</label>
              <input
                type="text"
                readOnly
                value={student.fullName}
                className="w-full px-3 py-2 bg-[#1c0407] border border-[#4d0d17] rounded-lg text-rose-100 font-medium"
              />
            </div>

            <div>
              <label className="block text-rose-300/70 mb-1">University / College</label>
              <input
                type="text"
                readOnly
                value={student.university}
                className="w-full px-3 py-2 bg-[#1c0407] border border-[#4d0d17] rounded-lg text-rose-100 font-medium"
              />
            </div>

            <div>
              <label className="block text-rose-300/70 mb-1">Major & Degree</label>
              <input
                type="text"
                readOnly
                value={`${student.degree} - ${student.major}`}
                className="w-full px-3 py-2 bg-[#1c0407] border border-[#4d0d17] rounded-lg text-rose-100 font-medium"
              />
            </div>

            <div>
              <label className="block text-rose-300/70 mb-1">Graduation Year & GPA</label>
              <input
                type="text"
                readOnly
                value={`Class of ${student.graduationYear} · GPA ${student.gpa}`}
                className="w-full px-3 py-2 bg-[#1c0407] border border-[#4d0d17] rounded-lg text-rose-100 font-medium"
              />
            </div>

            <div>
              <label className="block text-rose-300/70 mb-1">Student Email (.edu)</label>
              <input
                type="email"
                readOnly
                value={student.email}
                className="w-full px-3 py-2 bg-[#1c0407] border border-[#4d0d17] rounded-lg text-rose-100 font-medium"
              />
            </div>

            <div>
              <label className="block text-rose-300/70 mb-1">Contact Phone</label>
              <input
                type="text"
                readOnly
                value={student.phone}
                className="w-full px-3 py-2 bg-[#1c0407] border border-[#4d0d17] rounded-lg text-rose-100 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Step 2: Resume Selection */}
        <div className="bg-[#24060a] border border-[#4d0d17] rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#400c15]">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-red-400" />
              <h2 className="text-sm font-bold text-rose-100">2. Resume Attached</h2>
            </div>
            <span className="text-xs text-rose-400/70">PDF or Word document</span>
          </div>

          <div className="p-4 bg-[#1c0407] border border-[#4d0d17] rounded-lg flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-red-950/80 text-rose-200 border border-red-800/60 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-rose-100">{selectedResume}</p>
                <p className="text-[11px] text-rose-300/70">
                  {student.skills.length} verified technical skills indexed
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <label className="cursor-pointer px-3 py-1.5 bg-[#2c060b] border border-[#540f1a] hover:bg-[#38090f] rounded-lg text-xs font-semibold text-rose-200 flex items-center justify-center gap-1.5 transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Different Resume</span>
                <input
                  type="file"
                  accept=".pdf,.docx,.doc"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Step 3: Short Cover Note & Matched Skills */}
        <div className="bg-[#24060a] border border-[#4d0d17] rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#400c15]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-red-400" />
              <h2 className="text-sm font-bold text-rose-100">3. Student Statement & Interest Note</h2>
            </div>
            <span className="text-xs text-rose-400/60">Optional but recommended</span>
          </div>

          {/* Quick 1-click tailored suggestions based on matched skills */}
          <div className="space-y-1.5">
            <span className="text-xs text-rose-300/80 font-medium">Quick suggestions to include:</span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleApplySuggestion(`I have built full-stack applications utilizing ${match.matchedRequired.slice(0, 2).join(' and ')} in academic team projects.`)}
                className="px-2.5 py-1 bg-red-950/70 hover:bg-red-900 text-rose-200 border border-red-800/60 text-xs rounded-md font-medium transition-colors text-left"
              >
                + Highlight matched coursework skills
              </button>
              <button
                type="button"
                onClick={() => handleApplySuggestion('I am excited to learn under a designated senior engineering mentor and contribute immediately to weekly sprint deliverables.')}
                className="px-2.5 py-1 bg-[#1c0407] hover:bg-[#2c060b] text-rose-300 border border-[#4d0d17] text-xs rounded-md font-medium transition-colors text-left"
              >
                + Mention mentorship eagerness
              </button>
            </div>
          </div>

          <div>
            <textarea
              rows={4}
              value={coverNote}
              onChange={(e) => setCoverNote(e.target.value)}
              className="w-full p-3 text-xs text-rose-100 bg-[#1c0407] border border-[#4d0d17] rounded-lg focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 leading-relaxed placeholder:text-rose-400/50"
              placeholder="Why are you interested in this internship and how do your skills align with the team?"
            />
          </div>
        </div>

        {/* Step 4: Availability & Eligibility confirmation */}
        <div className="bg-[#24060a] border border-[#4d0d17] rounded-xl p-6 shadow-sm space-y-3">
          <h2 className="text-sm font-bold text-rose-100 pb-2 border-b border-[#400c15]">
            4. Work Authorization & Availability
          </h2>

          <div className="space-y-2 text-xs text-rose-200">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={availabilityConfirmed}
                onChange={(e) => setAvailabilityConfirmed(e.target.checked)}
                required
                className="mt-0.5 rounded border-red-900 bg-[#1c0407] text-red-600 focus:ring-red-500"
              />
              <span>
                I confirm I am available to work during the <strong className="text-rose-100">{internship.duration}</strong> term ({internship.startDate}) in a <strong className="text-rose-100">{internship.workMode}</strong> capacity in {internship.location}.
              </span>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={workAuthConfirmed}
                onChange={(e) => setWorkAuthConfirmed(e.target.checked)}
                required
                className="mt-0.5 rounded border-red-900 bg-[#1c0407] text-red-600 focus:ring-red-500"
              />
              <span>
                I am legally authorized to participate in paid internships in the required country (including F-1 CPT/OPT or permanent authorization).
              </span>
            </label>
          </div>
        </div>

        {/* Bottom Trust Guarantee & Submit CTA */}
        <div className="p-4 bg-gradient-to-r from-[#38090f] to-[#24060a] border border-red-900/80 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-red-700 text-white flex items-center justify-center shrink-0 shadow-sm">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-rose-100">Anti-Ghosting SLA In Effect</h4>
              <p className="text-[11px] text-rose-300/80">
                {internship.company} is pledged to review your application within {internship.reliability.antiGhostingSlaDays} business days or an automated check-in triggers.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !availabilityConfirmed || !workAuthConfirmed}
            className="w-full sm:w-auto px-6 py-2.5 bg-red-700 hover:bg-red-600 text-white font-bold text-xs rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Submitting Application...</span>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Submit Verified Application</span>
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
};
