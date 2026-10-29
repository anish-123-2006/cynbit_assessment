"use client";

import React from "react";
import {
  BusinessGoal,
  SystemType,
  ProjectStage,
  Timeline,
} from "@/lib/discovery/types";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  AlertCircle,
  Clock,
  Layers,
  HelpCircle,
} from "lucide-react";

// Goal Options
const GOAL_OPTIONS: { id: BusinessGoal; label: string; desc: string }[] = [
  { id: "reduce_manual_work", label: "Reduce manual work", desc: "Automate repetitive data entry, file processing, or admin tasks" },
  { id: "launch_new_product", label: "Launch a new digital product", desc: "Architect and build a greenfield web/mobile software platform" },
  { id: "improve_existing_system", label: "Improve an existing system", desc: "Refactor performance, add key capabilities, or improve UI/UX" },
  { id: "connect_tools_data", label: "Connect multiple tools or data sources", desc: "Eliminate data silos between CRM, ERP, databases, and APIs" },
  { id: "improve_customer_experience", label: "Improve customer experience", desc: "Faster support turnaround, self-service portals, or interactive tools" },
  { id: "improve_marketing_leads", label: "Improve marketing or lead generation", desc: "Technical SEO, organic search discovery, or automated lead capture" },
  { id: "explore_product_partnership", label: "Explore a product or partnership", desc: "Evaluate Cynbit Studio, TenantEase, Revio, or custom collaboration" },
  { id: "still_exploring", label: "I am still exploring", desc: "Need architectural guidance on feasibility and technical tradeoffs" },
];

// System Options
const SYSTEM_OPTIONS: { id: SystemType; label: string }[] = [
  { id: "website", label: "Website / Web Portal" },
  { id: "mobile_app", label: "Mobile App (iOS/Android)" },
  { id: "crm", label: "CRM (HubSpot, Salesforce, Zoho)" },
  { id: "erp", label: "ERP / Operations System" },
  { id: "cloud_infrastructure", label: "Cloud (AWS / Azure / GCP)" },
  { id: "internal_database", label: "Internal Database / SQL / NoSQL" },
  { id: "documents_pdfs", label: "Documents / PDFs / Spreadsheets" },
  { id: "payment_system", label: "Payment Gateway / Billing" },
  { id: "social_review_platforms", label: "Social Media / Review Platforms" },
  { id: "not_sure", label: "Not sure / Yet to be determined" },
];

// Stage Options
const STAGE_OPTIONS: { id: ProjectStage; label: string; detail: string }[] = [
  { id: "idea_exploration", label: "Idea or early exploration", detail: "Concept stage; seeking feasibility & scope clarification" },
  { id: "existing_manual_process", label: "Existing manual process", detail: "Active workflow currently handled by humans via sheets/emails" },
  { id: "product_needs_improvement", label: "Existing product needing improvement", detail: "Live software that requires modernizing or major features" },
  { id: "growing_scaling_issues", label: "Growing system with scaling bottlenecks", detail: "Performance or database latency under increasing workload" },
  { id: "legacy_modernization", label: "Legacy system modernization", detail: "Older codebase or server needing modern cloud re-architecture" },
  { id: "ready_to_implement", label: "Ready to start implementation", detail: "Clear scope and requirements ready for sprint blueprinting" },
];

// Timeline Options
const TIMELINE_OPTIONS: { id: Timeline; label: string; detail: string }[] = [
  { id: "exploring_options", label: "Exploring options", detail: "Gathering technical insights without fixed deadline" },
  { id: "within_1_3_months", label: "Within 1–3 months", detail: "Near-term target for sprint kickoff" },
  { id: "within_3_6_months", label: "Within 3–6 months", detail: "Medium-term roadmap initiative" },
  { id: "more_than_6_months", label: "More than 6 months", detail: "Strategic planning for future quarters" },
  { id: "urgent_blocked", label: "Urgent or actively blocked", detail: "Active operational bottleneck needing immediate attention" },
];

interface ContextQuestionsProps {
  businessGoal?: BusinessGoal;
  challenge: string;
  onGoalChange: (goal: BusinessGoal) => void;
  onChallengeChange: (val: string) => void;
  onContinue: () => void;
  onBack: () => void;
  errors?: Record<string, string>;
}

export function ContextQuestions({
  businessGoal,
  challenge,
  onGoalChange,
  onChallengeChange,
  onContinue,
  onBack,
  errors = {},
}: ContextQuestionsProps) {
  const charCount = challenge.length;
  const isMinMet = charCount >= 20;

  return (
    <div className="space-y-8" role="region" aria-label="Step 2: Project Context">
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-brand-cyan">
          <span>Step 2</span>
          <span>•</span>
          <span>Business Goal & Challenge</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Tell us what you are trying to improve.
        </h2>
        <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
          Help us understand the objective behind this initiative. Select the primary goal and briefly describe the problem.
        </p>
      </div>

      {/* Question 1: Primary Goal */}
      <div className="space-y-3">
        <label className="block text-xs font-mono uppercase tracking-wider text-gray-300">
          Question 1: What is the primary objective? <span className="text-brand-cyan">*</span>
        </label>
        {errors.businessGoal && (
          <p className="text-xs text-rose-400 flex items-center space-x-1.5" role="alert">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.businessGoal}</span>
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {GOAL_OPTIONS.map((opt) => {
            const isSelected = businessGoal === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onGoalChange(opt.id)}
                className={`text-left p-3.5 rounded-xl border text-xs transition-all ${
                  isSelected
                    ? "border-brand-cyan/80 bg-brand-cyan/10 text-white shadow-[0_0_15px_rgba(0,240,255,0.12)] ring-1 ring-brand-cyan/50"
                    : "border-white/10 bg-surface-200/50 text-gray-300 hover:border-white/20 hover:bg-surface-100"
                }`}
              >
                <div className="flex items-center justify-between font-semibold mb-1">
                  <span>{opt.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-brand-cyan" />}
                </div>
                <p className="text-[11px] text-gray-400 leading-normal">{opt.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Question 2: Challenge Description */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <label htmlFor="challenge-textarea" className="block text-xs font-mono uppercase tracking-wider text-gray-300">
            Question 2: Describe the challenge or workflow <span className="text-brand-cyan">*</span>
          </label>
          <span
            className={`text-xs font-mono ${
              charCount < 20 ? "text-amber-400/80" : "text-gray-400"
            }`}
          >
            {charCount} / 2000 chars {charCount < 20 && "(min 20)"}
          </span>
        </div>

        {errors.challenge && (
          <p className="text-xs text-rose-400 flex items-center space-x-1.5" role="alert">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.challenge}</span>
          </p>
        )}

        <div className="relative">
          <textarea
            id="challenge-textarea"
            rows={4}
            value={challenge}
            onChange={(e) => onChallengeChange(e.target.value)}
            placeholder="Example: Our team manually extracts line items from supplier PDF invoices and keys them into our internal ERP and PostgreSQL database. This takes 25 hours per week and causes frequent entry discrepancies."
            className="w-full rounded-2xl border border-white/15 bg-surface-200/80 p-4 text-sm text-white placeholder-gray-500 focus:border-brand-cyan focus:outline-none focus:ring-1 focus:ring-brand-cyan transition-all"
            maxLength={2000}
          />
        </div>
        <p className="text-[11px] text-gray-400 flex items-center space-x-1.5">
          <Sparkles className="w-3 h-3 text-brand-cyan" />
          <span>
            Tip: Mentioning specific tools, document formats, or estimated volumes helps generate a far more accurate technical starting point.
          </span>
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-white/10">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center space-x-2 rounded-xl border border-white/10 px-4 py-2.5 text-xs font-medium text-gray-300 hover:bg-white/5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={onContinue}
          className="group inline-flex items-center space-x-2 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue px-6 py-3 text-xs font-bold text-black shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <span>Continue to Systems & Stage</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}

interface SystemsStageQuestionsProps {
  systems: SystemType[];
  currentStage?: ProjectStage;
  timeline?: Timeline;
  onToggleSystem: (sys: SystemType) => void;
  onStageChange: (st: ProjectStage) => void;
  onTimelineChange: (tl: Timeline) => void;
  onContinue: () => void;
  onBack: () => void;
  errors?: Record<string, string>;
}

export function SystemsStageQuestions({
  systems,
  currentStage,
  timeline,
  onToggleSystem,
  onStageChange,
  onTimelineChange,
  onContinue,
  onBack,
  errors = {},
}: SystemsStageQuestionsProps) {
  return (
    <div className="space-y-8" role="region" aria-label="Step 3: Systems and Stage">
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-brand-cyan">
          <span>Step 3</span>
          <span>•</span>
          <span>Technical Environment</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          What systems are involved and what is your timeline?
        </h2>
        <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
          Specify your technology touchpoints, where the project currently stands, and your target timing.
        </p>
      </div>

      {/* Question 3: Systems Involved (Multi-select) */}
      <div className="space-y-3">
        <label className="block text-xs font-mono uppercase tracking-wider text-gray-300">
          Question 3: What systems are involved? (Select all that apply) <span className="text-brand-cyan">*</span>
        </label>
        {errors.systems && (
          <p className="text-xs text-rose-400 flex items-center space-x-1.5" role="alert">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.systems}</span>
          </p>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {SYSTEM_OPTIONS.map((sys) => {
            const isChecked = systems.includes(sys.id);
            return (
              <button
                key={sys.id}
                type="button"
                onClick={() => onToggleSystem(sys.id)}
                className={`text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${
                  isChecked
                    ? "border-brand-cyan/70 bg-brand-cyan/15 text-white ring-1 ring-brand-cyan/40"
                    : "border-white/10 bg-surface-200/50 text-gray-400 hover:border-white/20 hover:text-gray-200"
                }`}
              >
                <span className="font-medium pr-2">{sys.label}</span>
                <div
                  className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border transition-colors ${
                    isChecked
                      ? "border-brand-cyan bg-brand-cyan text-black"
                      : "border-white/20 bg-black/30"
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Question 4: Current Stage */}
      <div className="space-y-3 pt-2">
        <label className="block text-xs font-mono uppercase tracking-wider text-gray-300">
          Question 4: What is your current project stage? <span className="text-brand-cyan">*</span>
        </label>
        {errors.currentStage && (
          <p className="text-xs text-rose-400 flex items-center space-x-1.5" role="alert">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.currentStage}</span>
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {STAGE_OPTIONS.map((st) => {
            const isSelected = currentStage === st.id;
            return (
              <button
                key={st.id}
                type="button"
                onClick={() => onStageChange(st.id)}
                className={`text-left p-3.5 rounded-xl border text-xs transition-all ${
                  isSelected
                    ? "border-brand-cyan/80 bg-brand-cyan/10 text-white shadow-[0_0_15px_rgba(0,240,255,0.12)] ring-1 ring-brand-cyan/50"
                    : "border-white/10 bg-surface-200/50 text-gray-300 hover:border-white/20 hover:bg-surface-100"
                }`}
              >
                <div className="flex items-center justify-between font-semibold mb-1">
                  <span>{st.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-brand-cyan" />}
                </div>
                <p className="text-[11px] text-gray-400">{st.detail}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Question 5: Timeline */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-mono uppercase tracking-wider text-gray-300">
            Question 5: Approximate timeline window <span className="text-brand-cyan">*</span>
          </label>
          <span className="text-[11px] text-gray-400 font-mono">Non-binding reference</span>
        </div>
        {errors.timeline && (
          <p className="text-xs text-rose-400 flex items-center space-x-1.5" role="alert">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.timeline}</span>
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {TIMELINE_OPTIONS.map((tl) => {
            const isSelected = timeline === tl.id;
            return (
              <button
                key={tl.id}
                type="button"
                onClick={() => onTimelineChange(tl.id)}
                className={`text-left p-3 rounded-xl border text-xs transition-all ${
                  isSelected
                    ? "border-brand-cyan/80 bg-brand-cyan/15 text-white ring-1 ring-brand-cyan/40"
                    : "border-white/10 bg-surface-200/50 text-gray-300 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between font-semibold mb-1">
                  <span>{tl.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-brand-cyan" />}
                </div>
                <p className="text-[11px] text-gray-400 leading-tight">{tl.detail}</p>
              </button>
            );
          })}
        </div>
        <p className="text-[11px] text-gray-400 italic">
          * Note: Timeline selections indicate your target milestone; final engineering schedules are finalized collaboratively during technical scoping.
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-white/10">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center space-x-2 rounded-xl border border-white/10 px-4 py-2.5 text-xs font-medium text-gray-300 hover:bg-white/5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={onContinue}
          className="group inline-flex items-center space-x-2 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue px-6 py-3 text-xs font-bold text-black shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <span>Continue to Contact Details</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}

