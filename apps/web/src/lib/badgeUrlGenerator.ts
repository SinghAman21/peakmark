import type { Badge } from "@/types/badge";
import { getBadgeSegments } from "@/types/badge";

// Default production URL for badge generation
const DEFAULT_BADGE_URL = "https://peakmark.vercel.app";

/**
 * Generates a complete badge URL with all configuration parameters
 * @param badge - The badge configuration
 * @param baseUrl - Optional base URL (defaults to production URL for shareable badges)
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

  // Use provided baseUrl, or default to production URL for shareable badges
  const base = baseUrl ?? DEFAULT_BADGE_URL;
  return `${base}/api/badge?${params.toString()}`;
};

/**
 * Creates a shareable markdown badge link
 * @param badge - The badge configuration
 * @param baseUrl - Optional base URL
 * @returns Markdown format: [![alt text](url)](link)
 */
export const generateMarkdownBadge = (badge: Badge, baseUrl?: string): string => {
  const badgeUrl = generateBadgeUrl(badge, baseUrl);
  const linkUrl = badge.link || badgeUrl;
  const segments = getBadgeSegments(badge);
  const altText = segments.map(s => s.text).join(' - ');
  return `[![${altText}](${badgeUrl})](${linkUrl})`;
};

/**
 * Creates an HTML img tag for the badge
 * @param badge - The badge configuration
 * @param baseUrl - Optional base URL
 * @returns HTML img tag
 */
export const generateHtmlBadge = (badge: Badge, baseUrl?: string): string => {
  const badgeUrl = generateBadgeUrl(badge, baseUrl);
  const segments = getBadgeSegments(badge);
  const altText = segments.map(s => s.text).join(' - ');
  return `<img src="${badgeUrl}" alt="${altText}" />`;
};
