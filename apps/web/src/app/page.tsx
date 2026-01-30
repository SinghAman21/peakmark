"use client";

import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
// import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { BadgeGallery } from '@/components/BadgeGallery';
import { BadgeEditor } from '@/components/BadgeEditor';
import type { Badge } from '@/types/badge';
import { Github, Twitter } from 'lucide-react';
// import { DownArrow } from '@/components/downarrow';

interface RemixData {
  badge: Badge;
  cardRect: DOMRect;
}

export default function Home() {
  const [remixData, setRemixData] = useState<RemixData | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const handleRemix = (badge: Badge, cardRect: DOMRect) => {
    setRemixData({ 
      badge: { ...badge, id: `remix-${Date.now()}` },
      cardRect 
    });
    setIsEditorOpen(true);
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setTimeout(() => setRemixData(null), 500);
  };

  const handleUpdateBadge = useCallback((updated: Badge) => {
    setRemixData((prev) => prev ? { ...prev, badge: updated } : null);
  }, []);

  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      
      <main>
        <HeroSection />
        
        {/* <DownArrow/> */}
        
        {/* Gallery Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-mono font-bold mb-3">
                Ready-to-use <span className="text-primary">badges</span>
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Hover to copy or remix. Each badge is fully customizable.
              </p>
              <a href="http://localhost:3000/badge?style=flat&segments=%5B%7B%22text%22%3A%22your+label+som%22%2C%22color%22%3A%22%23555555%22%2C%22id%22%3A%22seg-vwdbt5a0-ml0na6l5%22%7D%2C%7B%22text%22%3A%22your+message%22%2C%22color%22%3A%22%2322d3ee%22%2C%22id%22%3A%22seg-2lrkgkll-ml0na6l5%22%7D%5D" target="_blank" rel="noopener noreferrer">Example Badge</a>
              {/* http://localhost:3000/badge?style=flat&segments=%5B%7B%22text%22%3A%22your+label+som%22%2C%22color%22%3A%22%23555555%22%2C%22id%22%3A%22seg-vwdbt5a0-ml0na6l5%22%7D%2C%7B%22text%22%3A%22your+message%22%2C%22color%22%3A%22%2322d3ee%22%2C%22id%22%3A%22seg-2lrkgkll-ml0na6l5%22%7D%5D */}
            </div>
            
            <BadgeGallery onRemix={handleRemix} />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 border-t border-border/50 bg-muted/20">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Visual Editing',
                  description: 'No more memorizing URL params. Pick colors, edit text, see changes live.',
                  icon: '🎨',
                },
                {
                  title: 'Instant Sharing',
                  description: 'Every badge gets a unique URL. Share via README, docs, or anywhere.',
                  icon: '🔗',
                },
                {
                  title: 'Remix Culture',
                  description: 'See a badge you like? One-click remix to make it yours.',
                  icon: '✨',
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="glass-panel p-6 rounded-xl"
                >
                  <span className="text-3xl mb-4 block">{feature.icon}</span>
                  <h3 className="font-mono font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/50">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground font-mono">
             &copy; {year} Peakmark. Built for Developers. By <a href="https://useraman.me" target="_blank" rel="noopener noreferrer"> <i>Dev</i></a>
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="https://github.com/SinghAman21/peakmark" className="hover:text-foreground transition-colors"><Github className="w-5 h-5" /></a>
            <a href="https://x.com/SinghAman21_" className="hover:text-foreground transition-colors">  𝕏 (Twitter)</a>
          </div>
        </div>
      </footer>

      {/* Badge Editor Overlay */}
      <AnimatePresence>
        {isEditorOpen && remixData && (
          <BadgeEditor
            badge={remixData.badge}
            isOpen={isEditorOpen}
            onClose={handleCloseEditor}
            onUpdate={handleUpdateBadge}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

