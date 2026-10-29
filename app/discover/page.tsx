import React from "react";
import { Metadata } from "next";
import { DiscoveryShell } from "@/components/discovery/DiscoveryShell";

export const metadata: Metadata = {
  title: "Project Discovery Assistant | Cynbit Technologies",
  description:
    "Answer a few guided technical questions to generate an architectural brief and preliminary direction for your software or AI project.",
};

export default function DiscoverPage() {
  return (
    <div className="relative py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      {/* Background glow element */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-cyan/[0.06] blur-3xl rounded-full" />

      <div className="relative z-10">
        <DiscoveryShell />
      </div>
    </div>
  );
}

