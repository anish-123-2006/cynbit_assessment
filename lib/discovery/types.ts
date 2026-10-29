export type NeedType =
  | "ai_automation"
  | "custom_software"
  | "cloud_infrastructure"
  | "seo_marketing"
  | "product_enquiry"
  | "bitelevate_training"
  | "not_sure";

export type BusinessGoal =
  | "reduce_manual_work"
  | "launch_new_product"
  | "improve_existing_system"
  | "connect_tools_data"
  | "improve_customer_experience"
  | "improve_marketing_leads"
  | "explore_product_partnership"
  | "still_exploring";

export type SystemType =
  | "website"
  | "mobile_app"
  | "crm"
  | "erp"
  | "cloud_infrastructure"
  | "internal_database"
  | "documents_pdfs"
  | "payment_system"
  | "social_review_platforms"
  | "not_sure";

export type ProjectStage =
  | "idea_exploration"
  | "existing_manual_process"
  | "product_needs_improvement"
  | "growing_scaling_issues"
  | "legacy_modernization"
  | "ready_to_implement";

export type Timeline =
  | "exploring_options"
  | "within_1_3_months"
  | "within_3_6_months"
  | "more_than_6_months"
  | "urgent_blocked";

export type PreferredContact = "email" | "phone" | "either";

export interface ContactDetailsData {
  fullName: string;
  email: string;
  company?: string;
  phone?: string;
  preferredContact?: PreferredContact;
}

export interface DiscoveryFormData extends ContactDetailsData {
  needType?: NeedType;
  businessGoal?: BusinessGoal;
  challenge: string;
  systems: SystemType[];
  currentStage?: ProjectStage;
  timeline?: Timeline;
}

export interface CapabilityCard {
  id: string;
  title: string;
  description: string;
  tags: string[];
  relevanceReason: string;
}

export interface ProjectSummaryResult {
  projectCategory: string;
  problemSummary: string;
  recommendedDirection: string;
  relevantCapabilities: CapabilityCard[];
  followUpQuestions: string[];
  nextStep: string;
  confidence: "Initial" | "Preliminary" | "Directional";
  disclaimer: string;
  estimatedEffortBand?: string;
}

export type SubmissionStatus =
  | "idle"
  | "generating_summary"
  | "summary_ready"
  | "submitting_brief"
  | "brief_submitted"
  | "booking_scheduled"
  | "error";

export interface BookingSlot {
  id: string;
  date: string; // e.g. "Tomorrow, Nov 3"
  time: string; // e.g. "15:00 IST (20 mins)"
  available: boolean;
}

