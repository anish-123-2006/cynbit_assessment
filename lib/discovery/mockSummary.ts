import { DiscoveryFormData, ProjectSummaryResult } from "./types";
import { selectRelevantCapabilities } from "./recommendations";

export function generateDeterministicSummary(data: DiscoveryFormData): ProjectSummaryResult {
  const categoryMap: Record<string, string> = {
    ai_automation: "AI Automation & Cognitive Workflows",
    custom_software: "Custom Web & Mobile Software",
    cloud_infrastructure: "Cloud Modernization & DevOps",
    seo_marketing: "Technical SEO & Growth Architecture",
    product_enquiry: "Cynbit SaaS Ecosystem Evaluation",
    bitelevate_training: "Engineering Talent Incubation",
    not_sure: "Multi-Disciplinary Tech Discovery",
  };

  const goalMap: Record<string, string> = {
    reduce_manual_work: "reducing manual operational overhead",
    launch_new_product: "bringing a new software product to market",
    improve_existing_system: "optimizing and upgrading an active digital system",
    connect_tools_data: "unifying disparate software tools and data silos",
    improve_customer_experience: "elevating end-user experience and digital responsiveness",
    improve_marketing_leads: "accelerating inbound acquisition and search discovery",
    explore_product_partnership: "evaluating proprietary product fit or strategic integration",
    still_exploring: "conducting early-stage technical feasibility discovery",
  };

  const stageMap: Record<string, string> = {
    idea_exploration: "an early conceptual phase",
    existing_manual_process: "an active manual workflow that needs modern automation",
    product_needs_improvement: "a live product requiring refactoring or feature expansion",
    growing_scaling_issues: "a rapidly growing system encountering scaling friction",
    legacy_modernization: "a legacy architecture requiring cloud migration or modern interfaces",
    ready_to_implement: "a prioritized requirement ready for implementation planning",
  };

  const detectedCategory =
    (data.needType && categoryMap[data.needType]) || "Technical Architecture Discovery";
  const primaryGoal =
    (data.businessGoal && goalMap[data.businessGoal]) || "technical modernization";
  const stageDesc =
    (data.currentStage && stageMap[data.currentStage]) || "an exploratory stage";

  // Build grounded problem summary reflecting user's actual text
  const cleanSnippet = data.challenge
    ? data.challenge.trim().replace(/\s+/g, " ")
    : "No detailed description provided";

  const systemsMentioned =
    data.systems && data.systems.length > 0 && !data.systems.includes("not_sure")
      ? data.systems.map((s) => s.replace(/_/g, " ")).join(", ")
      : "various digital touchpoints";

  const problemSummary = `The inquiry centers on ${primaryGoal} at ${stageDesc}. Specifically involving ${systemsMentioned}, the user highlighted: "${
    cleanSnippet.length > 180 ? cleanSnippet.slice(0, 177) + "..." : cleanSnippet
  }".`;

  // Select dynamic capability recommendations
  const capabilities = selectRelevantCapabilities(data.needType, data.systems, data.businessGoal);

  // Generate grounded, sensible follow-up questions
  const followUpQuestions: string[] = [];

  if (data.needType === "ai_automation" || data.businessGoal === "reduce_manual_work") {
    followUpQuestions.push(
      "What is the current weekly volume and format of the data or documents being processed?",
      "Which target database or internal tool should ingest the automated outputs?",
      "Are there specific data confidentiality, compliance, or on-premises constraints?"
    );
  } else if (data.needType === "custom_software" || data.businessGoal === "launch_new_product") {
    followUpQuestions.push(
      "What are the core user personas and must-have interactions for the initial release?",
      "Are there third-party APIs, authentication providers, or legacy systems to connect?",
      "Do you have existing UI wireframes or design guidelines in place?"
    );
  } else if (data.needType === "cloud_infrastructure") {
    followUpQuestions.push(
      "Which cloud environment is currently hosting your workloads (AWS, Azure, GCP, or on-prem)?",
      "What are your current peak traffic patterns and observed latency bottlenecks?",
      "What recovery time (RTO) and point objectives (RPO) does the business require?"
    );
  } else {
    followUpQuestions.push(
      "What internal systems or stakeholders will be most affected by this initiative?",
      "What does a successful milestone look like in the first 60–90 days?",
      "Are there existing architectural diagrams or technical documentation we can review together?"
    );
  }

  // Recommended directional step
  let recommendedDirection = "Initial Technical Discovery Session";
  if (data.needType === "ai_automation") {
    recommendedDirection = "Cognitive Automation Feasibility Assessment";
  } else if (data.needType === "custom_software") {
    recommendedDirection = "Application Scoping & Architectural Blueprinting";
  } else if (data.needType === "cloud_infrastructure") {
    recommendedDirection = "Cloud Modernization & Security Review";
  } else if (data.needType === "product_enquiry") {
    recommendedDirection = "Cynbit Product Walkthrough & Fit Analysis";
  }

  return {
    projectCategory: detectedCategory,
    problemSummary,
    recommendedDirection,
    relevantCapabilities: capabilities,
    followUpQuestions: followUpQuestions.slice(0, 3),
    nextStep: "Schedule a potential focused discovery conversation with the Cynbit team.",
    confidence: "Initial",
    disclaimer:
      "This is an initial exploratory assessment based strictly on the parameters you provided. Final system architecture, technical dependencies, and milestones require collaborative engineering discovery.",
    estimatedEffortBand:
      "Estimated effort and delivery phases are determined during the technical blueprinting phase; no rigid time or cost commitments are implied by this preliminary summary.",
  };
}

