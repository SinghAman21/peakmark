"use client";

import { motion } from "framer-motion";
import { Copy, Check, Code, Download } from "lucide-react";
import type { Badge } from "@/types/badge";
import { BadgeSVG } from "@/components/BadgeSVG";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface PreviewPanelProps {
  badge: Badge;
  badgeUrl: string;
  copied: string | null;
  onCopy: (type: "svg" | "md" | "html") => Promise<void>;
  onDownload: () => void;
  sticky?: boolean;
}

/**
 * SharedPreviewPanel - Production-ready preview and export component
 * Displays badge preview, URL, and export options
 */
export const PreviewPanel = ({
  badge,
  badgeUrl,
  copied,
  onCopy,
  onDownload,
  sticky = false,
}: PreviewPanelProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`glass-panel p-6 rounded-xl ${sticky ? "lg:sticky lg:top-8" : ""}`}
    >
      <h2 className="font-mono font-semibold text-lg mb-6 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
        Live Preview
      </h2>

      {/* Badge Preview */}
      <div className="bg-muted/30 rounded-lg p-8 flex items-center justify-center min-h-[200px] border border-border/50">
        <BadgeSVG badge={badge} scale={3} />
      </div>

      {/* Generated URL */}
      <div className="mt-6 p-4 bg-secondary/50 rounded-lg border border-border/50">
        <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
          Badge URL
        </Label>
        <code className="text-xs font-mono text-primary break-all whitespace-pre-wrap">
          {badgeUrl}
        </code>
      </div>

      {/* Export Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-6">
        <Button
          variant="secondary"
          size="sm"
          className="font-mono text-xs"
          onClick={() => onCopy("svg")}
        >
          {copied === "svg" ? (
            <Check className="w-3 h-3 mr-1" />
          ) : (
            <Copy className="w-3 h-3 mr-1" />
          )}
          SVG
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="font-mono text-xs"
          onClick={() => onCopy("md")}
        >
          {copied === "md" ? (
            <Check className="w-3 h-3 mr-1" />
          ) : (
            <Copy className="w-3 h-3 mr-1" />
          )}
          Markdown
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="font-mono text-xs"
          onClick={() => onCopy("html")}
        >
          {copied === "html" ? (
            <Check className="w-3 h-3 mr-1" />
          ) : (
            <Code className="w-3 h-3 mr-1" />
          )}
          HTML
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="font-mono text-xs"
          onClick={onDownload}
        >
          <Download className="w-3 h-3 mr-1" />
          Download
        </Button>
      </div>
    </motion.div>
  );
};
