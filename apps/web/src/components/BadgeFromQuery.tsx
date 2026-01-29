"use client";

import { useBadgeQuery } from '@/hooks/use-badge-query';
import type { BadgeSegment } from '@/types/badge';

interface BadgeFromQueryProps {
  style?: 'flat' | 'flat-square' | 'plastic' | 'for-the-badge' | 'rounded' | 'folded';
  segments: BadgeSegment[];
  icon?: string;
  iconPosition?: number;
  link?: string;
}

/**
 * Example component showing how to use useBadgeQuery hook
 * 
 * @example
 * ```tsx
 * <BadgeFromQuery
 *   style="flat"
 *   segments={[
 *     { text: 'your label', color: '#555555' },
 *     { text: 'your message', color: '#22d3ee' }
 *   ]}
 *   icon="github"
 *   iconPosition={0}
 * />
 * ```
 */
export function BadgeFromQuery({ 
  style = 'flat', 
  segments, 
  icon, 
  iconPosition = 0,
  link 
}: BadgeFromQueryProps) {
  const { data: svgString, isLoading, error } = useBadgeQuery({
    style,
    segments,
    icon,
    iconPosition,
    link,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="text-sm text-muted-foreground">Loading badge...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="text-sm text-destructive">Error: {error.message}</div>
      </div>
    );
  }

  if (!svgString) {
    return null;
  }

  // Render SVG directly from string
  return (
    <div 
      className="inline-block"
      dangerouslySetInnerHTML={{ __html: svgString }}
    />
  );
}

