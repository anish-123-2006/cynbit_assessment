"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Menu, X, ShieldCheck } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#07090e]/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Name */}
        <Link
          href="/"
          className="group flex items-center space-x-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan rounded-lg p-1"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-cyan/20 to-brand-blue/30 border border-brand-cyan/40 text-brand-cyan shadow-[0_0_15px_rgba(0,240,255,0.15)] group-hover:border-brand-cyan transition-all">
            <span className="font-mono text-base font-black tracking-wider text-white">C</span>
            <div className="absolute -inset-0.5 rounded-xl bg-brand-cyan/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-1.5">
              <span className="font-semibold text-white tracking-tight text-base">Cynbit</span>
              <span className="text-xs font-mono uppercase tracking-widest text-brand-cyan/80">Tech</span>
            </div>
            <span className="text-[10px] text-gray-400 font-mono tracking-wider">Jaipur Engineering Hub</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-medium text-gray-300">
          <Link
            href="/"
            className="hover:text-white transition-colors hover:underline underline-offset-8"
          >
            Overview
          </Link>
          <Link
            href="/discover"
            className="flex items-center space-x-1.5 text-brand-cyan hover:text-white transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-cyan animate-pulse" />
            <span>Discovery Assistant</span>
          </Link>
          <Link
            href="/contact"
            className="hover:text-white transition-colors"
          >
            Direct Enquiry
          </Link>
          <div className="flex items-center space-x-1.5 text-emerald-400/90 bg-emerald-950/40 border border-emerald-500/20 px-2.5 py-1 rounded-full font-mono text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Now accepting discovery conversations</span>
          </div>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden sm:flex items-center space-x-3">
          <Link
            href="/contact"
            className="text-xs font-medium text-gray-400 hover:text-white px-3 py-2 transition-colors"
          >
            Direct Form
          </Link>
          <Link
            href="/discover"
            className="group relative inline-flex items-center space-x-2 rounded-xl bg-gradient-to-r from-brand-cyan/90 to-brand-blue px-4 py-2 text-xs font-semibold text-black shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Start Discovery</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#07090e]/95 px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm text-gray-300 hover:text-white rounded-lg hover:bg-white/5"
          >
            Overview
          </Link>
          <Link
            href="/discover"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm text-brand-cyan font-medium rounded-lg bg-brand-cyan/10 border border-brand-cyan/20"
          >
            ⚡ Start Project Discovery
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm text-gray-300 hover:text-white rounded-lg hover:bg-white/5"
          >
            Direct Contact Form
          </Link>
          <div className="pt-2">
            <Link
              href="/discover"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 rounded-xl bg-brand-cyan py-2.5 text-xs font-bold text-black"
            >
              <span>Launch Discovery Assistant</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

