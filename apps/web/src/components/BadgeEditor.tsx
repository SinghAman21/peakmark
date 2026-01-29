"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X, Copy, Check, Link, Download, Image } from 'lucide-react';
import type { Badge, BadgeSegment } from '@/types/badge';
import type { BadgeAdvancedOptions } from '@/types/badge';
import { getBadgeSegments } from '@/types/badge';
import { BadgeSVG, generateBadgeSVGString } from './BadgeSVG';
import { IconPicker } from './IconPicker';
import { SegmentEditor } from './SegmentEditor';
import { AdvancedBadgeSettings } from './AdvancedBadgeSettings';
import { BADGE_ICONS, SIMPLE_ICON_PATHS, LUCIDE_ICON_PATHS } from '@/data/badgeIcons';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { toast } from '@/hooks/use-toast';
import { applyStylePreset } from '@/lib/badgeStylePresets';
import { BadgeStylePresetPanel } from '@/components/badgeStyles/BadgeStylePresetPanel';

// Helper to render icon preview
const renderSelectedIcon = (iconSlug?: string) => {
  if (!iconSlug) return null;
  
  const iconDef = BADGE_ICONS.find(i => i.slug === iconSlug);
  if (!iconDef) return null;
  
  const path = iconDef.type === 'simple' ? SIMPLE_ICON_PATHS[iconSlug] : LUCIDE_ICON_PATHS[iconSlug];
  if (!path) return null;
  
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4">
      {iconDef.type === 'simple' ? (
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

interface BadgeEditorProps {
  badge: Badge | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (badge: Badge) => void;
}

// Debounce hook
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

export const BadgeEditor = ({ badge, isOpen, onClose, onUpdate }: BadgeEditorProps) => {
  const [editedBadge, setEditedBadge] = useState<Badge | null>(badge);
  const [copied, setCopied] = useState<string | null>(null);
  const [iconPickerOpen, setIconPickerOpen] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<'float' | 'editor'>('float');

  const debouncedBadge = useDebounce(editedBadge, 300);

  useEffect(() => {
    if (badge) {
      const segments = getBadgeSegments(badge);
      setEditedBadge({
        ...badge,
        segments,
        iconPosition: badge.iconPosition ?? 0,
        advanced: badge.advanced ?? {
          size: 'md',
          scale: 1,
          opacity: 1,
          border: 0,
          borderColor: '#ffffff',
          shadow: 0,
          shadowAngle: 135,
          glow: 0,
          rotate: 0,
          txtsize: 1,
        },
      });
    }
  }, [badge]);

  // Debounced propagation to parent to avoid laggy full-page re-renders on every tiny change
  useEffect(() => {
    if (!isOpen) return;
    if (!debouncedBadge) return;
    onUpdate(debouncedBadge);
  }, [debouncedBadge, isOpen, onUpdate]);

  // Trigger editor phase after floating animation
  useEffect(() => {
    if (isOpen) {
      setAnimationPhase('float');
      const timer = setTimeout(() => setAnimationPhase('editor'), 400);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const generateBadgeUrl = useCallback((b: Badge): string => {
    const segments = getBadgeSegments(b);
    const params = new URLSearchParams({
      style: b.style,
    });
    
    params.set('segments', JSON.stringify(segments));
    
    if (b.icon) {
      params.set('icon', b.icon);
      params.set('iconPosition', String(b.iconPosition ?? 0));
    }
    
    return `${window.location.origin}/badge?${params.toString()}`;
  }, []);

  const handleCopy = async (type: 'svg' | 'url' | 'md' | 'html') => {
    if (!editedBadge) return;
    
    let content = '';
    const svgString = generateBadgeSVGString(editedBadge);
    
    switch (type) {
      case 'svg':
        content = svgString;
        break;
      case 'url':
        content = generateBadgeUrl(editedBadge);
        break;
      case 'md':
        content = `![${editedBadge.label}: ${editedBadge.message}](${generateBadgeUrl(editedBadge)})`;
        break;
      case 'html':
        content = `<img src="${generateBadgeUrl(editedBadge)}" alt="${editedBadge.label}: ${editedBadge.message}" />`;
        break;
    }
    
    await navigator.clipboard.writeText(content);
    setCopied(type);
    toast({
      title: 'Copied!',
      description: `${type.toUpperCase()} copied to clipboard`,
    });
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownload = () => {
    if (!editedBadge) return;
    const svgString = generateBadgeSVGString(editedBadge);
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${editedBadge.label}-${editedBadge.message}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: 'Downloaded!', description: 'Badge SVG saved' });
  };

  const updateField = <K extends keyof Badge>(field: K, value: Badge[K]) => {
    if (!editedBadge) return;
    const updated = { ...editedBadge, [field]: value };
    if (field === 'icon' && value && (editedBadge.iconPosition === undefined || editedBadge.iconPosition < 0)) {
      updated.iconPosition = 0;
    }
    setEditedBadge(updated);
  };

  const handleSegmentsChange = (segments: BadgeSegment[]) => {
    if (!editedBadge) return;
    const updated = {
      ...editedBadge,
      segments,
      label: segments[0]?.text ?? '',
      message: segments[1]?.text ?? '',
      labelColor: segments[0]?.color ?? '#555555',
      messageColor: segments[1]?.color ?? '#22d3ee',
    };
    setEditedBadge(updated);
  };

  const handleIconPositionChange = (position: number) => {
    if (!editedBadge) return;
    const updated = { ...editedBadge, iconPosition: position >= 0 ? position : 0 };
    setEditedBadge(updated);
  };

  const handleAdvancedChange = (advanced: BadgeAdvancedOptions) => {
    if (!editedBadge) return;
    const updated = { ...editedBadge, advanced };
    setEditedBadge(updated);
  };

  if (!isOpen || !editedBadge) return null;

  const currentSegments = editedBadge.segments ?? getBadgeSegments(editedBadge);

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

      {/* Full-screen Editor Container matching /editor layout */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={animationPhase === 'editor' ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
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
            {/* Preview Panel - matches EditorPage */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-panel p-6 rounded-xl sticky top-0"
            >
              <h2 className="font-mono font-semibold text-lg mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
                Live Preview
              </h2>
              {/* Badge Preview */}
              <div className="bg-muted/30 rounded-lg p-8 flex items-center justify-center min-h-[200px] border border-border/50">
                <BadgeSVG badge={editedBadge} scale={3} />
              </div>

              {/* Generated URL */}
              <div className="mt-6 p-4 bg-secondary/50 rounded-lg border border-border/50">
                <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
                  Badge URL
                </Label>
                <code className="text-xs font-mono text-primary break-all whitespace-pre-wrap">
                  {generateBadgeUrl(debouncedBadge ?? editedBadge)}
                </code>
              </div>

              {/* Export Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-6">
                <Button
                  variant="secondary"
                  size="sm"
                  className="font-mono text-xs"
                  onClick={() => handleCopy('svg')}
                >
                  {copied === 'svg' ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                  SVG
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="font-mono text-xs"
                  onClick={() => handleCopy('md')}
                >
                  {copied === 'md' ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                  Markdown
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="font-mono text-xs"
                  onClick={() => handleCopy('url')}
                >
                  {copied === 'url' ? <Check className="w-3 h-3 mr-1" /> : <Link className="w-3 h-3 mr-1" />}
                  URL
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="font-mono text-xs"
                  onClick={handleDownload}
                >
                  <Download className="w-3 h-3 mr-1" />
                  Download
                </Button>
              </div>
            </motion.div>

            {/* Editor Panel - matches EditorPage */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-panel p-6 rounded-xl"
            >
              <h2 className="font-mono font-semibold text-lg mb-6">Customize Badge</h2>

              <div className="space-y-6">
                {/* Icon Picker */}
                <Collapsible open={iconPickerOpen} onOpenChange={setIconPickerOpen}>
                  <CollapsibleTrigger>
                    <Button
                      variant="outline"
                      className="w-full justify-between font-mono text-sm"
                    >
                      <span className="flex items-center gap-2">
                        {editedBadge.icon ? (
                          <>
                            {renderSelectedIcon(editedBadge.icon)}
                            <span className="capitalize">{editedBadge.icon}</span>
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
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-3">
                    <IconPicker
                      selectedIcon={editedBadge.icon}
                      onSelect={(icon) => updateField('icon', icon)}
                    />
                  </CollapsibleContent>
                </Collapsible>

                {/* Segment Editor */}
                <SegmentEditor
                  segments={currentSegments}
                  iconPosition={editedBadge.iconPosition ?? 0}
                  hasIcon={!!editedBadge.icon}
                  onSegmentsChange={handleSegmentsChange}
                  onIconPositionChange={handleIconPositionChange}
                />

                {/* Style */}
                <div className="space-y-2">
                  <Label className="font-mono text-sm">Badge Style</Label>
                  <Select
                    value={editedBadge.style}
                    onValueChange={(value: Badge['style'] | null) => setEditedBadge(applyStylePreset(editedBadge, value ?? 'flat'))}
                  >
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
                    badge={editedBadge}
                    style={editedBadge.style}
                    onApply={(b) => setEditedBadge(b)}
                  />
                </div>

                {/* Advanced Settings */}
                <AdvancedBadgeSettings
                  advanced={editedBadge.advanced ?? {}}
                  onChange={handleAdvancedChange}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};