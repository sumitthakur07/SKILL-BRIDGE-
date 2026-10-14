import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { Briefcase, CheckCircle2, ShieldCheck, DollarSign, Clock, ArrowRight, Sparkles } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: (student: StudentProfile) => void;
  demoProfiles: StudentProfile[];
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  demoProfiles
}) => {
  const [email, setEmail] = useState('sumit.t@ahduni.edu.in');
  const [password, setPassword] = useState('••••••••••••');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDemoId, setSelectedDemoId] = useState(demoProfiles[0]?.id || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      // Find matching profile or default to first
      const found = demoProfiles.find(p => p.id === selectedDemoId) || demoProfiles[0];
      setIsSubmitting(false);
      onLoginSuccess(found);
    }, 400);
  };

  const handleQuickDemoSelect = (profile: StudentProfile) => {
    setSelectedDemoId(profile.id);
    setEmail(profile.email);
    onLoginSuccess(profile);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#180306]">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Left column: Student problem & value solution */}
        <div className="md:col-span-6 space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-950/80 border border-red-800/80 text-rose-200 rounded-md text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span>For College Students & Grads</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-rose-50 leading-tight">
              Stop struggling with fake listings & ghosted applications.
            </h1>
            <p className="text-rose-200/80 text-base leading-relaxed">
              MatchPoint connects university students exclusively with verified, paid internships matching your exact coursework skills and location.
            </p>
          </div>

          {/* Core guarantees solving student struggle */}
          <div className="space-y-3.5 pt-2">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded bg-[#380b12] border border-[#5c131f] flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4 text-red-400" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-rose-100">100% Verified Employers</h2>
                <p className="text-xs text-rose-300/70">Corporate tax IDs and hiring teams are verified. No unpaid scams or fake listings.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded bg-[#380b12] border border-[#5c131f] flex items-center justify-center shrink-0 mt-0.5">
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-rose-100">Guaranteed Stipends & Dedicated Mentors</h2>
                <p className="text-xs text-rose-300/70">Every listing includes transparent pay rates and a named senior engineer or mentor.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded bg-[#380b12] border border-[#5c131f] flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-rose-100">Anti-Ghosting SLA Guarantee</h2>
                <p className="text-xs text-rose-300/70">Employers commit to review your application within 3–5 business days.</p>
              </div>
            </div>
          </div>

          <div className="pt-2 text-xs text-rose-300/60 flex items-center gap-4">
            <span>Trusted by students across 140+ universities</span>
            <span aria-hidden="true" className="text-red-900">·</span>
            <span>Over 3,200 verified placements</span>
          </div>
        </div>

        {/* Right column: Login Form & Demo switcher */}
        <div className="md:col-span-6 bg-[#24060a] border border-[#4d0d17] rounded-xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded bg-red-700 flex items-center justify-center text-white">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-rose-50">Student Portal Login</h2>
              <p className="text-xs text-rose-300/70">Sign in to search internships and track applications</p>
            </div>
          </div>

          {/* Quick Demo Student Selector for effortless testing */}
          <div className="mb-6 p-3 bg-[#30080e] border border-[#5a111c] rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-rose-200">Instant Demo Login</span>
              <span className="text-[11px] text-red-400 font-medium">1-Click Test</span>
            </div>
            <div className="space-y-1.5">
              {demoProfiles.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleQuickDemoSelect(p)}
                  className="w-full text-left p-2 rounded bg-[#200508] border border-[#4a0d16] hover:border-red-500 hover:shadow-xs transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={p.avatarUrl}
                      alt={p.fullName}
                      className="w-7 h-7 rounded-full object-cover border border-red-500/50"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="text-xs font-semibold text-rose-100 group-hover:text-red-400">
                        {p.fullName}
                      </p>
                      <p className="text-[11px] text-rose-300/70">
                        {p.major} · {p.university.split(' ')[0]}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-red-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Enter <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#4d0d17]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-[#24060a] text-rose-400/60">or sign in with university credentials</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-rose-200 mb-1">
                Student Email (.edu)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="name@university.edu"
                className="w-full px-3 py-2 text-sm bg-[#340a10] border border-[#5c131f] text-rose-50 placeholder-rose-300/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-rose-200">
                  Password
                </label>
                <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-xs text-red-400 hover:underline">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 text-sm bg-[#340a10] border border-[#5c131f] text-rose-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 font-mono"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-rose-300/80 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-[#5c131f] bg-[#340a10] text-red-600 focus:ring-red-500" />
                <span>Remember me on this campus device</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 bg-red-700 text-white font-semibold text-sm rounded-lg hover:bg-red-600 transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-75"
            >
              {isSubmitting ? (
                <span>Authenticating student...</span>
              ) : (
                <>
                  <span>Sign In to Student Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-[#4d0d17] text-center">
            <p className="text-xs text-rose-300/70">
              New student?{' '}
              <button
                type="button"
                onClick={() => onLoginSuccess(demoProfiles[0])}
                className="text-red-400 font-semibold hover:underline"
              >
                Create student profile with .edu email
              </button>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
