"use client";

import { motion } from "framer-motion";
import {
  Copy,
  Check,
  Code,
  Download,
  Clipboard,
  ClipboardCheck,
} from "lucide-react";
import type { Badge } from "@/types/badge";
import { BadgeSVG } from "@/components/BadgeSVG";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

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
const [urlcopied, seturlcopied] = useState(false);

const handleurlcopy = async () => {
  const badgeUrl = document.querySelector("code")?.textContent || "";
  try {
    await navigator.clipboard.writeText(badgeUrl);
    seturlcopied(true);
    toast({
      title: "URL Copied",
      description: "The badge URL has been copied to your clipboard.",
      duration: 3000,
    });
    setTimeout(() => seturlcopied(false), 2000);
  } catch (err) {
    toast({
      title: "Copy Failed",
      description: "Failed to copy the badge URL. Please try again.",
      duration: 3000,
    });
  }
};
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative group ${sticky ? "lg:sticky lg:top-8" : ""}`}
    >
      {/* Gradient glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-transparent rounded-xl sm:rounded-2xl md:rounded-[2rem] blur-2xl group-hover:blur-3xl transition-all duration-500" />

      <div className="relative p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-[2rem] border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-500">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="font-mono font-bold text-base sm:text-lg md:text-xl flex items-center gap-2">
            <motion.span
              className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-purple-500"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Live Preview
          </h2>
          <span className="text-[10px] sm:text-xs font-mono text-muted-foreground px-2 py-1 rounded-lg bg-muted/50">
            Real-time
          </span>
        </div>

        {/* Badge Preview */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl sm:rounded-2xl p-8 sm:p-10 md:p-12 flex items-center justify-center min-h-[180px] sm:min-h-[220px] md:min-h-[240px] border border-border/50 hover:border-primary/20 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <BadgeSVG badge={badge} scale={3} />
        </motion.div>

        {/* Generated URL */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 sm:mt-6 p-3 sm:p-4 md:p-5 bg-gradient-to-br from-secondary/60 to-secondary/40 rounded-xl sm:rounded-2xl border border-border/50 hover:border-primary/20 transition-all duration-300"
        >
          <Label className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2 sm:mb-3 block flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-primary" />
            Badge URL
            <motion.button onClick={handleurlcopy} className="ml-1 sm:ml-2 inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-mono bg-muted/50 hover:bg-muted/70 border border-border/50 hover:border-primary/30 transition-all duration-300">
              {urlcopied ? (
                <ClipboardCheck className="w-3 h-3 sm:w-4 sm:h-4 ml-1 text-green-500" />
              ) : (
                <Clipboard className="w-3 h-3 sm:w-4 sm:h-4 ml-1 text-muted-foreground" />
              )}
            </motion.button>
          </Label>
          <code className="text-[10px] sm:text-xs font-mono text-primary break-all whitespace-pre-wrap leading-relaxed" suppressHydrationWarning>
            {badgeUrl}
          </code>
        </motion.div>

        {/* Export Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-4 sm:mt-6"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="secondary"
              size="sm"
              className="w-full font-mono text-[10px] sm:text-xs h-9 sm:h-10 rounded-xl bg-secondary/80 hover:bg-secondary border border-border/50 hover:border-primary/30 transition-all duration-300"
              onClick={() => onCopy("svg")}
            >
              {copied === "svg" ? (
                <Check className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5 text-green-500" />
              ) : (
                <Copy className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5" />
              )}
              SVG
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="secondary"
              size="sm"
              className="w-full font-mono text-[10px] sm:text-xs h-9 sm:h-10 rounded-xl bg-secondary/80 hover:bg-secondary border border-border/50 hover:border-primary/30 transition-all duration-300"
              onClick={() => onCopy("md")}
            >
              {copied === "md" ? (
                <Check className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5 text-green-500" />
              ) : (
                <Copy className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5" />
              )}
              <span className="hidden sm:inline">Markdown</span>
              <span className="sm:hidden">MD</span>
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="secondary"
              size="sm"
              className="w-full font-mono text-[10px] sm:text-xs h-9 sm:h-10 rounded-xl bg-secondary/80 hover:bg-secondary border border-border/50 hover:border-primary/30 transition-all duration-300"
              onClick={() => onCopy("html")}
            >
              {copied === "html" ? (
                <Check className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5 text-green-500" />
              ) : (
                <Code className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5" />
              )}
              HTML
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="secondary"
              size="sm"
              className="w-full font-mono text-[10px] sm:text-xs h-9 sm:h-10 rounded-xl bg-secondary/80 hover:bg-secondary border border-border/50 hover:border-primary/30 transition-all duration-300"
              onClick={onDownload}
            >
              <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5" />
              <span className="hidden sm:inline">Download</span>
              <span className="sm:hidden">DL</span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
