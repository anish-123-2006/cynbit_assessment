import { z } from "zod";

export const needTypeEnum = z.enum([
  "ai_automation",
  "custom_software",
  "cloud_infrastructure",
  "seo_marketing",
  "product_enquiry",
  "bitelevate_training",
  "not_sure",
]);

export const businessGoalEnum = z.enum([
  "reduce_manual_work",
  "launch_new_product",
  "improve_existing_system",
  "connect_tools_data",
  "improve_customer_experience",
  "improve_marketing_leads",
  "explore_product_partnership",
  "still_exploring",
]);

export const systemTypeEnum = z.enum([
  "website",
  "mobile_app",
  "crm",
  "erp",
  "cloud_infrastructure",
  "internal_database",
  "documents_pdfs",
  "payment_system",
  "social_review_platforms",
  "not_sure",
]);

export const projectStageEnum = z.enum([
  "idea_exploration",
  "existing_manual_process",
  "product_needs_improvement",
  "growing_scaling_issues",
  "legacy_modernization",
  "ready_to_implement",
]);

export const timelineEnum = z.enum([
  "exploring_options",
  "within_1_3_months",
  "within_3_6_months",
  "more_than_6_months",
  "urgent_blocked",
]);

export const contactDetailsSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Please provide your full name (at least 2 characters)." })
    .max(100, { message: "Name is too long." }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid work email address." })
    .max(150, { message: "Email is too long." }),
  company: z.string().trim().max(100).optional().or(z.literal("")),
  phone: z
    .string()
    .trim()
    .max(30)
    .optional()
    .refine(
      (val) => !val || /^[+0-9\s\-()]{7,25}$/.test(val),
      { message: "Please provide a valid phone number (e.g. +91 98765 43210)." }
    )
    .or(z.literal("")),
  preferredContact: z.enum(["email", "phone", "either"]).default("email"),
});

export const discoveryFormSchema = z.object({
  needType: needTypeEnum,
  businessGoal: businessGoalEnum,
  challenge: z
    .string()
    .trim()
    .min(20, {
      message: "Please describe your challenge in at least 20 characters so we can understand the context.",
    })
    .max(2000, {
      message: "Please keep description under 2,000 characters.",
    }),
  systems: z
    .array(systemTypeEnum)
    .min(1, { message: "Please select at least one system, or select 'Not sure'." }),
  currentStage: projectStageEnum,
  timeline: timelineEnum,
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Please enter your full name." }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid work email address." }),
  company: z.string().trim().optional().or(z.literal("")),
  phone: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => !val || /^[+0-9\s\-()]{7,25}$/.test(val),
      { message: "Please provide a valid phone number or leave blank." }
    )
    .or(z.literal("")),
  preferredContact: z.enum(["email", "phone", "either"]).default("email"),
});

export const fallbackContactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Full name is required (at least 2 characters)." }),
  email: z
    .string()
    .trim()
    .email({ message: "A valid email address is required." }),
  company: z.string().trim().optional().or(z.literal("")),
  phone: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => !val || /^[+0-9\s\-()]{7,25}$/.test(val),
      { message: "Invalid phone number format." }
    )
    .or(z.literal("")),
  serviceCategory: z.string().trim().min(1, { message: "Please select a service category." }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Please write at least 10 characters describing your inquiry." })
    .max(2500, { message: "Message cannot exceed 2,500 characters." }),
});

export type FallbackContactData = z.infer<typeof fallbackContactSchema>;

