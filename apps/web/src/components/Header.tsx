"use client";

import { motion } from 'framer-motion';
import { Badge, Github, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#d8ccc1] bg-[rgba(247,242,232,0.72)] backdrop-blur-2xl">
      <div className="container mx-auto flex h-14 items-center justify-between px-3 sm:h-16 sm:px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group">
          <motion.div
            whileHover={{ rotate: 15 }}
            transition={{ type: 'spring', stiffness: 400 }}
            className="flex h-7 w-7 items-center justify-center rounded-xl border border-[#ebbdd3]/55 bg-[#ebbdd3]/25 sm:h-8 sm:w-8"
          >
            <Badge className="h-4 w-4 text-[#946174] sm:h-5 sm:w-5" />
          </motion.div>
          <span className="font-serif text-lg font-semibold tracking-[-0.04em] text-[#2d2326] sm:text-xl">
            Peak<span className="text-primary">Mark</span>
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            render={<Link href="/editor" />}
            variant="ghost"
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-[#2d2326] transition-colors hover:bg-[#ebbdd3]/20 hover:text-[#2d2326] sm:inline-flex"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Create Badge
          </Button>
          <Button
            render={<Link href="/editor" />}
            variant="ghost"
            size="icon"
            className="inline-flex h-9 w-9 rounded-full text-[#2d2326] transition-colors hover:bg-[#ebbdd3]/20 hover:text-[#2d2326] sm:hidden"
          >
            <Sparkles className="h-4 w-4" />
          </Button>
          <a
            href="https://github.com/SinghAman21/peakmark"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 text-[#6f5f64] transition-colors hover:bg-[#ebbdd3]/15 hover:text-[#2d2326] sm:p-0"
          >
            <Github className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
        </div>
      </div>
    </header>
  );
};
