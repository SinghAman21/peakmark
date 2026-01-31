"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image, ChevronDown } from "lucide-react";
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="relative group"
    >
      {/* Gradient glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent rounded-xl sm:rounded-2xl md:rounded-[2rem] blur-2xl group-hover:blur-3xl transition-all duration-500" />
      
      <div className="relative p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-[2rem] border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-500">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="font-mono font-bold text-base sm:text-lg md:text-xl">Customize Badge</h2>
          <span className="text-[10px] sm:text-xs font-mono text-muted-foreground px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20">Editor</span>
        </div>

        <div className="space-y-6 sm:space-y-8">
        {/* Icon Picker */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Label className="font-mono text-xs sm:text-sm mb-2 sm:mb-3 block font-semibold">Icon</Label>
          <Button
            variant="outline"
            className="w-full justify-between font-mono text-xs sm:text-sm h-10 sm:h-12 rounded-xl bg-secondary/50 hover:bg-secondary border-border/50 hover:border-primary/30 transition-all duration-300"
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
            <motion.div
              animate={{ rotate: iconPickerOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </Button>
          <AnimatePresence>
            {iconPickerOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0, y: -10 }}
                animate={{ height: "auto", opacity: 1, y: 0 }}
                exit={{ height: 0, opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-3 px-3 pb-3 sm:pt-4 sm:px-4 sm:pb-4 mt-2 sm:mt-3 rounded-xl bg-muted/30 border border-border/50">
                  <IconPicker
                    selectedIcon={badge.icon}
                    onSelect={(icon) => updateField("icon", icon)}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Segment Editor */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <SegmentEditor
            segments={currentSegments}
            iconPosition={badge.iconPosition ?? 0}
            hasIcon={!!badge.icon}
            onSegmentsChange={handleSegmentsChange}
            onIconPositionChange={handleIconPositionChange}
          />
        </motion.div>

        {/* Style */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2 sm:space-y-3"
        >
          <Label className="font-mono text-xs sm:text-sm font-semibold">Badge Style</Label>
          <Select value={badge.style} onValueChange={handleStyleChange}>
            <SelectTrigger className="font-mono h-10 sm:h-12 rounded-xl bg-secondary/50 hover:bg-secondary border-border/50 hover:border-primary/30 transition-all duration-300 text-xs sm:text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl">
              <SelectItem value="flat" className="rounded-xl font-mono focus:bg-primary/10 cursor-pointer text-xs sm:text-sm">Flat</SelectItem>
              <SelectItem value="flat-square" className="rounded-xl font-mono focus:bg-primary/10 cursor-pointer text-xs sm:text-sm">Flat Square</SelectItem>
              <SelectItem value="plastic" className="rounded-xl font-mono focus:bg-primary/10 cursor-pointer text-xs sm:text-sm">Plastic</SelectItem>
              <SelectItem value="for-the-badge" className="rounded-xl font-mono focus:bg-primary/10 cursor-pointer text-xs sm:text-sm">For The Badge</SelectItem>
              <SelectItem value="rounded" className="rounded-xl font-mono focus:bg-primary/10 cursor-pointer text-xs sm:text-sm">Rounded (Pill)</SelectItem>
              <SelectItem value="folded" className="rounded-xl font-mono focus:bg-primary/10 cursor-pointer text-xs sm:text-sm">Folded Corner</SelectItem>
            </SelectContent>
          </Select>
          <BadgeStylePresetPanel
            badge={badge}
            style={badge.style}
            onApply={onBadgeChange}
          />
        </motion.div>

        {/* Advanced Settings */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <AdvancedBadgeSettings
            advanced={badge.advanced ?? {}}
            onChange={handleAdvancedChange}
          />
        </motion.div>
      </div>
      </div>
    </motion.div>
  );
};
