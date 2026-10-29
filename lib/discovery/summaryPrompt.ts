import { DiscoveryFormData, ProjectSummaryResult } from "./types";
import { generateDeterministicSummary } from "./mockSummary";

/**
 * Builds the strict system prompt for optional external LLMs.
 * Ensures the model never hallucinates client facts, guarantees, costs, or rigid timelines.
 */
export function buildSystemPrompt(): string {
  return `You are the Cynbit Project Discovery Assistant for Cynbit Technologies (Jaipur, India).
Your role is to produce a preliminary, structured technical discovery summary based strictly on the user's answers.

MANDATORY RULES:
1. PRELIMINARY ONLY: Clearly emphasize that this is an exploratory starting point, NOT a final architecture or commercial proposal.
2. NO FABRICATED FACTS: Only reflect systems, constraints, and problems explicitly supplied by the visitor.
3. NO RIGID GUARANTEES: Never state exact delivery timelines (e.g., "This will take exactly 4 weeks"), exact ROI metrics (e.g., "3x ROI"), or mandatory tech stacks.
4. CAUTIOUS & PROFESSIONAL TONE: Use phrasing such as "may be relevant", "initial directional assessment", and "requires further discovery".
5. OUTPUT FORMAT: Return strictly valid JSON matching the required schema. No conversational filler or markdown fences around the JSON.`;
}

export function buildUserPrompt(data: DiscoveryFormData): string {
  return `Please analyze this inbound client project discovery request:

- Selected Need: ${data.needType || "Not specified"}
- Primary Goal: ${data.businessGoal || "Not specified"}
- Problem Description: "${data.challenge}"
- Systems Involved: ${(data.systems || []).join(", ") || "Not sure"}
- Current Stage: ${data.currentStage || "Not specified"}
- Desired Timeline Window: ${data.timeline || "Exploring options"}
- Contact Person: ${data.fullName} (${data.company || "Independent"})

Return JSON with this exact structure:
{
  "projectCategory": "string",
  "problemSummary": "string (1-2 sentences summarizing visitor challenge)",
  "recommendedDirection": "string",
  "followUpQuestions": ["string", "string", "string"],
  "nextStep": "string",
  "confidence": "Initial",
  "disclaimer": "This is an initial assessment, not a final technical proposal."
}`;
}

/**
 * Attempts to summarize using an external AI provider if configured in environment variables.
 * Falls back safely to deterministic local summary.
 */
export async function getProjectSummary(data: DiscoveryFormData): Promise<ProjectSummaryResult> {
  const fallback = generateDeterministicSummary(data);

  const apiKey = process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // Return deterministic mock summary immediately
    return fallback;
  }

  // If OPENAI_API_KEY is present
  if (process.env.OPENAI_API_KEY) {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: buildSystemPrompt() },
            { role: "user", content: buildUserPrompt(data) },
          ],
          response_format: { type: "json_object" },
          temperature: 0.2,
        }),
      });

      if (!response.ok) {
        console.warn(`[AI API Warning] OpenAI returned status ${response.status}. Using fallback summary.`);
        return fallback;
      }

      const json = await response.json();
      const rawContent = json.choices?.[0]?.message?.content;
      if (!rawContent) return fallback;

      const parsed = JSON.parse(rawContent);

      return {
        projectCategory: parsed.projectCategory || fallback.projectCategory,
        problemSummary: parsed.problemSummary || fallback.problemSummary,
        recommendedDirection: parsed.recommendedDirection || fallback.recommendedDirection,
        relevantCapabilities: fallback.relevantCapabilities, // Preserve vetted Cynbit capability cards
        followUpQuestions:
          Array.isArray(parsed.followUpQuestions) && parsed.followUpQuestions.length > 0
            ? parsed.followUpQuestions.slice(0, 3)
            : fallback.followUpQuestions,
        nextStep: parsed.nextStep || fallback.nextStep,
        confidence: "Initial",
        disclaimer:
          "This is an AI-assisted preliminary summary based only on the information you provided. Final technical specifications and timeline require collaborative discovery.",
        estimatedEffortBand: fallback.estimatedEffortBand,
      };
    } catch (err) {
      console.warn("[AI API Error] Failed to fetch or parse AI response. Falling back gracefully:", err);
      return fallback;
    }
  }

  return fallback;
}

