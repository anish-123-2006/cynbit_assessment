export type DiscoveryEventName =
  | "discovery_started"
  | "need_selected"
  | "question_completed"
  | "discovery_completed"
  | "summary_generated"
  | "summary_generation_failed"
  | "project_brief_submitted"
  | "booking_clicked"
  | "fallback_form_opened"
  | "fallback_form_submitted";

// List of disallowed personal identifier keys to prevent accidental logging
const DISALLOWED_PII_KEYS = new Set([
  "fullName",
  "email",
  "clientEmail",
  "phone",
  "company",
  "challenge",
  "message",
  "description",
]);

/**
 * Sanitizes event properties to ensure no personal identifiers are logged or transmitted.
 */
function sanitizeProperties(properties?: Record<string, unknown>): Record<string, unknown> {
  if (!properties) return {};
  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(properties)) {
    if (!DISALLOWED_PII_KEYS.has(key)) {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

/**
 * Safe local development logging abstraction.
 * - Strips all personal identifiers (names, emails, phone numbers, message bodies).
 * - Only logs anonymous event names and non-sensitive metadata (e.g. step number, category).
 * - Does NOT dispatch data to any external analytics service.
 */
export function trackEvent(name: DiscoveryEventName, properties?: Record<string, unknown>): void {
  const timestamp = new Date().toISOString();
  const safePayload = {
    event: name,
    properties: sanitizeProperties(properties),
    timestamp,
  };

  // Safe local development logging to browser console only
  if (typeof window !== "undefined") {
    console.groupCollapsed(
      `%c[Cynbit Local Dev Log]%c ${name}`,
      "color: #00f0ff; font-weight: bold;",
      "color: #a3e635; font-weight: normal;"
    );
    console.log("Anonymous Event Payload:", safePayload);
    console.groupEnd();
  } else {
    console.log(`[Cynbit Local Dev Log] ${name}`, safePayload);
  }
}
