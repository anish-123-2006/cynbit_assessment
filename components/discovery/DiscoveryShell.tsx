"use client";

import React, { useState, useEffect } from "react";
import {
  DiscoveryFormData,
  NeedType,
  BusinessGoal,
  SystemType,
  ProjectStage,
  Timeline,
  ProjectSummaryResult,
} from "@/lib/discovery/types";
import { ProgressIndicator } from "./ProgressIndicator";
import { NeedSelector } from "./NeedSelector";
import { ContextQuestions, SystemsStageQuestions } from "./ProjectQuestions";
import { ContactDetails } from "./ContactDetails";
import { ProjectSummary } from "./ProjectSummary";
import { FallbackContactForm } from "./FallbackContactForm";
import { DiscoveryValueProps } from "./DiscoveryValueProps";
import { generateDeterministicSummary } from "@/lib/discovery/mockSummary";
import { trackEvent } from "@/lib/discovery/analytics";
import {
  contactDetailsSchema,
  needTypeEnum,
  businessGoalEnum,
  discoveryFormSchema,
} from "@/lib/discovery/validation";
import { ArrowLeft, MessageSquare, Sparkles, ShieldAlert } from "lucide-react";

const STORAGE_KEY = "cynbit_discovery_draft_v1";

const INITIAL_FORM: DiscoveryFormData = {
  needType: undefined,
  businessGoal: undefined,
  challenge: "",
  systems: [],
  currentStage: undefined,
  timeline: undefined,
  fullName: "",
  email: "",
  company: "",
  phone: "",
  preferredContact: "email",
};

interface DiscoveryShellProps {
  initialStep?: number;
}

export function DiscoveryShell({ initialStep = 1 }: DiscoveryShellProps) {
  const [step, setStep] = useState<number>(initialStep);
  const [formData, setFormData] = useState<DiscoveryFormData>(INITIAL_FORM);
  const [summary, setSummary] = useState<ProjectSummaryResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showDirectFallback, setShowDirectFallback] = useState(false);

  // Restore draft from sessionStorage if available
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // safe ignore in private browsing or disabled storage
    }
    trackEvent("discovery_started", { step: initialStep });
  }, [initialStep]);

  // Persist draft on changes
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch {
      // safe ignore
    }
  }, [formData]);

  // Step 1: Need Selection
  const handleSelectNeed = (need: NeedType) => {
    setFormData((prev) => ({ ...prev, needType: need }));
    setFieldErrors((prev) => ({ ...prev, needType: "" }));
    trackEvent("need_selected", { needType: need });
  };

  const handleStep1Continue = () => {
    if (!formData.needType) {
      setFieldErrors({ needType: "Please select one area to proceed." });
      return;
    }
    setFieldErrors({});
    trackEvent("question_completed", { step: 1, needType: formData.needType });
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Step 2: Goal & Challenge
  const handleStep2Continue = () => {
    const errors: Record<string, string> = {};
    if (!formData.businessGoal) {
      errors.businessGoal = "Please select your primary objective.";
    }
    if (!formData.challenge || formData.challenge.trim().length < 20) {
      errors.challenge = "Please describe the challenge in at least 20 characters.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    trackEvent("question_completed", { step: 2, goal: formData.businessGoal });
    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Step 3: Systems, Stage, Timeline
  const handleToggleSystem = (sys: SystemType) => {
    setFormData((prev) => {
      let updated: SystemType[];
      if (sys === "not_sure") {
        updated = prev.systems.includes("not_sure") ? [] : ["not_sure"];
      } else {
        const withoutNotSure = prev.systems.filter((s) => s !== "not_sure");
        if (withoutNotSure.includes(sys)) {
          updated = withoutNotSure.filter((s) => s !== sys);
        } else {
          updated = [...withoutNotSure, sys];
        }
      }
      return { ...prev, systems: updated };
    });
    setFieldErrors((prev) => ({ ...prev, systems: "" }));
  };

  const handleStep3Continue = () => {
    const errors: Record<string, string> = {};
    if (!formData.systems || formData.systems.length === 0) {
      errors.systems = "Please select at least one system, or choose 'Not sure'.";
    }
    if (!formData.currentStage) {
      errors.currentStage = "Please select your current project stage.";
    }
    if (!formData.timeline) {
      errors.timeline = "Please select an approximate timeline window.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    trackEvent("question_completed", {
      step: 3,
      stage: formData.currentStage,
      timeline: formData.timeline,
    });
    setStep(4);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Step 4: Contact Details & Submit to Summary API
  const handleStep4Submit = async () => {
    // Validate contact details with Zod
    const contactValidation = contactDetailsSchema.safeParse({
      fullName: formData.fullName,
      email: formData.email,
      company: formData.company,
      phone: formData.phone,
      preferredContact: formData.preferredContact,
    });

    if (!contactValidation.success) {
      const errors: Record<string, string> = {};
      contactValidation.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0].toString()] = err.message;
        }
      });
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setIsGenerating(true);
    setApiErrorMessage(null);

    try {
      const res = await fetch("/api/project-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (res.ok && json.success && json.summary) {
        setSummary(json.summary);
        setStep(5);
        trackEvent("discovery_completed", { success: true });
      } else {
        // Fallback: If API fails, generate local deterministic summary so user is never stranded
        console.warn("[Discovery API Notice] API returned fallback notice. Generating local summary.");
        const local = generateDeterministicSummary(formData);
        setSummary(local);
        setApiErrorMessage(
          "We could not reach the live AI endpoint, but your project brief was analyzed using our local architectural engine."
        );
        setStep(5);
        trackEvent("discovery_completed", { success: true, mode: "local_fallback" });
      }
    } catch (err) {
      console.warn("[Discovery Network Error] Falling back to local deterministic summary:", err);
      const local = generateDeterministicSummary(formData);
      setSummary(local);
      setApiErrorMessage(
        "Network connection interrupted. Your project brief has been prepared using our local rules engine."
      );
      setStep(5);
      trackEvent("discovery_completed", { success: true, mode: "network_fallback" });
    } finally {
      setIsGenerating(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Step 5: Brief submission to Cynbit (Mock Persistence)
  const handleSendProjectBrief = async () => {
    try {
      const res = await fetch("/api/submit-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      return { success: res.ok && json.success, referenceId: json.referenceId, mocked: true };
    } catch {
      return { success: false };
    }
  };

  const handleRestart = () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // safe ignore
    }
    setFormData(INITIAL_FORM);
    setSummary(null);
    setFieldErrors({});
    setApiErrorMessage(null);
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Top Banner: Direct Fallback Route Link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-white/5 bg-surface-200/40 p-4 text-xs text-gray-400">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-4 h-4 text-brand-cyan flex-shrink-0" />
          <span>
            Prefer to contact us directly? Use the{" "}
            <button
              type="button"
              onClick={() => {
                setShowDirectFallback(!showDirectFallback);
                trackEvent("fallback_form_opened");
              }}
              className="text-brand-cyan hover:underline font-medium font-mono"
            >
              standard enquiry form
            </button>
            .
          </span>
        </div>
        <div className="text-[11px] font-mono text-gray-500">
          Estimated completion: ~2 mins
        </div>
      </div>

      {/* Fallback Direct Contact Drawer/Card if toggled */}
      {showDirectFallback && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-300">
          <FallbackContactForm
            initialCategory={formData.needType || "ai_automation"}
            className="border-brand-cyan/40 shadow-[0_0_30px_rgba(0,240,255,0.1)]"
          />
        </div>
      )}

      {/* API Notice Warning if fallback was used */}
      {apiErrorMessage && (
        <div
          role="status"
          className="rounded-xl border border-amber-500/30 bg-amber-950/30 p-4 text-xs text-amber-300 flex items-start space-x-2"
        >
          <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <span>{apiErrorMessage}</span>
        </div>
      )}

      {/* Progress Experience */}
      <ProgressIndicator currentStep={step} onSelectStep={(s) => setStep(s)} />

      {/* Step Components */}
      <div className="rounded-3xl border border-white/10 bg-surface-300/70 p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
        {step === 1 && (
          <NeedSelector
            selectedNeed={formData.needType}
            onSelect={handleSelectNeed}
            onContinue={handleStep1Continue}
            errorMessage={fieldErrors.needType}
          />
        )}

        {step === 2 && (
          <ContextQuestions
            businessGoal={formData.businessGoal}
            challenge={formData.challenge}
            onGoalChange={(goal) => {
              setFormData((prev) => ({ ...prev, businessGoal: goal }));
              setFieldErrors((prev) => ({ ...prev, businessGoal: "" }));
            }}
            onChallengeChange={(text) => {
              setFormData((prev) => ({ ...prev, challenge: text }));
              setFieldErrors((prev) => ({ ...prev, challenge: "" }));
            }}
            onContinue={handleStep2Continue}
            onBack={() => setStep(1)}
            errors={fieldErrors}
          />
        )}

        {step === 3 && (
          <SystemsStageQuestions
            systems={formData.systems}
            currentStage={formData.currentStage}
            timeline={formData.timeline}
            onToggleSystem={handleToggleSystem}
            onStageChange={(st) => {
              setFormData((prev) => ({ ...prev, currentStage: st }));
              setFieldErrors((prev) => ({ ...prev, currentStage: "" }));
            }}
            onTimelineChange={(tl) => {
              setFormData((prev) => ({ ...prev, timeline: tl }));
              setFieldErrors((prev) => ({ ...prev, timeline: "" }));
            }}
            onContinue={handleStep3Continue}
            onBack={() => setStep(2)}
            errors={fieldErrors}
          />
        )}

        {step === 4 && (
          <ContactDetails
            data={{
              fullName: formData.fullName,
              email: formData.email,
              company: formData.company,
              phone: formData.phone,
              preferredContact: formData.preferredContact,
            }}
            onChange={(fields) => {
              setFormData((prev) => ({ ...prev, ...fields }));
              const cleared = { ...fieldErrors };
              Object.keys(fields).forEach((k) => delete cleared[k]);
              setFieldErrors(cleared);
            }}
            onSubmit={handleStep4Submit}
            onBack={() => setStep(3)}
            isSubmitting={isGenerating}
            errors={fieldErrors}
          />
        )}

        {step === 5 && summary && (
          <ProjectSummary
            summary={summary}
            formData={formData}
            onRestart={handleRestart}
            onSubmitBrief={handleSendProjectBrief}
          />
        )}
      </div>

      {/* Visible "Why this helps & What happens next" component (collapsed by default on questionnaire, expanded on results) */}
      {step < 5 && (
        <DiscoveryValueProps variant="compact" defaultExpanded={false} />
      )}
    </div>
  );
}
