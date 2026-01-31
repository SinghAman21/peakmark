"use client";

import { motion } from 'framer-motion';
import { Badge, Github, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className="w-full border-b border-border/50 bg-card/50 backdrop-blur-xl sticky top-0 z-40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <motion.div
            whileHover={{ rotate: 15 }}
            transition={{ type: 'spring', stiffness: 400 }}
            className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/30"
          >
            <Badge className="w-5 h-5 text-primary" />
          </motion.div>
          <span className="font-mono font-bold text-xl tracking-tight">
            Peak<span className="text-primary">Mark</span>
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link href="/editor">
            <Button variant="ghost" className="font-mono cursor-pointer text-sm hidden sm:flex rounded-lg px-4 py-2 hover:bg-primary/10 hover:text-primary transition-all duration-300">
              <Sparkles className="w-4 h-4 mr-2" />
              Create Badge
            </Button>
          </Link>
          <a
            href="https://github.com/SinghAman21/peakmark"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </header>
  );
};
