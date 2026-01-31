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
  link: 'https://peakmark.vercel.app',
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
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/10 to-background">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
      </div>

      <main className="container mx-auto px-4 py-8 relative">
        {/* Hero Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-300 font-mono text-sm mb-6 border border-transparent hover:border-border/50"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Gallery
          </Link>
          
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 border border-primary/20 backdrop-blur-sm">
              <span className="text-sm font-mono font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                Badge Editor
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-mono font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Create your perfect badge
            </h1>
            <p className="text-muted-foreground text-lg">
              Customize every detail and export in multiple formats
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start max-w-7xl mx-auto">
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
