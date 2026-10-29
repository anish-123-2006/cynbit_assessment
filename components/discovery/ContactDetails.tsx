"use client";

import React from "react";
import { ContactDetailsData, PreferredContact } from "@/lib/discovery/types";
import {
  User,
  Mail,
  Building,
  Phone,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Lock,
  AlertCircle,
} from "lucide-react";

interface ContactDetailsProps {
  data: ContactDetailsData;
  onChange: (fields: Partial<ContactDetailsData>) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting?: boolean;
  errors?: Record<string, string>;
}

export function ContactDetails({
  data,
  onChange,
  onSubmit,
  onBack,
  isSubmitting = false,
  errors = {},
}: ContactDetailsProps) {
  return (
    <div className="space-y-8" role="region" aria-label="Step 4: Contact Information">
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-brand-cyan">
          <span>Step 4</span>
          <span>•</span>
          <span>Final Step</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Where should we send your preliminary project brief?
        </h2>
        <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
          Provide your work details so our solution architecture team can prepare context before we connect. Your information is kept strictly confidential.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label htmlFor="fullName" className="block text-xs font-mono uppercase tracking-wider text-gray-300">
            Full Name <span className="text-brand-cyan">*</span>
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
              <User className="w-4 h-4" />
            </div>
            <input
              id="fullName"
              type="text"
              required
              value={data.fullName}
              onChange={(e) => onChange({ fullName: e.target.value })}
              placeholder="e.g. Alex Rivera"
              className={`w-full rounded-xl border bg-surface-200/80 pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-all ${
                errors.fullName
                  ? "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500"
                  : "border-white/15 focus:border-brand-cyan focus:ring-brand-cyan"
              }`}
            />
          </div>
          {errors.fullName && (
            <p className="text-xs text-rose-400 flex items-center space-x-1" role="alert">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.fullName}</span>
            </p>
          )}
        </div>

        {/* Work Email */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-gray-300">
            Work Email Address <span className="text-brand-cyan">*</span>
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              id="email"
              type="email"
              required
              value={data.email}
              onChange={(e) => onChange({ email: e.target.value })}
              placeholder="alex@company.com"
              className={`w-full rounded-xl border bg-surface-200/80 pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-all ${
                errors.email
                  ? "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500"
                  : "border-white/15 focus:border-brand-cyan focus:ring-brand-cyan"
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-rose-400 flex items-center space-x-1" role="alert">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Company Name */}
        <div className="space-y-1.5">
          <label htmlFor="company" className="block text-xs font-mono uppercase tracking-wider text-gray-300">
            Organization or Startup <span className="text-gray-500">(Optional)</span>
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
              <Building className="w-4 h-4" />
            </div>
            <input
              id="company"
              type="text"
              value={data.company || ""}
              onChange={(e) => onChange({ company: e.target.value })}
              placeholder="Acme Global Inc."
              className="w-full rounded-xl border border-white/15 bg-surface-200/80 pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:border-brand-cyan focus:outline-none focus:ring-1 focus:ring-brand-cyan transition-all"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label htmlFor="phone" className="block text-xs font-mono uppercase tracking-wider text-gray-300">
            Phone / WhatsApp <span className="text-gray-500">(Optional)</span>
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
              <Phone className="w-4 h-4" />
            </div>
            <input
              id="phone"
              type="tel"
              value={data.phone || ""}
              onChange={(e) => onChange({ phone: e.target.value })}
              placeholder="+91 98765 43210"
              className={`w-full rounded-xl border bg-surface-200/80 pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 transition-all ${
                errors.phone
                  ? "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500"
                  : "border-white/15 focus:border-brand-cyan focus:ring-brand-cyan"
              }`}
            />
          </div>
          {errors.phone && (
            <p className="text-xs text-rose-400 flex items-center space-x-1" role="alert">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.phone}</span>
            </p>
          )}
        </div>
      </div>

      {/* Preferred Contact Method */}
      <div className="space-y-2 pt-2">
        <label className="block text-xs font-mono uppercase tracking-wider text-gray-300">
          Preferred Response Method
        </label>
        <div className="flex flex-wrap gap-3">
          {(["email", "phone", "either"] as PreferredContact[]).map((method) => {
            const isSelected = (data.preferredContact || "email") === method;
            const labels: Record<PreferredContact, string> = {
              email: "Email sync & brief",
              phone: "Direct call / WhatsApp",
              either: "Either method",
            };
            return (
              <button
                key={method}
                type="button"
                onClick={() => onChange({ preferredContact: method })}
                className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                  isSelected
                    ? "border-brand-cyan bg-brand-cyan/15 text-white ring-1 ring-brand-cyan/40"
                    : "border-white/10 bg-surface-200/50 text-gray-400 hover:border-white/20 hover:text-gray-200"
                }`}
              >
                {labels[method]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Trust Notice */}
      <div className="rounded-xl border border-white/5 bg-surface-100/60 p-4 flex items-center space-x-3 text-xs text-gray-400">
        <Lock className="w-4 h-4 text-brand-cyan flex-shrink-0" />
        <span>
          Zero spam policy. Your details are solely used to analyze technical compatibility and schedule your discovery sync.
        </span>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-white/10">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="inline-flex items-center space-x-2 rounded-xl border border-white/10 px-4 py-2.5 text-xs font-medium text-gray-300 hover:bg-white/5 transition-colors disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="group relative inline-flex items-center space-x-2 rounded-xl bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-violet px-7 py-3.5 text-xs font-bold text-black shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:shadow-[0_0_35px_rgba(0,240,255,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              <span>Analyzing Architecture Direction...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate Project Direction Brief</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

