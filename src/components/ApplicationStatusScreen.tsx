import React, { useState } from 'react';
import { Application, ApplicationStage, NavigationScreen } from '../types';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Video, 
  Building2, 
  ArrowRight, 
  AlertCircle, 
  ShieldCheck, 
  DollarSign, 
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ApplicationStatusScreenProps {
  applications: Application[];
  onNavigate: (screen: NavigationScreen) => void;
  onWithdrawApplication: (appId: string) => void;
}

export const ApplicationStatusScreen: React.FC<ApplicationStatusScreenProps> = ({
  applications,
  onNavigate,
  onWithdrawApplication
}) => {
  const [filterStage, setFilterStage] = useState<string>('All');
  const [expandedAppId, setExpandedAppId] = useState<string | null>(applications[0]?.id || null);

  const stages: ApplicationStage[] = [
    'Submitted',
    'Under Review',
    'Interview Scheduled',
    'Offer Received'
  ];

  const filteredApplications = applications.filter(app => {
    if (filterStage === 'All') return true;
    return app.stage === filterStage;
  });

  const getStageIndex = (stage: ApplicationStage) => {
    const idx = stages.indexOf(stage);
    return idx === -1 ? 0 : idx;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header & Stats Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#4d0d17] pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-rose-50 tracking-tight">
            Application Status & Pipeline Tracker
          </h1>
          <p className="text-xs text-rose-300/80 mt-1">
            Real-time tracking with verified employer SLA response commitments. Zero black-hole applications.
          </p>
        </div>

        <button
          onClick={() => onNavigate('search')}
          className="self-start sm:self-auto px-4 py-2 bg-red-700 hover:bg-red-600 text-white font-semibold text-xs rounded-lg transition-colors shadow-sm flex items-center gap-1.5"
        >
          <span>Find More Internships</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* SLA Protection Metric Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#24060a] border border-[#4d0d17] rounded-xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-red-950/80 border border-red-800 text-rose-200 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-rose-400/80 uppercase">Total Applications</span>
            <p className="text-xl font-bold text-rose-100 tabular-nums">{applications.length} Tracked</p>
          </div>
        </div>

        <div className="bg-[#24060a] border border-[#4d0d17] rounded-xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-400 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-rose-400/80 uppercase">Anti-Ghosting SLA</span>
            <p className="text-sm font-bold text-emerald-300">100% On-Time Responses</p>
          </div>
        </div>

        <div className="bg-[#24060a] border border-[#4d0d17] rounded-xl p-4 shadow-sm flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-rose-400/80 uppercase">Upcoming Technical Sessions</span>
            <p className="text-sm font-bold text-purple-300">1 Interview Scheduled</p>
          </div>
        </div>
      </div>

      {/* Stage Filter Buttons (Interactive controls) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {['All', 'Submitted', 'Under Review', 'Interview Scheduled', 'Offer Received'].map((s) => (
          <button
            key={s}
            onClick={() => setFilterStage(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              filterStage === s
                ? 'bg-red-700 text-white shadow-sm'
                : 'bg-[#24060a] border border-[#4d0d17] text-rose-200 hover:bg-[#34090f]'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.length === 0 ? (
          <div className="bg-[#24060a] border border-[#4d0d17] rounded-xl p-12 text-center space-y-3 shadow-sm">
            <FileText className="w-10 h-10 text-rose-400/50 mx-auto" />
            <h3 className="text-base font-bold text-rose-100">No applications in this category</h3>
            <p className="text-xs text-rose-300/70 max-w-sm mx-auto">
              You haven't submitted any applications under "{filterStage}". Search verified openings to start applying!
            </p>
            <button
              onClick={() => onNavigate('search')}
              className="mt-2 px-4 py-2 bg-red-700 text-white text-xs font-semibold rounded-lg hover:bg-red-600 shadow-sm transition-colors"
            >
              Browse Openings
            </button>
          </div>
        ) : (
          filteredApplications.map((app) => {
            const isExpanded = expandedAppId === app.id;
            const currentStageIdx = getStageIndex(app.stage);

            return (
              <div
                key={app.id}
                className="bg-[#24060a] border border-[#4d0d17] rounded-xl overflow-hidden shadow-sm hover:border-[#6b1320] transition-all"
              >
                {/* Header Strip */}
                <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#400c15]">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-rose-200">{app.company}</span>
                      <span aria-hidden="true" className="text-rose-400/60">·</span>
                      <span className="text-xs text-rose-300/80">{app.location} ({app.workMode})</span>
                      <span aria-hidden="true" className="text-rose-400/60">·</span>
                      <span className="text-xs font-semibold text-emerald-300 tabular-nums">
                        ${app.stipendAmount.toLocaleString()} / mo
                      </span>
                    </div>

                    <h2 className="text-base font-bold text-rose-100">
                      {app.internshipTitle}
                    </h2>

                    <div className="text-xs text-rose-300/70 flex items-center gap-3">
                      <span>Submitted on {new Date(app.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span aria-hidden="true">·</span>
                      <span>Resume: {app.resumeUsed}</span>
                    </div>
                  </div>

                  {/* Stage pill & toggle */}
                  <div className="flex items-center gap-3 self-start md:self-auto">
                    <div className="text-right">
                      <span className={`inline-block px-3 py-1 rounded-md text-xs font-bold ${
                        app.stage === 'Interview Scheduled'
                          ? 'bg-purple-950/80 text-purple-300 border border-purple-800'
                          : app.stage === 'Under Review'
                          ? 'bg-red-950/80 text-red-300 border border-red-800'
                          : app.stage === 'Offer Received'
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                          : 'bg-[#1c0407] text-rose-200 border border-[#4d0d17]'
                      }`}>
                        {app.stage}
                      </span>
                    </div>

                    <button
                      onClick={() => setExpandedAppId(isExpanded ? null : app.id)}
                      className="p-1.5 rounded-lg border border-[#4d0d17] text-rose-300 hover:bg-[#32080e] transition-colors"
                      title={isExpanded ? "Collapse" : "Expand"}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Progress Stepper Bar */}
                <div className="px-5 py-4 bg-[#1c0407] border-b border-[#400c15]">
                  <div className="grid grid-cols-4 gap-2 text-center">
                    {stages.map((stg, sIdx) => {
                      const isCompleted = sIdx < currentStageIdx;
                      const isCurrent = sIdx === currentStageIdx;
                      return (
                        <div key={stg} className="space-y-1.5">
                          <div className="relative flex items-center justify-center">
                            <div
                              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                isCompleted
                                  ? 'bg-emerald-700 text-white'
                                  : isCurrent
                                  ? 'bg-red-700 text-white ring-4 ring-red-900/60'
                                  : 'bg-[#2c060b] border border-[#540f1a] text-rose-400'
                              }`}
                            >
                              {isCompleted ? '✓' : sIdx + 1}
                            </div>
                          </div>
                          <p className={`text-[11px] font-medium leading-tight ${
                            isCurrent ? 'text-red-300 font-bold' : isCompleted ? 'text-emerald-400' : 'text-rose-400/60'
                          }`}>
                            {stg}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Expanded Details Section */}
                {isExpanded && (
                  <div className="p-5 space-y-4">
                    
                    {/* Active Interview Notice if Scheduled */}
                    {app.interviewDetails && (
                      <div className="p-4 bg-purple-950/60 border border-purple-800/80 rounded-xl space-y-2">
                        <div className="flex items-center gap-2">
                          <Video className="w-4 h-4 text-purple-300" />
                          <h4 className="text-xs font-bold text-purple-200">
                            Technical Pairing Interview Confirmed
                          </h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-rose-200 pt-1">
                          <div>
                            <span className="text-purple-400 block text-[11px]">Date & Time</span>
                            <span className="font-semibold text-purple-100">{app.interviewDetails.date} · {app.interviewDetails.time}</span>
                          </div>
                          <div>
                            <span className="text-purple-400 block text-[11px]">Interviewer</span>
                            <span className="font-semibold text-purple-100">{app.interviewDetails.interviewer}</span>
                          </div>
                          <div>
                            <span className="text-purple-400 block text-[11px]">Meeting Room</span>
                            <a
                              href={app.interviewDetails.meetingLink}
                              target="_blank"
                              rel="noreferrer"
                              className="font-semibold text-purple-300 underline flex items-center gap-1 hover:text-purple-200"
                            >
                              Launch Google Meet <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Timeline History */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-rose-100">Status Timeline & SLA Milestones</h4>
                      <div className="space-y-2">
                        {app.timeline.map((entry, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs">
                            <div className="w-2 h-2 rounded-full bg-red-600 mt-1.5 shrink-0" />
                            <div>
                              <span className="font-semibold text-rose-100">{entry.stage}</span>
                              <span className="text-rose-400/80 ml-1.5 font-normal">({entry.date})</span>
                              <p className="text-rose-300/80 mt-0.5">{entry.note}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Student Cover Note */}
                    {app.coverNote && (
                      <div className="p-3 bg-[#1c0407] border border-[#4d0d17] rounded-lg text-xs">
                        <span className="font-semibold text-rose-200 block mb-1">Your Submitted Statement:</span>
                        <p className="text-rose-300/80 italic">"{app.coverNote}"</p>
                      </div>
                    )}

                    {/* Actions bar */}
                    <div className="pt-3 border-t border-[#400c15] flex items-center justify-between text-xs">
                      <span className="text-rose-300/70 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        Guaranteed stipend escrow active
                      </span>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to withdraw your application for ${app.internshipTitle}?`)) {
                              onWithdrawApplication(app.id);
                            }
                          }}
                          className="text-red-400 hover:text-red-300 font-semibold transition-colors"
                        >
                          Withdraw Application
                        </button>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
