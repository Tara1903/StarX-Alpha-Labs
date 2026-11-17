import { z } from "zod";

export const StitchDeviceTypeSchema = z.enum(["DESKTOP", "MOBILE", "TABLET"]);
export const StitchModelIdSchema = z.enum(["GEMINI_3_8_FLASH", "GEMINI_3_5_FLASH_LITE", "DEFAULT"]);
export const ThemePreferenceSchema = z.enum(["cosmic-dark", "executive-light", "high-contrast-neon"]);

export const DesignBriefInputSchema = z.object({
  industrySlug: z.string().min(1, "Industry is required"),
  industryName: z.string().min(1, "Industry name is required"),
  divisionSlug: z.string().min(1, "Division is required"),
  divisionName: z.string().min(1, "Division name is required"),
  projectName: z.string().min(2, "Project name must be at least 2 characters").max(100),
  description: z.string().min(5, "Please provide a brief problem description").max(2000),
  platformTargets: z.array(z.string()).min(1, "Select at least one platform target"),
  selectedFeatures: z.array(z.string()).min(1, "Select at least one feature"),
  themePreference: ThemePreferenceSchema.default("cosmic-dark"),
  deviceTarget: StitchDeviceTypeSchema.default("DESKTOP"),
  modelPreference: StitchModelIdSchema.default("GEMINI_3_8_FLASH"),
  specialInstructions: z.string().max(1000).optional(),
});

export const CreateDesignProjectSchema = z.object({
  brief: DesignBriefInputSchema,
  contact: z
    .object({
      name: z.string().optional(),
      email: z.string().email("Invalid email").optional().or(z.literal("")),
      phone: z.string().optional(),
      organizationId: z.string().optional(),
      customerId: z.string().optional(),
      sessionId: z.string().optional(),
    })
    .optional(),
  sessionId: z.string().optional(),
  organizationId: z.string().optional(),
});

export const TriggerGenerationSchema = z.object({
  projectId: z.string().min(1, "Project ID is required"),
  modelId: StitchModelIdSchema.default("GEMINI_3_8_FLASH"),
  deviceType: StitchDeviceTypeSchema.default("DESKTOP"),
  customPrompt: z.string().optional(),
  previewOnly: z.boolean().optional(),
});

export const CreateRevisionSchema = z.object({
  projectId: z.string().min(1, "Project ID is required"),
  artifactId: z.string().min(1, "Artifact ID is required"),
  notes: z.string().min(3, "Revision notes must be at least 3 characters").max(1000),
  triggerRegeneration: z.boolean().default(true),
  modelId: StitchModelIdSchema.optional(),
  deviceType: StitchDeviceTypeSchema.optional(),
});

export const ApproveDesignSchema = z.object({
  projectId: z.string().min(1, "Project ID is required"),
  artifactId: z.string().min(1, "Artifact ID is required"),
  contactName: z.string().min(2, "Full name is required"),
  contactEmail: z.string().email("Valid email required"),
  contactPhone: z.string().min(6, "Valid phone or WhatsApp required"),
  notes: z.string().optional(),
});
