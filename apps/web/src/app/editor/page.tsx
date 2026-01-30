"use client";

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { Badge } from '@/types/badge';
import { generateBadgeSVGString, generateBadgeTSXComponent } from '@/components/BadgeSVG';
import { PreviewPanel } from '@/components/editor/PreviewPanel';
import { CustomizePanel } from '@/components/editor/CustomizePanel';
import { generateBadgeUrl } from '@/lib/badgeUrlGenerator';
import { toast } from '@/hooks/use-toast';

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

export default function EditorPage() {
  const [badge, setBadge] = useState<Badge>(defaultBadge);
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (type: 'svg' | 'md' | 'html') => {
    let content = '';
    const svgTsxComponent = generateBadgeTSXComponent(badge);
    
    switch (type) {
      case 'svg':
        content = svgTsxComponent;
        break;
      case 'md':
        const badgeUrl = generateBadgeUrl(badge);
        const linkUrl = badge.link || badgeUrl;
        content = `[![${badge.label}: ${badge.message}](${badgeUrl})](${linkUrl})`;
        break;
      case 'html':
        content = `<img src="${generateBadgeUrl(badge)}" alt="${badge.label}: ${badge.message}" />`;
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

  return (
    <div className="min-h-screen bg-background">
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
          {/* Reusable Preview Panel */}
          <PreviewPanel
            badge={badge}
            badgeUrl={generateBadgeUrl(badge)}
            copied={copied}
            onCopy={handleCopy}
            onDownload={handleDownload}
            sticky
          />

          {/* Reusable Customize Panel */}
          <CustomizePanel
            badge={badge}
            onBadgeChange={setBadge}
          />
        </div>
      </main>
    </div>
  );
}
