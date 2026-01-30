import type { Badge, BadgeAdvancedOptions } from '@/types/badge';

export type BadgeStyle = Badge['style'];

type StylePreset = {
  label: string;
  description: string;
  advanced: BadgeAdvancedOptions;
};

const BASE_ADVANCED: BadgeAdvancedOptions = {
  size: 'md',
  scale: 1,
  opacity: 1,
  border: 0,
  borderColor: '#ffffff',
  borderRadius: undefined,
  shadow: 0,
  shadowAngle: 0,
  glow: 0,
  rotate: 0,
  txtsize: 1,
};

export const BADGE_STYLE_PRESETS: Record<BadgeStyle, StylePreset> = {
  flat: {
    label: 'Flat',
    description: 'Clean, minimal, and lightweight.',
    advanced: { ...BASE_ADVANCED },
  },
  'flat-square': {
    label: 'Flat Square',
    description: 'Flat style with sharp corners.',
    advanced: { ...BASE_ADVANCED },
  },
  plastic: {
    label: 'Plastic',
    description: 'Slight shine; looks great with a bit of depth.',
    advanced: { ...BASE_ADVANCED, shadow: 2 },
  },
  'for-the-badge': {
    label: 'For The Badge',
    description: 'Bold, uppercase, and taller.',
    advanced: { ...BASE_ADVANCED, txtsize: 0.95 },
  },
  rounded: {
    label: 'Rounded (Pill)',
    description: 'Pill corners; works well for “status” badges.',
    advanced: { ...BASE_ADVANCED, borderRadius: 10 },
  },
  folded: {
    label: 'Folded Corner',
    description: 'Folded corner accent; pairs well with subtle shadow.',
    advanced: { ...BASE_ADVANCED, shadow: 3 },
  },
};

export function applyStylePreset(badge: Badge, style: BadgeStyle): Badge {
  const preset = BADGE_STYLE_PRESETS[style];
  const nextAdvanced: BadgeAdvancedOptions = { ...(badge.advanced ?? {}), ...preset.advanced };

  return {
    ...badge,
    style,
    advanced: nextAdvanced,
  };
}


