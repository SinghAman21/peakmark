import { useQuery } from '@tanstack/react-query';
import type { Badge, BadgeSegment } from '@/types/badge';

interface UseBadgeQueryParams {
  style?: Badge['style'];
  segments?: BadgeSegment[];
  icon?: string;
  iconPosition?: number;
  link?: string;
  enabled?: boolean;
}

/**
 * TanStack Query hook to fetch badge SVG from the API
 * 
 * @example
 * ```tsx
 * const { data: svgString, isLoading, error } = useBadgeQuery({
 *   style: 'flat',
 *   segments: [
 *     { text: 'your label', color: '#555555' },
 *     { text: 'your message', color: '#22d3ee' }
 *   ],
 *   icon: 'github',
 *   iconPosition: 0
 * });
 * ```
 */
export function useBadgeQuery(params: UseBadgeQueryParams) {
  const { style = 'flat', segments, icon, iconPosition, link, enabled = true } = params;

  // Build query key
  const queryKey = ['badge', style, segments, icon, iconPosition, link];

  // Build URL with query params
  const buildUrl = () => {
    const url = new URL('/badge', typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
    url.searchParams.set('style', style);
    
    if (segments && segments.length > 0) {
      url.searchParams.set('segments', JSON.stringify(segments));
    }
    
    if (icon) {
      url.searchParams.set('icon', icon);
      url.searchParams.set('iconPosition', String(iconPosition ?? 0));
    }
    
    if (link) {
      url.searchParams.set('link', link);
    }
    
    return url.toString();
  };

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await fetch(buildUrl());
      if (!response.ok) {
        throw new Error(`Failed to fetch badge: ${response.statusText}`);
      }
      return response.text(); // Returns SVG string
    },
    enabled: enabled && !!segments && segments.length > 0,
    staleTime: Infinity, // Badge SVG is immutable based on params
    gcTime: 1000 * 60 * 60, // Keep in cache for 1 hour
  });
}

