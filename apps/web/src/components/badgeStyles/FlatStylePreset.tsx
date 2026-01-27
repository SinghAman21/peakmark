"use client";

import type { Badge } from "@/types/badge";
import { BADGE_STYLE_PRESETS, applyStylePreset } from "@/lib/badgeStylePresets";
import { Button } from "@/components/ui/button";

export function FlatStylePreset({ badge, onApply }: { badge: Badge; onApply: (b: Badge) => void }) {
  const preset = BADGE_STYLE_PRESETS.flat;
  return (
    <div className="rounded-lg border border-border/60 bg-secondary/30 p-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="font-mono text-sm">{preset.label}</div>
          <div className="text-xs text-muted-foreground">{preset.description}</div>
        </div>
        <Button variant="secondary" size="sm" className="font-mono text-xs" onClick={() => onApply(applyStylePreset(badge, "flat"))}>
          Apply preset
        </Button>
      </div>
    </div>
  );
}


