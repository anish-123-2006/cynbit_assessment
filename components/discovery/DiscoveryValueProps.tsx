"use client";

import React, { useState } from "react";
import {
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface DiscoveryValuePropsComponentProps {
  variant?: "full" | "compact";
  defaultExpanded?: boolean;
}

export function DiscoveryValueProps({
  variant = "full",
  defaultExpanded = true,
}: DiscoveryValuePropsComponentProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="rounded-3xl border border-white/10 bg-surface-200/50 p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-brand-cyan">
            <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
            <span>Process Overview</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Why this guided flow helps &amp; what happens next
          </h3>
        </div>

        {variant === "compact" && (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-1 text-xs font-mono text-gray-400 hover:text-white p-2"
          >
            <span>{isExpanded ? "Collapse" : "Expand"}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Section 1: Why This Helps */}
          <div className="rounded-2xl border border-brand-cyan/20 bg-brand-cyan/[0.03] p-5 space-y-3.5">
            <div className="flex items-center space-x-2 text-brand-cyan font-bold text-sm tracking-tight">
              <CheckCircle2 className="w-4 h-4" />
              <span>Why This Helps You</span>
            </div>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li className="flex items-start space-x-2">
                <span className="text-brand-cyan font-mono font-bold">•</span>
                <span>
                  <strong className="text-white">Overcomes the blank-box barrier:</strong> You don&apos;t need to know exact tech jargon; our questions extract your systems, constraints, and operational goals.
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-brand-cyan font-mono font-bold">•</span>
                <span>
                  <strong className="text-white">Reduced back-and-forth:</strong> May reduce initial scheduling back-and-forth by collecting project context upfront.
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-brand-cyan font-mono font-bold">•</span>
                <span>
                  <strong className="text-white">Preliminary feasibility direction:</strong> Gives you open discussion topics and potential capability matches without sales pressure.
                </span>
              </li>
            </ul>
          </div>

          {/* Section 2: What Happens Next */}
          <div className="rounded-2xl border border-brand-violet/20 bg-brand-violet/[0.03] p-5 space-y-3.5">
            <div className="flex items-center space-x-2 text-brand-violet font-bold text-sm tracking-tight">
              <Clock className="w-4 h-4" />
              <span>What Happens Next</span>
            </div>
            <ol className="space-y-2.5 text-xs text-gray-300">
              <li className="flex items-start space-x-2">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-violet/20 text-brand-violet font-mono text-[10px] font-bold flex-shrink-0 mt-0.5">
                  1
                </span>
                <span>
                  <strong className="text-white">Context Review:</strong> The Cynbit team reviews the submitted project context.
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-violet/20 text-brand-violet font-mono text-[10px] font-bold flex-shrink-0 mt-0.5">
                  2
                </span>
                <span>
                  <strong className="text-white">Potential Focused Discovery Conversation:</strong> Rather than a generic introductory call, discussion can center on the preliminary questions generated in your brief.
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-violet/20 text-brand-violet font-mono text-[10px] font-bold flex-shrink-0 mt-0.5">
                  3
                </span>
                <span>
                  <strong className="text-white">Exploratory Blueprint:</strong> If there is mutual alignment, an initial architectural roadmap with scoped milestone phases can be prepared.
                </span>
              </li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
