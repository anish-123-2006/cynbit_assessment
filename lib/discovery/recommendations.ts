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
  document_processing: {
    id: "document_processing",
    title: "Document Processing & Data Extraction",
    description:
      "Automated OCR, PDF table extraction, and unstructured file parsing into clean, validated data records.",
    tags: ["PDF Extraction", "OCR Pipelines", "Document AI"],
    relevanceReason: "Directly addresses your need to parse and extract data from documents, PDFs, or spreadsheets.",
  },
  database_integration: {
    id: "database_integration",
    title: "Database & Backend Integration",
    description:
      "Secure API connectors, automated pipeline ingestion, and schema synchronization with internal databases or warehouses.",
    tags: ["PostgreSQL / SQL", "Data Pipelines", "API Connectors"],
    relevanceReason: "Applicable for piping automated extraction outputs directly into internal database systems.",
  },
  crm_integration: {
    id: "crm_integration",
    title: "Tool & Data Integration (CRM / ERP)",
    description:
      "Unifying siloed databases, legacy ERPs, CRMs (HubSpot, Salesforce, Zoho), and third-party APIs into clean bi-directional sync pipelines.",
    tags: ["API Connectors", "ERP / CRM Sync", "Data Pipelines"],
    relevanceReason: "Addresses the need to connect multiple tools and break down manual data entry barriers.",
  },
  backend_automation: {
    id: "backend_automation",
    title: "Backend Workflow Automation",
    description:
      "Event-driven background jobs, serverless pipeline triggers, and operational error-handling automation.",
    tags: ["Async Workflows", "Queue Workers", "Data Sync"],
    relevanceReason: "Relevant for eliminating repetitive manual operational tasks and connecting backend services.",
  },
  custom_software: {
    id: "custom_software",
    title: "Full-Stack Software Architecture",
    description:
      "Modern web and mobile applications engineered with scalable microservices, resilient APIs, and cinematic user interfaces.",
    tags: ["Next.js", "React Native", "PostgreSQL", "REST/GraphQL"],
    relevanceReason: "Applicable for building, refactoring, or scaling user-facing web or mobile platforms.",
  },
  cloud_systems: {
    id: "cloud_systems",
    title: "Cloud Infrastructure & Zero-Trust Modernization",
    description:
      "AWS & Azure cloud engineering, container orchestration, CI/CD pipelines, and legacy database migration for global uptime and elasticity.",
    tags: ["AWS / Azure", "Kubernetes", "Database Migration", "DevOps"],
    relevanceReason: "Relevant for resolving growing scaling bottlenecks or updating legacy cloud infrastructure.",
  },
  technical_seo: {
    id: "technical_seo",
    title: "Technical SEO & Data-Driven Growth",
    description:
      "Algorithmic search optimization, programmatic page generation, Core Web Vitals optimization, and conversion-focused growth systems.",
    tags: ["Core Web Vitals", "Programmatic SEO", "Conversion Rate"],
    relevanceReason: "Targeted at expanding organic reach, visibility, and acquisition pipelines.",
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

  const addIfUnique = (cap: CapabilityCard) => {
    if (!selected.some((c) => c.id === cap.id)) {
      selected.push(cap);
    }
  };

  // 1. Core routing based on selected need
  if (needType === "ai_automation") {
    addIfUnique(ALL_CAPABILITIES.ai_automation);
  } else if (needType === "custom_software") {
    addIfUnique(ALL_CAPABILITIES.custom_software);
  } else if (needType === "cloud_infrastructure") {
    addIfUnique(ALL_CAPABILITIES.cloud_systems);
  } else if (needType === "seo_marketing") {
    addIfUnique(ALL_CAPABILITIES.technical_seo);
  } else if (needType === "product_enquiry") {
    addIfUnique(ALL_CAPABILITIES.product_suite);
  } else if (needType === "bitelevate_training") {
    addIfUnique(ALL_CAPABILITIES.bitelevate);
  }

  // 2. System-based precision enrichment
  if (systems && systems.length > 0) {
    if (systems.includes("documents_pdfs")) {
      addIfUnique(ALL_CAPABILITIES.document_processing);
    }
    if (systems.includes("internal_database")) {
      addIfUnique(ALL_CAPABILITIES.database_integration);
    }
    if (systems.includes("crm") || systems.includes("erp")) {
      addIfUnique(ALL_CAPABILITIES.crm_integration);
    }
    if (systems.includes("cloud_infrastructure")) {
      addIfUnique(ALL_CAPABILITIES.cloud_systems);
    }
    if (systems.includes("website") || systems.includes("mobile_app")) {
      addIfUnique(ALL_CAPABILITIES.custom_software);
    }
  }

  // 3. Business goal enrichment
  if (businessGoal === "reduce_manual_work") {
    if (needType !== "ai_automation") {
      addIfUnique(ALL_CAPABILITIES.backend_automation);
    }
  }
  if (businessGoal === "connect_tools_data") {
    addIfUnique(ALL_CAPABILITIES.crm_integration);
  }
  if (businessGoal === "launch_new_product") {
    addIfUnique(ALL_CAPABILITIES.custom_software);
  }

  // 4. Fallback defaults (context-aware, avoiding arbitrary web/mobile claims)
  if (selected.length === 0) {
    addIfUnique(ALL_CAPABILITIES.ai_automation);
    addIfUnique(ALL_CAPABILITIES.database_integration);
  } else if (selected.length === 1) {
    if (selected[0].id === "ai_automation") {
      addIfUnique(ALL_CAPABILITIES.database_integration);
    } else if (selected[0].id === "custom_software") {
      addIfUnique(ALL_CAPABILITIES.cloud_systems);
    } else {
      addIfUnique(ALL_CAPABILITIES.backend_automation);
    }
  }

  return selected.slice(0, 3);
}
