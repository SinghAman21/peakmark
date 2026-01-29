"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, Check, Link as LinkIcon, Download } from 'lucide-react';
import Link from 'next/link';
// import { Header } from '@/components/Header';
import type { Badge, BadgeSegment, BadgeAdvancedOptions } from '@/types/badge';
import { getBadgeSegments } from '@/types/badge';
import { BadgeSVG, generateBadgeSVGString } from '@/components/BadgeSVG';
import { SegmentEditor } from '@/components/SegmentEditor';
import { IconPicker } from '@/components/IconPicker';
import { AdvancedBadgeSettings } from '@/components/AdvancedBadgeSettings';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { toast } from '@/hooks/use-toast';
import { BADGE_ICONS, SIMPLE_ICON_PATHS, LUCIDE_ICON_PATHS } from '@/data/badgeIcons';
import { applyStylePreset } from '@/lib/badgeStylePresets';
import { BadgeStylePresetPanel } from '@/components/badgeStyles/BadgeStylePresetPanel';

const defaultBadge: Badge = {
  id: 'new',
  label: 'your label',
  message: 'your message',
  labelColor: '#555555',
  messageColor: '#22d3ee',
  style: 'flat',
  category: 'custom',
  iconPosition: 0,
  link: 'https://useraman.me',
  segments: [
    { text: 'your label', color: '#555555' },
    { text: 'your message', color: '#22d3ee' },
  ],
  advanced: {
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
};

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

export default function EditorPage() {
  const [badge, setBadge] = useState<Badge>(defaultBadge);
  const [copied, setCopied] = useState<string | null>(null);
  const [iconPickerOpen, setIconPickerOpen] = useState(false);

  const updateField = <K extends keyof Badge>(field: K, value: Badge[K]) => {
    setBadge(prev => {
      const updated = { ...prev, [field]: value };
      // Auto-set iconPosition to 0 when an icon is selected and position is not set
      if (field === 'icon' && value && (prev.iconPosition === undefined || prev.iconPosition < 0)) {
        updated.iconPosition = 0;
      }
      return updated;
    });
  };

  const handleSegmentsChange = (segments: BadgeSegment[]) => {
    setBadge(prev => ({
      ...prev,
      segments,
      label: segments[0]?.text ?? '',
      message: segments[1]?.text ?? '',
      labelColor: segments[0]?.color ?? '#555555',
      messageColor: segments[1]?.color ?? '#22d3ee',
    }));
  };

  const handleIconPositionChange = (position: number) => {
    setBadge(prev => ({ ...prev, iconPosition: position >= 0 ? position : 0 }));
  };

  const handleAdvancedChange = (advanced: BadgeAdvancedOptions) => {
    setBadge(prev => ({ ...prev, advanced }));
  };

  const generateBadgeUrl = (): string => {
    const segments = getBadgeSegments(badge);
    const params = new URLSearchParams({
      style: badge.style,
    });
    params.set('segments', JSON.stringify(segments));
    if (badge.icon) {
      params.set('icon', badge.icon);
      params.set('iconPosition', String(badge.iconPosition ?? 0));
    }
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/badge?${params.toString()}`;
    }
    return `/badge?${params.toString()}`;
  };

  const handleCopy = async (type: 'svg' | 'url' | 'md' | 'html') => {
    let content = '';
    const svgString = generateBadgeSVGString(badge);
    
    switch (type) {
      case 'svg':
        content = svgString;
        break;
      case 'url':
        content = generateBadgeUrl();
        break;
      case 'md':
        content = `![${badge.label}: ${badge.message}](${generateBadgeUrl()})`;
        break;
      case 'html':
        content = `<img src="${generateBadgeUrl()}" alt="${badge.label}: ${badge.message}" />`;
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
    const svgString = generateBadgeSVGString(badge);
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${badge.label}-${badge.message}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: 'Downloaded!', description: 'Badge SVG saved' });
  };

  const currentSegments = badge.segments ?? getBadgeSegments(badge);

  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 font-mono text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Gallery
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Preview Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel p-6 rounded-xl lg:sticky lg:top-8"
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
                {generateBadgeUrl()}
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
                {copied === 'url' ? <Check className="w-3 h-3 mr-1" /> : <LinkIcon className="w-3 h-3 mr-1" />}
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

          {/* Editor Panel */}
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
                      {badge.icon ? (
                        <>
                          {renderSelectedIcon(badge.icon)}
                          <span className="capitalize">{badge.icon}</span>
                        </>
                      ) : (
                        'Add Icon'
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
                    selectedIcon={badge.icon}
                    onSelect={(icon) => updateField('icon', icon)}
                  />
                </CollapsibleContent>
              </Collapsible>

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
                <Select
                  value={badge.style}
                  onValueChange={(value) => setBadge((prev) => applyStylePreset(prev, value as unknown as Badge['style']))}
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
                  badge={badge}
                  style={badge.style}
                  onApply={(b) => setBadge(b)}
                />
              </div>

              {/* Advanced Settings */}
              <AdvancedBadgeSettings
                advanced={badge.advanced ?? {}}
                onChange={handleAdvancedChange}
              />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

