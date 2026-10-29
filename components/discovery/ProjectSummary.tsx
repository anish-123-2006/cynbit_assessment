"use client";

import React, { useState } from "react";
import { ProjectSummaryResult, DiscoveryFormData } from "@/lib/discovery/types";
import {
  Sparkles,
  Calendar,
  Send,
  CheckCircle,
  HelpCircle,
  ShieldAlert,
  ArrowRight,
  Layers,
  Clock,
  Briefcase,
  Copy,
  Check,
  RotateCcw,
  Info,
} from "lucide-react";
import { BookingPanel } from "./BookingPanel";
import { DiscoveryValueProps } from "./DiscoveryValueProps";

interface ProjectSummaryProps {
  summary: ProjectSummaryResult;
  formData: DiscoveryFormData;
  onRestart: () => void;
  onSubmitBrief: () => Promise<{ success: boolean; referenceId?: string; mocked?: boolean }>;
}

export function ProjectSummary({
  summary,
  formData,
  onRestart,
  onSubmitBrief,
}: ProjectSummaryProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [copiedBrief, setCopiedBrief] = useState(false);

  const handleSendBrief = async () => {
    setIsSubmitting(true);
    try {
      const res = await onSubmitBrief();
      if (res.success) {
        setSubmissionSuccess(true);
        setReferenceId(res.referenceId || "CYN-MOCK-CONFIRMED");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyBriefToClipboard = () => {
    const text = `CYNBIT PROJECT DISCOVERY BRIEF (PRELIMINARY)
Category: ${summary.projectCategory}
Primary Direction: ${summary.recommendedDirection}
Client: ${formData.fullName} (${formData.company || "Independent"})
Email: ${formData.email}
Summary: ${summary.problemSummary}
Key Exploration Questions:
${summary.followUpQuestions.map((q, i) => `${i + 1}. ${q}`).join("\n")}
`;
    navigator.clipboard.writeText(text);
    setCopiedBrief(true);
    setTimeout(() => setCopiedBrief(false), 3000);
  };

  return (
    <div className="space-y-8" role="region" aria-label="Step 5: Preliminary Project Direction">
      {/* Header with Mandatory Preliminary Disclaimer */}
      <div className="space-y-3 border-b border-white/10 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center space-x-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 px-3 py-1 text-xs font-mono text-brand-cyan">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Preliminary Engineering Assessment</span>
          </div>

          <div className="inline-flex items-center space-x-1.5 rounded-full border border-amber-500/30 bg-amber-950/30 px-2.5 py-0.5 text-[10px] font-mono text-amber-300">
            <Info className="w-3 h-3 text-amber-400" />
            <span>Prototype Engine Active</span>
          </div>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
          Your initial project direction
        </h2>
        <div className="flex items-start space-x-2 text-xs text-amber-300/90 bg-amber-950/20 border border-amber-500/20 rounded-xl p-3">
          <ShieldAlert className="w-4 h-4 flex-shrink-0 text-amber-400 mt-0.5" />
          <p className="leading-relaxed">
            {summary.disclaimer}
          </p>
        </div>
      </div>

      {/* Confirmation Banner if Submitted (Clearly Labeled as Mock Storage) */}
      {submissionSuccess && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/30 p-6 space-y-3">
          <div className="flex items-center space-x-3 text-emerald-400">
            <CheckCircle className="w-6 h-6 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Project brief received! (Mock Prototype Simulation)
              </h3>
              <p className="text-xs text-emerald-300/90 font-mono">
                Simulated Reference ID: <span className="font-bold">{referenceId}</span>
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-amber-500/20 bg-amber-950/30 p-3 text-[11px] text-amber-200 leading-relaxed">
            <strong>Prototype Storage Notice:</strong> This brief submission is handled in-memory for local development logging. No personal data is persisted or sent to external services.
          </div>
        </div>
      )}

      {/* Grid: Context & Initial Understanding */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Category & Attributes */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-surface-200/60 p-5 space-y-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-1">
                Detected Category
              </span>
              <span className="text-base font-bold text-white tracking-tight">
                {summary.projectCategory}
              </span>
            </div>

            <div className="border-t border-white/5 pt-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-1">
                Recommended Direction
              </span>
              <span className="text-sm font-semibold text-brand-cyan tracking-tight">
                {summary.recommendedDirection}
              </span>
            </div>

            <div className="border-t border-white/5 pt-3 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400 font-mono">Stage:</span>
                <span className="text-gray-200 font-medium capitalize">
                  {formData.currentStage?.replace(/_/g, " ") || "Exploratory"}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400 font-mono">Target Timing:</span>
                <span className="text-gray-200 font-medium capitalize">
                  {formData.timeline?.replace(/_/g, " ") || "Flexible"}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400 font-mono">Confidence:</span>
                <span className="text-brand-cyan font-mono text-[11px] bg-brand-cyan/10 px-2 py-0.5 rounded">
                  {summary.confidence}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions (Copy / Restart) */}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={copyBriefToClipboard}
              className="flex-1 flex items-center justify-center space-x-1.5 rounded-xl border border-white/10 bg-surface-200/40 py-2.5 text-xs font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              {copiedBrief ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedBrief ? "Brief Copied!" : "Copy Brief Text"}</span>
            </button>
            <button
              type="button"
              onClick={onRestart}
              className="flex items-center space-x-1.5 rounded-xl border border-white/10 bg-surface-200/40 px-3 py-2.5 text-xs font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Start Over"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Right Column: Problem Summary & Follow-up Questions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Initial Understanding */}
          <div className="rounded-2xl border border-white/10 bg-surface-200/60 p-6 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-brand-cyan flex items-center space-x-2">
              <Briefcase className="w-4 h-4" />
              <span>Initial Understanding of the Problem</span>
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              {summary.problemSummary}
            </p>
          </div>

          {/* Follow-up Questions */}
          <div className="rounded-2xl border border-white/10 bg-surface-200/60 p-6 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-brand-violet flex items-center space-x-2">
              <HelpCircle className="w-4 h-4 text-brand-violet" />
              <span>Key Topics for Discovery Discussion</span>
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              During an exploratory conversation, the Cynbit team would evaluate these specific questions to map out potential architecture:
            </p>
            <ul className="space-y-2 pt-1">
              {summary.followUpQuestions.map((q, idx) => (
                <li
                  key={idx}
                  className="flex items-start space-x-2.5 text-xs text-gray-300 bg-black/30 p-3 rounded-xl border border-white/5"
                >
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-violet/20 text-brand-violet font-mono text-[10px] font-bold">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Relevant Capabilities Section */}
      <div className="space-y-4 pt-4">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-white tracking-tight flex items-center space-x-2">
            <Layers className="w-4 h-4 text-brand-cyan" />
            <span>Potentially Relevant Cynbit Capabilities</span>
          </h3>
          <p className="text-xs text-gray-400">
            Selected dynamically based on the systems and workflows you highlighted.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {summary.relevantCapabilities.map((cap) => (
            <div
              key={cap.id}
              className="rounded-2xl border border-white/10 bg-surface-200/60 p-5 space-y-3 flex flex-col justify-between hover:border-brand-cyan/30 transition-colors"
            >
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-white tracking-tight">
                  {cap.title}
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {cap.description}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/5">
                <p className="text-[10px] text-brand-cyan/90 font-mono">
                  Why potentially relevant: {cap.relevanceReason}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {cap.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Primary Actions & Next Steps */}
      <div className="rounded-3xl border border-brand-cyan/30 bg-gradient-to-br from-brand-cyan/[0.08] via-surface-200 to-surface-300 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Ready to construct your technical roadmap?
            </h3>
            <p className="text-xs text-gray-300 max-w-xl leading-relaxed pt-1">
              Choose to either submit your structured brief for review, or explore a potential discovery conversation (mock demo).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              disabled={isSubmitting || submissionSuccess}
              onClick={handleSendBrief}
              className={`inline-flex items-center justify-center space-x-2 rounded-xl px-5 py-3 text-xs font-bold transition-all ${
                submissionSuccess
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default"
                  : "bg-surface-100 hover:bg-surface-50 text-white border border-white/15"
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>
                {isSubmitting
                  ? "Transmitting Brief..."
                  : submissionSuccess
                  ? "Brief Received (Mock)"
                  : "Send My Project Brief"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setShowBooking(!showBooking)}
              className="inline-flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue px-6 py-3 text-xs font-bold text-black shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] transition-all hover:scale-[1.02]"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{showBooking ? "Hide Mock Calendar" : "Explore Discovery Scheduling (Mock)"}</span>
            </button>
          </div>
        </div>

        {/* Interactive Booking Panel */}
        {showBooking && (
          <div className="pt-4 border-t border-white/10 animate-in fade-in duration-300">
            <BookingPanel
              clientName={formData.fullName}
              clientEmail={formData.email}
              category={summary.projectCategory}
            />
          </div>
        )}
      </div>

      {/* Embedded "What Happens Next" Roadmap */}
      <DiscoveryValueProps defaultExpanded={true} />
    </div>
  );
}
