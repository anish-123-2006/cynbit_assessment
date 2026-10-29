"use server";

import { fallbackContactSchema } from "@/lib/discovery/validation";

export type ActionState = {
  success?: boolean;
  mocked?: boolean;
  referenceId?: string;
  error?: string;
  fieldErrors?: Record<string, string>;
};

/**
 * Server Action for progressive enhancement.
 * Allows standard HTML <form action={...}> to submit even when JavaScript is completely disabled.
 */
export async function submitContactAction(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  const rawData = {
    fullName: formData.get("fullName")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    company: formData.get("company")?.toString() || "",
    phone: formData.get("phone")?.toString() || "",
    serviceCategory: formData.get("serviceCategory")?.toString() || "ai_automation",
    message: formData.get("message")?.toString() || "",
  };

  const parsed = fallbackContactSchema.safeParse(rawData);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    parsed.error.errors.forEach((err) => {
      if (err.path[0]) {
        fieldErrors[err.path[0].toString()] = err.message;
      }
    });
    return {
      success: false,
      error: "Please correct the errors in the form.",
      fieldErrors,
    };
  }

  // Simulated Mock Submission (Explicitly labeled)
  const mockRef = `CYN-MOCK-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  // Safe local development log: only output anonymous status, no personal data (names, emails, phone numbers)
  console.log(`[Cynbit Local Dev Log] Server Action received inquiry (Mock Ref: ${mockRef}, Category: ${parsed.data.serviceCategory}). No personal data persisted.`);

  return {
    success: true,
    mocked: true,
    referenceId: mockRef,
  };
}
