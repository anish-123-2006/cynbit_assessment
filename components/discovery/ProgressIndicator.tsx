"use client";

import React from "react";
import { Check } from "lucide-react";

interface StepConfig {
  number: number;
  label: string;
  shortLabel: string;
}

const STEPS: StepConfig[] = [
  { number: 1, label: "Primary Need", shortLabel: "Need" },
  { number: 2, label: "Project Context", shortLabel: "Context" },
  { number: 3, label: "Systems & Stage", shortLabel: "Systems" },
  { number: 4, label: "Contact Details", shortLabel: "Contact" },
  { number: 5, label: "Direction Brief", shortLabel: "Brief" },
];

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps?: number;
  onSelectStep?: (step: number) => void;
}

export function ProgressIndicator({
  currentStep,
  totalSteps = 5,
  onSelectStep,
}: ProgressIndicatorProps) {
  const currentConfig = STEPS.find((s) => s.number === currentStep) || STEPS[0];
  const progressPercent = Math.min(100, Math.round(((currentStep - 1) / (totalSteps - 1)) * 100));

  return (
    <div className="w-full space-y-4" role="region" aria-label="Discovery Progress">
      {/* Mobile compact header */}
      <div className="flex items-center justify-between sm:hidden text-xs">
        <span className="font-mono text-brand-cyan uppercase tracking-wider font-semibold">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-gray-300 font-medium">{currentConfig.label}</span>
      </div>

      {/* Progress Bar Line */}
      <div className="h-1.5 w-full bg-surface-100 rounded-full overflow-hidden border border-white/5">
        <div
          className="h-full bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet transition-all duration-500 ease-out shadow-[0_0_10px_rgba(0,240,255,0.5)]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Desktop step dots & titles */}
      <div className="hidden sm:grid grid-cols-5 gap-2 pt-1">
        {STEPS.map((step) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;

          return (
            <button
              key={step.number}
              type="button"
              disabled={step.number > currentStep || !onSelectStep}
              onClick={() => onSelectStep && step.number < currentStep && onSelectStep(step.number)}
              aria-current={isCurrent ? "step" : undefined}
              className={`text-left group flex items-center space-x-2.5 transition-all p-1.5 rounded-lg ${
                isCurrent
                  ? "text-white"
                  : isCompleted
                  ? "text-gray-400 hover:text-gray-200 cursor-pointer"
                  : "text-gray-600 cursor-not-allowed"
              }`}
            >
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-mono font-bold transition-all ${
                  isCurrent
                    ? "bg-brand-cyan text-black ring-2 ring-brand-cyan/40 shadow-[0_0_10px_rgba(0,240,255,0.4)]"
                    : isCompleted
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                    : "bg-surface-100 text-gray-500 border border-white/5"
                }`}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5" /> : step.number}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-mono tracking-wider opacity-60">
                  Step {step.number}
                </span>
                <span className="text-xs font-medium tracking-tight whitespace-nowrap">
                  {step.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

