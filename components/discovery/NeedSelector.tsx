"use client";

import React from "react";
import { NeedType } from "@/lib/discovery/types";
import {
  Bot,
  Layout,
  Cloud,
  TrendingUp,
  Boxes,
  GraduationCap,
  HelpCircle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

interface NeedOption {
  type: NeedType;
  title: string;
  description: string;
  example: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NEED_OPTIONS: NeedOption[] = [
  {
    type: "ai_automation",
    title: "AI Automation or AI Agent",
    description: "Automate repetitive workflows, document processing, customer support, or internal operations.",
    example: "Example: Extracting data from vendor invoices & updating database automatically.",
    icon: Bot,
  },
  {
    type: "custom_software",
    title: "Custom Web or Mobile Application",
    description: "Design and build scalable SaaS products, internal operations portals, or cross-platform mobile apps.",
    example: "Example: Modern web dashboard with role-based access for operations and clients.",
    icon: Layout,
  },
  {
    type: "cloud_infrastructure",
    title: "Cloud Infrastructure or Modernization",
    description: "AWS or Azure cloud architecture, database migration, DevOps CI/CD, and scaling optimization.",
    example: "Example: Moving an on-premise system to secure, auto-scaling cloud containers.",
    icon: Cloud,
  },
  {
    type: "seo_marketing",
    title: "SEO or Marketing Automation",
    description: "Technical SEO audits, programmatic page generation, Core Web Vitals, and conversion engineering.",
    example: "Example: Re-architecting web vitals and building programmatic search landing pages.",
    icon: TrendingUp,
  },
  {
    type: "product_enquiry",
    title: "Cynbit Product Enquiry",
    description: "Exploring or deploying Cynbit's proprietary suites: Revio, TenantEase, or Cynbit Studio.",
    example: "Example: Integrating Revio AI assistant for automated customer review workflows.",
    icon: Boxes,
  },
  {
    type: "bitelevate_training",
    title: "BitElevate or Training",
    description: "Technical talent training, remote internships, engineering mentorship, and student apprenticeships.",
    example: "Example: Enrolling a developer cohort in hands-on production engineering tracks.",
    icon: GraduationCap,
  },
  {
    type: "not_sure",
    title: "Not Sure Yet / General Exploration",
    description: "You have a business bottleneck or digital goal, but want guidance on the right technical path.",
    example: "Example: Exploring whether automation, custom software, or a tool integration is best.",
    icon: HelpCircle,
  },
];

interface NeedSelectorProps {
  selectedNeed?: NeedType;
  onSelect: (need: NeedType) => void;
  onContinue: () => void;
  errorMessage?: string;
}

export function NeedSelector({
  selectedNeed,
  onSelect,
  onContinue,
  errorMessage,
}: NeedSelectorProps) {
  return (
    <div className="space-y-8" role="region" aria-label="Step 1: Select Primary Need">
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-brand-cyan">
          <span>Step 1</span>
          <span>•</span>
          <span>Primary Area of Focus</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          What type of technical initiative are you planning?
        </h2>
        <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
          Select the area that best describes what your business needs. You can refine and describe specific challenges in the next step.
        </p>
      </div>

      {/* Error state if user attempts to continue without selecting */}
      {errorMessage && (
        <div
          role="alert"
          aria-live="polite"
          className="rounded-xl border border-rose-500/30 bg-rose-950/20 px-4 py-3 text-xs text-rose-300 flex items-center space-x-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Selectable Cards Grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        role="radiogroup"
        aria-label="Technical Need Options"
      >
        {NEED_OPTIONS.map((option) => {
          const isSelected = selectedNeed === option.type;
          const Icon = option.icon;

          return (
            <button
              key={option.type}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(option.type)}
              className={`group relative flex flex-col text-left p-5 rounded-2xl border transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan ${
                isSelected
                  ? "border-brand-cyan/80 bg-brand-cyan/[0.07] shadow-[0_0_25px_rgba(0,240,255,0.15)] ring-1 ring-brand-cyan/50"
                  : "border-white/10 bg-surface-200/60 hover:border-white/20 hover:bg-surface-100/80"
              }`}
            >
              <div className="flex items-start justify-between w-full mb-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors ${
                    isSelected
                      ? "border-brand-cyan/60 bg-brand-cyan/20 text-brand-cyan"
                      : "border-white/10 bg-white/5 text-gray-300 group-hover:text-white group-hover:border-white/20"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full transition-all ${
                    isSelected
                      ? "text-brand-cyan"
                      : "text-transparent border border-white/15"
                  }`}
                >
                  <CheckCircle2
                    className={`w-5 h-5 transition-transform ${
                      isSelected ? "scale-100 text-brand-cyan" : "scale-75 opacity-0"
                    }`}
                  />
                </div>
              </div>

              <h3 className="text-base font-semibold text-white tracking-tight mb-1.5">
                {option.title}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-4 flex-grow">
                {option.description}
              </p>

              <div
                className={`text-[11px] font-mono rounded-lg p-2.5 transition-colors ${
                  isSelected
                    ? "bg-brand-cyan/10 text-brand-cyan/90 border border-brand-cyan/20"
                    : "bg-black/40 text-gray-400 border border-white/5"
                }`}
              >
                {option.example}
              </div>
            </button>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <span className="text-xs text-gray-400 font-mono">
          {selectedNeed ? "1 option selected" : "Please choose an option to continue"}
        </span>

        <button
          type="button"
          onClick={onContinue}
          className="group relative inline-flex items-center space-x-2 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue px-6 py-3 text-xs font-bold text-black shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <span>Continue to Project Details</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}

