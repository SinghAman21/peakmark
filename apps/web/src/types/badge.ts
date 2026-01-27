export interface SegmentPadding {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

export interface BadgeSegment {
  /**
   * Stable identifier used by the editor UI (drag/reorder, expand/collapse).
   * Optional to keep backwards compatibility with existing serialized segments.
   */
  id?: string;
  text: string;
  color: string;
  padding?: SegmentPadding; // Padding in pixels for each direction
}

export type BadgeSize = 'sm' | 'md' | 'lg' | 'xl';

export interface BadgeAdvancedOptions {
  size?: BadgeSize; // sm, md, lg, xl presets
  scale?: number; // Custom scale factor (overrides size preset)
  opacity?: number; // 0-1
  border?: number; // Border thickness in px
  borderColor?: string; // Border color
  shadow?: number; // Drop shadow intensity (0-20)
  shadowAngle?: number; // Shadow angle direction (0-360 degrees)
  glow?: number; // Glow effect intensity (0-30)
  rotate?: number; // Rotation in degrees
  txtsize?: number; // Text size multiplier (0.5-2)
}

export interface Badge {
  id: string;
  label: string;
  message: string;
  labelColor: string;
  messageColor: string;
  style: 'flat' | 'flat-square' | 'plastic' | 'for-the-badge' | 'rounded' | 'folded';
  icon?: string;
  iconPosition?: number; // 0-based index of segment where icon appears (default: 0)
  category: 'build' | 'version' | 'social' | 'skill' | 'custom';
  // Multi-segment support (optional - uses label/message as fallback)
  segments?: BadgeSegment[];
  link?: string; // URL to redirect when badge is clicked
  // Advanced visual options
  advanced?: BadgeAdvancedOptions;
}

// Size preset configurations
export const BADGE_SIZE_PRESETS: Record<BadgeSize, { scale: number; label: string }> = {
  sm: { scale: 0.85, label: 'Small' },
  md: { scale: 1, label: 'Medium' },
  lg: { scale: 1.25, label: 'Large' },
  xl: { scale: 1.5, label: 'Extra Large' },
};

export interface BadgeParams {
  label?: string;
  message?: string;
  labelColor?: string;
  messageColor?: string;
  style?: Badge['style'];
  icon?: string;
  iconPosition?: number;
  segments?: string; // JSON encoded segments for URL
}

export const BADGE_COLORS = {
  // Neon colors
  cyan: '#22d3ee',
  teal: '#2dd4bf',
  emerald: '#34d399',
  lime: '#a3e635',
  
  // Status colors
  success: '#22c55e',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',
  
  // Neutrals
  slate: '#1e293b',
  night: '#0f172a',
  zinc: '#27272a',
  stone: '#292524',
  
  // Brand colors
  purple: '#a855f7',
  pink: '#ec4899',
  rose: '#f43f5e',
  orange: '#f97316',
  
  // Classic
  brightgreen: '#44cc11',
  green: '#97ca00',
  yellow: '#dfb317',
  yellowgreen: '#a4a61d',
  blue: '#007ec6',
  lightgrey: '#9f9f9f',
  grey: '#555555',
} as const;

export type BadgeColorKey = keyof typeof BADGE_COLORS;

// Helper to get segments from a badge (handles legacy label/message format)
export const getBadgeSegments = (badge: Badge): BadgeSegment[] => {
  if (badge.segments && badge.segments.length > 0) {
    return badge.segments;
  }
  // Fallback to legacy format
  return [
    { text: badge.label, color: badge.labelColor },
    { text: badge.message, color: badge.messageColor },
  ];
};
