import { NextRequest, NextResponse } from "next/server";
import { discoveryFormSchema, fallbackContactSchema } from "@/lib/discovery/validation";
import { trackEvent } from "@/lib/discovery/analytics";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check if it's a full discovery brief or a standard fallback contact
    const isDiscovery = Boolean(body.needType && body.challenge);

    if (isDiscovery) {
      const parsed = discoveryFormSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { success: false, error: "Invalid brief payload", details: parsed.error.format() },
          { status: 400 }
        );
      }

      const mockId = `CYN-MOCK-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

      // Track anonymous event metadata only (no personal data: email, phone, name stripped)
      trackEvent("project_brief_submitted", {
        needType: parsed.data.needType,
        isMockStorage: true,
      });

      console.log(`[Cynbit Local Dev Log] Brief received (mock simulation ID: ${mockId}). No personal data persisted.`);

      return NextResponse.json({
        success: true,
        mocked: true,
        storageStatus: "simulated_in_memory",
        referenceId: mockId,
        message:
          "Prototype Notice: Brief received and handled in-memory for local development logging. No personal data is persisted.",
      });
    } else {
      const parsedFallback = fallbackContactSchema.safeParse(body);
      if (!parsedFallback.success) {
        return NextResponse.json(
          { success: false, error: "Validation failed", details: parsedFallback.error.format() },
          { status: 400 }
        );
      }

      const mockFallbackId = `CYN-DIR-MOCK-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

      // Track anonymous category only
      trackEvent("fallback_form_submitted", {
        category: parsedFallback.data.serviceCategory,
        isMockStorage: true,
      });

      console.log(`[Cynbit Local Dev Log] Direct contact enquiry received (mock simulation ID: ${mockFallbackId}). No personal data persisted.`);

      return NextResponse.json({
        success: true,
        mocked: true,
        storageStatus: "simulated_in_memory",
        referenceId: mockFallbackId,
        message:
          "Prototype Notice: Direct enquiry handled in-memory for local development logging. No personal data is persisted.",
      });
    }
  } catch (error) {
    console.error("[API Error /api/submit-brief]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to record inquiry." },
      { status: 500 }
    );
  }
}
