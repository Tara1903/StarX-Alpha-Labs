/**
 * STARX ECOSYSTEM CONTEXTUAL NAVIGATION HELPER
 *
 * STRICT INDEPENDENCE POLICY ENFORCEMENT:
 * - StarX Alpha Labs and STARX FLOW are 100% independent platforms.
 * - Zero shared databases, zero shared auth sessions, zero shared tokens or credentials.
 * - Only non-sensitive referral/campaign query parameters are permitted.
 */

import { SITE_CONFIG } from "./constants";

export interface ReferralParams {
  source?: string;
  medium?: string;
  campaign?: string;
  feature?: "crm" | "ai_receptionist" | "messaging" | "automation" | "general";
}

/**
 * Builds a secure, decoupled external destination link to STARX FLOW.
 * Never passes auth tokens, cookies, customer PII, or internal database keys.
 */
export function getStarxFlowDestinationUrl(params: ReferralParams = {}): string {
  const baseUrl = SITE_CONFIG.ecosystem.starxFlowUrl.replace(/\/$/, "");
  const url = new URL(baseUrl);

  // Set non-sensitive attribution parameters
  url.searchParams.set("utm_source", params.source || "starx_alpha_labs");
  url.searchParams.set("utm_medium", params.medium || "ecosystem_referral");
  if (params.campaign) {
    url.searchParams.set("utm_campaign", params.campaign);
  }
  if (params.feature) {
    url.searchParams.set("ref_feature", params.feature);
  }

  return url.toString();
}
