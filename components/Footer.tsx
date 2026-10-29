import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ExternalLink, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#06080d] text-gray-400 text-xs py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Cynbit Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-cyan/20 border border-brand-cyan/40 text-brand-cyan font-mono font-bold text-sm">
                C
              </div>
              <span className="font-semibold text-white text-sm tracking-tight">Cynbit Technologies</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              Engineering AI automation, autonomous agents, and high-performance digital architecture for global businesses.
            </p>
            <div className="pt-1 flex items-center space-x-2 text-[11px] text-gray-500 font-mono">
              <MapPin className="w-3.5 h-3.5 text-brand-cyan flex-shrink-0" />
              <span>32/115 Pratap Nagar, Jaipur, RJ 302033</span>
            </div>
          </div>

          {/* Col 2: Services & Capabilities */}
          <div className="space-y-3">
            <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-white">Engineering Capabilities</h4>
            <ul className="space-y-2 text-gray-400 text-xs">
              <li>Autonomous AI Agents & Workflows</li>
              <li>Custom Full-Stack Web & Mobile</li>
              <li>Cloud Architecture (AWS & Azure)</li>
              <li>Technical SEO & Conversion Growth</li>
              <li>Tool & CRM Integration</li>
            </ul>
          </div>

          {/* Col 3: Proprietary Ecosystem */}
          <div className="space-y-3">
            <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-white">Product & Talent Lab</h4>
            <ul className="space-y-2 text-gray-400 text-xs">
              <li>
                <span className="text-gray-300 font-medium">Revio:</span> AI Review & Reputation Assistant
              </li>
              <li>
                <span className="text-gray-300 font-medium">TenantEase:</span> Modern Property Ecosystem
              </li>
              <li>
                <span className="text-gray-300 font-medium">Cynbit Studio:</span> Career Intelligence
              </li>
              <li>
                <span className="text-brand-cyan font-medium">BitElevate:</span> Talent Incubation Program
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Contact */}
          <div className="space-y-3">
            <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-white">Direct Connect</h4>
            <div className="space-y-2 text-xs">
              <a
                href="mailto:opportunities@cynbit.in"
                className="flex items-center space-x-2 text-gray-300 hover:text-brand-cyan transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-brand-cyan" />
                <span>opportunities@cynbit.in</span>
              </a>
              <a
                href="tel:+918947962667"
                className="flex items-center space-x-2 text-gray-300 hover:text-brand-cyan transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-brand-cyan" />
                <span>+91 89479 62667</span>
              </a>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center space-x-1.5 text-brand-cyan hover:underline text-[11px] font-mono"
                >
                  <span>Open direct enquiry form</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-cyan/70" />
            <span>
              Cynbit Project Discovery Assistant Prototype. Initial assessments are exploratory and do not constitute formal commercial quotes.
            </span>
          </div>
          <div>
            © {new Date().getFullYear()} Cynbit Technologies. Engineered for Optimism.
          </div>
        </div>
      </div>
    </footer>
  );
}

