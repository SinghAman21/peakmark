"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const HeroSection = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-info/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-mono mb-6"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Developer Badge Generator</span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-mono font-bold mb-6 leading-[1.1]">
            Beautiful badges for{' '}
            <span className="gradient-text">your README</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Browse stunning developer badges, remix with visual editing, and share instantly. 
            The shields.io alternative with <span className="text-foreground font-medium">100× better UX</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/editor">
              <Button size="lg" className="font-mono font-semibold group">
                <Sparkles className="w-4 h-4 mr-2" />
                Create a Badge
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="secondary" size="lg" className="font-mono">
              <Copy className="w-4 h-4 mr-2" />
              Browse Gallery
            </Button>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-8 mt-12 pt-8 border-t border-border/50"
          >
            {[
              { label: 'Badges Created', value: '1,234+' },
              { label: 'GitHub Stars', value: '2.1k' },
              { label: 'Weekly Users', value: '890' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-mono font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
