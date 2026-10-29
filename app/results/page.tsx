"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ProjectSummaryResult, DiscoveryFormData } from "@/lib/discovery/types";
import { ProjectSummary } from "@/components/discovery/ProjectSummary";
import { generateDeterministicSummary } from "@/lib/discovery/mockSummary";
import { ArrowLeft, Sparkles } from "lucide-react";

const STORAGE_KEY = "cynbit_discovery_draft_v1";

export default function ResultsPage() {
  const [formData, setFormData] = useState<DiscoveryFormData | null>(null);
  const [summary, setSummary] = useState<ProjectSummaryResult | null>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: DiscoveryFormData = JSON.parse(saved);
        setFormData(parsed);
        const generated = generateDeterministicSummary(parsed);
        setSummary(generated);
      }
    } catch {
      // safe ignore
    }
  }, []);

  const handleSendBrief = async () => {
    if (!formData) return { success: false };
    try {
      const res = await fetch("/api/submit-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      return { success: res.ok && json.success, referenceId: json.referenceId };
    } catch {
      return { success: false };
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {summary && formData ? (
        <ProjectSummary
          summary={summary}
          formData={formData}
          onRestart={() => {
            sessionStorage.removeItem(STORAGE_KEY);
            window.location.href = "/discover";
          }}
          onSubmitBrief={handleSendBrief}
        />
      ) : (
        <div className="rounded-3xl border border-white/10 bg-surface-200/60 p-12 text-center space-y-5">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">No Active Discovery Session Found</h2>
          <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
            You don&apos;t have an active discovery session in this browser window. Start a brief 2-minute discovery assessment to generate your personalized project brief.
          </p>
          <div className="pt-2">
            <Link
              href="/discover"
              className="inline-flex items-center space-x-2 rounded-xl bg-brand-cyan px-6 py-3 text-xs font-bold text-black"
            >
              <span>Launch Discovery Assistant</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

