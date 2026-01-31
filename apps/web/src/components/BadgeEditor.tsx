"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Badge } from "@/types/badge";
import { getBadgeSegments } from "@/types/badge";
import {
  generateBadgeSVGString,
  generateBadgeTSXComponent,
} from "./BadgeSVG";
import { PreviewPanel } from "@/components/editor/PreviewPanel";
import { CustomizePanel } from "@/components/editor/CustomizePanel";
import { generateBadgeUrl } from "@/lib/badgeUrlGenerator";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface BadgeEditorProps {
  badge: Badge | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (badge: Badge) => void;
}

/**
 * Debounce hook - delays state updates to avoid excessive re-renders
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * BadgeEditor - Modal overlay for remixing/editing badges
 * Reuses PreviewPanel and CustomizePanel for consistency with main editor
 */
export const BadgeEditor = ({
  badge,
  isOpen,
  onClose,
  onUpdate,
}: BadgeEditorProps) => {
  const [editedBadge, setEditedBadge] = useState<Badge | null>(badge);
  const [copied, setCopied] = useState<string | null>(null);
  const [animationPhase, setAnimationPhase] = useState<"float" | "editor">(
    "float"
  );

  const debouncedBadge = useDebounce(editedBadge, 300);

  // Initialize with badge data
  useEffect(() => {
    if (badge) {
      const segments = getBadgeSegments(badge);
      setEditedBadge({
        ...badge,
        segments,
        iconPosition: badge.iconPosition ?? 0,
        advanced: badge.advanced ?? {
          size: "md",
          scale: 1,
          opacity: 1,
          border: 0,
          borderColor: "#ffffff",
          shadow: 0,
          shadowAngle: 135,
          glow: 0,
          rotate: 0,
          txtsize: 1,
        },
      });
    }
  }, [badge]);

  // Debounced propagation to parent
  useEffect(() => {
    if (!isOpen) return;
    if (!debouncedBadge) return;
    onUpdate(debouncedBadge);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedBadge, isOpen]);

  // Trigger animation phases
  useEffect(() => {
    if (isOpen) {
      setAnimationPhase("float");
      const timer = setTimeout(() => setAnimationPhase("editor"), 400);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopy = useCallback(
    async (type: "svg" | "md" | "html") => {
      if (!editedBadge) return;

      let content = "";
      const svgTsxComponent = generateBadgeTSXComponent(editedBadge);

      // Generate alt text from segments
      const segments = editedBadge.segments && editedBadge.segments.length > 0 
        ? editedBadge.segments 
        : [{ text: editedBadge.label, color: editedBadge.labelColor }, { text: editedBadge.message, color: editedBadge.messageColor }];
      const altText = segments.map(s => s.text).join(' - ');

      switch (type) {
        case "svg":
          content = svgTsxComponent;
          break;
        case "md":
          const badgeUrl = generateBadgeUrl(editedBadge);
          const linkUrl = editedBadge.link || badgeUrl;
          content = `[![${altText}](${badgeUrl})](${linkUrl})`;
          break;
        case "html":
          content = `<img src="${generateBadgeUrl(editedBadge)}" alt="${altText}" />`;
          break;
      }

      await navigator.clipboard.writeText(content);
      setCopied(type);
      toast({
        title: "Copied!",
        description: `${type.toUpperCase()} copied to clipboard`,
      });
      setTimeout(() => setCopied(null), 2000);
    },
    [editedBadge]
  );

  const handleDownload = useCallback(() => {
    if (!editedBadge) return;
    const svgString = generateBadgeSVGString(editedBadge);
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${editedBadge.label}-${editedBadge.message}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "Downloaded!", description: "Badge SVG saved" });
  }, [editedBadge]);

  if (!isOpen || !editedBadge) return null;

  return (
    <>
      {/* Blurred backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-background/90 backdrop-blur-xl z-40"
        onClick={onClose}
      />

      {/* Full-screen Editor Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={
          animationPhase === "editor"
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.95 }
        }
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      >
        <div className="w-full max-w-6xl max-h-[90vh] overflow-hidden">
          {/* Close button */}
          <div className="flex justify-end mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-secondary"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-h-[calc(90vh-60px)] overflow-y-auto items-start">
            {/* Reusable Preview Panel */}
            <PreviewPanel
              badge={editedBadge}
              badgeUrl={generateBadgeUrl(editedBadge)}
              copied={copied}
              onCopy={handleCopy}
              onDownload={handleDownload}
            />

            {/* Reusable Customize Panel */}
            <CustomizePanel
              badge={editedBadge}
              onBadgeChange={setEditedBadge}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};
