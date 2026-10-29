"use client";

import React, { useState } from "react";
import { trackEvent } from "@/lib/discovery/analytics";
import {
  Calendar,
  Clock,
  Video,
  CheckCircle,
  ExternalLink,
  Copy,
  Check,
  Info,
  AlertTriangle,
} from "lucide-react";

interface BookingPanelProps {
  clientName: string;
  clientEmail: string;
  category: string;
}

interface DateSlot {
  dateStr: string;
  label: string;
  times: string[];
}

const MOCK_DAYS: DateSlot[] = [
  {
    dateStr: "2026-11-03",
    label: "Monday, Nov 3",
    times: ["11:00 AM IST", "02:30 PM IST", "04:00 PM IST", "06:30 PM IST"],
  },
  {
    dateStr: "2026-11-04",
    label: "Tuesday, Nov 4",
    times: ["10:30 AM IST", "01:00 PM IST", "03:30 PM IST", "05:00 PM IST"],
  },
  {
    dateStr: "2026-11-05",
    label: "Wednesday, Nov 5",
    times: ["11:30 AM IST", "02:00 PM IST", "04:30 PM IST", "07:00 PM IST"],
  },
];

export function BookingPanel({ clientName, clientEmail, category }: BookingPanelProps) {
  const [selectedDay, setSelectedDay] = useState<DateSlot>(MOCK_DAYS[0]);
  const [selectedTime, setSelectedTime] = useState<string>(MOCK_DAYS[0].times[0]);
  const [isBooked, setIsBooked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const externalCalendarUrl = process.env.NEXT_PUBLIC_CALENDAR_URL;

  const handleConfirm = () => {
    // Only log anonymous event metadata (no personal emails or PII)
    trackEvent("booking_clicked", {
      slot: `${selectedDay.label} @ ${selectedTime}`,
      category,
      isMock: true,
    });
    setIsBooked(true);
  };

  const copyMeetLink = () => {
    navigator.clipboard.writeText("https://meet.google.com/cyn-disc-demo");
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-surface-300/80 p-5 sm:p-6 space-y-6">
      {/* Explicit Mock Notification Banner */}
      <div className="rounded-xl border border-amber-500/30 bg-amber-950/30 p-3.5 flex items-start space-x-2.5 text-xs text-amber-200">
        <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="font-semibold text-amber-300">
            Prototype Demonstration Notice: This Calendar is Mocked
          </p>
          <p className="text-amber-200/80 leading-relaxed text-[11px]">
            This scheduling component is a simulated design prototype demonstrating the user experience. No real calendar invitation is dispatched, and no external booking service is connected unless configured below.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-[11px] font-mono text-brand-cyan uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
            <span>Interactive Prototype Scheduler</span>
          </div>
          <h4 className="text-base font-bold text-white tracking-tight">
            Potential Focused Discovery Conversation (Simulated)
          </h4>
        </div>
        <div className="flex items-center space-x-1.5 text-[11px] text-gray-400 font-mono">
          <Clock className="w-3.5 h-3.5 text-brand-cyan" />
          <span>Prototype Demonstration</span>
        </div>
      </div>

      {!isBooked ? (
        <div className="space-y-5">
          {/* Day Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-gray-400">
              1. Choose a Simulated Date
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {MOCK_DAYS.map((day) => {
                const isSelected = selectedDay.dateStr === day.dateStr;
                return (
                  <button
                    key={day.dateStr}
                    type="button"
                    onClick={() => {
                      setSelectedDay(day);
                      setSelectedTime(day.times[0]);
                    }}
                    className={`p-3 rounded-xl border text-xs font-medium text-left transition-all ${
                      isSelected
                        ? "border-brand-cyan bg-brand-cyan/15 text-white ring-1 ring-brand-cyan/40"
                        : "border-white/10 bg-surface-200 text-gray-400 hover:border-white/20 hover:text-gray-200"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-3.5 h-3.5 text-brand-cyan" />
                      <span>{day.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slot Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-gray-400">
              2. Select Available Slot (Mock)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {selectedDay.times.map((time) => {
                const isSelected = selectedTime === time;
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-mono text-center transition-all ${
                      isSelected
                        ? "border-brand-cyan bg-brand-cyan text-black font-bold shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                        : "border-white/10 bg-surface-200 text-gray-300 hover:border-white/20 hover:bg-white/5"
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Participant Info Preview */}
          <div className="rounded-xl bg-black/40 border border-white/5 p-3.5 text-xs text-gray-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-gray-500">Attendee: </span>
              <span className="text-white font-medium">{clientName || "Visitor"}</span>
            </div>
            <div className="text-[11px] text-brand-cyan font-mono">
              Host: Cynbit Team Representative (Simulated)
            </div>
          </div>

          {/* External scheduling link fallback if configured */}
          {externalCalendarUrl && (
            <div className="rounded-xl border border-white/10 bg-surface-200 p-3 flex items-center justify-between text-xs">
              <span className="text-gray-300">Prefer real external calendar?</span>
              <a
                href={externalCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-brand-cyan hover:underline font-mono"
              >
                <span>Open Live Scheduler</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* Confirm Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <span className="text-[11px] text-gray-400 font-mono">
              Prototype simulation • No external booking system contacted
            </span>
            <button
              type="button"
              onClick={handleConfirm}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl bg-brand-cyan px-6 py-3 text-xs font-bold text-black shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Check className="w-4 h-4" />
              <span>Confirm Mock Slot ({selectedDay.label} @ {selectedTime})</span>
            </button>
          </div>
        </div>
      ) : (
        /* Confirmed Mock State */
        <div className="space-y-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-5">
          <div className="flex items-center space-x-3 text-emerald-400">
            <CheckCircle className="w-6 h-6 flex-shrink-0" />
            <div>
              <h5 className="text-sm font-bold text-white tracking-tight">
                Simulated Discovery Session Confirmed (Mock)
              </h5>
              <p className="text-xs text-emerald-300 font-mono">
                {selectedDay.label} at {selectedTime}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-amber-500/20 bg-amber-950/30 p-3 text-[11px] text-amber-200 leading-relaxed">
            <strong>Mock Confirmation:</strong> This meeting confirmation is simulated for demonstration purposes. In production, this trigger would interface with a real scheduling system to dispatch a calendar invite.
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-emerald-500/20">
            <button
              type="button"
              onClick={copyMeetLink}
              className="inline-flex items-center space-x-1.5 rounded-lg border border-white/10 bg-surface-200 px-3 py-2 text-xs font-mono text-gray-300 hover:text-white"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? "Link Copied" : "Copy Mock Meet Link"}</span>
            </button>

            <span className="text-[11px] text-gray-400 font-mono">
              Simulated Meet Link: https://meet.google.com/cyn-disc-demo
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
