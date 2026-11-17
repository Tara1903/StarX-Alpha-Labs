/**
 * Stitch Artifact Normalizer, Spec Parser & CSS Variable Generator
 * StarX Alpha Labs — Design Studio Ecosystem
 */

import type {
  StitchProject,
  StitchDesignTheme,
  DesignArtifact,
  StitchDeviceType,
} from "./types";

export interface ParsedDesignSpecSection {
  id: string;
  title: string;
  content: string;
}

export interface ParsedDesignMd {
  frontmatter: Record<string, any>;
  sections: ParsedDesignSpecSection[];
  rawMarkdown: string;
}

/**
 * Parses raw Stitch Design.md markdown into frontmatter and distinct sections.
 */
export function parseStitchDesignMd(rawMarkdown?: string): ParsedDesignMd {
  if (!rawMarkdown || typeof rawMarkdown !== "string") {
    return {
      frontmatter: {},
      sections: [],
      rawMarkdown: "",
    };
  }

  let frontmatter: Record<string, any> = {};
  let body = rawMarkdown;

  // Extract YAML frontmatter if present
  if (rawMarkdown.startsWith("---")) {
    const endIdx = rawMarkdown.indexOf("---", 3);
    if (endIdx !== -1) {
      const yamlStr = rawMarkdown.slice(3, endIdx).trim();
      body = rawMarkdown.slice(endIdx + 3).trim();

      // Simple key-value extraction for essential frontmatter fields
      const lines = yamlStr.split("\n");
      let currentKey = "";
      lines.forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) return;
        const colonIdx = trimmed.indexOf(":");
        if (colonIdx > 0 && !line.startsWith(" ")) {
          currentKey = trimmed.slice(0, colonIdx).trim();
          const val = trimmed.slice(colonIdx + 1).trim().replace(/^['"]|['"]$/g, "");
          frontmatter[currentKey] = val || {};
        }
      });
    }
  }

  // Split into Markdown H2 sections (## Section Title)
  const rawSections = body.split(/\n(?=##\s+)/g);
  const sections: ParsedDesignSpecSection[] = [];

  rawSections.forEach((sectionBlock, i) => {
    const trimmed = sectionBlock.trim();
    if (!trimmed) return;

    const firstLineEnd = trimmed.indexOf("\n");
    let headerLine = firstLineEnd !== -1 ? trimmed.slice(0, firstLineEnd) : trimmed;
    let content = firstLineEnd !== -1 ? trimmed.slice(firstLineEnd).trim() : "";

    const cleanTitle = headerLine.replace(/^#+\s*/, "").trim();
    const id = cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-") || `section-${i + 1}`;

    sections.push({
      id,
      title: cleanTitle,
      content,
    });
  });

  return {
    frontmatter,
    sections,
    rawMarkdown,
  };
}

/**
 * Extracts a coherent color palette (5 core hex colors) from a Stitch theme.
 */
export function extractPaletteFromTheme(theme?: StitchDesignTheme): string[] {
  if (!theme?.namedColors) {
    return ["#030B24", "#071638", "#00D9FF", "#087BFF", "#10B981"];
  }

  const nc = theme.namedColors;
  const picked: string[] = [];

  if (nc.primary) picked.push(nc.primary);
  if (nc.primary_container && nc.primary_container !== nc.primary) picked.push(nc.primary_container);
  if (nc.tertiary) picked.push(nc.tertiary);
  if (nc.secondary) picked.push(nc.secondary);
  if (nc.surface_container_highest) picked.push(nc.surface_container_highest);
  if (nc.surface) picked.push(nc.surface);

  // Return unique colors, capped at 5
  const unique = Array.from(new Set(picked));
  return unique.length >= 3 ? unique.slice(0, 5) : ["#030B24", "#071638", "#00D9FF", "#087BFF", "#10B981"];
}

/**
 * Converts a raw StitchProject into a production-grade StarX DesignArtifact.
 */
export function convertStitchProjectToArtifact(
  project: StitchProject,
  projectId: string,
  options?: {
    jobId?: string;
    versionNumber?: number;
    keyFeatures?: string[];
  }
): DesignArtifact {
  const palette = extractPaletteFromTheme(project.designTheme);
  const deviceType: StitchDeviceType = project.deviceType || "DESKTOP";

  return {
    id: `art-${project.name.replace(/[^a-zA-Z0-9]/g, "-")}-${options?.versionNumber || 1}`,
    projectId,
    jobId: options?.jobId,
    versionNumber: options?.versionNumber || 1,
    provider: "stitch",
    providerProjectId: project.name,
    title: project.title,
    styleName: project.designTheme?.colorMode === "DARK" ? "Cosmic Liquid Glass" : "Executive Modern",
    deviceType,
    designTheme: project.designTheme || {},
    designMd: project.designMd || "",
    thumbnailUrl: project.thumbnailScreenshot?.downloadUrl || "",
    palette,
    keyFeatures: options?.keyFeatures || [
      "Material You Dynamic Color Architecture",
      "High-Density 12-Column Responsive Layout",
      "Specular Glassmorphism & Micro-Typography",
    ],
    isApproved: false,
    createdAt: new Date().toISOString(),
  };
}

/**
 * Generates an inline style object or CSS custom properties from Stitch namedColors.
 */
export function getStitchCssVariables(theme?: StitchDesignTheme): Record<string, string> {
  const vars: Record<string, string> = {};
  if (!theme?.namedColors) return vars;

  Object.entries(theme.namedColors).forEach(([key, val]) => {
    if (val && typeof val === "string") {
      vars[`--stitch-${key.replace(/_/g, "-")}`] = val;
    }
  });

  return vars;
}
