"use client";

import type { Badge } from "@/types/badge";
import type { BadgeStyle } from "@/lib/badgeStylePresets";
import { FlatStylePreset } from "./FlatStylePreset";
import { FlatSquareStylePreset } from "./FlatSquareStylePreset";
import { PlasticStylePreset } from "./PlasticStylePreset";
import { ForTheBadgeStylePreset } from "./ForTheBadgeStylePreset";
import { RoundedStylePreset } from "./RoundedStylePreset";
import { FoldedStylePreset } from "./FoldedStylePreset";

export function BadgeStylePresetPanel({
  badge,
  style,
  onApply,
}: {
  badge: Badge;
  style: BadgeStyle;
  onApply: (b: Badge) => void;
}) {
  switch (style) {
    case "flat":
      return <FlatStylePreset badge={badge} onApply={onApply} />;
    case "flat-square":
      return <FlatSquareStylePreset badge={badge} onApply={onApply} />;
    case "plastic":
      return <PlasticStylePreset badge={badge} onApply={onApply} />;
    case "for-the-badge":
      return <ForTheBadgeStylePreset badge={badge} onApply={onApply} />;
    case "rounded":
      return <RoundedStylePreset badge={badge} onApply={onApply} />;
    case "folded":
      return <FoldedStylePreset badge={badge} onApply={onApply} />;
  }
}


