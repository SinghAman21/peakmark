"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Pencil, Code, FileCode, FileText } from 'lucide-react';
import type { Badge } from '@/types/badge';
import { BadgeSVG, generateBadgeSVGString } from './BadgeSVG';
import { toast } from '@/hooks/use-toast';

interface BadgeCardProps {
  badge: Badge;
  onRemix: (badge: Badge, cardRect: DOMRect) => void;
}

export const BadgeCard = ({ badge, onRemix }: BadgeCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleRemix = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      onRemix(badge, rect);
    }
  };

  const handleCopy = async (type: 'svg' | 'md' | 'html', e: React.MouseEvent) => {
    e.stopPropagation();
    const svgString = generateBadgeSVGString(badge);
    let content = '';
    
    switch (type) {
      case 'svg':
        content = svgString;
        break;
      case 'md':
        content = `![${badge.label}: ${badge.message}](data:image/svg+xml;base64,${btoa(svgString)})`;
        break;
      case 'html':
        content = `<img src="data:image/svg+xml;base64,${btoa(svgString)}" alt="${badge.label}: ${badge.message}" />`;
        break;
    }
    
    await navigator.clipboard.writeText(content);
    setCopiedType(type);
    toast({
      title: 'Copied!',
      description: `${type.toUpperCase()} copied to clipboard`,
    });
    
    setTimeout(() => setCopiedType(null), 2000);
  };

  const getGlowColor = () => {
    const color = badge.messageColor.toLowerCase();
    if (color.includes('22c55e') || color.includes('34d399')) return 'rgba(34, 197, 94, 0.4)';
    if (color.includes('f59e0b') || color.includes('dfb317')) return 'rgba(245, 158, 11, 0.4)';
    if (color.includes('3b82f6') || color.includes('22d3ee')) return 'rgba(59, 130, 246, 0.4)';
    if (color.includes('ef4444') || color.includes('f87171')) return 'rgba(239, 68, 68, 0.4)';
    return 'rgba(168, 85, 247, 0.4)';
  };

  const copyButtonVariants = {
    initial: { scale: 0, opacity: 0, y: 10 },
    animate: (i: number) => ({
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 500,
        damping: 25,
        delay: i * 0.05,
      },
    }),
    exit: { scale: 0, opacity: 0, transition: { duration: 0.15 } },
    tap: { scale: 0.9 },
    hover: { scale: 1.1, y: -2 },
  };

  const remixButtonVariants = {
    initial: { scale: 0, opacity: 0, rotate: -180 },
    animate: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: { type: 'spring' as const, stiffness: 400, damping: 20, delay: 0.1 },
    },
    exit: { scale: 0, opacity: 0, rotate: 180, transition: { duration: 0.2 } },
    hover: { scale: 1.15, rotate: 15 },
    tap: { scale: 0.9 },
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <motion.div
        className="glass-panel p-4 sm:p-5 rounded-xl relative overflow-hidden"
        animate={{
          boxShadow: isHovered
            ? `0 0 30px ${getGlowColor()}, 0 0 60px ${getGlowColor()}`
            : '0 0 0 rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated background gradient on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Badge Preview */}
        <motion.div
          className="flex items-center justify-center py-4 sm:py-6 relative z-10"
          animate={{ y: isHovered ? -8 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <BadgeSVG badge={badge} scale={1.5} />
        </motion.div>

        {/* Remix Button - Top Right Corner */}
        <AnimatePresence>
          {isHovered && (
            <motion.button
              className="absolute cursor-pointer top-2 right-2 sm:top-3 sm:right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg z-20"
              variants={remixButtonVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              whileHover="hover"
              whileTap="tap"
              onClick={handleRemix}
            >
              <Pencil className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Copy Buttons - Bottom Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 flex justify-center gap-1.5 sm:gap-2 pb-3 sm:pb-4 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[
                { type: 'svg' as const, icon: Code, label: 'SVG' },
                { type: 'md' as const, icon: FileText, label: 'MD' },
                { type: 'html' as const, icon: FileCode, label: 'HTML' },
              ].map((item, i) => (
                <motion.button
                  key={item.type}
                  className={`
                    flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-mono font-medium
                    backdrop-blur-md border transition-colors cursor-pointer
                    ${copiedType === item.type 
                      ? 'bg-primary/20 border-primary/50 text-primary' 
                      : 'bg-background/80 border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30'
                    }
                  `}
                  variants={copyButtonVariants}
                  custom={i}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={(e) => handleCopy(item.type, e)}
                >
                  <motion.span
                    initial={false}
                    animate={{ rotate: copiedType === item.type ? 360 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {copiedType === item.type ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <item.icon className="w-3 h-3" />
                    )}
                  </motion.span>
                  <span className="hidden sm:inline">{item.label}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
