import { NextRequest, NextResponse } from "next/server";
import { discoveryFormSchema } from "@/lib/discovery/validation";
import { getProjectSummary } from "@/lib/discovery/summaryPrompt";
import { generateDeterministicSummary } from "@/lib/discovery/mockSummary";
import { trackEvent } from "@/lib/discovery/analytics";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Field-level validation with Zod
    const validationResult = discoveryFormSchema.safeParse(body);

    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      validationResult.error.errors.forEach((err) => {
        const path = err.path.join(".");
        fieldErrors[path] = err.message;
      });

      trackEvent("summary_generation_failed", {
        reason: "validation_error",
        fields: Object.keys(fieldErrors),
      });

      return NextResponse.json(
        {
          success: false,
          error: "Validation failed. Please check the provided information.",
          fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Generate summary (AI if configured, else deterministic fallback)
    const summary = await getProjectSummary(data);

    trackEvent("summary_generated", {
      category: summary.projectCategory,
      needType: data.needType,
      confidence: summary.confidence,
    });

    return NextResponse.json({
      success: true,
      summary,
    });
  } catch (error) {
    console.error("[API Error /api/project-summary]:", error);

    trackEvent("summary_generation_failed", {
      reason: error instanceof Error ? error.message : "unknown_error",
    });

    // Even in case of unexpected exceptions, attempt a safe fallback if body had minimal fields
    return NextResponse.json(
      {
        success: false,
        error: "Unable to process the discovery summary at this moment. You can still submit your brief directly.",
      },
      { status: 500 }
    );
  }
}

