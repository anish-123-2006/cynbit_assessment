import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { FallbackContactForm } from "@/components/discovery/FallbackContactForm";
import { Sparkles, MapPin, Mail, Phone, Clock, ArrowRight, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Direct Project Contact | Cynbit Technologies Jaipur",
  description:
    "Direct contact gateway for Cynbit Technologies. Submit an RFP or project requirement directly to our software and AI engineering hub in Jaipur.",
};

export default function ContactPage() {
  return (
    <div className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      {/* Background glow */}
      <div className="pointer-events-none absolute top-12 left-1/3 -translate-x-1/2 w-[700px] h-[350px] bg-brand-blue/[0.07] blur-3xl rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-brand-cyan">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-cyan" />
              <span>Direct Engineering Gateway</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Connect directly with our architects.
            </h1>
            <p className="text-sm text-gray-400 leading-relaxed">
              If you already have a detailed project specification, an active RFP, or prefer traditional message submission, use this direct channel.
            </p>
          </div>

          <Link
            href="/discover"
            className="group inline-flex items-center space-x-2 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 px-4 py-2.5 text-xs font-mono text-brand-cyan hover:bg-brand-cyan/20 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-cyan animate-pulse" />
            <span>Need help framing? Try Discovery Assistant</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Cynbit Office & Contacts */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-surface-200/50 p-6 space-y-6">
              <h3 className="text-sm font-mono uppercase tracking-wider text-white font-bold border-b border-white/5 pb-3">
                Jaipur Engineering Lab
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start space-x-3 text-gray-300">
                  <MapPin className="w-4 h-4 text-brand-cyan flex-shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-semibold text-white block">Headquarters:</span>
                    <span>32/115 Pratap Nagar</span>
                    <span className="block text-gray-400">Jaipur, Rajasthan 302033</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-gray-300">
                  <Mail className="w-4 h-4 text-brand-cyan flex-shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-semibold text-white block">Inquiries & Partnerships:</span>
                    <a href="mailto:opportunities@cynbit.in" className="text-brand-cyan hover:underline block">
                      opportunities@cynbit.in
                    </a>
                    <a href="mailto:support@cynbit.in" className="text-gray-400 hover:underline block">
                      support@cynbit.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-gray-300">
                  <Phone className="w-4 h-4 text-brand-cyan flex-shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-semibold text-white block">Voice Lines:</span>
                    <a href="tel:+918947962667" className="text-gray-300 hover:text-white block">
                      +91 89479 62667
                    </a>
                    <a href="tel:+917891209777" className="text-gray-400 hover:text-white block">
                      +91 78912 09777
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-gray-300">
                  <Clock className="w-4 h-4 text-brand-cyan flex-shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-semibold text-white block">Response Expectation:</span>
                    <span className="text-gray-400">Initial review within 24 business hours.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/5 bg-surface-100/40 p-5 space-y-2 text-xs text-gray-400">
              <span className="font-mono text-brand-cyan text-[11px] block uppercase font-bold">
                Reliability Note
              </span>
              <p className="leading-relaxed">
                This form operates on progressive enhancement: it renders with 100% visibility on the server and functions reliably regardless of JavaScript execution delays.
              </p>
            </div>
          </div>

          {/* Right Column: Progressive Enhancement Form */}
          <div className="lg:col-span-2">
            <FallbackContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}

