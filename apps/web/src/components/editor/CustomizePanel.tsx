"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image } from "lucide-react";
import type { Badge, BadgeSegment, BadgeAdvancedOptions } from "@/types/badge";
import { getBadgeSegments } from "@/types/badge";
import { IconPicker } from "@/components/IconPicker";
import { SegmentEditor } from "@/components/SegmentEditor";
import { AdvancedBadgeSettings } from "@/components/AdvancedBadgeSettings";
import {
  BADGE_ICONS,
  SIMPLE_ICON_PATHS,
  LUCIDE_ICON_PATHS,
} from "@/data/badgeIcons";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { applyStylePreset } from "@/lib/badgeStylePresets";
import { BadgeStylePresetPanel } from "@/components/badgeStyles/BadgeStylePresetPanel";

interface CustomizePanelProps {
  badge: Badge;
  onBadgeChange: (badge: Badge) => void;
}

/**
 * Helper to render icon preview
 */
const renderSelectedIcon = (iconSlug?: string) => {
  if (!iconSlug) return null;

  const iconDef = BADGE_ICONS.find((i) => i.slug === iconSlug);
  if (!iconDef) return null;

  const path =
    iconDef.type === "simple"
      ? SIMPLE_ICON_PATHS[iconSlug]
      : LUCIDE_ICON_PATHS[iconSlug];
  if (!path) return null;

  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4">
      {iconDef.type === "simple" ? (
        <path d={path} fill="currentColor" />
      ) : (
        <path
          d={path}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
};

/**
 * SharedCustomizePanel - Production-ready customization component
 * Handles icon selection, segments, style, and advanced settings
 */
export const CustomizePanel = ({
  badge,
  onBadgeChange,
}: CustomizePanelProps) => {
  const [iconPickerOpen, setIconPickerOpen] = useState(false);

  const updateField = <K extends keyof Badge>(field: K, value: Badge[K]) => {
    const updated = { ...badge, [field]: value };
    // Auto-set iconPosition to 0 when an icon is selected
    if (
      field === "icon" &&
      value &&
      (badge.iconPosition === undefined || badge.iconPosition < 0)
    ) {
      updated.iconPosition = 0;
    }
    onBadgeChange(updated);
  };

  const handleSegmentsChange = (segments: BadgeSegment[]) => {
    const updated = {
      ...badge,
      segments,
      label: segments[0]?.text ?? "",
      message: segments[1]?.text ?? "",
      labelColor: segments[0]?.color ?? "#555555",
      messageColor: segments[1]?.color ?? "#22d3ee",
    };
    onBadgeChange(updated);
  };

  const handleIconPositionChange = (position: number) => {
    const updated = {
      ...badge,
      iconPosition: position >= 0 ? position : 0,
    };
    onBadgeChange(updated);
  };

  const handleAdvancedChange = (advanced: BadgeAdvancedOptions) => {
    const updated = { ...badge, advanced };
    onBadgeChange(updated);
  };

  const handleStyleChange = (style: Badge["style"] | null) => {
    if (!style) return;
    const updated = applyStylePreset(badge, style);
    onBadgeChange(updated);
  };

  const currentSegments = badge.segments ?? getBadgeSegments(badge);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-panel p-6 rounded-xl"
    >
      <h2 className="font-mono font-semibold text-lg mb-6">Customize Badge</h2>

      <div className="space-y-6">
        {/* Icon Picker */}
        <div>
          <Button
            variant="outline"
            className="w-full justify-between font-mono text-sm"
            onClick={() => setIconPickerOpen(!iconPickerOpen)}
          >
            <span className="flex items-center gap-2">
              {badge.icon ? (
                <>
                  {renderSelectedIcon(badge.icon)}
                  <span className="capitalize">{badge.icon}</span>
                </>
              ) : (
                <>
                  {/* eslint-disable-next-line jsx-a11y/alt-text */}
                  <Image className="w-4 h-4" />
                  Add Icon
                </>
              )}
            </span>
            <motion.span
              animate={{ rotate: iconPickerOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              ▼
            </motion.span>
          </Button>
          <AnimatePresence>
            {iconPickerOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pt-3">
                  <IconPicker
                    selectedIcon={badge.icon}
                    onSelect={(icon) => updateField("icon", icon)}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Segment Editor */}
        <SegmentEditor
          segments={currentSegments}
          iconPosition={badge.iconPosition ?? 0}
          hasIcon={!!badge.icon}
          onSegmentsChange={handleSegmentsChange}
          onIconPositionChange={handleIconPositionChange}
        />

        {/* Style */}
        <div className="space-y-2">
          <Label className="font-mono text-sm">Badge Style</Label>
          <Select value={badge.style} onValueChange={handleStyleChange}>
            <SelectTrigger className="font-mono bg-secondary/50 border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="flat">Flat</SelectItem>
              <SelectItem value="flat-square">Flat Square</SelectItem>
              <SelectItem value="plastic">Plastic</SelectItem>
              <SelectItem value="for-the-badge">For The Badge</SelectItem>
              <SelectItem value="rounded">Rounded (Pill)</SelectItem>
              <SelectItem value="folded">Folded Corner</SelectItem>
            </SelectContent>
          </Select>
          <BadgeStylePresetPanel
            badge={badge}
            style={badge.style}
            onApply={onBadgeChange}
          />
        </div>

        {/* Advanced Settings */}
        <AdvancedBadgeSettings
          advanced={badge.advanced ?? {}}
          onChange={handleAdvancedChange}
        />
      </div>
    </motion.div>
  );
};
