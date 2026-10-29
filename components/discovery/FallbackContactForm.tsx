"use client";

import React, { useState } from "react";
import { useFormState } from "react-dom";
import { submitContactAction, ActionState } from "@/app/contact/actions";
import { fallbackContactSchema, FallbackContactData } from "@/lib/discovery/validation";
import { trackEvent } from "@/lib/discovery/analytics";
import {
  Mail,
  User,
  Building,
  Phone,
  MessageSquare,
  Send,
  CheckCircle,
  AlertCircle,
  ShieldCheck,
  Info,
} from "lucide-react";

interface FallbackContactFormProps {
  initialCategory?: string;
  className?: string;
}

const initialState: ActionState = {};

export function FallbackContactForm({
  initialCategory = "ai_automation",
  className = "",
}: FallbackContactFormProps) {
  // useFormState allows progressive enhancement: works seamlessly without JavaScript
  const [state, formAction] = useFormState(submitContactAction, initialState);

  // Local state for client-side progressive feedback when JS is enabled
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

  const handleClientValidate = (e: React.FormEvent<HTMLFormElement>) => {
    // If JavaScript is running, provide immediate instant client feedback
    const form = e.currentTarget;
    const formData = new FormData(form);
    const raw = {
      fullName: formData.get("fullName")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      company: formData.get("company")?.toString() || "",
      phone: formData.get("phone")?.toString() || "",
      serviceCategory: formData.get("serviceCategory")?.toString() || "ai_automation",
      message: formData.get("message")?.toString() || "",
    };

    const res = fallbackContactSchema.safeParse(raw);
    if (!res.success) {
      e.preventDefault();
      const errors: Record<string, string> = {};
      res.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0].toString()] = err.message;
        }
      });
      setClientErrors(errors);
      return;
    }

    setClientErrors({});
    // Log anonymous category only - NO personal data (names, emails, phone numbers)
    trackEvent("fallback_form_submitted", { category: raw.serviceCategory });
  };

  const activeFieldErrors = {
    ...(state.fieldErrors || {}),
    ...clientErrors,
  };

  return (
    <div
      className={`rounded-3xl border border-white/10 bg-surface-200/90 p-6 sm:p-10 shadow-xl transition-all ${className}`}
      role="region"
      aria-label="Direct Enquiry Form"
    >
      <div className="space-y-2 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-brand-cyan">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-cyan" />
            <span>Direct Engineering Gateway</span>
          </div>

          <div className="inline-flex items-center space-x-1.5 rounded-full border border-amber-500/30 bg-amber-950/30 px-2.5 py-0.5 text-[10px] font-mono text-amber-300">
            <Info className="w-3 h-3 text-amber-400" />
            <span>Prototype: Submission Storage is Mocked</span>
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Standard Project Enquiry
        </h3>
        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
          Already have an existing scope or RFP? Submit your project details directly to our engineering desk in Jaipur.
        </p>
      </div>

      {state.success ? (
        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/30 p-8 text-center space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <CheckCircle className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-white">Inquiry Received (Mock Simulation)</h4>
            <p className="text-xs text-emerald-300 font-mono">
              Reference: <span className="font-bold">{state.referenceId}</span>
            </p>
          </div>
          <div className="rounded-xl border border-amber-500/20 bg-amber-950/20 p-3 text-[11px] text-amber-300/90 max-w-md mx-auto">
            <strong>Mock Storage Notice:</strong> In this prototype, inquiries are handled in-memory for local development logging. No personal data is persisted or sent to an external service.
          </div>
          <p className="text-xs text-gray-300 max-w-md mx-auto leading-relaxed">
            In a production deployment, this would notify the Cynbit team via an authenticated webhook or CRM.
          </p>
          <div className="pt-2">
            <a
              href="/contact"
              className="text-xs font-mono text-brand-cyan hover:underline"
            >
              Submit another inquiry →
            </a>
          </div>
        </div>
      ) : (
        /*
          VERIFIED PROGRESSIVE ENHANCEMENT:
          1. Initial SSR markup renders visible by default (no opacity:0 flash).
          2. Uses native Next.js Server Action form action attribute:
             If JavaScript is disabled, the form performs a standard POST and renders server feedback.
          3. If JavaScript is enabled, onSubmit validates client-side first for instantaneous feedback.
        */
        <form
          action={formAction}
          onSubmit={handleClientValidate}
          method="POST"
          className="space-y-5"
        >
          {state.error && (
            <div
              role="alert"
              className="rounded-xl border border-rose-500/30 bg-rose-950/30 p-4 text-xs text-rose-300 flex items-start space-x-2"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold">{state.error}</p>
                <p className="text-rose-400/80">
                  Direct backup:{" "}
                  <a href="mailto:opportunities@cynbit.in" className="underline hover:text-white">
                    opportunities@cynbit.in
                  </a>
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label htmlFor="fb-fullName" className="block text-xs font-mono uppercase tracking-wider text-gray-300">
                Full Name <span className="text-brand-cyan">*</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="fb-fullName"
                  name="fullName"
                  type="text"
                  required
                  placeholder="e.g. Alex Rivera"
                  className={`w-full rounded-xl border bg-surface-100 pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-all ${
                    activeFieldErrors.fullName
                      ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                      : "border-white/10 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan"
                  }`}
                />
              </div>
              {activeFieldErrors.fullName && (
                <p className="text-[11px] text-rose-400">{activeFieldErrors.fullName}</p>
              )}
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label htmlFor="fb-email" className="block text-xs font-mono uppercase tracking-wider text-gray-300">
                Email Address <span className="text-brand-cyan">*</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="fb-email"
                  name="email"
                  type="email"
                  required
                  placeholder="alex@company.com"
                  className={`w-full rounded-xl border bg-surface-100 pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-all ${
                    activeFieldErrors.email
                      ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                      : "border-white/10 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan"
                  }`}
                />
              </div>
              {activeFieldErrors.email && (
                <p className="text-[11px] text-rose-400">{activeFieldErrors.email}</p>
              )}
            </div>

            {/* Company */}
            <div className="space-y-1.5">
              <label htmlFor="fb-company" className="block text-xs font-mono uppercase tracking-wider text-gray-300">
                Company (Optional)
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500">
                  <Building className="w-4 h-4" />
                </div>
                <input
                  id="fb-company"
                  name="company"
                  type="text"
                  placeholder="Your Organization"
                  className="w-full rounded-xl border border-white/10 bg-surface-100 pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:border-brand-cyan focus:outline-none focus:ring-1 focus:ring-brand-cyan"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label htmlFor="fb-phone" className="block text-xs font-mono uppercase tracking-wider text-gray-300">
                Phone Number (Optional)
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  id="fb-phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 89479 62667"
                  className={`w-full rounded-xl border bg-surface-100 pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-all ${
                    activeFieldErrors.phone
                      ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                      : "border-white/10 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan"
                  }`}
                />
              </div>
              {activeFieldErrors.phone && (
                <p className="text-[11px] text-rose-400">{activeFieldErrors.phone}</p>
              )}
            </div>
          </div>

          {/* Service Category */}
          <div className="space-y-1.5">
            <label htmlFor="fb-serviceCategory" className="block text-xs font-mono uppercase tracking-wider text-gray-300">
              Primary Area of Interest <span className="text-brand-cyan">*</span>
            </label>
            <select
              id="fb-serviceCategory"
              name="serviceCategory"
              defaultValue={initialCategory}
              className="w-full rounded-xl border border-white/10 bg-surface-100 px-4 py-3 text-sm text-white focus:border-brand-cyan focus:outline-none focus:ring-1 focus:ring-brand-cyan"
            >
              <option value="ai_automation">AI Automation & Autonomous Agents</option>
              <option value="custom_software">Custom Software & Web/Mobile Development</option>
              <option value="cloud_infrastructure">Cloud Infrastructure & Modernization (AWS/Azure)</option>
              <option value="seo_marketing">Technical SEO & Conversion Engineering</option>
              <option value="product_enquiry">Cynbit Products (Revio, TenantEase, Studio)</option>
              <option value="bitelevate_training">BitElevate Talent & Training Program</option>
              <option value="general_consulting">General Technical Consulting / Other</option>
            </select>
          </div>

          {/* Message Textarea */}
          <div className="space-y-1.5">
            <label htmlFor="fb-message" className="block text-xs font-mono uppercase tracking-wider text-gray-300">
              Your Message or Scope Details <span className="text-brand-cyan">*</span>
            </label>
            <div className="relative">
              <textarea
                id="fb-message"
                name="message"
                rows={4}
                required
                placeholder="Describe what you are looking to build, optimize, or automate..."
                className={`w-full rounded-2xl border bg-surface-100 p-4 text-sm text-white placeholder-gray-500 focus:outline-none transition-all ${
                  activeFieldErrors.message
                    ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                    : "border-white/10 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan"
                }`}
              />
            </div>
            {activeFieldErrors.message && (
              <p className="text-[11px] text-rose-400">{activeFieldErrors.message}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="text-[11px] text-gray-400 flex items-center space-x-1.5">
              <span>Direct inbox:</span>
              <a href="mailto:opportunities@cynbit.in" className="text-brand-cyan hover:underline">
                opportunities@cynbit.in
              </a>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue px-7 py-3.5 text-xs font-bold text-black shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Direct Inquiry</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
