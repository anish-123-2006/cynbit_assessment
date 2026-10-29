import { CapabilityCard, NeedType, BusinessGoal, SystemType } from "./types";

export const ALL_CAPABILITIES: Record<string, CapabilityCard> = {
  ai_automation: {
    id: "ai_automation",
    title: "Autonomous AI Agents & Cognitive Workflows",
    description:
      "Custom LLM pipelines, autonomous task agents, and intelligent document extraction workflows engineered for high-volume enterprise operations.",
    tags: ["LLM Agents", "Document AI", "Task Automation"],
    relevanceReason: "Directly matches your interest in automating manual tasks or deploying intelligent agents.",
  },
  custom_software: {
    id: "custom_software",
    title: "Full-Stack Software Architecture",
    description:
      "Modern web and mobile applications engineered with scalable microservices, resilient APIs, and cinematic user interfaces.",
    tags: ["Next.js", "React Native", "PostgreSQL", "REST/GraphQL"],
    relevanceReason: "Applicable for launching a new digital platform or re-architecting an existing web/mobile system.",
  },
  cloud_systems: {
    id: "cloud_systems",
    title: "Cloud Infrastructure & Zero-Trust Modernization",
    description:
      "AWS & Azure cloud engineering, container orchestration, CI/CD pipelines, and legacy database migration for global uptime and elasticity.",
    tags: ["AWS / Azure", "Kubernetes", "Database Migration", "DevOps"],
    relevanceReason: "Relevant for resolving growing scaling bottlenecks or updating legacy infrastructure.",
  },
  technical_seo: {
    id: "technical_seo",
    title: "Technical SEO & Data-Driven Growth",
    description:
      "Algorithmic search optimization, programmatic page generation, Core Web Vitals optimization, and conversion-focused growth systems.",
    tags: ["Core Web Vitals", "Programmatic SEO", "Conversion Rate"],
    relevanceReason: "Targeted at expanding organic reach, visibility, and acquisition pipelines.",
  },
  crm_integration: {
    id: "crm_integration",
    title: "Tool & Data Integration (CRM / ERP)",
    description:
      "Unifying siloed databases, legacy ERPs, CRMs (HubSpot, Salesforce, Zoho), and third-party APIs into clean bi-directional sync pipelines.",
    tags: ["API Connectors", "ERP / CRM Sync", "Data Pipelines"],
    relevanceReason: "Addresses the need to connect multiple tools and break down manual data entry barriers.",
  },
  product_suite: {
    id: "product_suite",
    title: "Cynbit SaaS Ecosystem (Revio, TenantEase, Studio)",
    description:
      "Pre-engineered SaaS solutions for customer review automation, tenant/property management, and career intelligence.",
    tags: ["Revio AI", "TenantEase", "Cynbit Studio"],
    relevanceReason: "Ideal if your problem aligns with an established Cynbit vertical software product.",
  },
  bitelevate: {
    id: "bitelevate",
    title: "BitElevate Talent & Engineering Incubation",
    description:
      "Technical training, real-world project apprenticeships, and engineering team augmentation for modern architectures.",
    tags: ["Talent Incubation", "Mentorship", "Team Upskilling"],
    relevanceReason: "Relevant for learning paths, internships, or building internal engineering capability.",
  },
};

export function selectRelevantCapabilities(
  needType?: NeedType,
  systems?: SystemType[],
  businessGoal?: BusinessGoal
): CapabilityCard[] {
  const selected: CapabilityCard[] = [];

  // Core routing based on selected need
  if (needType === "ai_automation") {
    selected.push(ALL_CAPABILITIES.ai_automation);
  } else if (needType === "custom_software") {
    selected.push(ALL_CAPABILITIES.custom_software);
  } else if (needType === "cloud_infrastructure") {
    selected.push(ALL_CAPABILITIES.cloud_systems);
  } else if (needType === "seo_marketing") {
    selected.push(ALL_CAPABILITIES.technical_seo);
  } else if (needType === "product_enquiry") {
    selected.push(ALL_CAPABILITIES.product_suite);
  } else if (needType === "bitelevate_training") {
    selected.push(ALL_CAPABILITIES.bitelevate);
  }

  // System-based enrichment
  if (systems && systems.length > 0) {
    if (systems.includes("crm") || systems.includes("erp")) {
      if (!selected.some((c) => c.id === "crm_integration")) {
        selected.push(ALL_CAPABILITIES.crm_integration);
      }
    }
    if (systems.includes("cloud_infrastructure") && !selected.some((c) => c.id === "cloud_systems")) {
      selected.push(ALL_CAPABILITIES.cloud_systems);
    }
    if (systems.includes("documents_pdfs") && !selected.some((c) => c.id === "ai_automation")) {
      selected.push(ALL_CAPABILITIES.ai_automation);
    }
  }

  // Business goal enrichment
  if (businessGoal === "connect_tools_data" && !selected.some((c) => c.id === "crm_integration")) {
    selected.push(ALL_CAPABILITIES.crm_integration);
  }
  if (businessGoal === "reduce_manual_work" && !selected.some((c) => c.id === "ai_automation")) {
    selected.push(ALL_CAPABILITIES.ai_automation);
  }
  if (businessGoal === "launch_new_product" && !selected.some((c) => c.id === "custom_software")) {
    selected.push(ALL_CAPABILITIES.custom_software);
  }

  // Fallback default if still under 2 capabilities
  if (selected.length === 0) {
    selected.push(ALL_CAPABILITIES.ai_automation, ALL_CAPABILITIES.custom_software);
  } else if (selected.length === 1) {
    if (selected[0].id !== "custom_software") {
      selected.push(ALL_CAPABILITIES.custom_software);
    } else {
      selected.push(ALL_CAPABILITIES.cloud_systems);
    }
  }

  return selected.slice(0, 3);
}

