import type { Badge } from "@/types/badge";
import { getBadgeSegments } from "@/types/badge";

/**
 * Generates a complete badge URL with all configuration parameters
 * @param badge - The badge configuration
 * @param baseUrl - Optional base URL (defaults to window.location.origin)
 * @returns Complete badge URL with query parameters
 */
export const generateBadgeUrl = (badge: Badge, baseUrl?: string): string => {
  const segments = getBadgeSegments(badge);
  const params = new URLSearchParams({
    style: badge.style,
  });

  params.set("segments", JSON.stringify(segments));
  
  // Add paddingleft parameter - use the first segment's paddingLeft or default to 5
  const paddlingLeft = segments[0]?.paddingLeft ?? 5;
  params.set("paddingleft", String(paddlingLeft));

  if (badge.advanced) {
    params.set("advanced", JSON.stringify(badge.advanced));
  }

  if (badge.icon) {
    params.set("icon", badge.icon);
    params.set("iconPosition", String(badge.iconPosition ?? 0));
  }

  if (badge.link) {
    params.set("link", badge.link);
  }

  const base = baseUrl ?? (typeof window !== "undefined" ? window.location.origin : "");
  return `${base}/badge?${params.toString()}`;
};

/**
 * Creates a shareable markdown badge link
 * @param badge - The badge configuration
 * @param baseUrl - Optional base URL
 * @returns Markdown format: [![label: message](url)](link)
 */
export const generateMarkdownBadge = (badge: Badge, baseUrl?: string): string => {
  const badgeUrl = generateBadgeUrl(badge, baseUrl);
  const linkUrl = badge.link || badgeUrl;
  return `[![${badge.label}: ${badge.message}](${badgeUrl})](${linkUrl})`;
};

/**
 * Creates an HTML img tag for the badge
 * @param badge - The badge configuration
 * @param baseUrl - Optional base URL
 * @returns HTML img tag
 */
export const generateHtmlBadge = (badge: Badge, baseUrl?: string): string => {
  const badgeUrl = generateBadgeUrl(badge, baseUrl);
  return `<img src="${badgeUrl}" alt="${badge.label}: ${badge.message}" />`;
};
