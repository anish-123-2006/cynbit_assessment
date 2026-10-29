import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Clock,
  ShieldCheck,
  Bot,
  Layout,
  Cloud,
  CheckCircle2,
  Cpu,
  Layers,
  Building,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-brand-cyan/[0.12] via-brand-blue/[0.05] to-transparent blur-3xl opacity-70" />

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-4 py-1.5 text-xs font-mono text-brand-cyan shadow-[0_0_15px_rgba(0,240,255,0.15)]">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Cynbit Technologies • Engineering Lab</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1]">
            Turn your business challenge into a{" "}
            <span className="bg-gradient-to-r from-brand-cyan via-blue-400 to-brand-violet bg-clip-text text-transparent">
              clearer technical direction.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed">
            Skip the blank contact box. Answer a few guided questions about your workflows, systems, and goals. The Cynbit Discovery Assistant will formulate an initial architecture brief and map relevant capabilities before your discovery call.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link
              href="/discover"
              className="w-full sm:w-auto group relative inline-flex items-center justify-center space-x-3 rounded-2xl bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet p-px font-bold shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:shadow-[0_0_40px_rgba(0,240,255,0.5)] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="flex w-full items-center justify-center space-x-2.5 rounded-[15px] bg-gradient-to-r from-brand-cyan to-brand-blue px-8 py-4 text-xs sm:text-sm font-black uppercase tracking-wider text-black">
                <span>Start project discovery</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-2xl border border-white/15 bg-surface-200/60 px-6 py-4 text-xs sm:text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all"
            >
              <span>I already know what I need</span>
            </Link>
          </div>

          {/* Trust Note & Disclaimer */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-400 font-mono">
              <Clock className="w-3.5 h-3.5 text-brand-cyan" />
              <span>Takes approximately 2–3 minutes. Your answers are used to prepare a better discovery conversation.</span>
            </div>
            <p className="text-[11px] text-gray-500 max-w-md mx-auto">
              * This is an initial exploratory assessment, not a final technical proposal or binding quote.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Pillars: How Discovery Works */}
      <section className="border-y border-white/10 bg-surface-300/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-brand-cyan">
              Structured Engagement
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Why we replaced the standard contact form
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Technical initiatives fail when initial expectations are fuzzy. Our discovery engine establishes alignment from moment one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-white/10 bg-surface-200/50 p-6 space-y-4 hover:border-brand-cyan/40 transition-colors">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">
                1. Guided Need Framing
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Rather than asking you to draft architecture alone, choose from curated operational areas: autonomous LLM agents, full-stack apps, or cloud modernization.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-surface-200/50 p-6 space-y-4 hover:border-brand-blue/40 transition-colors">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue/15 text-brand-blue border border-brand-blue/30">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">
                2. Instant Preliminary Brief
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Receive an AI-synthesized architectural direction highlighting relevant Cynbit capabilities and critical discovery questions for your team.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-surface-200/50 p-6 space-y-4 hover:border-brand-violet/40 transition-colors">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-violet/15 text-brand-violet border border-brand-violet/30">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">
                3. Direct Discovery Scheduling
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Eliminate 4 rounds of scheduling emails. Lock in an exploratory 20-minute video slot directly with our senior architects in Jaipur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Engineering Disciplines */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-brand-cyan">
                Engineering Labs
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Architectural mastery across core domains
              </h2>
            </div>
            <Link
              href="/discover"
              className="inline-flex items-center space-x-1.5 text-xs font-mono text-brand-cyan hover:underline"
            >
              <span>Explore all services via Discovery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="rounded-2xl border border-white/10 bg-surface-200/40 p-5 space-y-3">
              <span className="text-xs font-mono text-brand-cyan font-bold">01 / AI Automation</span>
              <h4 className="text-sm font-semibold text-white">Autonomous Agents & LLMs</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Custom document extraction, multi-agent cognitive pipelines, and intelligent operational triage.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-surface-200/40 p-5 space-y-3">
              <span className="text-xs font-mono text-brand-blue font-bold">02 / Software</span>
              <h4 className="text-sm font-semibold text-white">Modern Full-Stack Apps</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                High-performance Next.js web applications, mobile platforms, and resilient REST/GraphQL APIs.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-surface-200/40 p-5 space-y-3">
              <span className="text-xs font-mono text-brand-violet font-bold">03 / Cloud</span>
              <h4 className="text-sm font-semibold text-white">AWS & Azure Modernization</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Zero-trust cloud architecture, database migration, automated CI/CD, and auto-scaling clusters.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-surface-200/40 p-5 space-y-3">
              <span className="text-xs font-mono text-emerald-400 font-bold">04 / Growth</span>
              <h4 className="text-sm font-semibold text-white">Technical SEO & Conversion</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Algorithmic SEO, Core Web Vitals optimization, programmatic pages, and revenue analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="border-t border-white/10 bg-gradient-to-b from-surface-300 to-background py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Ready to frame your next engineering milestone?
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
            Begin the guided discovery session now. Takes ~2 minutes and gives our engineers the exact technical context to hit the ground running.
          </p>
          <div className="pt-2">
            <Link
              href="/discover"
              className="inline-flex items-center space-x-2 rounded-xl bg-brand-cyan px-7 py-3.5 text-xs font-bold text-black shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Launch Discovery Assistant</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

